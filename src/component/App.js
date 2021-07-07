import html from '../library/core.js';
import { connect } from '../library/store.js';
import ScrollerList from '../component/scroller/ScrollerList.js';
import ModalAddServer from '../component/modal/ModalAddServer.js';
import ModalNextAddServer from '../component/modal/ModalNextAddServer.js';
import ModalFinalAddServer from '../component/modal/ModalFinalAddServer.js';

import MainExplore from '../component/explore/Main.js';
import MainContact from '../component/contacts/Main.js';

function App({ toPage }) {
  return html`
    <div class="app bg-dark-light">
      ${ScrollerList()} ${ModalAddServer()} ${ModalNextAddServer()}
      ${ModalFinalAddServer()} ${toPage.isExplore && MainExplore()}
      ${(toPage.isContact || toPage.isChat) &&
      MainContact({ toPage })}
    </div>
  `;
}

export default connect()(App);
