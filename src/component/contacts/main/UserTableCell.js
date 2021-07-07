import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
import UserTableCellIcons from './UserTableCellIcons.js';

const connector = connect(state => ({
  contacts: state.contacts,
  currentUser: state.currentUser,
}));
function UserTableCell({ user, navOn, contacts, currentUser }) {
  // Tìm contact mà mình được nhận nếu có:
  // return:  user
  // ngược lại return:  undefined
  const contactReceived = contacts.find(
    contact =>
      contact.contactId === currentUser.id &&
      contact.userId === user.id
  );
  if (navOn.type === 'pending' && contactReceived) {
    const newNavOn = { ...navOn, type: 'pendingReceived' };
    navOn = newNavOn;
  }

  const statusContent =
    (navOn.type === 'online' && 'Trực tuyến') ||
    (navOn.type === 'add' && `${user.address}`) ||
    (navOn.type === 'block' && 'Đã chặn') ||
    (navOn.type === 'pending' && 'Yêu cầu kết bạn được gửi đi!') ||
    (navOn.type === 'pendingReceived' &&
      'Đã gửi cho bạn lời mời kết bạn!') ||
    'Ngoại tuyến';
  return html`<li
    class="contact-item py-2 px-2 border-top border-secondary rounded-lg"
    data-id="${user.id}"
  >
    <div class="flex-between">
      <div class="avatar-small">
        <img src="../assets/images/${user.avatar}" alt="" />
        <span
          class="dot ${user.isOnline &&
          'dot-light'} ${navOn.type === 'add' && 'd-none'}"
        ></span>
      </div>
      <div
        class="flex-1 flex-column ps-3 justify-center field-name"
      >
        <span class="fw-600 text-white"
          >${user.username}
          <span class="user-id text-sm opacity-0">#5616</span>
        </span>
        <span class="text-xs text-color"> ${statusContent}</span>
      </div>
      ${UserTableCellIcons({ navOn })}
    </div>
  </li>`;
}

export default connector(UserTableCell);
