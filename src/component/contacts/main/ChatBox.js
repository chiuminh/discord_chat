import html from '../../../library/core.js';

function ChatBox() {
  return html`<div class="chat-box bg-dark-input">
    <div class="content">
      <div class="avatar-small">
        <img src="../assets/images/boy.png" alt="" />
        <span class="dot dot-light"></span>
      </div>
    </div>
  </div> `;
}

export default ChatBox;
