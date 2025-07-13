import { z } from "zod"

export const NamedAPIResourceSchema = z.object({
  name: z.string(),
  url: z.string(),
})

export const AbilityEntrySchema = z.object({
  is_hidden: z.boolean(),
  slot: z.number(),
  ability: NamedAPIResourceSchema,
})

export const GameIndexSchema = z.object({
  game_index: z.number(),
  version: NamedAPIResourceSchema,
})

export const HeldItemSchema = z.object({
  item: NamedAPIResourceSchema,
  version_details: z.array(
    z.object({
      rarity: z.number(),
      version: NamedAPIResourceSchema,
    })
  ),
})

export const MoveEntrySchema = z.object({
  move: NamedAPIResourceSchema,
  version_group_details: z.array(
    z.object({
      level_learned_at: z.number(),
      version_group: NamedAPIResourceSchema,
      move_learn_method: NamedAPIResourceSchema,
      order: z.number().nullable(),
    })
  ),
})

export const SpriteSetSchema = z.object({
  front_default: z.string().nullable(),
  front_female: z.string().nullable().optional(),
  front_shiny: z.string().nullable().optional(),
  front_shiny_female: z.string().nullable().optional(),
  back_default: z.string().nullable().optional(),
  back_female: z.string().nullable().optional(),
  back_shiny: z.string().nullable().optional(),
  back_shiny_female: z.string().nullable().optional(),
})

export const SpritesSchema = z.object({
  back_default: z.string().nullable(),
  back_female: z.string().nullable(),
  back_shiny: z.string().nullable(),
  back_shiny_female: z.string().nullable(),
  front_default: z.string().nullable(),
  front_female: z.string().nullable(),
  front_shiny: z.string().nullable(),
  front_shiny_female: z.string().nullable(),
  other: z
    .object({
      dream_world: SpriteSetSchema.optional(),
      home: SpriteSetSchema.optional(),
      "official-artwork": SpriteSetSchema.optional(),
      showdown: SpriteSetSchema.optional(),
    })
    .optional(),
  versions: z.record(z.record(SpriteSetSchema)).optional(),
})

export const StatEntrySchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: NamedAPIResourceSchema,
})

export const TypeEntrySchema = z.object({
  slot: z.number(),
  type: NamedAPIResourceSchema,
})

export const PastTypeSchema = z.object({
  generation: NamedAPIResourceSchema,
  types: z.array(TypeEntrySchema),
})

export const PastAbilitySchema = z.object({
  generation: NamedAPIResourceSchema,
  abilities: z.array(
    z.object({
      ability: NamedAPIResourceSchema.nullable(),
      is_hidden: z.boolean(),
      slot: z.number(),
    })
  ),
})

export const PokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  base_experience: z.number(),
  height: z.number(),
  is_default: z.boolean(),
  order: z.number(),
  weight: z.number(),
  abilities: z.array(AbilityEntrySchema),
  forms: z.array(NamedAPIResourceSchema),
  game_indices: z.array(GameIndexSchema),
  held_items: z.array(HeldItemSchema),
  location_area_encounters: z.string(),
  moves: z.array(MoveEntrySchema),
  species: NamedAPIResourceSchema,
  sprites: SpritesSchema,
  cries: z.object({
    latest: z.string(),
    legacy: z.string(),
  }),
  stats: z.array(StatEntrySchema),
  types: z.array(TypeEntrySchema),
  past_types: z.array(PastTypeSchema),
  past_abilities: z.array(PastAbilitySchema),
})

const DropSchema = z.object({
  item: z.string(),
  probability: z.number(),
});

const FormObjectSchema = z.object({
  form: z.string(),
  rarity: z.string().nullable().optional(),
  conditions: z.string().nullable().optional(),
});

export const CobblemonSchema = z.object({
  id: z.number().int(),
  pokemon: z.string(),
  source: z.string(),
  biomes: z.array(z.string()),
  rarity: z.string().nullable(),
  conditions: z.array(z.string()),
  forms: z.array(z.union([z.string(), FormObjectSchema])),
  region: z.string(),
  generation: z.string(),
  weight: z.array(z.number()).nullable().optional(),
  lvMin: z.number().int().nullable().optional(),
  lvMax: z.number().int().nullable().optional(),
  excludedBiomes: z.string().nullable().optional(),
  time: z.string().nullable().optional(),
  weather: z.string().nullable().optional(),
  multipliers: z.any().nullable().optional(),
  context: z.string().nullable().optional(),
  presets: z.string().nullable().optional(),
  anticonditions: z.any().nullable().optional(),
  skylightMin: z.any().nullable().optional(),
  skylightMax: z.any().nullable().optional(),
  canSeeSky: z.any().nullable().optional(),
  drops: z.array(DropSchema).nullable().optional(),
  spawnSpecificDrops: z.any().nullable().optional(),
});

export type NamedAPIResource = z.infer<typeof NamedAPIResourceSchema>
export type AbilityEntry = z.infer<typeof AbilityEntrySchema>
export type GameIndex = z.infer<typeof GameIndexSchema>
export type HeldItem = z.infer<typeof HeldItemSchema>
export type MoveEntry = z.infer<typeof MoveEntrySchema>
export type SpriteSet = z.infer<typeof SpriteSetSchema>
export type Sprites = z.infer<typeof SpritesSchema>
export type StatEntry = z.infer<typeof StatEntrySchema>
export type TypeEntry = z.infer<typeof TypeEntrySchema>
export type PastType = z.infer<typeof PastTypeSchema>
export type PastAbility = z.infer<typeof PastAbilitySchema>
export type Pokemon = z.infer<typeof PokemonSchema>
export type Cobblemon = z.infer<typeof CobblemonSchema>
