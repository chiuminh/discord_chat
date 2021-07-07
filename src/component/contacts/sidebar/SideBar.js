import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
import SideBarFooter from '../../SideBarFooter.js';
import SideBarItem from './SideBarItem.js';
import SideBarContentTop from './SideBarContentTop.js';
import SideBarSearch from './SideBarSearch.js';

const connector = connect(state => ({
  currentUser: state.currentUser,
  contacts: state.contacts,
  users: state.users,
}));

function SideBar({ currentUser, users, contacts }) {
  let usersContactAll;
  let newContactsId = [];
  let newContacts;
  let newContactsIdUnique = [];
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
  usersContactAll = users.filter(user =>
    newContactsIdUnique.includes(user.id)
  );

  return html`
    <section
      class="sidebar hide-on-mobile hide-on-tablet"
      style="width: 240px"
    >
      ${SideBarSearch()}
      <div class="sidebar-content p-2">
        ${SideBarContentTop()}
        <ul class="list-friend">
          <li class="sidebar-item">
            <div class="sidebar-text mt-4 mb-2 pe-2 flex-between">
              <span class="ps-3 title">TIN NHẮN TRỰC TIẾP</span>
              <span class="text-xl cursor-pointer">&#43;</span>
            </div>
          </li>
          ${usersContactAll &&
          usersContactAll.map(user => `${SideBarItem({ user })}`)}
        </ul>
      </div>
      ${SideBarFooter({ currentUser })}
    </section>
  `;
}

export default connector(SideBar);
