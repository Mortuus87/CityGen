const settlementTables = {
  alignment: {
    all: [
      "LG", "NG", "CG",
      "LN", "TN", "CN",
      "LE", "NE", "CE"
    ],
    good: ["LG", "NG", "CG"],
    neutral: ["LN", "TN", "CN"],
    evil: ["LE", "NE", "CE"]
  },

  populationIndex: {
    all: [0, 1, 2, 3, 4, 5, 6, 7],
    small: [0, 1, 2],
    medium: [3, 4, 5],
    large: [6, 7]
  },

  populationValue: ["fewer than 51", "51-200", "201-1 000", "1 001 - 5 000", "5 001 - 25 000", "25 001 - 50 000", "50 001 - 250 000", "More than 250 000"],
  size: ["Thorp", "Hamlet", "Village", "Small town", "Large town", "Small city", "Large city", "Metropolis"],
  baseValue: [50, 200, 500, 1000, 2000, 4000, 8000, 16000],
  purchaseLimit: [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
  spellcasting: ["-", "0th", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"],

  magicItemBySpellcasting: ["-", "-", "-", "-", "-", "1d4", "1d6", "2d4", "3d4", "3d4", "4d4", "4d4", "*", "*"],
  // offset minor magic items by +4, and medium magic items by +2

  qualities: [1, 1, 2, 2, 3, 4, 5, 6],
  modifier: [-4, -2, -1, 0, 0, 1, 2, 4],
  danger: [-10, -5, 0, 0, 5, 5, 10, 10],

  government: [{
    name: "Autocracy",
    description: "A single individual chosen by the people rules the community. This leader’s actual title can vary—mayor, burgomaster, lord, or even royal titles like duke or prince are common. (No modifiers)",
    statisctics: {
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
    }
  }]
}