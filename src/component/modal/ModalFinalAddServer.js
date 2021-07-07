import html from '../../library/core.js';
import { connect } from '../../library/store.js';

const connector = connect(state => ({
  joinServers: state.joinServers,
  templates: state.templates,
}));

function ModalFinalAddServer({ joinServers }) {
  const addServer =
    joinServers.find(joinServer => joinServer.id === 3) || '';
  return html`
    <section class="modal ${addServer.hide && 'd-none'}">
      <div class="modal-dialog">
        <div
          class="modal-close-dialog"
          onclick="dispatch('closeModalAddServer')"
        >
          &times;
        </div>
        <div class="modal-content">
          <div class="modal-title text-center">
            <h3 class="main">${addServer.title}</h3>
            <div class="sub">${addServer.subTitle}</div>
          </div>
          <div
            class="modal-body"
            style="overflow-y: auto; max-height: 300px; padding: 0 8px;"
          >
            <form
              class="form-create-server"
              id="submit-create-server"
              onsubmit="submitCreateServer()"
            >
              <div class="form-group flex-center">
                <label
                  for="avatar-server"
                  class="cursor-pointer"
                  id="upload-avatar"
                >
                  <div
                    class="upload-avatar-img"
                    onchange="updateAvatar()"
                  >
                    <img
                      src="../assets/images/photo-camera.svg"
                      id="group-avatar"
                      alt=""
                      onchange="updateAvatar()"
                    />
                  </div>
                </label>
                <input
                  hidden
                  type="file"
                  name="avatarServer"
                  id="avatar-server"
                  onchange="updateAvatar()"
                />
                <span class="form-message">Ảnh đại diện</span>
              </div>
              <div class="form-group">
                <label for="nameServer">Tên Máy Chủ</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Ex: Lofi Girl"
                  name="nameServer"
                  value="${addServer.nameGroup}"
                  oninput="oninputCreateServer()"
                  onblur="onblurCreateServer()"
                />
                <span class="form-message"></span>
              </div>
            </form>
          </div>
        </div>
        <div class="my-4 text-center">
          <small class="fw-300 px-2 d-block">
            Khi tạo máy chủ, nghĩa là bạn đã đồng ý với
            <span class="text-link">Nguyên Tắc Cộng Đồng</span> của
            Discord.
          </small>
        </div>
        <div class="modal-footer">
          <div class="flex-between">
            <span
              class="cursor-pointer fw-300"
              onclick="dispatch('prevAddServer', ${addServer.currentPage})"
              >Trở lại</span
            >
            <button
              type="button"
              id="finished-create-server"
              class="btn btn-primary ${addServer.disabledBtnSubmit &&
              'disabled'}"
              onclick="dispatch('finishedCreateServer', submitCreateServer())"
            >
              Tạo
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export default connector(ModalFinalAddServer);
