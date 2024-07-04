import * as api from "../../../backend/api.js";

async function loadVideos() {
  const videosContainer = document.getElementById("videos__container");
  let videosHTML = "";

  try {
    const videos = await api.getVideos();
    videos.forEach((video) => {
      const { title, description, url, image } = video;
      videosHTML += `
        <div class="videos__video">
            <iframe class="video__iframe" src="${url}" title="${title}" frameborder="0" allowfullscreen></iframe>
            <div class="video__description">
                <picture class="video__image">
                    <img src="${image}" alt="title" />
                </picture>
                <h3 class="video__title">${title}</h3>
            <p class="video__views">${description}</p>
            </div>
        </div>
        `;
    });
    videosContainer.innerHTML = videosHTML;
  } catch {
    videosContainer.innerHTML = "<p>Error loading videos.</p>";
  }
}

loadVideos();
