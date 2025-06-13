const feedContainer = document.getElementById("feed-container");
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

// YouTube Shorts投稿データ（縦動画限定）
const posts = [
  {
    type: "video",
    src: "https://www.youtube.com/embed/P9R0IuP4dWk",
    title: "Insane Basketball Trick Shot!",
    source: "https://www.youtube.com/watch?v=P9R0IuP4dWk"
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "Classic Viral Comeback",
    source: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/lpR_rvW-NZg",
    title: "Cutest Cat Ever",
    source: "https://www.youtube.com/watch?v=lpR_rvW-NZg"
  }
];

// 投稿の描画
function renderPosts() {
  feedContainer.innerHTML = "";

  posts
    .filter(post => currentFilter === "all" || post.type === currentFilter)
    .forEach(post => {
      const section = document.createElement("section");
      section.className = "post";

      const title = document.createElement("div");
      title.className = "post-title";
      title.textContent = post.title;
      section.appendChild(title);

      const media = document.createElement("iframe");
      media.className = "post-media";
      media.src = post.src;
      media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      media.allowFullscreen = true;
      section.appendChild(media);

      const viewSource = document.createElement("a");
      viewSource.className = "view-source";
      viewSource.href = post.source;
      viewSource.target = "_blank";
      viewSource.rel = "noopener noreferrer";
      viewSource.textContent = "View Source";
      section.appendChild(viewSource);

      const like = document.createElement("button");
      like.className = "like-btn";
      like.innerHTML = "❤️ <span class='like-count'>0</span>";
      like.addEventListener("click", () => {
        const count = like.querySelector(".like-count");
        count.textContent = parseInt(count.textContent) + 1;
      });
      section.appendChild(like);

      feedContainer.appendChild(section);
    });

  setupAutoplay();
}

// 表示中だけ動画再生する処理
function setupAutoplay() {
  const videos = document.querySelectorAll("iframe");
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        const iframe = entry.target;
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: entry.isIntersecting ? "playVideo" : "pauseVideo",
            args: []
          }),
          "*"
        );
      });
    },
    { threshold: 0.5 }
  );

  videos.forEach(video => observer.observe(video));
}

// フィルター切替
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    renderPosts();
  });
});

renderPosts();
