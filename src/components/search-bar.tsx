"use client"

import { useState, useEffect, useRef } from "react"
import { pokeAdapter } from "@/adapters/poke-adapter"
import { cobbleAdapter } from "@/adapters/cobble-adapter"
import { Cobblemon, TypeEntry } from "@/models/pokemon.model"
import Image from "next/image"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sprites, Pokemon } from '../models/pokemon.model';
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "./ui/input"
import { Button } from "./ui/button"


export const SearchBar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [cobblemons, setCobblemons] = useState<Cobblemon[] | null>(null)
  const [pokemons, setPokemons] = useState<any[] | null>(null)
  const [value, setValue] = useState("")
  const [view, setView] = useState<number>(1)

  const abortRef = useRef<AbortController | null>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const router = useRouter()

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      fetchPokemons(value)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [value])

  const fetchPokemons = async (search: string) => {
    if (search.trim() === "") {
      setCobblemons(null)
      setPokemons(null)
      return
    }

    setIsLoading(true)

    // Cancelar búsqueda anterior si existe
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    try {
      // 1. Buscar desde tu backend (cobblemons)
      const res = await cobbleAdapter.get(
        `pokemon/search?q=${search}&page=1&limit=30`,
        { signal: controller.signal }
      )

      const cobbleResults: Cobblemon[] = res.data.results
      setCobblemons(cobbleResults)

      // 2. Obtener info real desde pokeapi
      const fullPokemons = await Promise.all(
        cobbleResults.map(async (pokemon) => {
          try {
            const { data }: { data: Pokemon } = await pokeAdapter.get("pokemon/" + pokemon.Pokemon)
            console.log("res.data", data.types.map((type: TypeEntry) => type.type.name))
            return data
          } catch (err) {
            console.error("Error al obtener detalles de", pokemon.Pokemon)
            return null
          }
        })
      )

      setPokemons(fullPokemons.filter(Boolean)) // eliminar nulls
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Petición cancelada")
      } else {
        console.error("Error al buscar pokemones", err)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (

    <section className="w-full h-full flex flex-col items-center justify-center gap-10 px-24 mb-10">
      <Button variant="ghost" size="sm" onClick={() => setView(view === 0 ? 1 : 0)}>Change View</Button>
      {
        view === 0 ? (
          <Command>
            <CommandInput
              placeholder="Search Pokemons..."
              className="h-9"
              value={value}
              onValueChange={setValue}
            />
            <CommandList className="max-h-full">
              {isLoading && <CommandEmpty>Loading...</CommandEmpty>}

              {!isLoading && value.trim() !== "" && (!pokemons || pokemons.length === 0) && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {pokemons !== null && (
                <CommandGroup>
                  {pokemons.map((poke) => (
                    <CommandItem
                      key={poke.id}
                      value={poke.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                      }}
                      className="focus:bg-chart-2"
                    >
                      <div className="cursor-pointer flex items-center gap-2 justify-between w-full" onClick={() => router.push(`/${poke.name}`)}>
                        <div className="flex items-center gap-2 ">
                          <Image width={50} height={50} src={poke.sprites.front_default} alt={poke.name} />
                          <span className="font-semibold font-game text-xl">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {poke.types.map((t: any) => (
                            <Image
                              key={t.type.name}
                              width={40}
                              height={40}
                              src={`https://play.pokemonshowdown.com/sprites/types/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.png`}
                              alt={t.type.name}
                              className="ml-1"
                            />
                          ))}
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>


        ) : (
          <>
            <Input
              placeholder="Search Pokemons..."
              className="h-9 w-1/2 border-chart-2/10"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 w-full">
              {
                pokemons !== null && (
                  pokemons.map((poke) => (
                    <div key={poke.id} className="cursor-pointer w-full aspect-square items-center justify-center flex flex-col bg-chart-2/10 hover:bg-chart-2/20 transition-colors rounded-lg p-2" onClick={() => router.push(`/${poke.name}`)}>
                      <Image width={150} height={150} src={poke.sprites.front_default} alt={poke.name} />
                      <span className="font-semibold font-game text-3xl">{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</span>
                      <div className="flex items-center gap-2">
                        {poke.types.map((t: any) => (
                          <Image
                            key={t.type.name}
                            width={43}
                            height={43}
                            src={`https://play.pokemonshowdown.com/sprites/types/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.png`}
                            alt={t.type.name}
                            className="ml-1"
                          />
                        ))}
                      </div>
                    </div>
                  )))
              }
            </div>

          </>
        )
      }
    </section >
  )
}
