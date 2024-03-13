import { useEffect, useRef } from 'react'

interface AudioOptions {
  playbackRate?: number
}

export const useAudio = (src: string, { playbackRate = 1 }: AudioOptions = {}) => {
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    //@ts-ignore
    audio.current = new Audio(src)
    audio.current.playbackRate = playbackRate
  }, [src, playbackRate])

  const play = () => {
    if (audio.current) {
      audio.current.pause()
      audio.current.currentTime = 0
      audio.current.play()
    }
  }

  return {
    play
  }
}
