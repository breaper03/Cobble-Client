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

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import axios from 'axios'
import { set } from 'date-fns'


type Effectiveness = {
  name: string
  multiplier: string // "x2", "x0.5", "x0", etc.
}

const chartConfig = {
  desktop: {
    label: "value",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig

export default function PokemonPage() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null)
  const [currentCobblemon, setCurrentCobblemon] = useState<Cobblemon | null>(null)
  const [weakAgainst, setWeakAgainst] = useState<Effectiveness[]>()
  const [strongAgainst, setStrongAgainst] = useState<Effectiveness[]>()
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

        getPokemonTypeEffectiveness().then((res) => {
          console.log("Weak Against:", res.weakAgainst)
          setWeakAgainst(res.weakAgainst)
          setStrongAgainst(res.strongerAgainst)
          console.log("Stronger Against:", res.strongerAgainst)
        })

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

  const getPokemonTypeEffectiveness = async () => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
      const types = res.data.types.map((t: any) => t.type.name)

      const typePromises = types.map((type: string) =>
        axios.get(`https://pokeapi.co/api/v2/type/${type}`)
      )
      const typeResponses = await Promise.all(typePromises)

      const effectiveness: Record<string, number> = {}

      for (const typeResponse of typeResponses) {
        const relations = typeResponse.data.damage_relations

        const applyEffect = (types: any[], multiplier: number) => {
          types.forEach((t: any) => {
            const name = t.name
            effectiveness[name] = (effectiveness[name] || 1) * multiplier
          })
        }

        applyEffect(relations.double_damage_from, 2)
        applyEffect(relations.half_damage_from, 0.5)
        applyEffect(relations.no_damage_from, 0)
      }

      const weakAgainst: Effectiveness[] = []
      const strongerAgainst: Effectiveness[] = []

      for (const [type, multiplier] of Object.entries(effectiveness)) {
        if (multiplier === 2) weakAgainst.push({ name: type, multiplier: "x2" })
        else if (multiplier === 4) weakAgainst.push({ name: type, multiplier: "x4" })
        else if (multiplier === 0.5) strongerAgainst.push({ name: type, multiplier: "x0.5" })
        else if (multiplier === 0.25) strongerAgainst.push({ name: type, multiplier: "x0.25" })
        else if (multiplier === 0) strongerAgainst.push({ name: type, multiplier: "immune" })
      }

      return {
        weakAgainst,
        strongerAgainst,
      }

    } catch (error) {
      console.error("Error fetching Pokémon types:", error)
      return {
        weakAgainst: [],
        strongerAgainst: [],
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-full w-full'>
      {
        !isLoading && currentPokemon && currentCobblemon && strongAgainst && weakAgainst && (
          <div className='flex flex-row items-center justify-bewteen gap-10 w-full'>
            <div className='flex flex-col items-center justify-center gap-10 overflow-hidden min-w-[22%]'>
              {/* NORMAL */}
              <Card
                className='aspect-square w-full h-fit items-center justify-between py-1 px-0.5 overflow-hidden space-y-0 gap-2'
                key={Math.random()}
              >
                <CardHeader className='w-full flex flex-col items-center justify-center px-1 gap-3 mt-8'>
                  <CardTitle className='text-center px-0 text-3xl font-game capitalize w-full'>{currentPokemon?.name}</CardTitle>
                  <CardDescription className='flex flex-row items-center justify-center gap-5'>
                    {currentPokemon.types.map((t: any) => (
                      <Image
                        key={t.type.name}
                        width={40}
                        height={40}
                        src={`https://play.pokemonshowdown.com/sprites/types/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.png`}
                        // src={`https://img.pokemondb.net/artwork/large/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.jpg`}
                        alt={t.type.name}
                        className="ml-1"
                      />
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-center w-full h-full'>
                  <Image
                    key={Math.random()}
                    width={100}
                    quality={100}
                    height={100}
                    draggable={false}
                    // src={`https://play.pokemonshowdown.com/sprites/ani/${poke.name}.gif`}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`}
                    style={{ imageRendering: 'pixelated', objectFit: "cover", width: "77%", height: "77%", margin: "auto" }}
                    alt={currentPokemon.name}
                  />
                </CardContent>
              </Card>
              {/* SHINY */}
              <Card
                className='aspect-square w-full h-fit items-center justify-between py-1 px-0.5 overflow-hidden space-y-0 gap-2'
                key={currentPokemon.id}
              >
                <CardHeader className='w-full flex flex-col items-center justify-center px-1 gap-3 mt-8'>
                  <CardTitle className='text-center px-0 text-3xl font-game capitalize w-full'>{currentPokemon?.name}</CardTitle>
                  <CardDescription className='flex flex-row items-center justify-center gap-5'>
                    {currentPokemon.types.map((t: any) => (
                      <Image
                        key={t.type.name}
                        width={40}
                        height={40}
                        src={`https://play.pokemonshowdown.com/sprites/types/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.png`}
                        // src={`https://img.pokemondb.net/artwork/large/${t.type.name[0].toUpperCase() + t.type.name.slice(1)}.jpg`}
                        alt={t.type.name}
                        className="ml-1"
                      />
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-center w-full h-full'>
                  <Image
                    key={Math.random()}
                    width={100}
                    quality={100}
                    height={100}
                    draggable={false}
                    // src={`https://play.pokemonshowdown.com/sprites/ani/${poke.name}.gif`}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currentPokemon.id}.png`}
                    style={{ imageRendering: 'pixelated', objectFit: "cover", width: "77%", height: "77%", margin: "auto" }}
                    alt={currentPokemon.name}
                  />
                </CardContent>
              </Card>
            </div>
            <div className='flex flex-col items-center justify-center h-full w-full'>
              <div className='w-full bg-red-300 h-full grid-cols-2 grid-rows-2 grid gap-5 items-center justify-center'>
                <Card className='w-full h-fit'>
                  <CardHeader>
                    <CardTitle>Stats</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className='border-2 border-red-300 w-full'>
                    <ChartContainer config={chartConfig}>
                      <BarChart
                        className='border-2 border-red-300  w-full'
                        accessibilityLayer
                        data={currentPokemon.stats.map((s: any) => ({
                          name: s.stat.name.includes("special")
                            ? `${"Sp. " + s.stat.name.split("-")[1].split('')[0].toUpperCase() + s.stat.name.split("-")[1].slice(1, s.stat.name.split('-').length + 10).toLowerCase()}`
                            : s.stat.name,
                          value: s.base_stat
                        }))}
                        layout="vertical"
                      >
                        <XAxis type="number" dataKey="value" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          style={{ fontSize: 12, fontWeight: "bold", color: "var(--color-desktop)", whiteSpace: "nowrap", width: "100%" }}
                          tickLine={false}
                          // tickMargin={10}
                          axisLine={false}
                          className='capitalize'
                        />
                        <Bar dataKey="value" fill="var(--color-desktop)" height={1} width={1} radius={5} label={{ position: "right" }} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                <Card className='w-full h-fit'>
                  <CardHeader>
                    <CardTitle>Strong / Weaknesses</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className='border-2 border-red-300 w-full'>
                    <div className={`flex flex-row items-center justify-between gap-2 capitalize w-full mb-10`}>
                      {strongAgainst?.map(v => (
                        <div className='flex flex-col items-center text-right justify-start gap-0' key={Math.random()}>
                          <Image
                            key={Math.random()}
                            width={40}
                            quality={100}
                            height={40}
                            draggable={false}
                            src={`https://play.pokemonshowdown.com/sprites/types/${v.name[0].toUpperCase() + v.name.slice(1)}.png`}
                            alt={v.name}
                            className="ml-1"
                          />
                          {/* <span className='text-lg font-game'>{v.name}</span> */}
                          <span className='text-lg font-game'>{v.multiplier}</span>
                        </div>
                      ))}
                    </div>
                    <div className={`flex flex-row items-center justify-between gap-2 capitalize w-full mb-10`}>
                      {weakAgainst?.map(v => (
                        <div className='flex flex-col items-center text-right justify-start gap-0' key={Math.random()}>
                          <Image
                            key={Math.random()}
                            width={40}
                            quality={100}
                            height={40}
                            draggable={false}
                            src={`https://play.pokemonshowdown.com/sprites/types/${v.name[0].toUpperCase() + v.name.slice(1)}.png`}
                            alt={v.name}
                            className="ml-1"
                          />
                          <span className='text-lg font-game'>{v.multiplier}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
