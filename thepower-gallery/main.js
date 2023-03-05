import { MOCK_CARDS, TECHNOLOGIES_URL } from './constants';
// import { MOCK_CARDS } from './constants';
// import { TECHNOLOGIES_URL } from './constants';
import './style.css'

// SETUP
const appElement = document.querySelector('#app');

const getContainerTemplate = () => {
  return `
    <div id="thepower-gallery" class="thepower-gallery">
      <h1>Loading... ⏳</h1>
    </div>
  `;
};

const getModalTemplate = () => {
  return `
    <div id="thepower-modal" class="thepower-modal">
      <div class="modal-header">
        <h2 id="modal-title"></h2>
        <button id="modal-close">❌</button>
      </div>
      <div class="modal-body"></div>
    </div>
  `;
}

getModalTemplate();

appElement.innerHTML += getContainerTemplate();
appElement.innerHTML += getModalTemplate();

// LOGIC
const galleryElement = document.querySelector('#thepower-gallery');
const loadingElement = document.querySelector('#thepower-gallery > h1');

const modalElement = document.querySelector('#thepower-modal');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('.modal-body');

let cards;
let currentCard;
let isFetching = false;

const handleCloseModal = () => {
  modalElement.style.display = 'none';
};

const addModalListeners = () => {
  const closeButton = document.querySelector('#thepower-modal #modal-close');
  closeButton.addEventListener('click', handleCloseModal());
};

const setupStars = (score) => {
  if (!score) {
    return `<p class="star">No rating</p>`;
  }

  let starContainer = [];

  for (let i = 1; i <= score; i++) {
    starContainer.push(`<span class="star">⭐️</span>`)
  }

  return starContainer.join('');
};

const getCardTemplate = (card) => {
  return `
    <div class="card" role="button" id="${card._id}">
      <h3>${card.name}</h3>

      <div class="image-container">
        <img src="${card.logo}" alt="${card.name}" />
      </div>
      
      <div class="score-container">${setupStars(card.score)}</div>
    </div>
  `
};

const setupCards = () => {
  loadingElement.remove();

  galleryElement.innerHTML = '';
  MOCK_CARDS.forEach((card) => {
  //cards.forEach((card) => {
    const template = getCardTemplate(card);
    galleryElement.innerHTML += template;
  });
}

const getModalBodyTemplate = (cardData) => {
  return `
    <img src="${cardData.logo}" alt="${cardData.name}" />
    <h3>Valoración de ${cardData.score.toFixed(2)} con ${cardData.reviews}</h3>
    <div class="review-container">
      <button data-score="1">⭐️</button>
      <button data-score="2">⭐️</button>
      <button data-score="3">⭐️</button>
      <button data-score="4">⭐️</button>
      <button data-score="5">⭐️</button>
    </div>
    <p>Clicka en una estrella para votar</p>
  `
};

const postReview = async (id, score) => {
  console.log(id, score);
  
  if (isFetching) {
    return;
  }  
  
  isFetching = true;

  try {


    const res = await fetch(`${TECHNOLOGIES_URL}/${id}`, {
      method: 'POST',
      mode: "no-cors",
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        score,
      }),
    });

    const updatedCard = await res.json();
    console.log(data);

    cards = cards.map((card) => {
      return card._id === updatedCard._id ? updatedCard : card;
    });

    setupCards();
    addCardsListeners();
    // setupModalData(updatedCard);
    handleCloseModal();
    

    isFetching = false;
  } catch (err) {
    console.log(`Error! ${err}`)
    isFetching = false;
  }
};

const handleReview = (event) => {
  console.log(event.target);
  const score = Number(event.target.getAttribute('data-score'));
  console.log(score);
  console.log(typeof score);
  postReview(currentCard._id, score); 

}

const addScoreButtonListeners =  () => {
  const scoreButtons = document.querySelectorAll('#thepower-modal .review-container > button');

  scoreButtons.forEach((button) => {
    button.addEventListener('click', handleReview);
  });
}

const setupModalData = (cardData) => {
  console.log(cardData);
  currentCard = cardData;

  modalTitle.innerText = cardData.name;
  modalBody.innerHTML = getModalBodyTemplate(cardData);
  addScoreButtonListeners();
}

const handleOpenModal = (event) => {
  // console.log(event.target.id)
  const cardId = event.target.id;
  const cardData = cards.find((card) => card._id === cardId);
  setupModalData(cardData);
  modalElement.style.display = 'block';
}

const addCardsListeners = () => {
  const cards = document.querySelectorAll('#thepower-gallery .card');
  cards.forEach((card) => card.addEventListener('click', handleOpenModal));
}

// // const apiRequest = fetch(TECHNOLOGIES_URL)
// fetch(TECHNOLOGIES_URL, {mode: "no-cors"})
//   .then((res) => res.json())
//   .then((cardsData) => {
//     cards = cardsData;
//     // console.log(cardsData);
//     console.log(cards);

//     setupCards();
// }).catch((err) => {
// 
// })
// // console.log(apiRequest);

const getTechnologies = async () => {
  try {
    // Call API
    // ********
    // const res = await fetch(TECHNOLOGIES_URL, {mode: "no-cors"});
    // const cardsData = await res.json();

    // cards = cardsData;
    cards = MOCK_CARDS;
    // console.log(cardsData);
    // console.log(cards);
    // ********

    setupCards();
    addCardsListeners();
  } catch (err) {
    loadingElement.innerText = `☠️☠️☠️ Error ${err} ☠️☠️☠️`;
  }
};

getTechnologies();
addModalListeners();


