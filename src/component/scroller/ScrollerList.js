import html from '../../library/core.js'
import ScrollerItem from './ScollerItem.js'
import { connect } from '../../library/store.js'

function ScrollerList() {
  return html`
    <section class="scroller">
      <ul class="scroller-list">
          ${ScrollerItem()}
      </ul>
    </section>
  `
}

export default connect()(ScrollerList)
