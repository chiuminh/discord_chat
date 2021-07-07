import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
import SideBarFooter from '../../SideBarFooter.js';
import SideBarItem from './SideBarItem.js';
import SideBarContentTop from './SideBarContentTop.js';

const connector = connect(state => ({
  currentUser: state.currentUser,
  typesServer: state.typesServer,
  toPage: state.toPage,
}));

function SideBar({ currentUser, typesServer, toPage }) {
  return html`
    <section
      class="sidebar hide-on-mobile hide-on-tablet"
      style="width: 240px"
    >
      ${SideBarContentTop({ toPage })}
      <div class="sidebar-content p-2">
        <ul class="sidebar-list">
          ${typesServer.map(type => `${SideBarItem({ type })}`)}
        </ul>
      </div>

      ${SideBarFooter({ currentUser })}
    </section>
  `;
}

export default connector(SideBar);
