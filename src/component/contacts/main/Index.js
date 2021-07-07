import html from '../../../library/core.js';
import NavBarContact from './NavBarContact.js';
import Content from './Content.js';

function Index({ toPage }) {
  return html`<div class="flex-1 d-flex flex-column">
    ${NavBarContact()} ${Content({ toPage })}
  </div>`;
}

export default Index;
