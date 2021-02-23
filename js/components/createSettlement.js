import roll from "./rollArray.js";

export default function () {
  const alignment = roll(settlementTables.alignment.all);
  const index = roll(settlementTables.populationIndex.large);

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
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0
    },
    qualityNumber: settlementTables.qualities[index],
    qualities: [],
    notes: [],
    baseValue: settlementTables.baseValue[index],
    baseValueTotal: 0,
    purchaseLimit: settlementTables.purchaseLimit[index],
    purchaseLimitTotal: 0,
    government: "",
    magic: "",
  }

  return settlement;
}