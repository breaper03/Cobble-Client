import React from 'react'
import Image from 'next/image'

interface Props {
  params: {
    pokemon: string
  }
}


export default function PokemonPage({ params }: Props) {
  const { pokemon } = params

  return (
    <div>
      <h1 className="font-game text-6xl">Pokemon Page</h1>
      <Image
        key={Math.random()}
        width={200}
        quality={100}
        height={200}
        src={`https://play.pokemonshowdown.com/sprites/ani/${pokemon}.gif`}
        alt={pokemon}
        className="ml-1"
        style={{ imageRendering: 'auto' }}
      />
    </div>
  )
}
