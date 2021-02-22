import roll from "./rollArray.js";

export default function () {
  const alignment = roll(settlementTables.alignment.all);
  const index = roll(settlementTables.populationIndex.all);

  const settlement = {
    alignment: alignment, 
    population: settlementTables.populationValue[index],
    type: settlementTables.size[index],
    statistics: {
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 0,
      lore: 0,
      society: 0,
    },
    qualities: [],
    baseValue: settlementTables.baseValue[index],
    purchaseLimit: settlementTables.purchaseLimit[index],
    spellcasting: settlementTables.spellcasting[index]
  }

  // process qualities, adding to the relevant values. 
  // Maybe lay it all out first in a modifiers array, 
  // and transpose it upon the settlement afterwards? 
  // Check if this is a problem for some of the percentage modifiers.

  return settlement;
}