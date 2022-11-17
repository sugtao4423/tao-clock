import document from 'document'
import { HeartRateSensor } from 'heart-rate'

const noBpmText = '---'
const bpm = document.getElementById('bpm') as Element

let hrm: HeartRateSensor | null = null

export const init = () => {
  if (HeartRateSensor) {
    hrm = new HeartRateSensor()
    hrm.onreading = () => {
      bpm.text = hrm?.heartRate?.toString() ?? noBpmText
    }
  }
}

export const heartRateOn = () => {
  if (!hrm) return
  bpm.text = noBpmText
  hrm.start()
}

export const heartRateOff = () => {
  if (!hrm) return
  hrm.stop()
  bpm.text = noBpmText
}
