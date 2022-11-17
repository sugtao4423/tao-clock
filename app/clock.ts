import clock from 'clock'
import document from 'document'
import { today } from 'user-activity'
import { Preferences, preferences } from 'user-settings'

const time = document.getElementById('time') as Element
const date = document.getElementById('date') as Element
const steps = document.getElementById('steps') as Element

export const init = () => {
  clock.granularity = 'minutes'
  clock.ontick = () => updateClock(null)
}

export const updateClock = (dateFormat: string | null) => {
  time.text = getTime(preferences)
  date.text = getDate(dateFormat ?? 'yyyy/MM/dd E')
  const stepsValue = today.adjusted.steps || 0
  steps.text = stepsValue.toLocaleString()
}

const zeroPad = (i: number): string => (i < 10 ? '0' + i : i.toString())

const getTime = (preferences: Preferences): string => {
  const dt = new Date()
  let hours = dt.getHours()
  if (preferences.clockDisplay === '12h') {
    hours = hours % 12 || 12
  }
  const hour = zeroPad(hours)
  const min = zeroPad(dt.getMinutes())
  return `${hour}:${min}`
}

const getDate = (dateFormat: string): string => {
  const dt = new Date()
  const year = dt.getFullYear().toString()
  const month = (dt.getMonth() + 1).toString()
  const date = zeroPad(dt.getDate())
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dt.getDay()]

  return dateFormat
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', date)
    .replace('E', day)
}
