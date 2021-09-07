var monthName = ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var dayName = ['Sunday,', 'Monday,', 'Tuesday,', 'Wednesday,', 'Thursday,', 'Friday,', 'Saturday,'];
var date = new Date();

var hour = date.getHours() >= 13 ? date.getHours() % 12 : date.getHours();
var minut = date.getMinutes();
var ampm = "PM";
var month = date.getMonth();
var day = date.getDay();
var currentDate = date.getDate();
if (hour >= 12) {
    ampm = "PM";
} else {
    ampm = "AM";
}
if (hour < 10) { hour = `0${hour}` }
if (minut < 10) { minut = `0${minut}` }

document.querySelector('#clock').innerHTML = `${hour} : ${minut}`;
document.querySelector('#ampm').innerHTML = ampm;
document.querySelector('#day').innerHTML = dayName[day];
document.querySelector('#date').innerHTML = currentDate;
document.querySelector('#month').innerHTML = monthName[month];

// get Latitude and Longitude

var owk = "8f9af3c9d7160da28ffe83ce0a0081e5";

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${owk}`)
            .then(data => {
                return data.json();
            }
            )
            .then(mainData => {
                console.log(mainData);
                showWeatherData(mainData);
            }).catch(err => {
                console.log(`error = ${err}`);
            })
    })
}

function showWeatherData(mainData) {
    document.querySelector('#weatherinfo').innerHTML = mainData.current.weather[0].description;
    document.querySelector('#FellsLike').innerHTML = `${mainData.current.feels_like}°C`;
    document.querySelector('#Humidity').innerHTML = `${mainData.current.humidity}°C`;
    document.querySelector('#mainCelsius').innerHTML = `${mainData.current.temp}°C`;

    document.querySelector('.centerAria').innerHTML = `
    <img src="http://openweathermap.org/img/wn/${mainData.current.weather[0].icon}@2x.png" alt="" id="mainWeatherIcon">
    <h1 id="mainCelsius"> ${mainData.current.temp}°C </h1>
    `;

    var dayName2 = ['tody','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    var weatherForecastEl = document.getElementById('weather-forecast');

    let otherDayForcast = ''

    mainData.daily.forEach((day,idx) => {
        otherDayForcast += `
    <div class="card">
    <h1 class="day">${dayName2[idx]}</h1>
    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" class="wi-icon">
    <h1 class="wi-des">${day.weather[0].description}</h1>
    <h1 class="wi-Celsius-hi-lo">the hight will be <span id="hi-Celsius">${day.temp.max}<span>°C</span></span><br>the low
        will be <span>${day.temp.min}<span>°C</span></span></h1>
    <h1 class="wi-Humidity">Humidity : <span id="wi-data-Humidity">${day.humidity} <span>%</span></span></h1>
    <h1 class="wi-pressure">pressure : <span id="wi-data-pressure">${day.pressure} <span>hPa</span></span></h1>
    <h1 class="wi-dewPoint">dew point : <span id="wi-data-dewPoint">${day.dew_point}<span>°C</span></span></h1>
    <h1 class="wi-windSpeed">wind speen : <span id="wi-data-windSpeed">${day.wind_speed}km/h</span></h1>
    <div class="wi-table">
        <h3 class="ta-bl"></h3>
        <h3 class="ta-te">temperature</h3>
        <h3 class="ta-fe">FellsLike</h3>
        <h3 class="ta-m">morning</h3>
        <h3 class="ta-a">afternoon</h3>
        <h3 class="ta-e">evening</h3>
        <h3 class="ta-n">night</h3>

        <h3 class="c1r1">${day.temp.morn}<span>°C</span></h3>
        <h3 class="c1r2">${day.temp.day}<span>°C</span></h3>
        <h3 class="c1r3">${day.temp.eve}<span>°C</span></h3>
        <h3 class="c1r4">${day.temp.night}<span>°C</span></h3>
        <h3 class="c2r1">${day.feels_like.morn}<span>°C</span></h3>
        <h3 class="c2r2">${day.feels_like.day}<span>°C</span></h3>
        <h3 class="c2r3">${day.feels_like.eve}<span>°C</span></h3>
        <h3 class="c2r4">${day.feels_like.night}<span>°C</span></h3>
    </div>

    <div class="wi-sun">
        <h3 class="ws-sunrise">sunrise</h3>
        <h3 class="ws-sunset">sunset</h3>
        <h3 class="ws-sunrise-time">${window.moment(day.sunrise * 1000).format('HH:mm a')}</h3>
        <h3 class="ws-sunset-time">${window.moment(day.sunset * 1000).format('HH:mm a')}</h3>
    </div>
</div>
    `
    })

    weatherForecastEl.innerHTML = otherDayForcast;

}
