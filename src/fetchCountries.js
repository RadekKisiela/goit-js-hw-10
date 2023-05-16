export async function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
