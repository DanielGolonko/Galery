const accessKey = "ParEpB_-V0lLbpZTzoV5U64j8OFdNw-L0JJACcDH51I";
const randomPhotosUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=20`;
const searchUrl = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=`;

const imagesDiv = document.getElementById("images");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const cancelButton = document.getElementById("cancelButton");

window.onload = function () {
  fetchImages(randomPhotosUrl);
};

function fetchImages(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results) {
        displayImages(data.results);
      } else {
        displayImages(data);
      }
    })
    .catch((error) => console.log("Error fetching images:", error));
}

function displayImages(images) {
  imagesDiv.innerHTML = "";
  images.forEach((image) => {
    const imgElement = document.createElement("img");
    imgElement.src = image.urls.small;
    imgElement.alt = image.description || "Unsplash Image";
    const container = document.createElement("div");
    container.classList.add("image-container");
    container.appendChild(imgElement);
    imagesDiv.appendChild(container);
  });
}

searchButton.addEventListener("click", searchImages);
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchImages();
  }
});

cancelButton.addEventListener("click", function () {
  searchInput.value = "";
  fetchImages(randomPhotosUrl);
});

function searchImages() {
  const query = searchInput.value.trim();
  if (query) {
    const searchApiUrl = searchUrl + query;
    fetchImages(searchApiUrl);
  } else {
    alert("Please enter a search term.");
  }
}
