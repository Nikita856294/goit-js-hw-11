import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import axios from 'axios';
import Api from './api.js';
import { refs } from './refs.js';

refs.form.addEventListener('submit', submitForm);

function renderImagesAll(images) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function submitForm(e) {
  inputValue = form.elements;
}
