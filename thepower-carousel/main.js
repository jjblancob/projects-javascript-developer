import { IMAGES } from './constants.js';
import './style.css';

// Setup app
const appElement = document.querySelector('#app');

const getCarouselTemplate = () => {
    return `
        <div id="thepower-carousel" class="thepower-carousel">
            <ul class="scrollable-set"></ul>
            <div class="image-preview"></div>
        </div>
    `;
};

appElement.innerHTML += getCarouselTemplate();

// Logic
const scrollableSetElement = document.querySelector('.scrollable-set');
const imagePreviewElement = document.querySelector('.image-preview');

let actualImageIndex = 0;
let imageInterval;

const getScrollableElementTemplate = (image, index) => {
    return `
        <li role="button" class="clickable">
            <img id="image-${index}" src="${image.src}" alt="${image.alt}" />
        </li>
    `
};

const setupScrollableSet = () => {
    IMAGES.forEach((image, index) => {
        const template = getScrollableElementTemplate(image, index);
        scrollableSetElement.innerHTML += template;
    });
};

const setupCarouselInterval = () => {
    imageInterval = setInterval(() => {
        if (actualImageIndex === IMAGES.length -1) {
            actualImageIndex = 0;
        } else {
            actualImageIndex += 1;
        }

        setupImagePreview(IMAGES[actualImageIndex].src);
        
    }, 5000);
};

const resetCarouselPreview = () => {
    clearInterval(imageInterval);
    setupCarouselInterval();
};

const setupImagePreview = (src) => {
    imagePreviewElement.style.backgroundImage = `url(${src})`;

    const selectedImage = document.querySelector(`img[src="${src}"]`);
    const imageIndex = Number(selectedImage.id.split('-')[1]);
    actualImageIndex = imageIndex;
    selectedImage.scrollIntoView({ behavior: 'smooth' });
    resetCarouselPreview();
};

const handleChangePreview = (event) => {
    // console.log(event.target);
    const image = event.target.children[0];
    // console.log('id:', image.id);
    setupImagePreview(image.getAttribute('src'));
};



const addScrollableListeners = () => {
    const scrollables = document.querySelectorAll('li.clickable');
    scrollables.forEach(scrollable => 
        scrollable.addEventListener('click', handleChangePreview)
    );
};


setupScrollableSet();
setupImagePreview(IMAGES[0].src);
addScrollableListeners();
setupCarouselInterval();