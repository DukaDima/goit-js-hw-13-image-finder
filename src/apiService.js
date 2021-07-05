
export default class ImagesService {
    constructor() {   
        this.API_KEY = '22333452-088c943be01bb3bdea991b2c2'
    }
    async fetchImages  (searchQuery, pageNum) {
    const response = await fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNum}&per_page=12&key=${this.API_KEY}`);
    const imagesParsed = await response.json();
    return imagesParsed;
    }
}


    



