import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { settingsStorage } from "settings";

function queryWeatherData(){
  if(messaging.peerSocket.readyState !== messaging.peerSocket.OPEN){
    console.log('Error: Connection is not open');
    return;
  }
  geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    lat = Math.round(lat * 1000) / 1000;
    lon = Math.round(lon * 1000) / 1000;
    fetchWeatherData(lat, lon);
  }, (error) => {
    console.log('Error: GPS error. use default, Higashiyamato-shi');
    fetchWeatherData(35.745, 139.424);
  });

  function fetchWeatherData(lat, lon){
    fetch(`https://URL_IS_HIDDEN?lat=${lat}&lon=${lon}&kosame=1&sec=${Date.now()}`)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      sendWeatherData(json);
    })
    .catch(function(err){
      console.log('Error fetching weather: ' + err);
    });
  }
}

function sendWeatherData(json){
  const dt = new Date();
  const after2h = dt.setHours(dt.getHours() + 2) / 1000;
  let forecast;
  for(let i in json.srf){
    const current = json.srf[i];
    if(current.time <= after2h && (current.time + 2 * 60 * 60 * 60 * 1000 - 1) >= after2h){
      forecast = current;
    }
  }
  const locationName = json['banner_list']['0']['LNAME'];
  const temp = forecast.TEMP;
  const weather = forecast.WXTAG;
  const weatherTime = forecast.time;

  const data = {
    key: 'weather',
    locationName: locationName,
    temp: temp,
    weather: weather,
    weatherTime: weatherTime
  };
  sendData(data);
}

settingsStorage.onchange = (evt) => {
  const data = {
    key: evt.key,
    value: evt.newValue
  };
  sendData(data);
}

function sendAllSettings(){
  for(let i = 0; i < settingsStorage.length; i++){
    const key = settingsStorage.key(i);
    if(key){
      const data = {
        key: key,
        value: settingsStorage.getItem(key)
      };
      sendData(data);
    }
  }
}

function sendData(data){
  if(messaging.peerSocket.readyState === messaging.peerSocket.OPEN){
    messaging.peerSocket.send(data);
  }
}

let weatherTimer = undefined;

messaging.peerSocket.onopen = () => {
  sendAllSettings();
  queryWeatherData();
  weatherTimer = setInterval(queryWeatherData, 15 * 60 * 1000);
}

messaging.peerSocket.onclose = () => {
  if(weatherTimer !== undefined){
    clearInterval(weatherTimer);
    weatherTimer = undefined;
  }
}

messaging.peerSocket.onerror = (err) => {
  console.log('Connection error: ' + err.code + ' - ' + err.message);
}
