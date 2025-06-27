import React from 'react'
import { ThemeSwitcher } from './theme-switcher';

export const NavBar = () => {
  return (
    <section className='w-full h-12 bg-primary px-24 flex flex-row justify-between items-center gap-3'>
      <h1 className='text-2xl font-game font-bold text-white'>CobbleFinder</h1>
      <h1 className='text-2xl font-bold text-white'>Logo</h1>
      <div className='flex flex-row items-center justify-around'>
        <ThemeSwitcher />
      </div>
    </section>
  )
}
