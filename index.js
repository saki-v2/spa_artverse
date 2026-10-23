//reviews
const reviewForm = document.getElementById("review-form");
const messageView = document.getElementById("message-view");
const listView = document.getElementById("list-view");

function showReview(review) {
  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = "<h3>" + review.name + "</h3><p>" + review.comment + "</p>";
  listView.appendChild(card);
}
//fetch
function loadReviews() {
  fetch("db.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.reviews.length; i++) {
        showReview(data.reviews[i]);
      }
    })
    .catch(function (error) {
      console.log(error);
      messageView.textContent = "Could not load reviews.";
    });
}
//review storage
function storeReview(e) {
  e.preventDefault();

  const reviewData = {
    name: document.getElementById("name").value,
    comment: document.getElementById("comment-area").value,
  };

  showReview(reviewData);
  messageView.textContent = "Thanks for your review!";
  reviewForm.reset();
}

reviewForm.addEventListener("submit", storeReview);

loadReviews();

const typeSelect = document.getElementById("art-type");
const galleryInfo = document.getElementById("gallery-info");
const galleryGrid = document.getElementById("gallery-grid");

function showArtwork(art) {
  const card = document.createElement("article");
  card.className = "art-card";

  card.innerHTML = `
    <img src="${art.image}" alt="${art.title}">
    <div class="art-details">
      <h3>${art.title}</h3>
      <p>${art.artist_title}</p>
    </div>
  `;

  galleryGrid.appendChild(card);
}

function loadGallery(type) {
  galleryInfo.textContent = "Loading artworks...";
  galleryGrid.innerHTML = "";

  fetch("db.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let artworks = data.artworks;

      if (type !== "all") {
        artworks = artworks.filter(function (art) {
          return art.type === type;
        });
      }

      for (let i = 0; i < artworks.length; i++) {
        showArtwork(artworks[i]);
      }

      if (artworks.length === 0) {
        galleryInfo.textContent = "No artworks found.";
      } else {
        galleryInfo.textContent = "";
      }
    })
    .catch(function (error) {
      console.log(error);
      galleryInfo.textContent = "Sorry, we could not load the gallery.";
    });
}

typeSelect.addEventListener("change", function (e) {
  loadGallery(e.target.value);
});

loadGallery("all");

const openSignup = document.getElementById("open-signup");
const closeSignup = document.getElementById("close-signup");
const signupBox = document.getElementById("signup-box");

openSignup.addEventListener("click", function () {
  signupBox.classList.remove("hidden");
});

closeSignup.addEventListener("click", function () {
  signupBox.classList.add("hidden");
});