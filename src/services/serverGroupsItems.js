const getServerGroupsItemsApi = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/serverGroupsItems'
  );
  return data;
};
const serverGroups = await getServerGroupsItemsApi();

function getServerGroupsItems() {
  return serverGroups;
}

export { getServerGroupsItems };
