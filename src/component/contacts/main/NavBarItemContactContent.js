import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';

const connector = connect(state => ({
  navContent: state.navContent,
}));

function NavBarItemContactContent({ item }) {
  return html`
    <div
      onclick="dispatch('switchContact','${item.id}')"
      class="btn text-color ${item.active && 'active'} ${item.id ===
        'nav1' &&
      'hide-btn-1 cursor-default ms-4 text-white'} ${item.id ===
        'nav6' && 'py-0 px-1 btn-primary ms-3 text-white'}"
    >
      <i class="fas fa-child ${item.id !== 'nav1' && 'd-none'}"></i>
      <span class="ps-1 title text-capitalize"
        >${item.content}</span
      >
    </div>
  `;
}

export default connector(NavBarItemContactContent);
