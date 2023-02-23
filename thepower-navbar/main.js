import { DOCUMENTATION } from "./constants";
import "./style.css";

const favoritesListElement = document.querySelector(
  "#menu-content > .favorites"
);
const menuContentElement = document.querySelector("#menu-content");
const inputSearch = document.querySelector("#menu-search");
const toggleButton = document.querySelector("#menu-toggle");
const searchBlockElement = document.querySelector("#menu-content > .search");

// const favorites = DOCUMENTATION.filter((doc) => doc.favorite);

const getDocumentationTemplate = (title, url) => {
  return `
    <li class="favorite-element">
      <a href="${url}" target="__blanck">${title}</a>
    </li>
  `;
};

const generateList = (listId, elements) => {
  const ulElement = document.createElement("ul");
  ulElement.id = listId;

  elements.forEach((element) => {
    const docTemplate = getDocumentationTemplate(element.title, element.url);
    ulElement.innerHTML += docTemplate;
  });

  return ulElement;
};

const setupFavoritesList = () => {
  const favorites = DOCUMENTATION.filter((doc) => doc.favorite);
  const favoritesUl = generateList("favorites-list", favorites);
  favoritesListElement.append(favoritesUl);
};

const normalizeText = (text) => text.trim().toLowerCase();

const handleSearch = (event) => {
  const { value } = event.target;
  const normalizedValue = normalizeText(value);

  const filteredDocumentation = DOCUMENTATION.filter((doc) => {
    const normalizedTitle = normalizeText(doc.title);
    return normalizedTitle.includes(normalizedValue);
  });

  const searchUl = generateList("search-list", filteredDocumentation);

  const previousUl = document.querySelector("#search-list");
  if (previousUl) {
    previousUl.remove();
  }

  searchBlockElement.append(searchUl);
};

const toggleOpenMenu = () => {
  menuContentElement.classList.toggle("menu-content--open");
};

toggleButton.addEventListener("click", toggleOpenMenu);
inputSearch.addEventListener("input", handleSearch);
setupFavoritesList();