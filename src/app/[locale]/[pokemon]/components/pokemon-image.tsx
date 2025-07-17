import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  currentPokemon: any;
}

export const PokemonImage = ({ currentPokemon }: Props) => {
  const [showShiny, setShowShiny] = useState<boolean>(false);
  return (
    <Card
      className="aspect-square w-full h-fit items-center justify-between py-1 px-0.5 overflow-hidden space-y-0 gap-2"
      key={Math.random()}
    >
      <CardHeader className="w-full flex flex-col items-center justify-center px-1 gap-3 mt-8">
        <CardTitle className="text-center px-0 text-3xl font-game capitalize w-full">
          {currentPokemon?.name}
        </CardTitle>
        <CardDescription className="flex flex-row items-center justify-center gap-5">
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
      <CardContent className="flex items-center justify-center w-full h-full">
        <Image
          key={Math.random()}
          width={100}
          quality={100}
          height={100}
          draggable={false}
          // src={`https://play.pokemonshowdown.com/sprites/ani/${poke.name}.gif`}
          src={
            !showShiny
              ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`
              : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currentPokemon.id}.png`
          }
          style={{
            imageRendering: "pixelated",
            objectFit: "cover",
            width: "77%",
            height: "77%",
            margin: "auto",
          }}
          alt={currentPokemon.name}
        />

        <Switch id="shiny" checked={showShiny} onCheckedChange={setShowShiny} />
        <Label htmlFor="airplane-mode">Shiny Mode</Label>
      </CardContent>
    </Card>
  );
};
