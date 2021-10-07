import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

// ==========================================================

const DEBOUNCE_DELAY = 300;
console.log(fetchCountries('peru'));

export const isJson = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
};
const countryList = document.querySelector('.country-list');
const countryItem = document.querySelector('.country-info');
const inputNode = document.querySelector('input');
const inputData = () => {
  fetchCountries(inputNode.value.trim()).then(array => {
    console.log(array);
    if (array.length > 10) {
      return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }
    // if (!inputNode.value.includes(array[0].name)) {
    //   return Notiflix.Notify.failure('Oops, there is no country with that name');
    // }

    if (array.length > 1 && array.length <= 10) {
      countryItem.innerHTML = '';
      const markup = array
        .map(
          item => `<li>
                <img src="${item.flags.svg}"width="30" height="30" alt="${item.name}" >
                      ${item.name}</li>
               `,
        )
        .join('');
      countryList.innerHTML = markup;
    }
    if (array.length === 1) {
      countryList.innerHTML = '';
      const markup = array
        .map(
          item => ` 
                <ul>
                <img src="${item.flags.svg}"width="30" height="30" alt="${item.name}" >
                    <li> имя страны: ${item.name}</li>
                    <li> столица: ${item.capital}</li>
                    <li> население: ${item.population}</li>
                    <li> языки: ${item.languages[0].name}</li>
                </ul>
          `,
        )
        .join('');
      countryItem.innerHTML = markup;
    }
  });
};

inputNode.addEventListener('input', debounce(inputData, DEBOUNCE_DELAY));
