import handleApiRequest from './Api';

const fetchRepositories = async (inputValue) => {
  const apiUrl = `/search/repositories?q=${inputValue}&per_page=6`;
  return handleApiRequest(apiUrl);
};

export default fetchRepositories;
