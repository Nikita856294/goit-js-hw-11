import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const AUTHORIZATION_KEY = '24546966-219b7c8a93fb57671facbb43b';

export default async function getImages(data) {
  const response = await axios.get(
    `?key=${AUTHORIZATION_KEY},orientation=horizontal,safesearch=true,image_type=photo,q=${data}`,
  );
  return response.json();
}
