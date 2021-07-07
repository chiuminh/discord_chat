import html from '../../library/core.js';
import SideBar from './sidebar/SideBar.js';
import Index from './main/Index.js';

function Main({ toPage }) {
  return html`${SideBar()} ${Index({ toPage })}`;
}

export default Main;
