import html from '../../library/core.js';
import SideBar from './sidebar/SideBar.js';
import Index from './main/Index.js';

function Main() {
  return html` ${SideBar()} ${Index()} `;
}

export default Main;
