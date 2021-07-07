import html from '../../../library/core.js';

function SideBarContentTop() {
  return html`
    <ul class="sidebar-list">
      <li
        class="sidebar-item active"
        onclick="dispatch('switchPageContact')"
      >
        <button
          class="btn btn-group justify-start align-items-start"
        >
          <i class="fas fa-child"></i>
          <span class="ps-3 title">Bạn bè</span>
        </button>
      </li>
      <li class="sidebar-item">
        <button
          class="btn btn-group justify-start align-items-start"
        >
          <i class="fab fa-gg-circle"></i>
          <span class="ps-3 title">Nitro</span>
        </button>
      </li>
    </ul>
  `;
}

export default SideBarContentTop;
