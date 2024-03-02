import { FC, SyntheticEvent, useEffect, useState } from 'react'

import styles from './styles.module.css'

interface DocumentWithFullscreen extends Document {
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  webkitFullscreenElement?: Element
  msExitFullscreen?: () => void
  mozCancelFullScreen?: () => void
  webkitExitFullscreen?: () => void
}

interface DocumentElementWithFullscreen extends HTMLElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}

function activateFullscreen(element: DocumentElementWithFullscreen) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

function deactivateFullscreen() {
  const doc = document as DocumentWithFullscreen
  if (doc.exitFullscreen) {
    doc.exitFullscreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  }
}

export const FullpageButton: FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = (e?: SyntheticEvent) => {
    if (isFullscreen) {
      deactivateFullscreen()
      setIsFullscreen(false)
    } else {
      activateFullscreen(document.documentElement)
      setIsFullscreen(true)
    }

    if (!e) {
      return
    }

    const button = (e.target as HTMLElement).closest('button')

    if (button) {
      button.blur()
    }
  }

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.code !== 'KeyF') {
        return
      }

      toggleFullscreen()
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [isFullscreen])

  return (
    <button
      className={styles.button}
      onClick={toggleFullscreen}
      title="Press 'F' to go fullscreen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#453c4f"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
        <path d="M4 16v2a2 2 0 0 0 2 2h2" />
        <path d="M16 4h2a2 2 0 0 1 2 2v2" />
        <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
      </svg>
    </button>
  )
}
