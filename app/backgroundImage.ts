import document from 'document'

const bg = document.getElementById('background') as Element
const godImage = document.getElementById('godImage') as ImageElement
const godText = document.getElementById('god') as Element
const godData = [
  {
    image: 'anz.jpg',
    text: "Clover Day's",
  },
  {
    image: 'rikka.jpg',
    text: 'Rikka Takanashi',
  },
]

export const init = () => {
  let godPos = 0
  bg.onclick = () => {
    if (++godPos >= godData.length) {
      godPos = 0
    }
    const data = godData[godPos]
    godImage.href = data.image
    godText.text = data.text
  }
}
