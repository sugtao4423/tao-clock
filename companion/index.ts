import { peerSocket } from 'messaging'
import * as settings from './settings'
import * as weather from './weather'

settings.init()

let weatherTimer: number | null = null

peerSocket.onopen = () => {
  settings.sendAllSettings()
  weather.sendWeatherData()
  weatherTimer = setInterval(weather.sendWeatherData, 15 * 60 * 1000)
}

peerSocket.onclose = () => {
  if (weatherTimer !== null) {
    clearInterval(weatherTimer)
    weatherTimer = null
  }
}

peerSocket.onerror = (err) => {
  console.log('Connection error: ' + err.code + ' - ' + err.message)
}
