"use client";
import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "./ui/button";
import { LangSwitcher } from "./lang-switcher";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
export const NavBar = () => {
  const t = useTranslations("NavBar");
  const router = useRouter();
  const componentsTheme = useTranslations("components")("switchTheme");
  const componentsLang = useTranslations("components")("switchLang");
  return (
    <section className="w-full h-12 bg-secondary px-24 grid grid-cols-3 items-center justify-between gap-3">
      <h1 className="text-2xl font-game font-bold text-foreground">
        CobbleFinder
      </h1>
      <div className="flex flex-row items-center justify-center gap-3">
        <Button
          className="text-foreground hover:text-foreground"
          onClick={() => router.push("/")}
          variant={"ghost"}
          size={"sm"}
        >
          {t("home")}
        </Button>
        <Button
          className="text-foreground hover:text-foreground"
          onClick={() => router.push("/")}
          variant={"ghost"}
          size={"sm"}
        >
          {t("biomes")}
        </Button>
        <Button
          className="text-foreground hover:text-foreground"
          onClick={() => router.push("/")}
          variant={"ghost"}
          size={"sm"}
        >
          {t("pokemons")}
        </Button>
        <Button
          className="text-foreground hover:text-foreground"
          onClick={() => router.push("/")}
          variant={"ghost"}
          size={"sm"}
        >
          {t("items")}
        </Button>
      </div>
      <div className="flex flex-row items-center justify-end gap-3">
        <ThemeSwitcher t={componentsTheme} />
        <LangSwitcher t={componentsLang} />
      </div>
    </section>
  );
};
