"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pokeAdapter } from "@/adapters/poke-adapter";
import { Cobblemon, Pokemon } from "@/models/pokemon.model";
import { cobbleAdapter } from "@/adapters/cobble-adapter";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { set } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { PokemonImage } from './components/pokemon-image';
import { PokemonStats } from "./components/pokemon-stats";
import { PokemonTypes } from "./components/pokemon-types";

type Effectiveness = {
  name: string;
  multiplier: string; // "x2", "x0.5", "x0", etc.
};

const chartConfig = {
  desktop: {
    label: "value",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export default function PokemonPage() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [currentCobblemon, setCurrentCobblemon] = useState<Cobblemon | null>(
    null,
  );
  const [weakAgainst, setWeakAgainst] = useState<Effectiveness[]>();
  const [strongAgainst, setStrongAgainst] = useState<Effectiveness[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showShiny, setShowShiny] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const pokeResponse = await pokeAdapter.get(`pokemon/${pokemon}`);
        const pokeData: Pokemon = pokeResponse.data;
        setCurrentPokemon(pokeData);

        const cobbleResponse = await cobbleAdapter.get(
          `pokemon/${pokeData.id}`,
        );
        const cobbleData: Cobblemon = cobbleResponse.data;
        setCurrentCobblemon(cobbleData);

        getPokemonTypeEffectiveness().then((res) => {
          console.log("Weak Against:", res.weakAgainst);
          setWeakAgainst(res.weakAgainst);
          setStrongAgainst(res.strongerAgainst);
          console.log("Stronger Against:", res.strongerAgainst);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Asegúrate de que `pokemon` esté definido en el scope

  const idk = usePathname();
  const pokemon = idk.split("/")[2];

  const getPokemonTypeEffectiveness = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`,
      );
      const types = res.data.types.map((t: any) => t.type.name);

      const typePromises = types.map((type: string) =>
        axios.get(`https://pokeapi.co/api/v2/type/${type}`),
      );
      const typeResponses = await Promise.all(typePromises);

      const effectiveness: Record<string, number> = {};

      for (const typeResponse of typeResponses) {
        const relations = typeResponse.data.damage_relations;

        const applyEffect = (types: any[], multiplier: number) => {
          types.forEach((t: any) => {
            const name = t.name;
            effectiveness[name] = (effectiveness[name] || 1) * multiplier;
          });
        };

        applyEffect(relations.double_damage_from, 2);
        applyEffect(relations.half_damage_from, 0.5);
        applyEffect(relations.no_damage_from, 0);
      }

      const weakAgainst: Effectiveness[] = [];
      const strongerAgainst: Effectiveness[] = [];

      for (const [type, multiplier] of Object.entries(effectiveness)) {
        if (multiplier === 2)
          weakAgainst.push({ name: type, multiplier: "x2" });
        else if (multiplier === 4)
          weakAgainst.push({ name: type, multiplier: "x4" });
        else if (multiplier === 0.5)
          strongerAgainst.push({ name: type, multiplier: "x0.5" });
        else if (multiplier === 0.25)
          strongerAgainst.push({ name: type, multiplier: "x0.25" });
        else if (multiplier === 0)
          strongerAgainst.push({ name: type, multiplier: "immune" });
      }

      return {
        weakAgainst,
        strongerAgainst,
      };
    } catch (error) {
      console.error("Error fetching Pokémon types:", error);
      return {
        weakAgainst: [],
        strongerAgainst: [],
      };
    }
  };

  return (
    <div className="flex items-center justify-center oveflow-hidden">
      {!isLoading &&
        currentPokemon &&
        currentCobblemon &&
        strongAgainst &&
        weakAgainst && (
          // <div className='flex flex-row items-center justify-bewteen gap-10 w-full'>
          //   <div className='flex flex-col items-center justify-center gap-10 overflow-hidden h-full min-w-[50%] bg-red-300'>
          //     <div className="flex flex-row items-center justify-center h-full">
          //       <PokemonImage currentPokemon={currentPokemon} />
          //     </div>
          //   </div>
          //   <div className='flex flex-col items-center justify-center h-full w-full'>
          //     <div className='w-full bg-red-300 h-full grid-cols-2 grid-rows-2 grid gap-5 items-center justify-center'>
          //       <PokemonStats currentPokemon={currentPokemon} />
          //       <PokemonTypes strongAgainst={strongAgainst} weakAgainst={weakAgainst} />
          //     </div>
          //   </div>
          // </div>
          <div className="grid grid-cols-2 items-center justify-center h-full w-full gap-5 bg-amber-300 border-2 border-green-300 overflow-hidden">
            <PokemonImage currentPokemon={currentPokemon} />
          </div>
        )}
    </div>
  );
}
