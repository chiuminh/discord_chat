import html from '../../../library/core.js';
export default function Header(typesServerActive) {
  const title =
    typesServerActive.title !== 'home' &&
    typesServerActive.title[0].toUpperCase() +
      typesServerActive.title.slice(1);
  return html`
    <div class="col-3" style="max-height: 300px;">
      <div class="search rounded-lg" style="max-height: 300px;">
        <img
          src="../assets/images/bg-img.svg"
          style="width: 100%;"
          alt=""
        />
        <div class="content text-center text-white">
          <h4 class="heading text-2xl fw-600 my-3">
            Tìm các cộng đồng ${title} trên Discord
          </h4>
          <span
            class="sub-heading text-sm fw-400 ${typesServerActive.title !==
              'home' && 'd-none'}"
            >Từ game cho đến âm nhạc và giáo dục, sẽ luôn có một nơi
            phù hợp với bạn trên Discord</span
          >
          <button
            class="search-group-form btn btn-block p-0 my-2 w-100-mobile"
          >
            <input
              type="text"
              class="form-control w-100 "
              placeholder="Khám phá máy chủ ${title}"
              onChange="dispatch('search', this.value.trim())"
            />
            <span class="btn search-icon"
              ><i class="fas fa-search"></i
            ></span>
          </button>
        </div>
      </div>
    </div>
  `;
}
