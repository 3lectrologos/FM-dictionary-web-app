'use client'

import Image from 'next/image'
import { twJoin, twMerge } from 'tailwind-merge'
import { debounce } from 'lodash'
import { useState } from 'react'
import { Definition, Phonetics, Meaning, Word, ErrorResult } from '@/app/types'
import Link from 'next/link'
import { MoonLoader } from 'react-spinners'
import PlayButton from '@/app/PlayButton'
import TopBar from '@/app/TopBar'

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

function Synonyms({ synonyms, label='Synonyms', className='' }: { synonyms: string[], label?: string, className?: string }) {
  return (
    <div className={twMerge(
      `flex flex-row gap-x-4`,
      `${className}`
    )}>
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

function Meaning({ meaning }: { meaning: Meaning }) {
  return (
    <div className={`flex flex-col gap-y-4`}>
      <PartOfSpeech className={`mb-4`} partOfSpeech={meaning.partOfSpeech} />
      <div className={`text-heading-sm text-gray mb-[1px]`}>
        Meaning
      </div>
      <Definitions className={``} definitions={meaning.definitions} />
      { meaning.synonyms && (meaning.synonyms.length > 0) &&
        <Synonyms className={`mt-2`} synonyms={meaning.synonyms} /> }
      { meaning.antonyms && (meaning.antonyms.length > 0) &&
        <Synonyms className={`mt-2`} synonyms={meaning.antonyms} label='Antonyms' /> }
    </div>
  )
}

function Source( { source, className='' }: { source: string, className?: string } ) {
  return (
    <div className={twMerge(
      `flex flex-col gap-y-2`,
      `${className}`
    )}>
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
              meaning={meaning}
            />
          )
        }
      </div>
      <div className={`w-full h-px bg-lightgray dark:bg-darkgray mb-6`} />
      { word.sourceUrls && word.sourceUrls.length > 0 && <Source source={word.sourceUrls[0]} /> }
    </>
  )
}

function ErrorMessage({ error }: { error: ErrorResult }) {
  return (
    <div className={`flex flex-col items-center text-center mt-24`}>
      <span className={`text-heading-lg mb-8 font-noto`}>
        😕
      </span>
      <span className={`text-heading-sm !font-bold mb-4`}>
        {error.title}
      </span>
      <span className={`text-body-sm !no-underline !leading-[1.33] text-gray`}>
        {error.message} {error.resolution}
      </span>
    </div>
  )
}

function EmptyMessage() {
  return (
    <div className={`flex flex-col items-center text-center mt-24`}>
      <span className={`text-heading-lg mb-8 font-noto invisible`}>
        😕
      </span>
      <span className={`text-heading-sm !font-bold mb-4`}>
        Search dictionary
      </span>
      <span className={`text-body-sm !no-underline !leading-[1.33] text-gray`}>
        Type in a word in the search bar above to get started!
      </span>
    </div>
  )
}

export default function Home() {
  const [word, setWord] = useState<Word|null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ErrorResult|null>(null)

  async function onSearch(term: string) {
    if (loading) return
    setLoading(true)
    setWord(null)
    setError(null)

    const trimmed = term.trim()
    if (trimmed.length === 0) {
      setLoading(false)
      return
    }

    await new Promise(r => setTimeout(r, 500))
    await fetchWord(trimmed)
    setLoading(false)
  }

  async function fetchWord(term: string) {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`)
      .then(response => response.json())
      .then(data => {
        if (data.title) {
          setWord(null)
          setError(data)
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
          <Search onChange={debounce(onSearch, 1000)} />
        </div>
        { loading &&
          <div className={`flex justify-center items-center w-full h-full`}>
            <MoonLoader
              color={`#A445ED`}
              size={128}
            />
          </div> }
        { word !== null && <WordDetails word={word} /> }
        { error !== null && <ErrorMessage error={error} /> }
        { word === null && error === null && !loading && <EmptyMessage /> }
      </div>
    </div>
  )
}
