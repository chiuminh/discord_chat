import { getUsers, getUserById } from '../services/users.js';
import { getServers } from '../services/server.js';
import { getJoinServers } from '../services/joinServer.js';
import { getTemplates } from '../services/templates.js';
import {
  getNavContent,
  getContacts,
  addNewContact,
  updateContact,
} from '../services/Contact.js';
import { getServerGroupsItems } from '../services/serverGroupsItems.js';
import { getTypesServer } from '../services/typeServerGroups.js';

const userIdLogin = 1;

const init = {
  currentUser: getUserById(userIdLogin),
  users: getUsers(),
  navContent: getNavContent(),
  contacts: getContacts(),
  addNewContact: item => addNewContact(item),
  updateContact: (id, item) => updateContact(id, item),
  servers: getServers(userIdLogin),
  joinServers: getJoinServers(),
  templates: getTemplates(),
  serverGroupsItems: getServerGroupsItems(),
  typesServer: getTypesServer(),
  chatRooms: [],
  filterUserChat: {
    user: (userId, users) => users.find(user => user.id === userId),
    group: (groupId, users) =>
      users.filter(user => groupId.includes(user.id)),
    server: (serverId, servers) =>
      servers.find(server => serverId === server.id),
  },
  searchResults: [],
  toPage: {
    isExplore: false,
    isContact: true,
    isChat: false,
  },
  groups: [{ id: 1, name: 'Linh, Tan, Thao...' }],
};

const actions = {
  switchServer({ servers, toPage }, index) {
    if (index[0] == 0) {
      toPage.isContact = true;
      toPage.isChat = false;
      toPage.isExplore = false;
    } else {
      toPage.isContact = false;
      toPage.isChat = true;
      toPage.isExplore = false;
    }
    servers.find(server => server.status).status = false;
    servers[index].status = true;
  },
  openExplore({ toPage }) {
    toPage.isExplore = true;
    toPage.isChat = false;
    toPage.isContact = false;
  },
  switchPageChat({ toPage, chatRooms }, args) {
    toPage.isContact = false;
    toPage.isChat = true;
    toPage.isExplore = false;
    chatRooms.unshift([...args]);
    chatRooms.length > 1 && chatRooms.pop();
  },
  switchPageContact({ toPage }) {
    toPage.isContact = true;
    toPage.isChat = false;
    toPage.isExplore = false;
  },
  openModalAddServer({ joinServers }) {
    const createServer = joinServers.find(join => join.create);
    createServer.hide = false;
  },
  closeModalAddServer({ joinServers }) {
    const createServer = joinServers.find(join => !join.hide);
    createServer.hide = true;
  },
  nextAddServer({ joinServers }, args) {
    // args:  array string
    // ["idJoinServer: idJoinServer", "idTemplate: idJoinServer"]
    const idJoinServer = parseInt(args[0].split(':')[1].trim());
    const idTemplate = parseInt(args[1].split(':')[1].trim());

    const currentPage = joinServers.find(
      join => join.id === idJoinServer
    ).currentPage;
    const createServer = joinServers.find(join => !join.hide);
    createServer.hide = true;
    if (idTemplate) {
      joinServers.find(
        join => join.id === currentPage + 1
      ).hide = false;
    }
  },
  prevAddServer({ joinServers }, numberPage) {
    const createServer = joinServers.find(join => !join.hide);
    createServer.hide = true;
    joinServers.find(
      join => join.id === numberPage - 1
    ).hide = false;
    idTemplatesCreate.pop();
  },
  finishedCreateServer({ joinServers }, formValues) {
    const createServer = joinServers.find(join => !join.hide);
    createServer.hide = true;
    const avatar = formValues[0].avatarServer
      ? formValues[0].avatarServer.name
      : null;
    axios({
      method: 'post',
      url: 'http://localhost:3000/servers',
      data: {
        userId: 1,
        name: formValues[0].nameServer,
        avatar: avatar,
        separeate: false,
        status: false,
        myServer: true,
        hide: false,
        idTemplatesCreate: idTemplatesCreate,
      },
    });

    idTemplatesCreate.length = 0;

    // servers.splice(1, 0,
    //   {
    //     id: servers.length,
    //     name: formValues[0].nameServer,
    //     avatar: avatar,
    //     separeate: false,
    //     status: false,
    //     myServer: true,
    //     hide: false,
    //   }
    // )
  },
  switchExplore({ typesServer, searchResults }, [id]) {
    typesServer.find(type => type.isActive).isActive = false;
    typesServer.find(type => type.id === id).isActive = true;
    searchResults.length = 0;
  },
  search({ searchResults, serverGroupsItems }, value) {
    searchResults.length = 0;
    searchResults.push(
      serverGroupsItems.filter(server => {
        return server.title
          .toLowerCase()
          .includes(value[0].toLowerCase());
      })
    );
  },
  switchContact({ navContent }, [id]) {
    navContent.find(item => item.active).active = false;
    navContent.find(item => item.id == id).active = true;
  },
  removeBlockContact({ contacts }, [id]) {
    contacts.find(
      contact =>
        (contact.userId === +id || contact.contactId === +id) &&
        contact.block
    ).block = false;
  },
  /**
  //  * cancelAddContact
   * @param {number} id  //contact.contactId
   */
  async removeContactByContactId({ contacts, currentUser }, [id]) {
    let contactId = contacts.find(
      contact =>
        (contact.userId === currentUser.id &&
          contact.contactId === +id) ||
        (contact.userId === +id &&
          contact.contactId === currentUser.id)
    ).id;

    // Call API
    console.log(contactId);
  },
  async approveAddContact(
    { contacts, currentUser, updateContact },
    [id]
  ) {
    let contactId = contacts.find(
      contact =>
        (contact.userId === currentUser.id &&
          contact.contactId === +id) ||
        (contact.userId === +id &&
          contact.contactId === currentUser.id)
    ).id;
    let newContact = {
      ...contacts.find(contact => contact.id === contactId),
      status: true,
    };
    await updateContact(contactId, newContact);
  },
  async addContact({ contacts, currentUser }, [id]) {
    const newContact = {
      id: contacts.length + 1,
      contactId: +id,
      userId: currentUser.id,
      status: false,
      block: false,
    };
    await addNewContact(newContact);
  },
};

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, args);
  return state;
}
