// REVIEW
const reviewForm = document.getElementById("review-form");
const messageView = document.getElementById("message-view");
const listView = document.getElementById("list-view");

// Show one review on the page
function showReview(review) {
  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = "<h3>" + review.name + "</h3><p>" + review.comment + "</p>";
  listView.appendChild(card);
}

// GET
function loadReviews() {
  fetch("http://localhost:3000/reviews")
    .then(function (response) {
      return response.json();
    })
    .then(function (reviews) {
      for (let i = 0; i < reviews.length; i++) {
        showReview(reviews[i]);
      }
    })
    .catch(function (error) {
      console.log(error);
      messageView.textContent = "Could not load reviews.";
    });
}
//POST
function storeReview(e) {
  e.preventDefault();

  const reviewData = {
    name: document.getElementById("name").value,
    comment: document.getElementById("comment-area").value,
  };

  fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (savedReview) {
      showReview(savedReview);
      messageView.textContent = "Thanks for your review!";
      reviewForm.reset();
    })
    .catch(function (error) {
      console.log(error);
      messageView.textContent = "Sorry, your review could not be saved.";
    });
}

// submit
reviewForm.addEventListener("submit", storeReview);

loadReviews();

// Gallery section

const typeSelect = document.getElementById("art-type");
const galleryInfo = document.getElementById("gallery-info");
const galleryGrid = document.getElementById("gallery-grid");
 
function showArtwork(art) {
  const card = document.createElement("article");
  card.className = "art-card";
 
//API key
  let imageUrl = art.image;
  if (art.image_id) {
    imageUrl =
      "https://www.artic.edu/iiif/2/" + art.image_id + "/full/400,/0/default.jpg";
  }
 
  card.innerHTML =
    '<img src="' + imageUrl + '" alt="' + art.title + '">' +
    '<div class="art-details">' +
    "<h3>" + art.title + "</h3>" +
    "<p>" + art.artist_title + "</p>" +
    "</div>";
 
  galleryGrid.appendChild(card);
}
 
function loadGallery(type) {
  galleryInfo.textContent = "Loading artworks...";
  galleryGrid.innerHTML = "";
 
  let url = "http://localhost:3000/artworks";
 
  if (type !== "all") {
    url = url + "?type=" + type;
  }
 
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (artworks) {
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
 
// Change EventListener
typeSelect.addEventListener("change", function (e) {
  loadGallery(e.target.value);
});
 
loadGallery("all");

// Click EventListener for signing up

const openSignup = document.getElementById("open-signup");
const closeSignup = document.getElementById("close-signup");
const signupBox = document.getElementById("signup-box");

// show the form
openSignup.addEventListener("click", function () {
  signupBox.classList.remove("hidden");
});
//hide the form
closeSignup.addEventListener("click", function () {
  signupBox.classList.add("hidden");
});