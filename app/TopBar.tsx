import Image from 'next/image'
import ThemeToggle from '@/app/ThemeToggle'
import FontSelector from '@/app/FontSelector'

export default function TopBar() {
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