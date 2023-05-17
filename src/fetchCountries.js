const baseUrl = 'https://restcountries.com/v3.1/';

export const fetchCountries = name => {
  const fields = 'fields=name,flags,capital,population,languages';
  const url = `${baseUrl}name/${encodeURIComponent(name)}?${fields}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const countries = Object.keys(data).map(key => {
        const country = data[key];
        const commonName = country.name.common || 'unknown';
        return {
          name: commonName !== 'undefined' ? commonName : 'unknown',
          flag: country.flags?.svg || '',
          capital: country.capital?.[0] || 'unknown',
          population: country.population || 'unknown',
          languages: Object.values(country.languages).join(', ') || 'unknown',
        };
      });
      console.log(countries);
      return countries;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
};
