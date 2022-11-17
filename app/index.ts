import clock from 'clock'
import { display } from 'display'
import document from 'document'
import { HeartRateSensor } from 'heart-rate'
import { peerSocket } from 'messaging'
import { battery } from 'power'
import { today } from 'user-activity'
import { preferences } from 'user-settings'
import * as util from '../common/utils'

display.onchange = () => {
  if (display.on) {
    updateClock()
    heartRateOn()
  } else {
    heartRateOff()
  }
}

/* ---------- BT Icon ---------- */
const btIcon = document.getElementById('btIcon')
function changeBTIcon() {
  const isConnected = peerSocket.readyState === peerSocket.OPEN
  btIcon.style.display = isConnected ? 'inline' : 'none'
}

/* ---------- GOD ---------- */
let godPos = 0
const bg = document.getElementById('background')
const godImage = document.getElementById('godImage')
const godText = document.getElementById('god')
const godData = [
  {
    image: 'anz.png',
    text: "Clover Day's",
  },
  {
    image: 'rikka.png',
    text: 'Rikka Takanashi',
  },
]
bg.onclick = () => {
  if (++godPos >= godData.length) {
    godPos = 0
  }
  const data = godData[godPos]
  godImage.href = data.image
  godText.text = data.text
}

/* ---------- Clock & Battery & Steps ---------- */
const time = document.getElementById('time')
const date = document.getElementById('date')
const batteryLevel = document.getElementById('batteryLevel')
const steps = document.getElementById('steps')
clock.granularity = 'minutes'
clock.ontick = () => updateClock()
let dateFormat = undefined

function updateClock() {
  setText(time, util.getTime(preferences))
  setText(date, util.getDate(dateFormat))
  if (batteryLevel.text.replace('%', '') !== battery.chargeLevel) {
    batteryLevel.text = `${battery.chargeLevel}%`
  }
  const stepsValue = today.adjusted.steps || 0
  setText(steps, stepsValue.toLocaleString())
}

/* ---------- Heart Rate ---------- */
const hrm = new HeartRateSensor()
const bpm = document.getElementById('bpm')
hrm.onreading = () => {
  setText(bpm, hrm.heartRate)
}

function heartRateOn() {
  setText(bpm, '---')
  hrm.start()
}

function heartRateOff() {
  hrm.stop()
  setText(bpm, '---')
}

/* ---------- Weather ---------- */
const weatherLocation = document.getElementById('weatherLocation')
const weather = document.getElementById('weather')
const weatherTime = document.getElementById('weatherTime')

function receiveWeatherData(data) {
  const _locationName = data.locationName
  const _weather = `${data.temp}°C (${data.weather})`
  const _dt = new Date(data.weatherTime * 1000)
  const _date = util.zeroPad(_dt.getDate())
  const _hours = util.zeroPad(_dt.getHours())
  const _minutes = util.zeroPad(_dt.getMinutes())
  const _weatherTime = `${_date} ${_hours}:${_minutes}`

  setText(weatherLocation, _locationName)
  setText(weather, _weather)
  setText(weatherTime, _weatherTime)
}

function receiveDateFormat(format) {
  if (dateFormat !== format) {
    dateFormat = format
    updateClock()
  }
}

peerSocket.onopen = () => {
  changeBTIcon()
}

peerSocket.onclose = () => {
  changeBTIcon()
}

peerSocket.onmessage = (evt) => {
  if (evt.data) {
    switch (evt.data.key) {
      case 'weather':
        receiveWeatherData(evt.data)
        break
      case 'dateFormat':
        receiveDateFormat(JSON.parse(evt.data.value).values[0].name)
        break
    }
  }
}

peerSocket.onerror = (err) => {
  console.log('Connection error: ' + err.code + ' - ' + err.message)
}

function setText(obj, text) {
  if (obj.text !== text) {
    obj.text = text
  }
}
