import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const AUTHORIZATION_KEY = '24546966-219b7c8a93fb57671facbb43b';
export default class apiService {
  constructor() {
    this.searchData = '';
    this.page = 1;
  }
  async getImages() {
    const response = await axios.get(
      `?key=${AUTHORIZATION_KEY}&orientation=horizontal&safesearch=true&image_type=photo&q=${this.searchData}&page=${this.page}&per_page=40`,
    );
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }
  get data() {
    return this.searchData;
  }
  set data(newData) {
    this.searchData = newData;
  }
}
