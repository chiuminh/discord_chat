import html from '../../../library/core.js';
import UserTable from './UserTable.js';
import ChatBox from './ChatBox.js';
import Notification from './Notification.js';
import UserGroup from './UserGroup.js';

function Content({ toPage }) {
  return html` <div
    class="flex-between align-items-start"
    id="main-container"
  >
    <div class="flex-1 nav-content px-4 py-4">
      <!--  page contact -->
      ${toPage.isContact && UserTable()}

      <!-- page chat -->
      ${toPage.isChat && ChatBox()}
    </div>

    <!-- contact left -->
    <div class="action-contact-left hide-on-sm-md-lg">
      ${toPage.isContact && Notification()}
      ${toPage.isContact && UserGroup()}
    </div>
  </div>`;
}

export default Content;
