import html from '../../../library/core.js';

function SideBarSearch() {
  return html`
    <form class="search border-bottom p-2">
      <input
        type="text"
        name=""
        id=""
        class="w-100 form-control-sm bg-dark-input"
        placeholder="Tìm hoặc bắt đầu cuộc trò chuyện"
      />
    </form>
  `;
}

export default SideBarSearch;
