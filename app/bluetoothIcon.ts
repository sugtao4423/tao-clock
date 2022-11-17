import document from 'document'
import { peerSocket } from 'messaging'

const btIcon = document.getElementById('btIcon') as GraphicsElement

export const changeIcon = () => {
  const isConnected = peerSocket.readyState === peerSocket.OPEN
  btIcon.style.display = isConnected ? 'inline' : 'none'
}
