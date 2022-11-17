export default interface WeatherMessage {
  key: 'weather'
  locationName: string
  temp: number
  weather: string
  weatherTime: number
}
