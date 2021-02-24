const qualityTables = [
    {
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
    },
    // {
    //     name: "New",
    //     statistics: {
    //         corruption: 0,
    //         crime: 0,
    //         economy: 0,
    //         law: 0,
    //         lore: 0,
    //         society: 0,
    //         danger: 0,
    //         spellcastingBonus: 0,
    //         baseValueBonus: 0,
    //         purchaseLimitBonus: 0,
    //         notes: []
    //     },
    // },
]
