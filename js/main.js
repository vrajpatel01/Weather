
var monthName = ['Jun','Feb','Mar','Apr','May','Jun','jul','Aug','Sep','Oct','Nov','Dec'];
var dayName = ['Sunday,','Monday,','Tuesday,','Wednesday,','Thursday,','Friday,','Saturday,'];
var date = new Date();

var hour = date.getHours() >= 13 ? date.getHours() % 12:date.getHours();
var minut = date.getMinutes();
var ampm = "PM";
var month = date.getMonth();
var day = date.getDay();
var currentDate = date.getDate(); 
if(hour>=12){
    ampm = "PM";
}else{
    ampm = "AM";
}
if (hour < 10) {hour = `0${hour}`}
if (minut<10) {minut = `0${minut}`}

document.querySelector('#clock').innerHTML = `${hour} : ${minut}`;
document.querySelector('#ampm').innerHTML = ampm;
document.querySelector('#day').innerHTML = dayName[day];
document.querySelector('#date').innerHTML = currentDate;
document.querySelector('#month').innerHTML = monthName[month];

// get Latitude and Longitude

var owk = "69dc349d09c031d090c94ed888134aa6";

getWeatherData();

function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success)=>{
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${owk}`)
        .then(data => {
                return data.json();
            }
            )
            .then(mainData=>{
                console.log(mainData);
                showWeatherData(mainData);
            }).catch(err =>{
                console.log(`error = ${err}`);
            })
    })
}

function showWeatherData (mainData) {
    document.querySelector('#weatherinfo').innerHTML = mainData.current.weather[0].description;
    document.querySelector('#FellsLike').innerHTML = `${mainData.current.feels_like}°C`;
    document.querySelector('#Humidity').innerHTML = `${mainData.current.humidity}°C`;
    document.querySelector('#mainCelsius').innerHTML = `${mainData.current.temp}°C`;

    document.querySelector('.centerAria').innerHTML = `
    <img src="http://openweathermap.org/img/wn/${mainData.current.weather[0].icon}@2x.png" alt="" id="mainWeatherIcon">
    <h1 id="mainCelsius"> ${mainData.current.temp}°C </h1>
    `
    
}