import html from '../../../library/core.js';

function NavBarItemRight() {
  return html` <div
    class="nav-item flex-end hide-on-sm-md-lg"
    style="min-width: 280px;"
  >
    <!-- add chat -->
    <div class="btn-sm text-color me-6">
      <i class="fas fa-comment-alt-plus"></i>
    </div>

    <!-- notifications -->
    <div class="btn-sm text-color ms-4">
      <i class="far fa-bell"></i>
    </div>

    <div class="btn-sm text-color">
      <i class="fas fa-question-circle"></i>
    </div>
  </div>`;
}

export default NavBarItemRight;
