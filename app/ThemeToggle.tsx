'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { twMerge } from 'tailwind-merge'
import { useState, useEffect } from 'react'
import { keyDownLikeButton } from '@/app/util'

export default function ThemeToggle() {
  const [ mounted, setMounted ] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className={`w-[72px]`}>
      </div>
    )
  }

  return (
    <div className={`flex flex-row items-center gap-x-3 tablet:gap-x-4`}>
      <div
        className={`relative inline-flex items-center cursor-pointer outline-none group`}
        onClick={() => resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark')}
        onKeyDown={keyDownLikeButton}
        role='button'
        tabIndex={0}
        aria-label={`Toggle color theme to ${resolvedTheme === 'dark' ? 'light' : 'dark'}`}
      >
        <div className={`transition flex flex-row shrink-0 w-10 h-5 bg-gray dark:bg-purple rounded-full p-1 group-focusable`} />
        <div className={twMerge(
          `absolute top-[3px] left-[3px] w-[14px] h-[14px] bg-white rounded-full transition`,
          `${(resolvedTheme === 'dark') && 'translate-x-[20px]'}`,
          `${resolvedTheme}`
        )}
        />
      </div>
      <div className={`relative w-5 h-5 dark:hidden`}>
        <Image src='/images/icon-moon.svg' alt='Moon icon' fill />
      </div>
      <div className={`relative w-5 h-5 hidden dark:block`}>
        <Image src='/images/icon-moon-dark.svg' alt='Moon icon' fill />
      </div>
    </div>
  )
}