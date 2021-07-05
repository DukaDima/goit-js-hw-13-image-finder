// список импорта------------------------------
import 'regenerator-runtime/runtime'
import './sass/main.scss';

import { fetchImages } from './apiService.js'
import imagesList from './templates/imagesList.hbs'
import ImagesService from './apiService.js'
import { readFileSync } from 'fs';

const imageFetcher = new ImagesService();

const refs = {
    wrapper: document.querySelector('.wrapper'),
    searchForm: document.getElementById('search-form'),
    loadMoreBtn: document.querySelector('.load-more-button')

}
console.log(refs.loadMoreBtn)
console.log(refs.searchForm)

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

let searchQuery =''
let pageCounter = 1;

async function onSubmit(element) {
    element.preventDefault();

    searchQuery = element.currentTarget.elements.query.value || '';

    if (!searchQuery) {
      clearGallery()
     return
    }
   
    pageCounter = 1;
    let resultList = await imageFetcher.fetchImages(searchQuery, pageCounter);
    clearGallery ()
    renderGallery(resultList)

}

function clearGallery() {
      refs.wrapper.innerHTML =''
 }
function renderGallery(data) {
    const imagesGallery = imagesList(data)
    
    refs.wrapper.insertAdjacentHTML('beforeend', imagesGallery)
    console.log(imagesGallery)
}

async function onLoadMore() {
    pageCounter += 1;
    let resultList = await imageFetcher.fetchImages(searchQuery, pageCounter)
    
    renderGallery(resultList)
    
}