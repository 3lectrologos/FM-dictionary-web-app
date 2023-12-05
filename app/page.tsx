'use client'

import Image from 'next/image'
import { twJoin, twMerge } from 'tailwind-merge'
import ThemeToggle from '@/app/ThemeToggle'
import FontSelector from '@/app/FontSelector'
import { debounce } from 'lodash'
import { useState } from 'react'
import { Definition, Phonetics, Word } from '@/app/types'
import Link from 'next/link'
import useSound from 'use-sound'
import ScaleLoader from 'react-spinners/ScaleLoader'
import { PuffLoader } from 'react-spinners'

function TopBar() {
  return (
    <div className={`w-full flex flex-row justify-between items-center`}>
      <div className={`relative w-8 h-8`}>
        <Image src='/images/logo.svg' alt='Logo' fill />
      </div>
      <div className={`flex flex-row gap-x-4 items-center`}>
        <FontSelector />
        <div className={`w-px h-8 bg-lightgray`} />
        <ThemeToggle />
      </div>
    </div>
  )
}

function Search({ onChange }: { onChange: (term: string) => void }) {
  return (
    <div className={`relative w-[327px]`}>
      <input
        className={twMerge(
          `w-full h-12 rounded-2xl pl-6 pr-14 text-heading-sm leading-none font-bold`,
          `bg-offwhite dark:bg-offblack text-verydarkgray dark:text-white`,
          `focus:outline-none focus:ring-1 ring-purple`
        )}
        type='text'
        name='search'
        placeholder={`Search for any word...`}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className={`absolute w-[18px] h-[18px] shrink-0 right-6 top-1/2 transform -translate-y-1/2`}>
        <Image src='/images/icon-search.svg' alt='Search icon' fill />
      </div>
    </div>
  )
}

