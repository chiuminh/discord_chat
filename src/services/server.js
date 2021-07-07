const getServersFromApi = async () => {
  const { data } = await axios.get('http://localhost:3000/servers');
  return data;
};
const servers = await getServersFromApi();
function getServers(userId) {
  return servers.filter(
    server => server.userId === userId || !server.userId
  );
}
function createServer(nameServer, avatar) {
  servers.splice(1, 0, {
    id: servers.length.toString(),
    name: nameServer,
    avatar: avatar,
    separeate: false,
    status: false,
    myServer: true,
    hide: false,
  });
}

function deleteserver(id) {
  servers = servers.filter(server => server.id !== id);
  return servers;
}

function updateServername(id, servername) {
  server = servers.find(server => server.id === id);
  if (server) {
    server.servername = servername;
  }
}

export { getServers, createServer, deleteserver, updateServername };
