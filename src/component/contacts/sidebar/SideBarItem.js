import html from '../../../library/core.js';
function SideBarItem({ user }) {
  return html`
    <li class="sidebar-item">
      <button
        class="btn btn-group p-1 pe-2 justify-start align-items-start"
        data-id="${user.id}"
        onclick="dispatch('switchPageChat', this.dataset.id, 'user')"
      >
        <div class="avatar-small">
          <img src="../assets/images/${user.avatar}" alt="" />
          <span class="dot ${user.isOnline && 'dot-light'} "></span>
        </div>
        <span class="ps-3 text-start flex-1">${user.username}</span>
        <span
          class="d-none text-xl"
          onclick="removeElement(this.parentElement.parentElement)"
          >&times;</span
        >
      </button>
    </li>
  `;
}
export default SideBarItem;
