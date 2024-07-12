const form = document.querySelector("form");
const btn = document.querySelector("button");
const cards = document.querySelector(".cards");
// Get input values
const movieName = document.getElementById("movieName");
const imdb = document.getElementById("movieImdb");
const image = document.getElementById("movieImage");
let movies = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const movie = {
    id: Math.floor(Math.random() * 100),
    movieTitle: movieName.value,
    imdb: imdb.value,
    image: image.value,
    isWatched: false,
  };

  movies.push(movie);
  movieName.value = "";
  imdb.value = "";
  image.value = "";

  cards.innerHTML = "";
  movies.map((item) => {
    createMovies(item);
  });
});
function createMovies(item) {
  const card = document.createElement(`div`);
  card.classList.add("card");

  const cardImg = document.createElement("img");
  cardImg.classList.add("card-img-top");
  cardImg.setAttribute("src", item.image);

  const cardBody = document.createElement(`div`);
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.innerText = item.movieTitle;

  const cardDesc = document.createElement("p");
  cardDesc.classList.add("card-text");
  cardDesc.innerText = item.imdb;

  const btnCard = document.createElement(`div`);
  btnCard.classList.add("btn-card");
  btnCard.classList.add("d-flex");
  btnCard.classList.add("justify-content-between");

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-danger");
  deleteBtn.innerText = "Delete";

  const watchedBtn = document.createElement("button");
  watchedBtn.classList.add("btn");
  watchedBtn.classList.add("btn-primary");

  watchedBtn.innerText = item.isWatched ? "Watched" : "Not Watched";

  deleteBtn.addEventListener("click", function () {
    movies = movies.filter((m) => {
      return m.id != item.id;
    });
    cards.innerHTML = "";

    movies.map((item) => {
      createMovies(item);
    });
  });
  watchedBtn.addEventListener("click", () => {
    movies = movies.map((m) =>
      m.id == item.id
        ? {
            ...m,
            isWatched: true,
          }
        : m
    );
    cards.innerHTML = "";

    movies.map((item) => {
      createMovies(item);
    });
  });

  btnCard.append(deleteBtn, watchedBtn);
  cardBody.append(cardTitle, cardDesc, btnCard);
  card.append(cardImg, cardBody);
  cards.appendChild(card);
}
