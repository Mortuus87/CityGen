import roll from "./rollArray.js";

export default function () {
  const alignment = roll(settlementTables.alignment.all);
  // console.log(alignment);
  const size = roll(settlementTables.size.all);
  // console.log(size);

  const settlement = {
    alignment: alignment, 
    size: size,
    population: settlementTables.populationValue[size],
    type: settlementTables.sizeLabel[size],
    statistics: {
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 0,
      lore: 0,
      society: 0,
      danger: settlementTables.danger[size],
      baseValueBonus: 0,
      purchaseLimitBonus: 0
    },
    qualityNumber: settlementTables.qualitiesValue[size],
    qualities: [],
    modifierNumber: settlementTables.modifier[size],
    modifiers: [],
    notes: [],
    spellcasting: size,
    spellcastingLevel:"",
    baseValue: settlementTables.baseValue[size],
    baseValueTotal: 0,
    purchaseLimit: settlementTables.purchaseLimit[size],
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