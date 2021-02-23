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