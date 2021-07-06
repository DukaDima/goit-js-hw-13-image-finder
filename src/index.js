// список импорта------------------------------
import 'regenerator-runtime/runtime'
import './sass/main.scss';
import imagesList from './templates/imagesList.hbs'
import ImagesService from './apiService.js'

const imageFetcher = new ImagesService();

const refs = {
    wrapper: document.querySelector('.wrapper'),
    searchForm: document.getElementById('search-form'),
    loadMoreBtn: document.querySelector('.load-more-button'),
    gallery: document.querySelector('.images-gallery'),
    controlButton: document.querySelector('.control-button'),
    resetButton: document.querySelector('.reset-button'),
    input: document.getElementsByTagName('input')

}

console.log(refs.resetButton)
console.log(refs.input)

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.resetButton.addEventListener('click', onReset);

let searchQuery =''
let pageCounter = 1;
refs.controlButton.style.display="none"

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
    refs.controlButton.style.display = ""
    scrollToLoadMoreButton()
}

function clearGallery() {
    refs.wrapper.innerHTML = ''
    refs.controlButton.style.display="none"
 }
function renderGallery(data) {
    const imagesGallery = imagesList(data)
    
    refs.wrapper.insertAdjacentHTML('beforeend', imagesGallery)
  
}

async function onLoadMore() {
    pageCounter += 1;
    let resultList = await imageFetcher.fetchImages(searchQuery, pageCounter)
    
    renderGallery(resultList)
     scrollToLoadMoreButton()
    
}

function scrollToLoadMoreButton() {
     
     refs.loadMoreBtn.scrollIntoView({
     behavior: 'smooth',
     block: 'end',
    });
 }

function onReset(element) {
    clearGallery();
    refs.input.query.value=''
 }
