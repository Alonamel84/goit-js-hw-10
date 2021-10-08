// // fetchCountries(name);
const urlRoute = 'https://restcountries.com/v2/name/';
const filterName = '?fields=name,capital,population,flags,languages';
export const fetchCountries = countryName =>
  new Promise((res, rej) => {
    {
      return fetch(urlRoute + countryName + filterName)
        .then(response => {
          if (response.status >= 200 && response.status < 300) return response.json();
          if (response.status === 404) {
            throw new Error('404 error');
          }
          rej('error request');
        })
        .then(data => res(data));
    }
  });
