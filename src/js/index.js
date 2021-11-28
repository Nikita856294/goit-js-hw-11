import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import axios from 'axios';
import Api from './api.js';
import { refs } from './refs.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const AUTHORIZATION_KEY = '24546966-219b7c8a93fb57671facbb43b';
axios.defaults.baseURL = 'https://pixabay.com/api';
const apiService = new Api();
refs.form.addEventListener('submit', submitForm);
refs.buttonLoad.addEventListener('click', onClickButtonLoad);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function submitForm(e) {
  e.preventDefault();

  apiService.data = e.currentTarget.elements.searchQuery.value;
  if (apiService.data === '') {
    return Notiflix.Notify.warning('Enter your search query,please!');
  }
  onCloseButtonLoad();
  apiService.resetPage();
  apiService
    .getImages()
    .then(data => {
      return (refs.buttonLoad.disabled = false), infoUsers(data), renderImagesAll(data);
    })
    .catch(error => console.log(error));
  clearGallery();
}
async function onClickButtonLoad(images) {
  apiService.incrementPage();
  apiService.decrementPage();
  apiService
    .getImages()
    .then(data => renderImagesAll(data))
    .catch(error => console.log(error));
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function renderImagesAll(images) {
  if (images.data.totalHits < 1) {
    onCloseButtonLoad();
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again',
    );
  }
  if (images.data.hits.length < 40) {
    onCloseButtonLoad();
    return Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
  }
  renderImages(images);
}
function renderImages(images) {
  const markup = images.data.hits
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<div class="photo-card">
    <a href="${largeImageURL}"><img class="photo-img"src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes:${likes}</b>
      </p>
      <p class="info-item">
        <b>Views:${views}</b>
      </p>
      <p class="info-item">
        <b>Comments${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:${downloads}</b>
      </p>
    </div>
  </div>`,
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.on('show.simplelightbox');
  lightbox.refresh();
  onShowButtonLoad();
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onShowButtonLoad() {
  refs.buttonLoad.classList.remove('is-hidden');
}
function onCloseButtonLoad() {
  refs.buttonLoad.classList.add('is-hidden');
}
function infoUsers(images) {
  if (images.data.totalHits > 1) {
    Notiflix.Notify.success(`"Hooray! We found ${images.data.totalHits} images."`);
  }
}
