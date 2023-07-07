const searchButton = document.querySelector(".form__button");
const basicURL = "https://danepubliczne.imgw.pl/api/data/synop/station";

const citySpan = document.querySelector(".weather__city");
const dateSpan = document.querySelector(".weather__date");
const timeSpan = document.querySelector(".weather__time");
const temperatureSpan = document.querySelector(".weather__temperature");
const totalPrecipitationSpan = document.querySelector(
  ".weather__totalPrecipitation"
);
const pressureSpan = document.querySelector(".weather__pressure");

const getWeather = async (e) => {
  e.preventDefault();
  const city = document.querySelector(".form__city").value;
  console.log(city);
  if (city) {
    const data = await fetchData(city);
    console.log(data);
    showData(data);
  } else {
    alert("sprawdź czy wybrałeś miasto");
  }
};

const fetchData = async (city) => {
  const response = fetch(`${basicURL}/${city}`);
  const data = (await response).json();
  return data;
};

const showData = (data) => {
  const {
    stacja,
    data_pomiaru,
    godzina_pomiaru,
    temperatura,
    suma_opadu,
    cisnienie,
  } = data;

  citySpan.textContent = stacja;
  dateSpan.textContent = data_pomiaru;
  timeSpan.textContent = godzina_pomiaru + ":00";
  temperatureSpan.textContent = temperatura;
  totalPrecipitationSpan.textContent = suma_opadu;
  pressureSpan.textContent = cisnienie;
};

searchButton.addEventListener("click", getWeather);

const getYear = () => {
  const footerYearSpan = document.querySelector(".footer__year");
  footerYearSpan.innerText = new Date().getFullYear();
};

window.addEventListener("load", () => {
  getYear();
});
