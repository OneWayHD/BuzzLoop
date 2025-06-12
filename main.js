const feedContainer = document.getElementById("feed-container");
const filterButtons = document.querySelectorAll(".filter-btn");
let currentFilter = "all";

// 仮投稿データ（画像＆動画）
const posts = [
  {
    type: "video",
    src: "https://www.youtube.com/embed/YQHsXMglC9A",
    title: "Epic Music Clip",
    source: "https://www.youtube.com/watch?v=YQHsXMglC9A"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    title: "Cute Cat Alert!",
    source: "https://reddit.com/r/aww"
  },
  {
    type: "video",
    src: "https://www.youtube.com/embed/9bZkp7q19f0",
    title: "Classic Viral Hit",
    source: "https://www.youtube.com/watch?v=9bZkp7q19f0"
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80",
    title: "Doggo Vibes",
    source: "https://reddit.com/r/rarepuppers"
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

      const media = document.createElement(post.type === "video" ? "iframe" : "img");
      media.className = "post-media";
      media.src = post.src;
      if (post.type === "video") {
        media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        media.allowFullscreen = true;
      }
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
}

// フィルター切り替え
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    renderPosts();
  });
});

renderPosts();
