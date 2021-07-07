import html from '../../../library/core.js';

const icons = {
  ho: '<i class="fas fa-compass text-xl text-white"></i>',
  mu: '<i class="fas fa-music"></i>',
  ed: '<i class="fas fa-graduation-cap"></i>',
  ga: '<i class="fab fa-steam"></i>',
  sc: '<i class="fab fa-reacteurope"></i>',
  en: '<i class="fas fa-film"></i>',
};
function SideBarItem({ type }) {
  const title = type.title[0].toUpperCase() + type.title.slice(1);
  const keyIcon = type.title.slice(0, 2);
  return html`
    <li class="sidebar-item ${type.isActive && 'active'}">
      <button
        class="btn btn-primary btn-group justify-start align-items-start"
        onClick="dispatch('switchExplore', '${type.id}')"
      >
        ${icons[keyIcon]}
        <span class="ps-3 title text-white">${title}</span>
      </button>
    </li>
  `;
}

export default SideBarItem;
