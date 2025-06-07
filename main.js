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
      const card = document.createElement("section");
      card.className = "post-card";

      const title = document.createElement("div");
      title.className = "post-title";
      title.textContent = post.title;

      const media = document.createElement(post.type === "video" ? "iframe" : "img");
      media.className = "post-media";
      media.src = post.src;
      if (post.type === "video") {
        media.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        media.allowFullscreen = true;
      }
      card.appendChild(title);
      card.appendChild(media);

      // CTAボタンエリア
      const actions = document.createElement("div");
      actions.className = "post-actions";

      // Like ❤️
      const like = document.createElement("button");
      like.className = "like-btn";
      like.innerHTML = "❤️ <span>0</span>";
      like.addEventListener("click", () => {
        const count = like.querySelector("span");
        count.textContent = parseInt(count.textContent) + 1;
      });

      // View Source 🔗
      const source = document.createElement("a");
      source.className = "source-link";
      source.href = post.source;
      source.target = "_blank";
      source.rel = "noopener noreferrer";
      source.textContent = "View Source";

      actions.appendChild(like);
      actions.appendChild(source);
      card.appendChild(actions);

      feedContainer.appendChild(card);
    });
}

// フィルターボタン切替
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.type;
    renderPosts();
  });
});

renderPosts();