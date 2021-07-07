import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';

import NavBarItemContact from './NavBarItemContact.js';
import NavBarItemChat from './NavBarItemChat.js';
import NavBarItemRight from './NavBarItemRight.js';

const connector = connect(state => ({
  navContent: state.navContent,
  toPage: state.toPage,
}));

function NavBarContact({ toPage }) {
  return html` <div class="navigation">
    <nav class="flex-between border-bottom py-1 pe-4">
      <!-- Navbar contact -->
      ${toPage.isContact && NavBarItemContact()}
      <!-- Navbar chat -->
      ${toPage.isChat && NavBarItemChat()}
      <!-- Navbar right -->
      ${NavBarItemRight()}
    </nav>
  </div>`;
}

export default connector(NavBarContact);
