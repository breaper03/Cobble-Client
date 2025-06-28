"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'


export default function PokemonPage() {
  const idk = usePathname()
  const pokemon = idk.split("/")[2]
  console.log("pokemon", pokemon)
  return (
    <div>
      <h1 className="font-game text-6xl">Pokemon Page</h1>
      <Image
        key={Math.random()}
        width={200}
        quality={100}
        height={200}
        src={`https://play.pokemonshowdown.com/sprites/ani/${pokemon}.gif`}
        alt={pokemon || "pokemon"}
        className="ml-1"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  )
}
