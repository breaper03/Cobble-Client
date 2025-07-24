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
  Cell,
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
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  const getStatColor = (value: number): string => {
    const ranges = [
      { max: 50, color: theme === "light" ? "#ff3860" : "#ff386090" }, // Rojo
      { max: 75, color: theme === "light" ? "#f5b800" : "#f5b80090" }, // Amarillo fuerte
      { max: 100, color: theme === "light" ? "#ffdd55" : "#ffdd5590" }, // Amarillo claro/dorado
      { max: 120, color: theme === "light" ? "#7aff5a" : "#7aff5a90" }, // Verde lima
      { max: 150, color: theme === "light" ? "#00dc53" : "#00dc5390" }, // Verde brillante
      { max: 180, color: theme === "light" ? "#1ccfff" : "#1ccfff90" }, // Celeste claro
    ];

    return ranges.find((r) => value < r.max)?.color || "#00b6ff"; // Azul eléctrico por defecto
  };

  const statData = currentPokemon.stats.map((s: any) => {
    const base = s.base_stat;

    const getTextClass = (value: number) => {
      const bg = getStatColor(value);
      const lightColors = [
        "#f5b800",
        "#ffdd55",
        "#7aff5a",
        "#1ccfff",
        "#00b6ff",
      ];
      return lightColors.includes(bg.toLowerCase())
        ? "fill-(--muted)"
        : "fill-(--muted)";
    };

    return {
      name: s.stat.name.includes("special")
        ? `Sp. ${s.stat.name.split("-")[1][0].toUpperCase()}${s.stat.name
            .split("-")[1]
            .slice(1)
            .toLowerCase()}`
        : s.stat.name,
      value: Math.round((base / 255) * 100),
      raw: base,
      fill: getStatColor(base),
      textClass: getTextClass(base), // ← aquí
    };
  });

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
            data={statData}
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
              radius={10}
              background={{ fill: "var(--muted)", radius: 10 }}
            >
              {currentPokemon.stats.map((s: any, index: number) => (
                <Cell key={`cell-${index}`} fill={getStatColor(s.base_stat)} />
              ))}
              <LabelList
                dataKey="name"
                position="insideLeft"
                offset={15}
                className={cn(
                  `capitalize font-semibold text-xs md:text-xs lg:text-lg fill-card-foreground/90`,
                )}
              />
              <LabelList
                dataKey="raw"
                position="right"
                offset={-40}
                className={cn(
                  `capitalize font-semibold text-xs md:text-xs lg:text-lg fill-card-foreground/90`,
                )}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
