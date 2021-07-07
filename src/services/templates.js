const getTemplatesFromApi = async () => {
  const { data } = await axios.get(
    'http://localhost:3000/templates'
  );
  return data;
};
const templatesApi = await getTemplatesFromApi();

function getTemplates() {
  return templatesApi;
}

export { getTemplates };
