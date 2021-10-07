// // fetchCountries(name);
const urlRoute = 'https://restcountries.com/v2/name/';
const filterName = '?fields=name,capital,population,flags,languages';
export const fetchCountries = countryName =>
  new Promise((res, rej) => {
    fetch(urlRoute + countryName + filterName)
      .then(response => {
        if (response.status >= 200 && response.status < 300) return response.json();

        rej('error request');
      })
      .then(data => res(data));
  });
