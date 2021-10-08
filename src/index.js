import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

// ==========================================================

const DEBOUNCE_DELAY = 300;
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
  //   console.log(inputNode.textContent);
  if (inputNode.value.trim() === '') {
    return;
  }
  fetchCountries(inputNode.value.trim())
    .then(array => {
      //   console.log(array);
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
                <img src="${item.flags.svg}"width="50" height="50" alt="${item.name}" >
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
                <ul class= "counriesLimited">
                <img src="${item.flags.svg}"width="50" height="50" alt="${item.name}" >
                    <li> имя страны: ${item.name}</li>
                    <li> столица: ${item.capital}</li>
                    <li> население: ${item.population}</li>
                   
                     <li> языки: ${item.languages.map(item => item.name)}</li>
                </ul>
          `,
          )
          .join('');
        countryItem.innerHTML = markup;
      }
      if (array.status === 404) {
        return Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      console.log('falseeee');
    });
};

inputNode.addEventListener('input', debounce(inputData, DEBOUNCE_DELAY));
