import html from '../../library/core.js'
import { connect } from '../../library/store.js'
import TemplateServer from './TemplateServer.js'

const connector = connect(state => ({ joinServers: state.joinServers, templates: state.templates }))

function ModalNextAddServer({ joinServers, templates }) {
    const createServer = joinServers.find(joinServer => joinServer.id === 2) || ''
    templates = templates.filter(template => template.idJoinServer === 2) || ''
    return html`
      <section class="modal ${createServer.hide && 'd-none'}">
          <div class="modal-dialog">
            <div class="modal-close-dialog" onclick="dispatch('closeModalAddServer')">&times;</div>
            <div class="modal-content">
                <div class="modal-title text-center">
                    <h3 class="main">${createServer.title}</h3>
                    <div class="sub">${createServer.subTitle}
                    </div>
                </div>
                <div class="modal-body" style="overflow-y: auto; max-height: 300px; padding: 0 8px;">
                    ${templates.map((template, index) => TemplateServer({ template, index }))}
                </div>
            </div>
            <div class="modal-footer">
                 <div class="flex-between">
                        <span class="cursor-pointer fw-300"
                            onclick="dispatch('prevAddServer', ${createServer.currentPage})"
                        >Trở lại</span>
                    </div>
              </div>
          </div>
      </section>
  `
}

export default connector(ModalNextAddServer)
