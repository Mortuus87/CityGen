import roll from "./rollArray.js";

export default function () {
  const alignment = roll(settlementTables.alignment.all);
  const index = roll(settlementTables.populationIndex.all);


  const settlement = {
    alignment: alignment, 
    size: index[0],
    population: settlementTables.populationValue[index],
    type: settlementTables.size[index],
    statistics: {
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 0,
      lore: 0,
      society: 0,
      danger: settlementTables.danger[index],
      baseValueBonus: 0,
      purchaseLimitBonus: 0
    },
    qualityNumber: settlementTables.qualities[index],
    qualities: [],
    modifierNumber: settlementTables.modifier[index],
    modifiers: [],
    notes: [],
    spellcasting: index[0],
    spellcastingLevel:"",
    baseValue: settlementTables.baseValue[index],
    baseValueTotal: 0,
    purchaseLimit: settlementTables.purchaseLimit[index],
    purchaseLimitTotal: 0,
    government: "",
    magicItems: {
      minor: "",
      medium: "",
      major: ""
    },
  }

  return settlement;
}