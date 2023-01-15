export default async function getCurrency() {
  try {
    return await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencys) => currencys);
  } catch (error) {
    return error;
  }
}
