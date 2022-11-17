import document from 'document'
import WeatherMessage from '../companion/interfaces/message/WeatherMessage'

const weatherLocation = document.getElementById('weatherLocation') as Element
const weather = document.getElementById('weather') as Element
const weatherTime = document.getElementById('weatherTime') as Element

const zeroPad = (i: number): string => (i < 10 ? '0' + i : i.toString())

export const receiveWeatherData = (data: WeatherMessage) => {
  const locationName = data.locationName
  const temp = `${data.temp}°C (${data.weather})`

  const dt = new Date(data.weatherTime * 1000)
  const date = zeroPad(dt.getDate())
  const hours = zeroPad(dt.getHours())
  const minutes = zeroPad(dt.getMinutes())
  const time = `${date} ${hours}:${minutes}`

  weatherLocation.text = locationName
  weather.text = temp
  weatherTime.text = time
}
