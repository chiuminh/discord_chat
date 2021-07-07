const contactUrl = 'http://localhost:3000/contacts';
const getContactsFromApi = async () => {
  const { data } = await axios.get(contactUrl);
  return data;
};

const getNavContentApi = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/navContent'
  );
  return data;
};

const addNewContactApi = item => {
  fetch(contactUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
    .then(res => res.json())
    .then(data => data);
};

const updateContactApi = async (id, item) => {
  const { data } = await axios.put(`${contactUrl}/${id}`, item);
  return data;
};

const navContents = await getNavContentApi();
const contacts = await getContactsFromApi();

function getContacts() {
  return contacts;
}
function addNewContact(item) {
  return addNewContactApi(item);
}

function updateContact(id, item) {
  return updateContactApi(id, item);
}

function getNavContent() {
  return navContents;
}

export { getNavContent, getContacts, addNewContact, updateContact };
