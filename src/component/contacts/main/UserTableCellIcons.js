import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';

const connector = connect(state => ({
  currentUser: state.currentUser,
}));

function UserTableCellIcons({ navOn }) {
  const classIcons =
    navOn.type === 'all' ||
    navOn.type === 'online' ||
    navOn.type === 'friend'
      ? ''
      : 'd-none';

  return html`<div class="flex-center icons text-light">
    <!-- Icon block -->
    <div
      class="actionButton"
      onclick="dispatch('removeBlockContact', getDataIdUserTableCell(this))"
    >
      <span
        class="actionButton-icon bg-i ${navOn.type !== 'block' &&
        'd-none'}"
      >
        <i class="fas fa-user-times"></i>
      </span>
      <span
        class="info info-mes text-sm bg-dark px-2 py-1 rounded text-center"
      >
        Bỏ chặn
      </span>
    </div>

    <!-- Icon add -->
    <div
      class="actionButton"
      onclick="dispatch('addContact',getDataIdUserTableCell(this))"
    >
      <span
        class="actionButton-icon bg-i ${navOn.type !== 'add' &&
        'd-none'}"
      >
        <i class="fas fa-user-plus"></i>
      </span>
      <span
        class="info info-mes text-sm bg-dark px-2 py-1 rounded text-center"
      >
        Thêm
      </span>
    </div>

    <!-- Icon cancel: dispatch(removeContactByContactId, id) -->
    <div class="actionButton" onclick="removeElementByDataId(this)">
      <span
        class="actionButton-icon bg-i ${navOn.type ===
          'pendingReceived' || navOn.type === 'pending'
          ? ''
          : 'd-none '}"
      >
        <i class="fas fa-times px-2"></i>
      </span>
      <span
        class="info info-mes text-sm bg-dark px-2 py-1 rounded text-center"
      >
        Hủy bỏ
      </span>
    </div>

    <!-- Icon received -->
    <div
      class="actionButton"
      onclick="dispatch('approveAddContact', getDataIdUserTableCell(this))"
    >
      <span
        class="actionButton-icon bg-i ${navOn.type !==
          'pendingReceived' && 'd-none'} "
      >
        <i class="fas fa-user-plus"></i>
      </span>
      <span
        class="info info-mes text-sm bg-dark px-2 py-1 rounded text-center"
      >
        Chấp nhận
      </span>
    </div>

    <div class="actionButton">
      <span class="actionButton-icon ${classIcons}">
        <i class="fas fa-comment-alt"></i>
      </span>
      <span
        class="info info-mes text-sm bg-dark px-2 py-1 rounded text-center"
      >
        Nhắn tin
      </span>
    </div>

    <!-- Icon chat and menu -->
    <div class="actionButton">
      <span
        class="actionButton-icon ${classIcons}"
        onclick="handleHideShow(this)"
      >
        <i class="fas fa-ellipsis-v"></i>
      </span>

      <!-- when onlick[fa-ellipsis]remove d-none -->
      <ul
        id="toggle-menu-user"
        class="list-action bg-dark p-2 d-none"
      >
        <li class="btn-sm hover-primary text-color text-sm">
          Bắt đầu cuộc gọi video
        </li>
        <li class="btn-sm hover-primary text-color text-sm">
          Bắt đầu cuộc gọi thoại
        </li>
        <li
          class="btn-sm text-đanger hover-danger"
          onclick="dispatch('removeContactByContactId', getDataIdUserTableCell(this.parentElement.parentElement))"
        >
          Xóa bạn
        </li>
      </ul>
      <span
        class="info info-up text-sm bg-dark px-2 py-1 rounded text-center "
        >Những mục khác</span
      >
    </div>
  </div>`;
}

export default connector(UserTableCellIcons);
