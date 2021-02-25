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

  size: {
    all: [0, 1, 2, 3, 4, 5, 6, 7],
    small: [0, 1, 2],
    medium: [3, 4, 5],
    large: [6, 7]
  },

  populationValue: ["fewer than 51", "51-200", "201-1 000", "1 001 - 5 000", "5 001 - 25 000", "25 001 - 50 000", "50 001 - 250 000", "More than 250 000"],
  
  sizeLabel: ["Thorp", "Hamlet", "Village", "Small town", "Large town", "Small city", "Large city", "Metropolis"],

  baseValue: [50, 200, 500, 1000, 2000, 4000, 8000, 16000],
  
  purchaseLimit: [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
  
  spellcasting: ["-", "0th", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"],

  magicItemBySpellcasting: ["-", "-", "-", "-", "-", "1d4", "1d6", "2d4", "3d4", "3d4", "4d4", "4d4", "*", "*"],
  // offset minor magic items by +4, and medium magic items by +2

  qualitiesValue: [1, 1, 2, 2, 3, 4, 5, 6],
  modifier: [-4, -2, -1, 0, 0, 1, 2, 4],
  danger: [-10, -5, 0, 0, 5, 5, 10, 10],

  qualities: [{
      name: "Academic",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 1,
        society: 0,
        danger: 0,
        spellcastingBonus: 1,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },

    },
    {
      name: "Adventurer Site",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 0,
        society: 2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: .5,
        notes: []
      },

    },
    {
      name: "Artifact Gatherer",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 2,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: .5,
        purchaseLimitBonus: 0,
        notes: ["Artifact Gatherer: Purchase of items above original base value is limited to black markets."]
      },

    },
    {
      name: "Broad Minded",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 1,
        society: 1,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },

    },
    {
      name: "Cultured",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: -1,
        lore: 0,
        society: 1,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["Cultured: Always counts as a prosperous city for the purpose of perform checks."]
      },

    },
    {
      name: "Darkvision",
      statistics: {
        corruption: 0,
        crime: -1,
        economy: 1,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Deep Traditions",
      statistics: {
        corruption: 0,
        crime: -2,
        economy: 0,
        law: 2,
        lore: 0,
        society: -2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Defiant",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: -1,
        lore: 0,
        society: 1,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Holy Site",
      statistics: {
        corruption: -2,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 2,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Insular",
      statistics: {
        corruption: 0,
        crime: -1,
        economy: 0,
        law: 1,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Magically Attuned",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 2,
        baseValueBonus: .2,
        purchaseLimitBonus: .2,
        notes: []
      },
    },
    {
      name: "Militarized",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 4,
        lore: 0,
        society: -4,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "No Questions Asked",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: -1,
        society: +1,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Notorious",
      statistics: {
        corruption: 0,
        crime: 1,
        economy: 0,
        law: -1,
        lore: 0,
        society: 0,
        danger: 10,
        spellcastingBonus: 0,
        baseValueBonus: .3,
        purchaseLimitBonus: .5,
        notes: []
      },
    },
    {
      name: "Pious",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 1,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["Pious: Unfriendly to faiths with an alignment more than one step away"]
      },
    },
    {
      name: "Prosperous",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 1,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: .3,
        purchaseLimitBonus: .5,
        notes: []
      },
    },
    {
      name: "Racially Intolerant",
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
        purchaseLimitBonus: 0,
        notes: ["Racially Intolerant: Unfriendly to stated race(s)"]
      },
    },
    {
      name: "Resource Surplus",
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
        purchaseLimitBonus: 0,
        notes: ["Resource Surplus: A surplus of a certain community has made for very competitive markets in those kinds of goods."]
      },
    },
    {
      name: "Restrictive",
      statistics: {
        corruption: -1,
        crime: 0,
        economy: 0,
        law: 0,
        lore: -1,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["Restrictive: Unfriendly to outsiders"]
      },
    },
    {
      name: "Rule of Might",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 2,
        lore: 0,
        society: -2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Rumormongering Citizens",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 1,
        society: -1,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Strategic Location",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 1,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: .1,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Subterranian",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 1,
        lore: -1,
        society: 0,
        danger: -5,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Superstitious",
      statistics: {
        corruption: 0,
        crime: -4,
        economy: 0,
        law: 2,
        lore: 0,
        society: 2,
        danger: 0,
        spellcastingBonus: -2,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Supportive",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 0,
        society: 2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Timid Citizens",
      statistics: {
        corruption: 0,
        crime: 2,
        economy: 0,
        law: 0,
        lore: -2,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Tourist Attraction",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 1,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: .2,
        purchaseLimitBonus: 0,
        notes: []
      },
    },
    {
      name: "Wealth Disparity",
      statistics: {
        corruption: 2,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["Wealth Disparity: High wealth districts gain +2 lore but-2 society. Low wealtch areas gain +2 society but -2 lore."]
      },
    }
  ],

  governments: [
    {
      name: "Authocracy",
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
        purchaseLimitBonus: 0,
        notes: ["A single individual chosen by the people rules the community. This leader’s actual title can vary—mayor, burgomaster, lord, or even royal titles like duke or prince are common."]
      },
    },
    {
      name: "Council",
      statistics: {
        corruption: 0,
        crime: 0,
        economy: 0,
        law: -2,
        lore: -2,
        society: 4,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["A group of councilors, often composed of guild masters or members of the aristocracy, leads the settlement."]
      },
    },
    {
      name: "Dynasty/Mafia",
      statistics: {
        corruption: 1,
        crime: 0,
        economy: 0,
        law: 1,
        lore: 0,
        society: -2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["Power is concentrated in the hands of a single family or a small group of closely related, inter-married families. These elites have ruled the settlement since its inception, and manipulated the power structure to ensure they remain in power."]
      },
    },
    {
      name: "Magical",
      statistics: {
        corruption: -2,
        crime: 0,
        economy: 0,
        law: 0,
        lore: 2,
        society: -2,
        danger: 0,
        spellcastingBonus: 1,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["An individual or group with potent magical power, such as A high priest, an archwizard, or even a magical monster, leads the community."]
      },
    },
    {
      name: "Overlord",
      statistics: {
        corruption: 2,
        crime: -2,
        economy: 0,
        law: 2,
        lore: 0,
        society: -2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["The community’s ruler is a single individual who either seized control or inherited command of the settlement."]
      },
    },
    {
      name: "Secret Syndicate",
      statistics: {
        corruption: 2,
        crime: 2,
        economy: 2,
        law: -6,
        lore: 0,
        society: 0,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: 0,
        purchaseLimitBonus: 0,
        notes: ["An unofficial or illegal group like a thieves’ guild rules the settlement—they may use a puppet leader to maintain secrecy, but the group members pull the strings in town."]
      },
    },
    {
      name: "Plutocracy",
      statistics: {
        corruption: 2,
        crime: 2,
        economy: 2,
        law: 0,
        lore: 0,
        society: -2,
        danger: 0,
        spellcastingBonus: 0,
        baseValueBonus: .2,
        purchaseLimitBonus: 0,
        notes: ["The wealthiest and most influential merchants rule this settlement. Wealth is seen as a sign of good character, ethics and even divine favor. The poor have few, if any rights that the wealthy are bound to respect."]
      },
    },
  ]
}