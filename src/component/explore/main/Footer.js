import html from '../../../library/core.js';

export default function Footer() {
  return html`
    <div class="col-3">
      <div class="d-flex flex-column flex-center my-2">
        <i class="fas fa-compass text-3xl text-primary"></i>
        <h6
          class="fw-500 text-white text-center text-base mt-3 mb-1"
        >
          Có rất nhiều cộng đồng ở ngoài kia!
        </h6>
        <span class="text-link text-sm">Hãy thử tìm kiếm xem</span>
      </div>
    </div>
  `;
}
