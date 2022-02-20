import './css/styles.css';
import ImgApiService from './js/api';
import imgCardTpl from './templates/image-card.hbs';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    imgContainer: document.querySelector('.gallery'),
}
const imgApiService = new ImgApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
refs.imgContainer.addEventListener('click', onImgContainerClick);

async function onSearch(event) {
    event.preventDefault();

    clearImageContainer();
    imgApiService.search = event.currentTarget.elements.searchQuery.value.trim();
    imgApiService.resetPage();

    try {
        const dataObj = await imgApiService.fetchImgCards();
        const imgsSearch = dataObj.data.hits;

        if (imgsSearch.length === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

        } else {
            renderImageCards(imgsSearch);
            Notiflix.Notify.success(`Hooray! We found ${dataObj.data.total} images.`);
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function onLoadMoreClick() { 
    const dataObj = await imgApiService.fetchImgCards();
    const imgsSearch = dataObj.data.hits;

    if (imgsSearch.length < 20) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtn.classList.add('is-hidden');
    } else {
        renderImageCards(imgsSearch);
    }
}

function renderImageCards(hits) {
    refs.imgContainer.insertAdjacentHTML('beforeend', imgCardTpl(hits));refs.loadMoreBtn.classList.remove('is-hidden');
}

function clearImageContainer() {
    refs.imgContainer.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden');
}

function onImgContainerClick(event) {
    event.preventDefault();
    let gallery = new SimpleLightbox('.gallery a');
}
