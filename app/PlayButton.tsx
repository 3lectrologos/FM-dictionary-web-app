import Image from 'next/image'
import { useState } from 'react'
import useSound from 'use-sound'
import { twJoin } from 'tailwind-merge'
import { PuffLoader } from 'react-spinners'

export default function PlayButton({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false)
  const [play] = useSound(url, {
    interrupt: true,
    onend: () => {
      setPlaying(false)
    }
  })

  function onPlay() {
    if (playing) {
      return
    }
    setPlaying(true)
    play()
  }

  return (
    <button className={twJoin(
      `relative flex justify-center items-center w-12 h-12 rounded-full transition bg-purple/25 group cursor-pointer`,
      `hover:transition ${playing ? 'hover:bg-purple/25' : 'hover:bg-purple'}`,
      `focusable`
    )}
            onClick={onPlay}
    >
      { playing ?
        <PuffLoader
          color={`#A445ED`}
          size={28}
        /> :
        <>
          <Image className={`rounded-full transition-opacity group-hover:transition-opacity group-hover:opacity-0`} src={`/images/icon-play.svg`} alt={`Play icon`} fill />
          <Image className={`rounded-full transition-opacity opacity-0 group-hover:block group-hover:transition-opacity group-hover:opacity-100`} src={`/images/icon-play-white.svg`} alt={`Play icon`} fill />
        </>
      }
    </button>
  )
}