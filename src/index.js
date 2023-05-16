import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const devounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const displayCountryList = countries => {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const { flag, name } = country;
    const flagUrl = flags.svg;

    const countryItem = document.createElement('li');
    const flagImg = document.createElement('img');
    flagImg.src = flagUrl;
    flagImg.alt = `${name} flag`;

    const countryName = document.createElement('span');
    countryName.textContent = name.official;

    countryItem.appendChild(flagImg);
    countryItem.appendChild(countryName);
    countryList.appendChild(countryItem);
  });
};

const displayCountryInfo = country => {
  const { flags, name, capital, population, languages } = country;
  const flagUrl = flags.svg;

  countryInfo.innerHTML = `
    <img src="${flagUrl}" alt="${name.official} flag">
    <h2>${name.official}</h2>
    <p><strong>Capital:</strong> ${capital.join(', ')}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${languages.join(', ')}</p>
  `;
};

const displayError = message => {
  Notiflix.Notify.failure(`Oops, ${message}`);
};

const searchCountries = async name => {
  if (name.trim() === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  try {
    const countries = await fetchCountries(name);

    if (countries.length > 10) {
      displayTooManyMatches();
    } else if (countries.length > 1) {
      displayCountryList(countries);
    } else if (countries.length === 1) {
      displayCountryInfo(countries[0]);
    } else {
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
      displayError('there is no country with that name');
    }
  } catch (error) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    displayError(error.message);
  }
};

const debouncedSerch = debounce(searchCountries, 300);

searchBox.addEventListener('input', event => {
  const searchTerm = event.target.value.trim();
  debouncedSerch(seartchTerm);
});
