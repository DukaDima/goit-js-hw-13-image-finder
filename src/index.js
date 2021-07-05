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
    gallery: document.querySelector('.images-gallery')

}

refs.searchForm.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore)

let searchQuery =''
let pageCounter = 1;
refs.loadMoreBtn.style.display="none"

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
    refs.loadMoreBtn.style.display=""
}

function clearGallery() {
    refs.wrapper.innerHTML = ''
    refs.loadMoreBtn.style.display="none"
 }
function renderGallery(data) {
    const imagesGallery = imagesList(data)
    
    refs.wrapper.insertAdjacentHTML('beforeend', imagesGallery)
  
}

async function onLoadMore() {
    pageCounter += 1;
    let resultList = await imageFetcher.fetchImages(searchQuery, pageCounter)
    
    renderGallery(resultList)

     refs.gallery.scrollIntoView({
     behavior: 'smooth',
     block: 'end',
    });
    
}



