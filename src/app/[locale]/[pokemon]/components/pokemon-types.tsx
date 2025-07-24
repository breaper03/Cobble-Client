import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    // <Card className="w-full h-fit">
    //   <CardHeader>
    //     <CardTitle>Strong / Weaknesses</CardTitle>
    //     <CardDescription>January - June 2024</CardDescription>
    //   </CardHeader>
    //   <CardContent className="border-2 border-red-300 w-full">
    //     <div
    //       className={`flex flex-row items-center justify-between gap-2 capitalize w-full mb-10`}
    //     >
    //       {strongAgainst?.map((v) => (
    //         <div
    //           className="flex flex-col items-center text-right justify-start gap-0"
    //           key={Math.random()}
    //         >
    //           <Image
    //             key={Math.random()}
    //             width={40}
    //             quality={100}
    //             height={40}
    //             draggable={false}
    //             src={`https://play.pokemonshowdown.com/sprites/types/${v.name[0].toUpperCase() + v.name.slice(1)}.png`}
    //             alt={v.name}
    //             className="ml-1"
    //           />
    //           {/* <span className='text-lg font-game'>{v.name}</span> */}
    //           <span className="text-lg font-game">{v.multiplier}</span>
    //         </div>
    //       ))}
    //     </div>
    //     <div
    //       className={`flex flex-row items-center justify-between gap-2 capitalize w-full mb-10`}
    //     >
    //       {weakAgainst?.map((v) => (
    //         <div
    //           className="flex flex-col items-center text-right justify-start gap-0"
    //           key={Math.random()}
    //         >
    //           <Image
    //             key={Math.random()}
    //             width={40}
    //             quality={100}
    //             height={40}
    //             draggable={false}
    //             src={`https://play.pokemonshowdown.com/sprites/types/${v.name[0].toUpperCase() + v.name.slice(1)}.png`}
    //             alt={v.name}
    //             className="ml-1"
    //           />
    //           <span className="text-lg font-game">{v.multiplier}</span>
    //         </div>
    //       ))}
    //     </div>
    //   </CardContent>
    // </Card>
    <Card className="w-full h-fit">
      <Accordion type="single" collapsible className="bg-muted rounded-md mx-5">
        <AccordionItem
          value="item-1"
          className="px-3 py-0.5 rounded-md mb-1 border-b-0"
        >
          <AccordionTrigger className="hover:cursor-pointer">
            Strong Against
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-5 px-3 mt-3 border-t border-t-muted-foreground border-dotted">
            <div
              className={`flex flex-row items-center justify-between gap-2 capitalize w-full`}
            >
              {strongAgainst?.map((v) => (
                <div
                  className="flex flex-col items-center text-center justify-center gap-0 bg-red-300 p-2.5 rounded-md"
                  key={Math.random()}
                >
                  <Image
                    key={Math.random()}
                    width={40}
                    quality={100}
                    height={40}
                    draggable={false}
                    src={`https:play.pokemonshowdown.com/sprites/types/${v.name[0].toUpperCase() + v.name.slice(1)}.png`}
                    alt={v.name}
                    className="ml-1"
                  />
                  {/* <span className='text-lg font-game'>{v.name}</span> */}
                  <span className="text-lg font-game">{v.multiplier}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="px-3 py-0.5 rounded-md mb-1 border-b-0"
        >
          <AccordionTrigger className="hover:cursor-pointer">
            Weak Against
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-5 px-3 mt-3 border-t border-t-muted-foreground border-dotted">
            <div
              className={`flex flex-row items-center justify-between gap-2 capitalize w-full`}
            >
              {weakAgainst?.map((v) => (
                <div
                  className="flex flex-col items-center text-center justify-center gap-0 bg-red-300 p-2.5 rounded-md"
                  key={Math.random()}
                >
                  <Image
                    key={Math.random()}
                    width={40}
                    quality={100}
                    height={40}
                    draggable={false}
                    src={`https:play.pokemonshowdown.com/sprites/types/${v.name[0].toUpperCase() + v.name.slice(1)}.png`}
                    alt={v.name}
                    className="ml-1"
                  />
                  {/* <span className='text-lg font-game'>{v.name}</span> */}
                  <span className="text-lg font-game">{v.multiplier}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="px-3 py-0.5 rounded-md mb-1 border-b-0"
        >
          <AccordionTrigger className="hover:cursor-pointer">
            MT Moves
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-5 px-3 mt-3 border-t border-t-muted-foreground border-dotted">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-4"
          className="px-3 py-0.5 rounded-md mb-1 border-b-0"
        >
          <AccordionTrigger className="hover:cursor-pointer">
            Egg Moves
          </AccordionTrigger>
          <AccordionContent className="pb-3 pt-5 px-3 mt-3 border-t border-t-muted-foreground border-dotted">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
