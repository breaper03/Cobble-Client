import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "value",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

interface Props {
  currentPokemon: any;
}

export const PokemonStats = ({ currentPokemon }: Props) => {
  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle>Stats</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="border-2 border-red-300 w-full">
        <ChartContainer config={chartConfig}>
          <BarChart
            className="border-2 border-red-300  w-full"
            accessibilityLayer
            data={currentPokemon.stats.map((s: any) => ({
              name: s.stat.name.includes("special")
                ? `${
                    "Sp. " +
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
          >
            <XAxis type="number" dataKey="value" hide />
            <YAxis
              dataKey="name"
              type="category"
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "var(--color-desktop)",
                whiteSpace: "nowrap",
                width: "100%",
              }}
              tickLine={false}
              // tickMargin={10}
              axisLine={false}
              className="capitalize"
            />
            <Bar
              dataKey="value"
              fill="var(--color-desktop)"
              height={1}
              width={1}
              radius={5}
              label={{ position: "right" }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
