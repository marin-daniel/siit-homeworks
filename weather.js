
const apiKey = '64bdb603a3b2a01882213cfbc58712ef';

document.querySelector('.displayWeather').addEventListener('click', handleDeleteClick)

function getWeather(url) {
  return fetch(url).then(res => res.json())
}

function getParams() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const coordURL = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
      getWeather(coordURL).then(data => {
        setForFirstUse();
        renderHtml(data);
      });
    });
  } else {
    document.createElement('p').innerHTML = "Geolocation is not available";
  }
}

function renderHtml(data) {
  let tempToDisplay = tempConvert(data)
  document.querySelector('.temp').innerHTML = tempToDisplay;
  document.querySelector('.humidity').innerHTML = data.main.humidity;
  document.querySelector('.pressure').innerHTML = data.main.pressure;
}

function handleDeleteClick(e) {
  //write in both local storage and cookies in the same time for the homework purpose
  if (e.target.name === 'prefTemp') {

    localStorage.setItem('prefDegree', e.target.value);
    document.cookie = `prefDegree= ${e.target.value}; expires=Thu 18 Dec 2020 12:00:00 UTC`;

    getParams();
  }
}

// set local storage and cookies for the first use of the web page. Set degree Celsius as default;
function setForFirstUse() {
  if (localStorage.getItem('prefDegree') === null) {
    localStorage.setItem('prefDegree = celsius');

  }
  if (document.cookie.split('=')[1] === undefined) {
    document.cookie = 'prefDegree=celsius; expires=Thu 18 Dec 2020 12:00:00 UTC';

  }
}

function tempConvert(data) {
  let temp = '';
  let symbol = '';

  const tempDegCelsius = (data.main.temp - 273.15).toFixed(1);
  const tempDegFahrenheit = (data.main.temp * (9 / 5) - 459.67).toFixed(1);

  const tempFromLocalStorage = localStorage.getItem('prefDegree');
  const tempFromCookie = document.cookie.split('=')[1];

  if (tempFromLocalStorage === 'fahrenheit' || tempFromCookie === 'fahrenheit') {
    temp = tempDegFahrenheit;
    symbol = '&degF';
    document.querySelector('#fahrenheit').setAttribute('checked', true);

  } else {
    temp = tempDegCelsius;
    symbol = '&degC';
    document.querySelector('#celsius').setAttribute('checked', true);
  }
  return `${temp}${symbol}`;
}

getParams()

setInterval(() => getParams(), 60000);