import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import React, { useState } from "react";
import { set } from "date-fns";
import { cn } from "@/lib/utils";

interface Props {
  currentPokemon: any;
  showShiny: boolean;
  setShowShiny: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PokemonImage = ({
  currentPokemon,
  showShiny = false,
  setShowShiny,
}: Props) => {
  return (
    <Card className="flex flex-col justify-around w-full h-full gap-1 m-0 p-2 aspect-[8/3]">
      <CardHeader className="text-center capitalize text-4xl font-game">
        <CardTitle>{currentPokemon.name}</CardTitle>
      </CardHeader>
      <CardDescription className="flex flex-row items-center justify-center w-full h-fit">
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
      <CardContent>
        <Carousel
          className="w-full place-self-center rounded-md p-0"
          opts={{
            loop: true,
            dragFree: false,
            dragThreshold: 50,
            containScroll: "keepSnaps",
          }}
        >
          <CarouselContent className="p-0">
            <CarouselItem
              key={Math.random()}
              className="p-0 w-fit h-fit hover:scale-110 transition-all"
            >
              <div>
                <Image
                  key={Math.random()}
                  width={100}
                  quality={100}
                  height={100}
                  draggable={false}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`}
                  style={{
                    imageRendering: "pixelated",
                    objectFit: "cover",
                    width: "70%",
                    height: "70%",
                    margin: "auto",
                  }}
                  alt={currentPokemon.name}
                />
              </div>
            </CarouselItem>
            <CarouselItem key={Math.random()} className="p-0">
              <div>
                <Image
                  key={Math.random()}
                  width={100}
                  quality={100}
                  height={100}
                  draggable={false}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${currentPokemon.id}.png`}
                  style={{
                    imageRendering: "pixelated",
                    objectFit: "cover",
                    width: "70%",
                    height: "70%",
                    margin: "auto",
                  }}
                  alt={currentPokemon.name}
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselNext
            text={!showShiny ? "Shiny" : "Normal"}
            variant="ghost"
            size={"default"}
            func={() => setShowShiny(!showShiny)}
          />
        </Carousel>
      </CardContent>
    </Card>
  );
};