function PlayButton({ url }: { url: string }) {
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

function WordTitle({ word, phonetics, className='' }: { word: string, phonetics: Phonetics[], className?: string }) {
  let textAndAudio = phonetics.find(phonetic => phonetic.text && phonetic.audio)
  if (!textAndAudio) {
    textAndAudio = phonetics.find(phonetic => phonetic.text)
  }
  const text = textAndAudio?.text
  const audio = textAndAudio?.audio

  return (
    <div className={twMerge(
      `flex flex-row justify-between items-center`,
      `${className}`
    )}
    >
      <div className={`flex flex-col gap-y-2`}>
        <span className={`text-heading-lg`}>
          {word}
        </span>
        { text &&
          <span className={`text-heading-md text-purple`}>
            {text}
          </span> }
      </div>
      { audio && <PlayButton url={audio} /> }
    </div>
  )
}

function PartOfSpeech({ partOfSpeech, className='' }: { partOfSpeech: string, className?: string}) {
  return (
    <div className={twMerge(
      `flex flex-row w-full gap-x-4 items-center`,
      `${className}`
    )}>
      <span className={twJoin(
        `text-heading-md`,
        `!font-bold italic`
      )}>
        {partOfSpeech}
      </span>
      <span className={`h-px w-full bg-lightgray dark:bg-darkgray`} />
    </div>
  )
}

function Synonyms({ synonyms, label='Synonyms' }: { synonyms: string[], label?: string }) {
  return (
    <div className={`flex flex-row gap-x-4`}>
      <span
        className={twJoin(
          `text-heading-sm text-gray`,
          `!leading-[1.5]`
        )}
      >
        {label}
      </span>
      <div className={`flex flex-row flex-wrap gap-x-4`}>
        {
          synonyms?.map((synonym, idx) =>
            <span
              className={twJoin(
                `text-heading-sm text-purple`,
                `!font-bold !leading-[1.5]`
              )}
              key={idx}
            >
              {synonym}
            </span>
          )
        }
      </div>
    </div>
  )
}

function Definitions({ definitions, className='' }: { definitions: Definition[], className?: string }) {
  return (
    <ul className={twMerge(
      `flex flex-col gap-y-[13px]`,
      `${className}`
      )}
    >
      {
        definitions.map((definition, idx) =>
          <li className={twMerge(
            `relative flex flex-row gap-x-4 text-body-md`,
            `marker:content-['•']`
          )}
              key={idx}
          >
            <div className={`flex items-center h-min bg-darkpurple rounded-full invisible`}>
              <div className={`w-[5px] h-[5px] rounded-full bg-darkpurple visible`} />
              i
            </div>
            <div className={`flex flex-col gap-y-2`}>
                <span>
                  {definition.definition}
                </span>
              {
                definition.example &&
                <span className={`text-gray ${(idx === definitions.length - 1) ? '' : 'mb-2'}`}>
                  “{definition.example}”
                </span>
              }
            </div>
          </li>
        )
      }
    </ul>
  )
}

function Meaning({ partOfSpeech, definitions }: { partOfSpeech: string, definitions: Definition[] }) {
  const allSynonyms = definitions.reduce(
    (acc: string[], definition) => definition.synonyms ? acc.concat(definition.synonyms) : acc,
    [])

  const allAntonyms = definitions.reduce(
    (acc: string[], definition) => definition.antonyms ? acc.concat(definition.antonyms) : acc,
    [])

  return (
    <div className={`flex flex-col gap-y-4`}>
      <PartOfSpeech className={`mb-4`} partOfSpeech={partOfSpeech} />
      <div className={`text-heading-sm text-gray mb-[1px]`}>
        Meaning
      </div>
      <Definitions className={``} definitions={definitions} />
      { (allSynonyms.length > 0) && <Synonyms synonyms={allSynonyms} /> }
      { (allAntonyms.length > 0) && <Synonyms synonyms={allAntonyms} label='Antonyms' /> }
    </div>
  )
}

function Source( { source, className='' }: { source: string, className?: string } ) {
  return (
    <div className={`flex flex-col gap-y-2`}>
      <span className={`text-body-sm underline-offset-2 text-gray`}>
        Source
      </span>
      <div className={`flex flex-row items-center gap-x-[15px]`}>
        <span className={`text-body-sm underline-offset-1`}>
          <Link className={`focusable`} href={source} target='_blank'>
            {source}
          </Link>
        </span>
        <div className={`relative w-[14px] h-full`}>
          <Image src='/images/icon-new-window.svg' alt='Link icon' fill />
        </div>
      </div>
    </div>
  )

}

function WordDetails({ word }: { word: Word}) {
  return (
    <>
      <WordTitle
        className={`mb-8`}
        word={word.word}
        phonetics={word.phonetics}
      />
      <div className={`flex flex-col gap-y-8 mb-8`}>
        {
          word.meanings.map((meaning, idx) =>
            <Meaning
              key={idx}
              partOfSpeech={meaning.partOfSpeech}
              definitions={meaning.definitions}
            />
          )
        }
      </div>
      <div className={`w-full h-px bg-lightgray dark:bg-darkgray mb-6`} />
      { word.sourceUrls && word.sourceUrls.length > 0 && <Source source={word.sourceUrls[0]} /> }
    </>
  )
}

export default function Home() {
  const [word, setWord] = useState<Word|null>(null)

  function onSearch(term: string) {
    fetchWord(term)
  }

  function fetchWord(term: string) {
    const trimmed = term.trim()
    if (trimmed.length === 0) {
      setWord(null)
      return
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${trimmed}`)
      .then(response => response.json())
      .then(data => {
        if (data.title) {
          setWord(null)
          return
        }
        setWord(data[0])
      })
      .catch(error => {
        console.log(error)
        setWord(null)
      })
  }

  return (
    <div className={`flex min-h-screen min-w-fit justify-center bg-white dark:bg-black text-verydarkgray dark:text-white`}>
      <div className={twMerge(
        `flex flex-col`,
        `w-full`,
        `p-6`
        )}>
        <div className={`flex flex-col gap-y-6 mb-[28px]`}>
          <TopBar />
          <Search onChange={debounce(onSearch, 750)} />
        </div>

        { word !== null && <WordDetails word={word} /> }
      </div>
    </div>
  )
}
