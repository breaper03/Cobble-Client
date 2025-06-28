import minecraftData from 'minecraft-data'

const mcHook: minecraftData.IndexedData = minecraftData('1.21.1')
const mcBiomes = Object.keys(mcHook.biomes).map((biome: string) => mcHook.biomes[+biome])
const mcblocks = Object.keys(mcHook.blocks).map((block: string) => mcHook.blocks[+block])
const mcItems = Object.keys(mcHook.items).map((item: string) => mcHook.items[+item])
const mcEntities = Object.keys(mcHook.entities).map((entity: string) => mcHook.entities[+entity])
//  const mcSounds = Object.keys(mcHook.sounds).map((sound: string) => mcHook.sounds[+sound]) //! Not supported yet
const mcRecipes = Object.keys(mcHook.recipes).map((recipe: string) => mcHook.recipes[+recipe])

export { mcHook, mcBiomes, mcblocks, mcItems, mcEntities, mcRecipes }