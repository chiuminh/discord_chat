import html from '../../../library/core.js';

function UserGroup() {
  return html`<section
    class="d-none sidebar-group-chat sidebar hide-on-mobile hide-on-tablet"
  >
    <div class="sidebar-content p-2">
      <!-- list friend -->
      <ul class="list-friend">
        <li class="sidebar-item">
          <div class="sidebar-text mt-4 mb-2 pe-2 flex-between">
            <span class="ps-3 title">TIN NHẮN TRỰC TIẾP</span>
            <span class="text-xl cursor-pointer">&#43;</span>
          </div>
        </li>
        <li class="sidebar-item">
          <button
            class="btn btn-group p-1 pe-2 justify-start align-items-start"
          >
            <div class="avatar-small">
              <img
                src="../assets/images/avatar-group-default.png"
                alt=""
              />
              <span class="dot dot-light"></span>
            </div>
            <span class="ps-3 text-start flex-1">minh</span>
            <span class="d-none text-xl">&times;</span>
          </button>
        </li>
        <li class="sidebar-item">
          <button
            class="btn btn-group p-1 pe-2 justify-start align-items-start"
          >
            <div class="avatar-small">
              <img src="../assets/images/boy.png" alt="" />
              <span class="dot"></span>
            </div>
            <span class="ps-3 text-start flex-1">minh</span>
            <span class="d-none text-xl">&times;</span>
          </button>
        </li>
        <li class="sidebar-item">
          <button
            class="btn btn-group p-1 pe-2 justify-start align-items-start"
          >
            <div class="avatar-small">
              <img src="../assets/images/boy.png" alt="" />
              <span class="dot"></span>
            </div>
            <span class="ps-3 text-start flex-1">minh</span>
            <span class="d-none text-xl">&times;</span>
          </button>
        </li>
      </ul>
    </div>
  </section>`;
}

export default UserGroup;
