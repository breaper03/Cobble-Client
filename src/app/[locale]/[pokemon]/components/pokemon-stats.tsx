import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  pokemon: {
    label: "value",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface Props {
  currentPokemon: any;
}

export const PokemonStats = ({ currentPokemon }: Props) => {
  return (
    <Card className="flex flex-col justify-around w-full gap-1 m-0 p-2">
      <CardHeader className="w-full text-center capitalize text-4xl font-game">
        <CardTitle>Stats</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center w-full">
        <ChartContainer
          config={chartConfig}
          className="w-full flex flex-row items-center h-fit aspect-[7/3]"
        >
          <BarChart
            accessibilityLayer
            data={currentPokemon.stats.map((s: any) => ({
              name: s.stat.name.includes("special")
                ? `${
                    "Sp." +
                    s.stat.name.split("-")[1].split("")[0].toUpperCase() +
                    s.stat.name
                      .split("-")[1]
                      .slice(1, s.stat.name.split("-").length + 10)
                      .toLowerCase()
                  }`
                : s.stat.name,
              value: s.base_stat,
            }))}
            layout="vertical"
            margin={{
              left: 16,
              right: 16,
              bottom: 16,
              top: 16,
            }}
            compact
            className="h-fit max-h-[10%]"
          >
            <YAxis
              width={80}
              allowDuplicatedCategory={false}
              dataKey="name"
              type="category"
              label={{ position: "left" }}
              style={{
                alignSelf: "start",
                fontSize: 13,
                fontWeight: "bold",
                color: "var(--color-pokemon)",
                whiteSpace: "nowrap",
                textWrap: "nowrap",
              }}
              hide
              tickLine={false}
              axisLine={false}
              className="capitalize"
            />
            <XAxis dataKey="value" type="number" hide />
            <Bar
              dataKey="value"
              layout="vertical"
              fill="var(--chart-2)"
              // radius={[5, 5, 0, 0]}
              radius={10}
            >
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={10}
                className="capitalize fill-(--primary-foreground) font-medium"
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={-35}
                className="capitalize fill-(--primary-foreground) font-medium"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
