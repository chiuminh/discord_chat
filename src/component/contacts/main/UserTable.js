import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
import UserTableCell from './UserTableCell.js';

const connector = connect(state => ({
  contacts: state.contacts,
  currentUser: state.currentUser,
  users: state.users,
  navContent: state.navContent,
}));

function UserTable({ currentUser, contacts, users, navContent }) {
  const navOn = navContent.filter(item => item.active)[0];

  let usersContactOn;
  let usersContactBlock;
  let usersContactPending;
  let usersContactAll;
  let usersOtherAll;
  let newContactsId = [];
  let newContactsIdUnique = [];
  let newContacts;
  switch (navOn.type) {
    case 'friend':
    case 'online':
    case 'all':
      // Tìm tất cả bạn bè có: userId || contact = currenId, status=true, !block
      newContacts = contacts.filter(contact => {
        return (
          (contact.userId === currentUser.id ||
            contact.contactId === currentUser.id) &&
          contact.status === true &&
          contact.block === false
        );
      });

      // Lưu tất cả các contactId, userId
      for (const contact of newContacts) {
        newContactsId.push(contact.contactId, contact.userId);
      }

      // xóa các userId trùng lặp và userId của mình
      newContactsIdUnique = [...new Set(newContactsId)].filter(
        user => user !== currentUser.id
      );
      newContactsId.length = 0;

      // Tìm user by newContactsIdUnique và lưu vào usersContact
      if (navOn.type === 'online') {
        usersContactOn = users.filter(
          user =>
            newContactsIdUnique.includes(user.id) && user.isOnline
        );
        break;
      }
      usersContactAll = users.filter(user =>
        newContactsIdUnique.includes(user.id)
      );
      newContactsIdUnique.length = 0;

      break;
    case 'pending':
      // Tìm lời mời or yêu cầu kết bạn có: userId || contact = currenId, status=false, !block
      newContacts = contacts.filter(contact => {
        return (
          (contact.userId === currentUser.id ||
            contact.contactId === currentUser.id) &&
          contact.status === false &&
          !contact.block
        );
      });

      for (const contact of newContacts) {
        newContactsId.push(contact.contactId, contact.userId);
      }
      // xóa các userId trùng lặp và userId của mình
      newContactsIdUnique = [...new Set(newContactsId)].filter(
        user => user !== currentUser.id
      );
      newContactsId.length = 0;

      usersContactPending = users.filter(user =>
        newContactsIdUnique.includes(user.id)
      );
      newContactsIdUnique.length = 0;

      break;
    case 'block':
      // Tìm những ng mà bạn đã chặn: userId || contact = currenId, status=false, block
      newContacts = contacts.filter(contact => {
        return (
          (contact.userId === currentUser.id ||
            contact.contactId === currentUser.id) &&
          contact.block === true
        );
      });
      for (const contact of newContacts) {
        newContactsId.push(contact.contactId, contact.userId);
      }
      // xóa các userId trùng lặp và userId của mình
      newContactsIdUnique = [...new Set(newContactsId)].filter(
        user => user !== currentUser.id
      );
      newContactsId.length = 0;

      usersContactBlock = users.filter(user =>
        newContactsIdUnique.includes(user.id)
      );
      newContactsIdUnique.length = 0;
      break;
    default:
      newContacts = contacts.filter(contact => {
        return (
          contact.userId !== currentUser.id ||
          contact.contactId !== currentUser.id
        );
      });
      for (const contact of newContacts) {
        newContactsId.push(contact.contactId, contact.userId);
      }
      usersOtherAll = users.filter(
        user => !newContactsId.includes(user.id)
      );
      newContactsId.length = 0;
  }

  // Đêm số user tại tab active
  const counterContact =
    (usersContactOn && usersContactOn.length) ||
    (usersContactAll && usersContactAll.length) ||
    (usersContactPending && usersContactPending.length) ||
    (usersContactBlock && usersContactBlock.length) ||
    0;

  return html` <div class="friend-box">
    <div class="${navOn.type === 'add' && 'add-contact-box'}">
      <!-- form search -->
      <button
        id="search-contact"
        class="form search-group-form btn btn-block p-0 my-2 w-100-mobile d-none"
      >
        <input
          type="text"
          class="form-control w-100"
          autofocus
          placeholder="Tìm kiếm bạn bè..."
        />
        <span class="btn search-icon btn-primary"
          >Tìm kiếm</i
        ></span>
      </button>

      <!-- Title  -->
      <div class="title mb-2 ${!counterContact && 'd-none'}">
        <span class="text-color">Tất cả bạn bè -</span>
        <span class="text-color contact-counter"
          >${!!counterContact && counterContact}</span
        >
      </div>
      <div
        class="contact-null text-đanger rounded fw-500 text-center text-xl py-6 ${
          counterContact && 'd-none'
        }"
      >
        <span class="text-color">Danh sách trống</span>
      </div>
    </div>
    <ul class="list-contact">
      ${
        usersContactOn &&
        usersContactOn.map(
          user => `${UserTableCell({ user, navOn })}`
        )
      }
      ${
        usersContactAll &&
        usersContactAll.map(
          user => `${UserTableCell({ user, navOn })}`
        )
      }
      ${
        usersContactPending &&
        usersContactPending.map(
          user => `${UserTableCell({ user, navOn })}`
        )
      }
      ${
        usersContactBlock &&
        usersContactBlock.map(
          user => `${UserTableCell({ user, navOn })}`
        )
      }
      ${
        navOn.type === 'add' &&
        usersOtherAll.map(
          user => `${UserTableCell({ user, navOn })}`
        )
      }
    </ul>
  </div>`;
}

export default connector(UserTable);
