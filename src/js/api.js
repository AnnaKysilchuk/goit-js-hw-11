import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '12026790-4d5cc9bbcb714fa6b48cd35d3';
        
export default class ImgApiService {
    constructor() {
        this.toSearch = '';
        this.page = 1;
    }

    async fetchImgCards() {
        const dataObj = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.toSearch}&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`)
        this.page += 1;

        return dataObj;
    }

    resetPage() {
        this.page = 1;
    }

    get search() {
        return this.toSearch;
    }

    set search(newSearch) {
        this.toSearch = newSearch;
    }
}