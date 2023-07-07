const searchButton = document.querySelector(".form__button");
const basicURL = "https://danepubliczne.imgw.pl/api/data/synop/station";

const getWeather = async (e) => {
  e.preventDefault();
  const city = document.querySelector(".form__city").value;
  console.log(city);
  const data = await fetchData(city);
  console.log(data);
  console.log(data.data_pomiaru);
};

const fetchData = async (city) => {
  const response = fetch(`${basicURL}/${city}`);
  const data = (await response).json();
  return data;
};

const showData = () => {};

searchButton.addEventListener("click", getWeather);

const footerYearSpan = document.querySelector(".footer__year");
footerYearSpan.innerText = new Date().getFullYear();
