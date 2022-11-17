import document from 'document'
import { battery } from 'power'

const batteryLevel = document.getElementById('batteryLevel') as Element

export const init = () => {
  battery.onchange = () => {
    batteryLevel.text = `${battery.chargeLevel}%`
  }
}
