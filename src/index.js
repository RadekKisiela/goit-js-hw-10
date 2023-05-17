import './css/styles.css';
import debounce from 'lodash/debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const createCountryList = countries => {
  countryList.innerHTML = '';
  countries.forEach(country => {
    const countryItem = document.createElement('li');
    const flagImg = document.createElement('img');
    flagImg.setAttribute('src', country.flag); // Ustawienie atrybutu src na adres URL flagi kraju
    flagImg.setAttribute('alt', country.name);
    flagImg.classList.add('img-flags'); // Dodanie klasy img-flag
    countryItem.appendChild(flagImg);
    const countryName = document.createElement('span');
    countryName.textContent = country.name;
    countryItem.appendChild(countryName);
    countryItem.addEventListener('click', () => {
      createCountryInfo(country);
    });
    countryList.appendChild(countryItem);
  });
};

const createCountryInfo = country => {
  countryInfo.innerHTML = '';
  const countryFlag = document.createElement('img');
  countryFlag.setAttribute('src', country.flag); // Dodaj atrybut src i przypisz wartość flagi kraju
  countryFlag.setAttribute('alt', country.name);
  countryFlag.classList.add('img-flag');
  const countryName = document.createElement('h2');
  countryName.textContent = country.name;
  const countryCapital = document.createElement('p');
  countryCapital.textContent = `Capital: ${country.capital}`;
  const countryPopulation = document.createElement('p');
  countryPopulation.textContent = `Population: ${country.population}`;
  const countryLanguages = document.createElement('p');
  countryLanguages.textContent = `Languages: ${country.languages}`;
  countryInfo.append(
    countryFlag,
    countryName,
    countryCapital,
    countryPopulation,
    countryLanguages
  );
};

const debouncedSearchCountry = debounce(() => {
  const searchValue = searchInput.value.trim();

  if (!searchValue) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchValue)
    .then(countries => {
      // console.log(countries);
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      } else if (countries.length >= 2 && countries.length <= 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        createCountryList(countries);
      } else if (countries.length === 1) {
        countryList.innerHTML = '';
        createCountryInfo(countries[0]);
      } else {
        Notiflix.Notify.failure('Oops, there is no country with that name.');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Something went wrong.');
      console.error(error);
    });
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', debouncedSearchCountry);
