import html from '../../../library/core.js';
export default function Card({ group }) {
  return html`
    <div class="col-1">
      <div class="card rounded-lg bg-dark">
        <div class="card-img rounded-top">
          <img src="../assets/images/${group.image}" alt="" />
          <div class="avatar-small">
            <img src="../assets/images/${group.avatar}" alt="" />
          </div>
        </div>
        <div
          class="card-body px-3 mt-6 d-flex flex-column justify-between"
        >
          <span class="name text-white text-base fw-500">
            <i class="text-primary fas fa-fire-alt pe-2"></i>
            ${group.title}
          </span>
          <div class="description flex-1 text-xs text-color mt-2">
            Welcome to Teyvat, Traveler! This is the place to
            discuss with others about your favorite game: Genshin
            Impact!
          </div>
          <div class="flex-start text-xs text-color">
            <div class="isActive">
              <span>
                <span class="dot dot-light"></span>
                ${group.memberOnline} trực tuyên</span
              >
            </div>
            <div class="member ps-3">
              <span>
                <span class="dot"></span>
                ${group.member} thành viên
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
