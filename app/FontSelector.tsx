'use client'

import { twMerge } from 'tailwind-merge'
import Image from 'next/image'
import { useEffect, useState } from 'react'

enum FontFamily {
  sans = 'sans',
  serif = 'serif',
  mono = 'mono'
}
const fontFamilyList = Object.values(FontFamily)
const fontFamilyNames = ['Sans Serif', 'Serif', 'Monospace']

export default function FontSelector() {
  const [selectedFont, setSelectedFont] = useState<FontFamily>(FontFamily.sans)
  const [active, setActive] = useState(false)

  useEffect(() => {
    document.body.classList.remove('font-sans', 'font-serif', 'font-mono')
    document.body.classList.add(`font-${selectedFont}`)
  }, [selectedFont])

  return (
    <div className={`relative`}>
      <button
        className={`flex flex-row gap-x-4 focusable`}
        role='combobox'
        aria-labelledby='select button'
        aria-haspopup='listbox'
        aria-expanded='false'
        aria-controls='select-dropdown'
        onClick={() => setActive(!active)}
      >
        <span
          className={twMerge(
            `focusable cursor-pointer appearance-none pr-0`,
            `text-[14px] font-bold leading-[24px] tablet:text-[18px] active:bg-none`,
          )}
        >
          {fontFamilyNames[fontFamilyList.indexOf(selectedFont)]}
        </span>
        <span className={`relative w-3 h-3 right-0 top-1/2 transform translate-y-1/2`}>
          <Image src='/images/icon-arrow-down.svg' alt='Arrow down icon' fill />
        </span>
      </button>
      <ul
        className={twMerge(
          `flex flex-col gap-y-4 absolute top-[100%] right-0 list-none mt-[18px] p-6 rounded-2xl z-50`,
          `text-[14px] font-bold leading-[160%] tablet:text-[18px] tablet:leading-[133%]`,
          `bg-white dark:bg-offblack shadow-dropdown-light dark:shadow-dropdown-dark`,
          `${active ? 'visible' : 'hidden'}`,
          `w-[153px] tablet:w-[183px]`
        )}
        role='listbox'
        id='select-dropdown'
      >{
        fontFamilyNames.map((option, idx) => (
          <li className={`transition hover:transition hover:text-purple cursor-pointer font-${fontFamilyList[idx]}`}
              onClick={() => {
                setSelectedFont(fontFamilyList[idx])
                setActive(false)
              }}
              key={option}
              role='option'>
            <input
              className={`absolute left-0 invisible`}
              type='radio' name={option} id={option}
            />
            <label className={`cursor-pointer`}
                   htmlFor={option}
            >
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}