import html from '../../library/core.js';
import { connect } from '../../library/store.js';

const connector = connect(state => ({ servers: state.servers }));

function ScrollerItem({ servers }) {
  return html`
    <div style="max-height: 440px; overflow-y: auto">
      ${servers.map(
        (server, index) => html`
          <li
            class="scroller-item ${server.status && 'active'} 
                ${!server.myServer && 'active-group'}"
          >
            <a
              class="box"
              onclick="dispatch('switchServer', ${index})"
            >
              ${server.avatar
                ? html`<img
                    src="../assets/images/${server.avatar}"
                    alt="${server.name[0].toUpperCase()}"
                  />`
                : `${server.name[0].toUpperCase()}`}

              <p class="scroller-item-name">${server.name}</p>
            </a>
          </li>

          ${server.separeate &&
          html` <span class="seperate mb-2"><span></span></span>`}
        `
      )}
    </div>
    <li class="scroller-item">
      <a
        class="box bg-green"
        onclick="dispatch('openModalAddServer')"
      >
        <p class="scroller-item-name">Thêm máy chủ</p>
        <span><i class="fas fa-plus"></i></span>
      </a>
    </li>
    <li class="scroller-item">
      <a class="box bg-green" onClick="dispatch('openExplore')">
        <p class="scroller-item-name">Khám phá</p>
        <span><i class="fas fa-compass"></i></span>
      </a>
    </li>

    <span class="seperate mb-2"><span></span></span>
    <li class="scroller-item">
      <a class="box bg-green">
        <p class="scroller-item-name">Tải ứng dụng</p>
        <span><i class="fas fa-arrow-down"></i></span>
      </a>
    </li>
  `;
}

export default connector(ScrollerItem);
