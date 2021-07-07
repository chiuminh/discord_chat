import html from '../../library/core.js';
import { connect } from '../../library/store.js';
const connector = connect(state => ({
  templates: state.templates,
}));
function TemplateServer({ template }) {
  return html`
    <button
      class="btn btn-group-lg btn-light border modal-body-button ${template.hide &&
      'd-none'}"
      onclick="dispatch('nextAddServer', 
            'idJoinServer: ${template.idJoinServer}',
            'idTemplate: ${template.id}'
        )"
    >
      <span class="img-box">
        <img src="../assets/images/${template.image}" alt="" />
      </span>
      <div class="text-box">
        <span>${template.name}</span>
      </div>
      <span class="icon-box">
        <i class="fas fa-chevron-right"></i>
      </span>
    </button>
    ${template.option === 'ignore' &&
    html`
      <div class="my-4 text-center">
        <small class="fw-300">
          Bạn không chắc? Bạn có thể tạm thời
          <span
            class="text-link"
            onclick="dispatch('nextAddServer',
                        'idJoinServer: ${template.idJoinServer}',
                        'idTemplate: ${template.id}'
                    )"
            >bỏ qua câu hỏi này </span
          >.
        </small>
      </div>
    `}
    ${template.option === 'header' &&
    html`
      <div class="option-header my-3">
        <span>BẮT ĐẦU TỪ MẪU</span>
      </div>
    `}
  `;
}

export default connector(TemplateServer);
