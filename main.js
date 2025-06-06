// 仮の投稿データ
const posts = [
  {
    type: "image",
    src: "https://placekitten.com/600/400",
    text: "バズり中のネコ #1"
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    text: "これはヤバい！急上昇の動画 #2"
  },
  {
    type: "image",
    src: "https://placekitten.com/500/300",
    text: "映える投稿が止まらない #3"
  },
  {
    type: "video",
    src: "https://www.w3schools.com/html/movie.mp4",
    text: "話題沸騰のショート動画 #4"
  },
  {
    type: "image",
    src: "https://placekitten.com/480/320",
    text: "これは可愛すぎる… #5"
  }
];

// 投稿表示関数
function renderPosts(filterType = "all") {
  const container = document.getElementById("feed-container");
  container.innerHTML = "";

  const filtered = posts.filter(post =>
    filterType === "all" ? true : post.type === filterType
  );

  filtered.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    if (post.type === "image") {
      const img = document.createElement("img");
      img.src = post.src;
      img.alt = "投稿画像";
      img.className = "post-image";
      card.appendChild(img);
    } else if (post.type === "video") {
      const video = document.createElement("video");
      video.src = post.src;
      video.controls = true;
      video.className = "post-video";
      card.appendChild(video);
    }

    const text = document.createElement("div");
    text.className = "post-content";
    text.textContent = post.text;
    card.appendChild(text);

    container.appendChild(card);
  });
}

// 初期表示
renderPosts();

// フィルターボタンクリック処理
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const type = btn.dataset.type;
    renderPosts(type);
  });
});
