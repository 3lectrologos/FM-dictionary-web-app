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

  if (!mounted) return null

  return (
    <div className={`flex flex-row items-center gap-x-2 tablet:gap-x-4`}>
      <div className={`relative w-4 h-4 dark:hidden tablet:w-6 tablet:h-6`}>
        <Image src='/images/icon-sun-dark.svg' alt='Accessibility icon' fill />
      </div>
      <div className={`relative w-4 h-4 hidden dark:block tablet:w-6 tablet:h-6`}>
        <Image src='/images/icon-sun-light.svg' alt='Accessibility icon' fill />
      </div>
      <div
        className={`relative inline-flex items-center cursor-pointer outline-none group`}
        onClick={() => resolvedTheme === 'dark' ? setTheme('light') : setTheme('dark')}
        onKeyDown={keyDownLikeButton}
        role='button'
        tabIndex={0}
        aria-label={`Toggle color theme to ${resolvedTheme === 'dark' ? 'light' : 'dark'}`}
      >
        <div className={`transition flex flex-row shrink-0 w-8 h-5 bg-purple rounded-full p-1 tablet:w-12 tablet:h-7 group-focusable`} />
        <div className={twMerge(
          `absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition tablet:w-5 tablet:h-5`,
          `${(resolvedTheme === 'dark') && 'translate-x-full'}`,
          `${resolvedTheme}`
        )}
        />
      </div>
      <div className={`relative w-4 h-4 dark:hidden tablet:w-6 tablet:h-6`}>
        <Image src='/images/icon-moon-dark.svg' alt='Accessibility icon' fill />
      </div>
      <div className={`relative w-4 h-4 hidden dark:block tablet:w-6 tablet:h-6`}>
        <Image src='/images/icon-moon-light.svg' alt='Accessibility icon' fill />
      </div>
    </div>
  )
}