import html from '../library/core.js';
function SideBarFooter({ currentUser }) {
  return html`
    <div class="sidebar-footer">
      <button
        class="btn btn-group p-3 justify-start align-items-start bg-dark-input"
      >
        <div class="avatar-small">
          <img
            src="../assets/images/${currentUser.avatar}"
            alt=""
          />
          <span class="dot dot-light"></span>
        </div>
        <div class="flex-column flex-1 text-xs">
          <span class="ps-3 text-start flex-1 text-light"
            >${currentUser.username}</span
          >
          <span class="ps-3 text-start flex-1 text-light"
            >#23${currentUser.id}5</span
          >
        </div>
        <div class="icons text-light text-xs">
          <i class="fas fa-microphone-slash"></i>
          <i class="px-1 fas fa-headphones"></i>
          <i class="fas fa-cog"></i>
        </div>
      </button>
    </div>
  `;
}
export default SideBarFooter;
