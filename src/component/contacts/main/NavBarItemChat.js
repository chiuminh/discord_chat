import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
const connector = connect(state => ({
  toPage: state.toPage,
  chatRooms: state.chatRooms,
  filterUserChat: state.filterUserChat,
  users: state.users,
  groups: state.groups,
}));
function NavBarItemChat({ chatRooms, users, filterUserChat }) {
  const id = +chatRooms[0][0];
  const typeRoom = chatRooms[0][1];
  const user = filterUserChat[typeRoom](id, users);
  return html` <div class="nav-item flex-1 flex-between">
    <!-- name -->
    <div class="flex-1 flex-start px-4">
      <!-- name friend chat -->
      <div class="name-friend">
        <span class="text-color me-2">
          <i class="fas fa-at"></i>
        </span>
        <span class="fw-600 text-color-light"
          >${user.username}</span
        >
        <span class="dot-user-chat text-xs text-color ms-1">
          <i class="fas fa-dot-circle ${user.isOnline}"></i>
        </span>
      </div>

      <!-- ------------------------- -->
      <!-- name group -->
      <div class="name-group d-none">
        <span class="text-color me-2">
          <i class="fas fa-user-friends"></i>
        </span>
        <span class="fw-600 text-color-light">Minh</span>,
        <span class="fw-600 text-color-light">Thành Long</span>,
        <span class="fw-600 text-color-light">Tiểu Linh</span>
      </div>
    </div>
    <!-- list-icon -->
    <div class="list-icon-contact flex-end text-color">
      <span class="px-2">
        <i class="fas fa-phone"></i>
      </span>
      <span class="px-2">
        <i class="fas fa-video"></i>
      </span>
      <span class="px-2">
        <i class="fas fa-user-plus"></i>
      </span>
      <span class="px-2 active">
        <i class="fas fa-user-friends"></i>
      </span>
    </div>
  </div>`;
}

export default connector(NavBarItemChat);
