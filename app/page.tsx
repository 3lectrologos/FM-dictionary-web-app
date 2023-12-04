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

function Meaning({ partOfSpeech, meanings, synonyms }: { partOfSpeech: string, meanings: string[], synonyms?: string[] }) {
  return (
    <>
      <PartOfSpeech className={`mb-8`} partOfSpeech={partOfSpeech} />
      <div className={`text-heading-sm text-gray mb-[17px]`}>
        Meaning
      </div>
      <ul className={`flex flex-col gap-y-[13px] list-disc marker:text-darkpurple list-outside pl-2 mb-5`}>
        {
          meanings.map((meaning, idx) =>
            <li className={twMerge(
              `text-body-md pl-[18px]`,
              `marker:content-['•']`
            )}
              key={idx}>
              {meaning}
            </li>
          )
        }
      </ul>
      { synonyms && (synonyms.length > 0) && <Synonyms synonyms={synonyms} /> }
    </>
  )
}

const partOfSpeech = `noun`
const meanings = [
  '(etc.) A set of keys used to operate a typewriter, computer etc.',
  'A component of many instruments including the piano, organ, and harpsichord consisting of usually black and white keys that cause different tones to be produced when struck.',
  'A device with keys of a musical keyboard, used to control electronic sound-producing devices which may be built into or separate from the keyboard device.'
]
const synonyms = ['electronic keyboard', 'synthesizer', 'piano', 'organ', 'clavier', 'manual']

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
          <WordTitle word={`keyboard`} pronunciation={`/ˈkiːbɔːd/`} />
        </div>
        <Meaning
          partOfSpeech={partOfSpeech}
          meanings={meanings}
          synonyms={synonyms}
        />
      </div>
    </div>
  )
}
