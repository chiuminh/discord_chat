import html from '../../../library/core.js';
import { connect } from '../../../library/store.js';
import FormSearch from './FormSearch.js';
import Card from './Card.js';
import Footer from './Footer.js';

const connector = connect(state => ({
  typesServer: state.typesServer,
  serverGroupsItems: state.serverGroupsItems,
  searchResults: state.searchResults,
}));

function Index({ typesServer, serverGroupsItems, searchResults }) {
  const typesServerActive = typesServer.find(type => type.isActive);
  const serverGroupsItemsActive = serverGroupsItems.filter(
    server => {
      return typesServerActive.id == server.typeId;
    }
  );
  const groups =
    searchResults[0] ||
    (serverGroupsItemsActive.length
      ? serverGroupsItemsActive
      : serverGroupsItems);
  console.log('groups: ', groups);
  return html`
    <div
      class="flex-1 grid cols-3 mt-8 pe-8 ms-8 gap-3"
      style="overflow: auto;max-height: 90vh; "
    >
      <!-- banner search -->
      ${FormSearch(typesServerActive)}
      <div class="col-3 mt-4">
        <h6
          class="text-xl text-white fw-500 ${groups.length === 0 &&
          'd-none'}"
        >
          Cộng đồng nổi bật
        </h6>
        <h6
          class="text-đanger bg-white rounded fw-500 text-center text-xl ${groups.length >
            0 && 'd-none'}"
          style="margin: -60px 0; padding: 20px;"
        >
          Máy chủ bạn đang tìm kiếm không tồn tại!!!
        </h6>
      </div>
      <!-- card -->
      ${groups.map(group => `${Card({ group })}`)}
      <!-- footer -->
      ${groups.length > 0 && Footer()} ;
    </div>
  `;
}

export default connector(Index);
