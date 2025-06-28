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
import { Cobblemon, Pokemon } from '@/models/pokemon.model'
import { cobbleAdapter } from '@/adapters/cobble-adapter'

export default function PokemonPage() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
  const [currentCobblemon, setCurrentCobblemon] = useState<Cobblemon | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const pokeResponse = await pokeAdapter.get(`pokemon/${pokemon}`)
        const pokeData: Pokemon = pokeResponse.data
        setCurrentPokemon(pokeData)

        const cobbleResponse = await cobbleAdapter.get(`pokemon/${pokeData.id}`)
        const cobbleData: Cobblemon = cobbleResponse.data
        setCurrentCobblemon(cobbleData)

      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, []) // Asegúrate de que `pokemon` esté definido en el scope



  const idk = usePathname()
  const pokemon = idk.split("/")[2]
  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      {
        !isLoading && currentPokemon && currentCobblemon && (
          <div className='flex flex-row items-center justify-bewteen gap-10 w-full'>
            <div className='flex flex-col items-center justify-center gap-10 min-w-[22%]'>
              <Card className='aspect-square min-w-fit w-full max-w-full h-fit items-center justify-between space-y-3'>
                <CardHeader className='w-full px-1 gap-3'>
                  <CardTitle className='text-center px-0 text-3xl font-game capitalize w-full'>{currentPokemon?.name}</CardTitle>
                  <CardDescription className='flex flex-row items-center justify-center gap-5'>
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
                <CardContent className='w-full flex items-center justify-center h-64 max-h-fit'>
                  <Image
                    key={Math.random()}
                    width={210}
                    quality={100}
                    height={210}
                    draggable={false}
                    src={`https://play.pokemonshowdown.com/sprites/ani/${currentPokemon.name}.gif`}
                    alt={currentPokemon.name || "pokemon"}
                    className="ml-1 w-full min-w-fit max-w-fit h-full min-h-fit max-h-fit"
                    style={{ imageRendering: 'auto' }}
                  />
                </CardContent>
                <CardFooter className='mb-5'>
                  <span className='text-lg font-game'>Spawn in: {currentCobblemon.biomes}</span>
                </CardFooter>
              </Card>
              <Card className='aspect-square min-w-fit w-full max-w-full h-fit items-center justify-between space-y-3'>
                <CardHeader className='w-full px-1 gap-3'>
                  <CardTitle className='text-center px-0 text-3xl font-game capitalize w-full'>{currentPokemon?.name} (Shiny)</CardTitle>
                  <CardDescription className='flex flex-row items-center justify-center gap-5'>
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
                <CardContent className='w-full flex items-center justify-center h-64 max-h-fit'>
                  <Image
                    key={Math.random()}
                    width={210}
                    quality={100}
                    height={210}
                    draggable={false}
                    src={`https://play.pokemonshowdown.com/sprites/ani-shiny/${currentPokemon.name}.gif`}
                    alt={currentPokemon.name}
                    className="ml-1 w-full min-w-fit max-w-fit h-full min-h-fit max-h-fit"
                    style={{ imageRendering: 'auto' }}
                  />
                </CardContent>
                <CardFooter className='mb-5'>
                  <span className='text-lg font-game'>Spawn in: {currentCobblemon.biomes}</span>
                </CardFooter>
              </Card>
            </div>
            <div className='flex flex-row items-center justify-center w-full'>
              Graficos
            </div>
          </div>
        )
      }
    </div>
  )
}
