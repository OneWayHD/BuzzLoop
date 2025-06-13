const feedContainer = document.getElementById("feed-container");
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

// ✅ 本物の縦型YouTube Shortsのみ
const posts = [
  {
    type: "video",
    src: "https://www.youtube.com/embed/4-3G6CkRrkI",  // Shorts対応
    title: "Dancing Duck Goes Viral",
    source: "https://www.youtube.com/shorts/4-3G6CkRrkI"
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/gVD43z2nGH8",  // Shorts対応
    title: "Insane Dog Skateboarding!",
    source: "https://www.youtube.com/shorts/gVD43z2nGH8"
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/wE9d7S2TclA",  // Shorts対応
    title: "Instant Karma Moment",
    source: "https://www.youtube.com/shorts/wE9d7S2TclA"
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
