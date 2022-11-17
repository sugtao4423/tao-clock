import { peerSocket } from 'messaging'
import CommonMessage from './interfaces/message/CommonMessage'
import DateFormatMessage from './interfaces/message/DateFormatMessage'
import WeatherMessage from './interfaces/message/WeatherMessage'

export const sendMessage = (
  message: WeatherMessage | DateFormatMessage | CommonMessage
) => {
  if (peerSocket.readyState !== peerSocket.OPEN) return

  if (message.key === 'dateFormat') {
    const dateFormatValue = JSON.parse(message.value).values[0].name
    const data: DateFormatMessage = {
      key: message.key,
      value: dateFormatValue,
    }
    peerSocket.send(data)
    return
  }

  peerSocket.send(message)
}
