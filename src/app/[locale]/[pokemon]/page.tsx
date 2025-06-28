"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { pokeAdapter } from '@/adapters/poke-adapter'
import { Pokemon } from '@/models/pokemon.model'

export default function PokemonPage() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setisLoading] = useState<boolean>(false)
  useEffect(() => {
    setisLoading(true)
    const get = async () => {
      const pokeget: Promise<Pokemon> = await pokeAdapter.get(`pokemon/${pokemon}`)
        .then((res) => {
          console.log(`res.data`, res.data)
          return res.data
        })
        .catch((err) => {
          console.log(`err`, err)
          return err
        })
      return pokeget
    }

    get()
      .then((res) => {
        setCurrentPokemon(res)
        setisLoading(false)
      })
      .catch((err) => {
        console.log(`err`, err)
        setisLoading(false)
      })
  }, [])

  const idk = usePathname()
  const pokemon = idk.split("/")[2]
  console.log("pokemon", pokemon)
  return (
    <div>
      {
        !isLoading && currentPokemon && (
          <div className='flex flex-row ictems-center justify-center gap-10 w-full'>
            <Card className='aspect-square w-full h-fit items-center justify-center'>
              <CardHeader className='w-full'>
                <CardTitle className='text-center px-0 text-4xl font-game capitalize'>{currentPokemon?.name}</CardTitle>
                <CardDescription>
                  {currentPokemon.types.map((t: any) => (
                    <Image
                      key={t.type.name}
                      width={40}
                      height={40}
                      src={`https://play.pokemonshowdown.com/sprites/types/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.png`}
                      alt={t.type.name}
                      className="ml-1"
                    />
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  key={Math.random()}
                  width={200}
                  quality={100}
                  height={200}
                  src={`https://play.pokemonshowdown.com/sprites/ani/${currentPokemon.name}.gif`}
                  alt={currentPokemon.name || "pokemon"}
                  className="ml-1"
                  style={{ imageRendering: 'auto' }}
                />
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
            <Card className='aspect-square w-full h-fit items-center justify-center'>
              <CardHeader className='w-full'>
                <CardTitle className='text-center px-0 text-4xl font-game capitalize'>{currentPokemon?.name} (Shiny)</CardTitle>
                <CardDescription>
                  {currentPokemon.types.map((t: any) => (
                    <Image
                      key={t.type.name}
                      width={40}
                      height={40}
                      src={`https://play.pokemonshowdown.com/sprites/types/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.png`}
                      alt={t.type.name}
                      className="ml-1"
                    />
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  key={Math.random()}
                  width={200}
                  quality={100}
                  height={200}
                  src={`https://play.pokemonshowdown.com/sprites/ani-shiny/${currentPokemon.name}.gif`}
                  alt={currentPokemon.name || "pokemon"}
                  className="ml-1"
                  style={{ imageRendering: 'auto' }}
                />
              </CardContent>
              <CardFooter>
                <p>Card Footer</p>
              </CardFooter>
            </Card>
          </div>
        )
      }

    </div>
  )
}
