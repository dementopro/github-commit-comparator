import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

const handleApiRequest = async (url) => {
  try {
    const response = await api.get(url);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export default handleApiRequest;
