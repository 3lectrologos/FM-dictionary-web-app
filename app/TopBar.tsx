import Image from 'next/image'
import ThemeToggle from '@/app/ThemeToggle'
import FontSelector from '@/app/FontSelector'
import { twMerge } from 'tailwind-merge'

export default function TopBar({ className='' }: { className?: string }) {
  return (
    <div className={twMerge(
      `w-full flex flex-row justify-between items-center`,
      `${className}`
    )}>
      <div className={`relative w-[38px] h-[38px]`}>
        <Image src='/images/logo.svg' alt='Logo' fill />
      </div>
      <div className={`flex flex-row gap-x-4 items-center tablet:gap-x-6`}>
        <FontSelector />
        <div className={`w-px h-8 bg-lightgray`} />
        <ThemeToggle />
      </div>
    </div>
  )
}