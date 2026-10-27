const menuIcon = document.querySelector("#menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuIcon.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

const reviewForm = document.getElementById("review-form");
const messageView = document.getElementById("message-view");
const listView = document.getElementById("list-view");

function showReview(review) {
  const card = document.createElement("div");
  card.className = "review-card";

  const icon = document.createElement("i");
  icon.className = "bi bi-person-circle review-icon";

  const name = document.createElement("h3");
  name.textContent = review.name;

  const comment = document.createElement("p");
  comment.textContent = review.comment;

  card.appendChild(icon);
  card.appendChild(name);
  card.appendChild(comment);
  listView.appendChild(card);
}

function loadReviews() {
  fetch("db.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.reviews.length; i++) {
        showReview(data.reviews[i]);
      }
    })
    .catch(function () {
      messageView.textContent = "Could not load reviews.";
    });
}

function storeReview(e) {
  e.preventDefault();

  const reviewData = {
    name: document.getElementById("name").value.trim(),
    comment: document.getElementById("comment-area").value.trim(),
  };

  if (reviewData.name === "" || reviewData.comment === "") {
    messageView.textContent = "Please enter your name and a comment.";
    return;
  }

  showReview(reviewData);
  messageView.textContent = "Thanks for your review!";
  reviewForm.reset();
}

reviewForm.addEventListener("submit", storeReview);

const typeSelect = document.getElementById("art-type");
const searchInput = document.getElementById("search-input");
const galleryInfo = document.getElementById("gallery-info");
const galleryGrid = document.getElementById("gallery-grid");

let allArtworks = [];

function showArtwork(art) {
  const card = document.createElement("article");
  card.className = "art-card";

  const image = document.createElement("img");
  image.src = art.image;
  image.alt = art.title;

  const details = document.createElement("div");
  details.className = "art-details";

  const title = document.createElement("h3");
  title.textContent = art.title;

  const artist = document.createElement("p");
  artist.textContent = art.artist_title;

  details.appendChild(title);
  details.appendChild(artist);
  card.appendChild(image);
  card.appendChild(details);
  galleryGrid.appendChild(card);
}

function showGallery() {
  const type = typeSelect.value;
  const searchText = searchInput.value.trim().toLowerCase();
  let shown = 0;

  galleryGrid.innerHTML = "";

  for (let i = 0; i < allArtworks.length; i++) {
    const art = allArtworks[i];
    const matchesType = type === "all" || art.type === type;
    const matchesSearch = art.title.toLowerCase().includes(searchText);

    if (matchesType && matchesSearch) {
      showArtwork(art);
      shown++;
    }
  }

  if (shown === 0) {
    galleryInfo.textContent = "No artworks found.";
  } else {
    galleryInfo.textContent = "";
  }
}

function loadGallery() {
  galleryInfo.textContent = "Loading artworks...";

  fetch("db.json")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then(function (data) {
      allArtworks = data.artworks;
      showGallery();
    })
    .catch(function () {
      galleryInfo.textContent = "Sorry, we could not load the gallery.";
    });
}

typeSelect.addEventListener("change", showGallery);
searchInput.addEventListener("input", showGallery);

const openSignup = document.getElementById("open-signup");
const closeSignup = document.getElementById("close-signup");
const signupBox = document.getElementById("signup-box");

openSignup.addEventListener("click", function () {
  signupBox.classList.remove("hidden");
});

closeSignup.addEventListener("click", function () {
  signupBox.classList.add("hidden");
});

loadReviews();
loadGallery();