import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    formBlock: document.querySelector('.form-block'),
    formElem: document.querySelector('.form-elem'),
    formInput: document.querySelector('.form-input'),
    formBtn: document.querySelector('.form-btn'),
    loader: document.querySelector('.loader-block'),
    gallery: document.querySelector('.gallery'),
};

function loaderOn() {
    refs.loader.classList.remove('hidden');
  }
  
function loaderOff() {
    refs.loader.classList.add('hidden');
  }

refs.formElem.addEventListener('submit', (e) => {
    e.preventDefault();
    refs.gallery.inserHTML = "";
    const searchImg = refs.formInput.value.trim();
    if (searchImg === "" ){
        return iziToast.show({
            message: 'You have not entered what to search for',
            position: 'topRight',
          });
    }
    userSearch(searchImg);
    e.target.reset();
})

function userSearch(searchImg) {
    const API_KEY = '42281278-b9f49de06a3dfc9ed42173e47';
    const BASE_URL = 'https://pixabay.com';
    const END_POINT = '/api/';
    const PARAMS = `q=${searchImg}&image_type=photo&orientation=horizontal&safesearch=true`;
    const URL = `${BASE_URL}${END_POINT}?key=${API_KEY}&${PARAMS}`;
    loaderOn();
    fetch(URL)
    .then(res => {
        if(!res.ok) {
            throw new Error(res.status);
        } return res.json();
    })
    .then(data => {
        if (data.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching\n your search query. Please try again!',
                position: 'topRight',
              });
            } else {
            const imagesMarkupRef = data.hits.map(image =>  {
                return `
                <li class="gallery-item">
                <a class="gallery-link" href="${image.largeImageURL}">
                  <img
                    class="gallery-image"
                    src="${image.webformatURL}"
                    alt="${image.tags}"
                  />
                </a>
                <div class="modal-info">
                  <p>Likes <span class="gallery-info">${image.likes}</span></p>
                  <p>Views <span class="gallery-info">${image.views}</span></p>
                  <p>Comments <span class="gallery-info">${image.comments}</span></p>
                  <p>Downloads <span class="gallery-info">${image.downloads}</span></p>
                </div>
              </li>`;
        }).join('');
        refs.gallery.innerHTML = imagesMarkupRef;
                let simplelightbox = new SimpleLightbox('.gallery a', options);
                simplelightbox.refresh();
            }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    })
    .finally(() => {
        loaderOff();
      });
}

const options = {
    captions: true,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionSelector: "img",
    captionDelay: 250,
  };