import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
import NavBarItemContactContent from './NavBarItemContactContent.js';

const connector = connect(state => ({
  navContent: state.navContent,
}));

function NavBarItemContact({ navContent }) {
  return html` <div class="nav-item  flex-1 flex-start">
    <div class="nav-item  flex-1 flex-start">
      ${navContent.map(
        item => `${NavBarItemContactContent({ item })}`
      )}
    </div>
  </div>`;
}

export default connector(NavBarItemContact);
