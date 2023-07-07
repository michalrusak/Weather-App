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

const weatherDiv = document.querySelector(".weather");

const formSelect = document.querySelector(".form__select");

const getWeather = async (e) => {
  e.preventDefault();
  if (formSelect.classList.contains("form__select--outline")) {
    formSelect.classList.remove("form__select--outline");
  }

  const city = document.querySelector(".form__select").value;

  if (city) {
    const data = await fetchData(city);
    showData(data);
    saveToLocalStorage(data);
  } else {
    formSelect.classList.add("form__select--outline");
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

  weatherDiv.classList.add("weather--active");
};

const saveToLocalStorage = (data) => {
  localStorage.removeItem("weather");
  localStorage.setItem("weather", JSON.stringify(data));
};

const readFromLocalStorage = () => {
  const data = localStorage.getItem("weather");
  return JSON.parse(data);
};

const getYear = () => {
  const footerYearSpan = document.querySelector(".footer__year");
  footerYearSpan.innerText = new Date().getFullYear();
};

window.addEventListener("load", () => {
  getYear();

  if (localStorage.getItem("weather")) {
    const data = readFromLocalStorage();
    showData(data);
  }
});

searchButton.addEventListener("click", getWeather);
