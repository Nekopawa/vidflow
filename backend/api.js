async function getVideos() {
  const data = await fetch("http://localhost:3000/videos");
  const videos = await data.json();
  return videos.map((video) => {
    return {
      title: video.title,
      description: video.description,
      url: video.url,
      image: video.image,
    };
  });
}

export { getVideos };
