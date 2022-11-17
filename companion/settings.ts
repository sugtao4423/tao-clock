import { settingsStorage } from 'settings'
import CommonMessage from './interfaces/message/CommonMessage'
import { sendMessage } from './message'

export const init = () => {
  settingsStorage.onchange = (evt: StorageChangeEvent) => {
    if (!evt.key || !evt.newValue) return

    const data: CommonMessage = {
      key: evt.key,
      value: evt.newValue,
    }
    sendMessage(data)
  }
}

export const sendAllSettings = () => {
  for (let i = 0; i < settingsStorage.length; i++) {
    const key = settingsStorage.key(i)
    if (!key) continue
    const value = settingsStorage.getItem(key)
    if (!value) continue

    const data: CommonMessage = { key, value }
    sendMessage(data)
  }
}
