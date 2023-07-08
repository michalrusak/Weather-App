const searchButton = document.querySelector(".form__button");
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
const weatherIcon = document.querySelector(".weather__icon");

const iconSun = document.querySelector(".weather__icon--sun");
const iconRain = document.querySelector(".weather__icon--rain");
const iconCloud = document.querySelector(".weather__icon--cloud");
const iconMoon = document.querySelector(".weather__icon--moon");

const icons = document.querySelectorAll(".weather--icon");
const bgImg = document.querySelector(".weather__row--up");

const basicURL = "https://danepubliczne.imgw.pl/api/data/synop/station";

const getWeather = async (e) => {
  e.preventDefault();
  if (formSelect.classList.contains("form__select--outline")) {
    formSelect.classList.remove("form__select--outline");
  }

  const city = document.querySelector(".form__select").value;

  if (city) {
    const data = await fetchData(city);
    if (data.status === false) {
      alert("Błąd połączenia. Spróbuj ponownie później!");
      return;
    }
    showImg(city);
    showData(data);

    saveToLocalStorage(city, data);
  } else {
    formSelect.classList.add("form__select--outline");
    alert("Sprawdź czy wybrałeś miasto!");
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

  showIcon(godzina_pomiaru, temperatura, suma_opadu);

  weatherDiv.classList.add("weather--active");
};

const saveToLocalStorage = (city, data) => {
  data.city = city;
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

const showIcon = (godzina_pomiaru, temperatura, suma_opadu) => {
  icons.forEach((element) => {
    if (element.classList.contains("weather__icon--active")) {
      element.classList.remove("weather__icon--active");
    }
  });

  if (godzina_pomiaru > 7 && godzina_pomiaru < 21 && temperatura > 20) {
    iconSun.classList.add("weather__icon--active");
  } else if (suma_opadu > 2) {
    iconRain.classList.add("weather__icon--active");
  } else if (temperatura < 10) {
    iconCloud.classList.add("weather__icon--active");
  } else if (godzina_pomiaru < 7 || godzina_pomiaru > 21) {
    iconMoon.classList.add("weather__icon--active");
  }
};

const showImg = (city) => {
  bgImg.style.backgroundImage = `url("./img/${city}.jpeg")`;
};

window.addEventListener("load", () => {
  getYear();

  if (localStorage.getItem("weather")) {
    const data = readFromLocalStorage();
    showData(data);
    showImg(data.city);
  }
});

searchButton.addEventListener("click", getWeather);
