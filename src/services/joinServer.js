const getJoinServersFromApi = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/joinServers'
  );
  return data;
};
const joinServers = await getJoinServersFromApi();

function getJoinServers() {
  return joinServers;
}

export { getJoinServers };
