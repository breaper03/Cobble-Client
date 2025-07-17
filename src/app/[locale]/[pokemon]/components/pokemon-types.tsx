import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
type Effectiveness = {
  name: string;
  multiplier: string; // "x2", "x0.5", "x0", etc.
};
interface Props {
  strongAgainst: Effectiveness[];
  weakAgainst: Effectiveness[];
}

export const PokemonTypes = ({ strongAgainst, weakAgainst }: Props) => {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Strong / Weaknesses</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="border-2 border-red-300 w-full">
        <div
          className={`flex flex-row items-center justify-between gap-2 capitalize w-full mb-10`}
        >
          {strongAgainst?.map((v) => (
            <div
              className="flex flex-col items-center text-right justify-start gap-0"
              key={Math.random()}
            >
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
              <span className="text-lg font-game">{v.multiplier}</span>
            </div>
          ))}
        </div>
        <div
          className={`flex flex-row items-center justify-between gap-2 capitalize w-full mb-10`}
        >
          {weakAgainst?.map((v) => (
            <div
              className="flex flex-col items-center text-right justify-start gap-0"
              key={Math.random()}
            >
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
              <span className="text-lg font-game">{v.multiplier}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
