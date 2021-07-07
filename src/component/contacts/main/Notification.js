import html from '../../../library/core.js';

function Notification() {
  return html` <div class="d-block">
    <h6 class="text-xl text-white fw-800 mt-2 mb-8">
      Đang Hoạt Động
    </h6>
    <div class="list-action px-6">
      <span class="d-block text-base text-white text-center"
        >Hiện tại không có cập nhập nào mới cả..</span
      >
      <p class="desc text-color fw-300 text-center text-xs">
        Nếu bạn bè của bạn có hoạt động mới, ví dụ như chơi game
        hoặc trò chuyện thoại, chúng tôi sẽ hiển thị hoạt động đó ở
        đây
      </p>
    </div>
  </div>`;
}

export default Notification;
