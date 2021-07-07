const getUsersFromApi = async () => {
  const { data } = await axios.get('http://localhost:3000/users');
  return data;
};

const users = await getUsersFromApi();

function getUsers() {
  return users;
}

function deleteUser(id) {
  users = users.filter(user => user.id !== id);
  return users;
}

function updateUsername(id, username) {
  user = users.find(user => user.id === id);
  if (user) {
    user.username = username;
  }
}
function getUserById(id) {
  return users.find(user => user.id === id);
}

function updatePassword(id, password) {
  user = users.find(user => user.id === id);
  if (user) {
    user.password = password;
  }
}

export {
  getUsers,
  deleteUser,
  updatePassword,
  updateUsername,
  getUserById,
};
