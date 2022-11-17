import { geolocation } from 'geolocation'
import { peerSocket } from 'messaging'
import WeatherMessage from './interfaces/message/WeatherMessage'
import { Weather } from './interfaces/weather/Weather'
import { sendMessage } from './message'

export const sendWeatherData = () => {
  if (peerSocket.readyState !== peerSocket.OPEN) return

  geolocation.getCurrentPosition(
    (position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      lat = Math.round(lat * 1000) / 1000
      lon = Math.round(lon * 1000) / 1000
      fetch2SendWeatherData(lat, lon)
    },
    (err) => {
      console.log('Error: ' + err)
      console.log('Use default, Higashiyamato-shi.')
      fetch2SendWeatherData(35.745, 139.424)
    }
  )
}

const fetch2SendWeatherData = async (lat: number, lon: number) => {
  const apiUrl = 'https://URL_IS_HIDDEN'
  const params = {
    lat: lat.toString(),
    lon: lon.toString(),
    kosame: '1',
    sec: Date.now().toString(),
  }
  const url = apiUrl + '?' + new URLSearchParams(params)

  try {
    const response = await fetch(url)
    const json: Weather = await response.json()
    send2Device(json)
  } catch (err) {
    console.log('Error fetching weather: ' + err)
  }
}

const send2Device = (w: Weather) => {
  const dt = new Date()
  const after2h = dt.setHours(dt.getHours() + 2) / 1000
  const forecast = w.srf.find(
    (s) => s.time <= after2h && s.time + 2 * 60 * 60 * 60 * 1000 - 1 >= after2h
  )
  if (!forecast) return

  const data: WeatherMessage = {
    key: 'weather',
    locationName: w.banner_list[0].LNAME,
    temp: forecast.TEMP,
    weather: forecast.WXTAG,
    weatherTime: forecast.time,
  }
  sendMessage(data)
}
