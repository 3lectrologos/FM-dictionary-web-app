'use client'

import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import ThemeToggle from '@/app/ThemeToggle'
import FontSelector from '@/app/FontSelector'
import { Play } from 'next/dist/compiled/@next/font/dist/google'

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

function Search() {
  return (
    <div className={`relative w-[327px]`}>
      <input
        className={twMerge(
          `w-full h-12 rounded-2xl pl-6 pr-14 text-heading-sm leading-none font-bold`,
          `bg-offwhite dark:bg-offblack text-verydarkgray dark:text-white`,
          `focus:outline-none focus:ring-1 ring-purple`
        )}
        name='search'
        placeholder={`Search for any word...`}
      />
      <div className={`absolute w-[18px] h-[18px] shrink-0 right-6 top-1/2 transform -translate-y-1/2`}>
        <Image src='/images/icon-search.svg' alt='Search icon' fill />
      </div>
    </div>
  )
}

function PlayButton() {
  return (
    <div className={`relative w-12 h-12 rounded-full transition bg-purple/25 hover:transition hover:bg-purple group cursor-pointer`}>
      <Image className={`rounded-full transition-opacity group-hover:transition-opacity group-hover:opacity-0`} src={`/images/icon-play.svg`} alt={`Play icon`} fill />
      <Image className={`rounded-full transition-opacity opacity-0 group-hover:block group-hover:transition-opacity group-hover:opacity-100`} src={`/images/icon-play-white.svg`} alt={`Play icon`} fill />
    </div>
  )
}

function WordTitle({ word, pronunciation }: { word: string, pronunciation: string }) {
  return (
    <div className={`flex flex-row justify-between items-center`}>
      <div className={`flex flex-col gap-y-2`}>
        <span className={`text-heading-lg`}>
          {word}
        </span>
        <span className={`text-heading-md text-purple`}>
          {pronunciation}
        </span>
      </div>
      <PlayButton />
    </div>
  )
}

function PartOfSpeech({ partOfSpeech, className='' }: { partOfSpeech: string, className?: string}) {
  return (
    <div className={twMerge(
      `flex flex-row w-full gap-x-4 items-center`,
      `${className}`
    )}>
      <span className={twMerge(
        `text-heading-md`,
        `!font-bold italic`
      )}>
        {partOfSpeech}
      </span>
      <span className={`h-px w-full bg-lightgray dark:bg-darkgray`} />
    </div>
  )
}

function Synonyms({ synonyms }: { synonyms?: string[] }) {
  return (
    <div className={`flex flex-row gap-x-4`}>
      <span
        className={twMerge(
          `text-heading-sm text-gray`,
          `!leading-[1.5]`
        )}
      >
        Synonyms
      </span>
      <div className={`flex flex-row flex-wrap gap-x-4`}>
        {
          synonyms?.map((synonym, idx) =>
            <span
              className={twMerge(
                `text-heading-md text-purple`,
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

function Meanings({ meanings, className='' }: { meanings: Meaning[], className?: string }) {
  return (
    <ul className={twMerge(
      `flex flex-col gap-y-[13px]`,
      `${className}`
      )}
    >
      {
        meanings.map((meaning, idx) =>
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
            <div className={`flex flex-col gap-y-[13px]`}>
                <span>
                  {meaning.definition}
                </span>
              {
                meaning.example &&
                <span className={`text-gray`}>
                    “{meaning.example}”
                  </span>
              }
            </div>
          </li>
        )
      }
    </ul>
  )
}

function WordDetail({ partOfSpeech, meanings, synonyms }: { partOfSpeech: string, meanings: Meaning[], synonyms?: string[] }) {
  return (
    <div>
      <PartOfSpeech className={`mb-8`} partOfSpeech={partOfSpeech} />
      <div className={`text-heading-sm text-gray mb-[17px]`}>
        Meaning
      </div>
      <Meanings className={`mb-7`}
        meanings={meanings} />
      { synonyms && (synonyms.length > 0) && <Synonyms synonyms={synonyms} /> }
    </div>
  )
}

type Word = {
  word: string,
  pronunciation: string,
  details: WorldDetail[]
}

type WorldDetail = {
  partOfSpeech: string,
  meanings: Meaning[],
  synonyms?: string[]
}

type Meaning = {
  definition: string,
  example?: string
}

const word: Word = {
  word: `keyboard`,
  pronunciation: `/ˈkiːbɔːd/`,
  details: [
    {
      partOfSpeech: `noun`,
      meanings: [
        { definition: '(etc.) A set of keys used to operate a typewriter, computer etc.' },
        { definition: 'A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.' },
        { definition: 'A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.' }
      ],
      synonyms: ['electronic keyboard', 'synthesizer', 'piano', 'organ', 'clavier', 'manual']
    },
    {
      partOfSpeech: `verb`,
      meanings: [
        {
          definition: 'To type on a computer keyboard.',
          example: 'Keyboarding is the part of this job I hate the most.'
        }
      ]
    }
  ]
}
const source = 'https://en.wiktionary.org/wiki/keyboard'

function Source( { source, className='' }: { source: string, className?: string } ) {
  return (
    <div className={`flex flex-col gap-y-2`}>
      <span className={`text-body-sm underline-offset-2 text-gray`}>
        Source
      </span>
      <div className={`flex flex-row items-center gap-x-[9px]`}>
        <span className={`text-body-sm underline-offset-1`}>
          {source}
        </span>
        <div className={`relative w-[14px] h-full`}>
          <Image src='/images/icon-new-window.svg' alt='Link icon' fill />
        </div>
      </div>
    </div>
  )

}

export default function Home() {
  return (
    <div className={`flex min-h-screen min-w-fit justify-center bg-white dark:bg-black text-verydarkgray dark:text-white`}>
      <div className={twMerge(
        `flex flex-col`,
        `w-full`,
        `p-6`
        )}>
        <div className={`flex flex-col gap-y-6 mb-8`}>
          <TopBar />
          <Search />
          <WordTitle word={word.word} pronunciation={word.pronunciation} />
        </div>
        <div className={`flex flex-col gap-y-8`}>
        {
          word.details.map((detail, idx) =>

              <WordDetail
                key={idx}
                partOfSpeech={detail.partOfSpeech}
                meanings={detail.meanings}
                synonyms={detail.synonyms}
              />
          )
        }
        </div>
        <div className={`w-full h-px bg-lightgray dark:bg-darkgray mb-6`} />
        <Source source={source} />
      </div>
    </div>
  )
}
