import { display } from 'display'
import { MessageEvent, peerSocket } from 'messaging'
import DateFormatMessage from '../companion/interfaces/message/DateFormatMessage'
import WeatherMessage from '../companion/interfaces/message/WeatherMessage'
import * as backgroundImage from './backgroundImage'
import * as battery from './battery'
import * as bluetoothIcon from './bluetoothIcon'
import * as clock from './clock'
import * as heartRate from './heartRate'
import * as weather from './weather'

backgroundImage.init()
battery.init()
clock.init()
heartRate.init()

let dateFormat: string | null = null

display.onchange = () => {
  if (display.on) {
    clock.updateClock(dateFormat)
    heartRate.heartRateOn()
  } else {
    heartRate.heartRateOff()
  }
}

peerSocket.onopen = () => bluetoothIcon.changeIcon()
peerSocket.onclose = () => bluetoothIcon.changeIcon()
peerSocket.onmessage = (evt: MessageEvent) => {
  if (!evt.data) return

  const data = evt.data as WeatherMessage | DateFormatMessage
  switch (data.key) {
    case 'weather':
      weather.receiveWeatherData(data)
      break
    case 'dateFormat':
      dateFormat = data.value
      clock.updateClock(dateFormat)
      break
  }
}

peerSocket.onerror = (err) => {
  console.log('Connection error: ' + err.code + ' - ' + err.message)
}
