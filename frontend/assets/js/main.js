import * as api from "../../../backend/api.js";

async function loadVideos() {
  const videosContainer = document.getElementById("videos__container");
  let videosHTML = "";

  try {
    const videos = await api.getVideos();
    videos.forEach((video) => {
      const { title, description, url, image, category } = video;
      if (!category) {
        throw new Error("Video does not have category.");
      }

      videosHTML += `
        <div class="videos__video">
            <iframe class="video__iframe" src="${url}" title="${title}" frameborder="0" allowfullscreen></iframe>
            <div class="video__description">
                <picture class="video__image">
                    <img src="${image}" alt="title" />
                </picture>
                <h3 class="video__title">${title}</h3>
                <p class="video__views">${description}</p>
                <p class="video__category" hidden>${category}</p>
            </div>
        </div>
        `;
    });
    videosContainer.innerHTML = videosHTML;
  } catch (error) {
    videosContainer.innerHTML = `<p>Error loading videos: ${error}</p>`;
  }

  /* events */
  filterVideosByInput();
  filterVideosByCategory();
}

function filterVideosByInput() {
  const searchInput = document.getElementById("search__input");
  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const videos = document.querySelectorAll(".videos__video");

    videos.forEach((video) => {
      const title = video
        .getElementsByClassName("video__title")[0]
        .textContent.toLowerCase();
      const display = searchValue.trim()
        ? title.includes(searchValue)
          ? "block"
          : "none"
        : "block";
      video.style.display = display;
    });
  });
}

function filterVideosByCategory() {
  const categories = document.querySelectorAll(".top-menu__list-item");

  categories.forEach((category) => {
    category.addEventListener("click", (event) => {
      const selectedCategory = event.currentTarget.getAttribute("name");
      const videos = document.querySelectorAll(".videos__video");
      videos.forEach((video) => {
        const videoCategory =
          video.getElementsByClassName("video__category")[0].textContent;

        const display =
          videoCategory.toLowerCase() === selectedCategory.toLowerCase() ||
          selectedCategory == "all"
            ? "block"
            : "none";
        video.style.display = display;
      });
    });
  });
}

loadVideos();
