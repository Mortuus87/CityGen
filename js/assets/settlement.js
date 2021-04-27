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

  statistics: [
    "corruption",
    "crime",
    "economy",
    "law",
    "lore",
    "society"
  ],

  populationValue: ["fewer than 51", "51-200", "201-1 000", "1 001 - 5 000", "5 001 - 25 000", "25 001 - 50 000", "50 001 - 250 000", "More than 250 000"],

  sizeLabel: ["Thorp", "Hamlet", "Village", "Small Town", "Large Town", "Small City", "Large City", "Metropolis"],

  baseValue: [50, 200, 500, 1000, 2000, 4000, 8000, 16000],

  purchaseLimit: [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],

  spellcastingIndex: ["0th", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th"],

  magicItemsBySpellcasting: ["-", "-", "-", "-", "1d4", "1d6", "2d4", "3d4", "3d4", "4d4", "4d4", "*"],
  // offset minor magic items by +4, and medium magic items by +2

  qualitiesValue: [1, 1, 2, 2, 3, 4, 5, 6],
  modifier: [-4, -2, -1, 0, 0, 1, 2, 4],
  danger: [-10, -5, 0, 0, 5, 5, 10, 10],

  qualities: [{
      name: "Abundant",
      corruption: 0,
      crime: 0,
      economy: 1,
      law: 0,
      lore: 0,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement has access to extraordinary natural resources: rich farmland, a deep lake, excellent hunting grounds nearby or even a convenient source of magical sustenance. The local food surplus makes the settlement a major exporting hub, and increases the standard of living for its inhabitants. Reduce the purchase price of most forms of locally-grown food and livestock by 25% or more."]
    },
    {
      name: "Abstinent",
      corruption: 2,
      crime: 0,
      economy: 0,
      law: 1,
      lore: 0,
      society: -2,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement religious or moral convictions force it to deny some of the world’s more common vices. The settlement prohibits a common vice: usually alcohol is prohibited, but other abstinent settlements might ban stronger drugs, tobacco, prostitution, or even ‘indulgent’ foods like fine pastries, meat, or similar."]

    },
    {
      name: "Academic",
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
      notes: ["The settlement possesses a school, training facility, or university of great renown."]
    },
    {
      name: "Adventurer Site",
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
      notes: ["Proximity to a famous adventuring location has long drawn curious adventures from across the land."]
    },
    {
      name: "Artifact Gatherer",
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 2,
      lore: 0,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: -.5,
      purchaseLimitBonus: 0,
      notes: ["The sale of a certain kind of rare item is heavily restricted. This may be items of a magical, technological, or psychic origin. Purchase of such items is limited to black markets."]
    },
    {
      name: "Artist’s Colony",
      corruption: 0,
      crime: 0,
      economy: 1,
      law: 0,
      lore: 0,
      society: 1,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement is renowned for the excellence of its local artists, performers and craftsfolk. Add the settlement’s Economy modifier on all Craft checks, not just those made to earn a living."]
    },
    {
      name: "Asylum/Sanatorium",
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 0,
      lore: 1,
      society: -2,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement is host to an infamous madhouse or asylum (or perhaps a prison, gaol or notorious workhouse). The presence of these dangerous, mad souls has hardened the townsfolk, making them suspicious of strangers and paranoid about the possibility of an escape or other tragedy."]
    },
    {
      name: "Broad Minded",
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
      notes: ["The citizens are open, friendly, and tolerant, and react positively towards visitors."]
    },
    {
      name: "City of the Dead",
      corruption: 0,
      crime: 0,
      economy: -2,
      law: 1,
      lore: 2,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement abuts a massive, historically significant graveyard, massive tomb or mausoleum complex. Its monuments are well maintained, and a powerful ancestor cult exists within the city, either in replacement or addition to traditional religions. Add the settlement’s Lore modifier to Knowledge (history) and Knowledge (nobility) checks."]
    },
    {
      name: "Cultured",
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
      notes: ["The settlement is well known for its culture of artistry, particularly among actors and musicians. It always counts as a prosperous city for the purpose of perform checks."]
    },
    {
      name: "Deep Traditions",
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
      notes: ["The settlement is bolstered by its strong traditions, but its citizens have difficulty interacting with visitors."]
    },
    {
      name: "Defensible",
      corruption: 1,
      crime: 1,
      economy: 2,
      law: 0,
      lore: 0,
      society: -1,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement is strategically situated to make it easier to defend, giving its inhabitants confidence and making the settlement a major local trade hub."]
    },
    {
      name: "Defiant",
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
      notes: ["The citizens of this settlement have a natural predilection for free thinking that borders on rebellious action."]
    },
    {
      name: "Eldritch",
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 0,
      lore: 2,
      society: 0,
      danger: 13,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The town has a strange and unnatural air, and is a popular place for sorcerers and oracles. Increase spellcasting by +2 levels when casting divination or necromancy spells only."]
    },
    {
      name: "Famed Breeders",
      corruption: 0,
      crime: 0,
      economy: 1,
      law: 0,
      lore: 0,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement is known for the excellent quality of the animals bred there, from the mundane (horses, mules, cattle, pigs) to the exotic (talking tigers, Pegasai, griffons). People come from far and wide to purchase livestock, draft animals, mounts and animal companions. Characters can purchase mounts or live stock in the settlement at a +10% discount, With the Base Value and Base Purchase Limit increased by +20% when dealing with mounts and associated gear."]
    },
    {
      name: "Gambling",
      corruption: 2,
      crime: 2,
      economy: 2,
      law: -1,
      lore: 0,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: .1,
      notes: ["The settlement caters to vice and greed. Casinos, gaming houses, opium dens and bordellos are all common here, and serve as the town’s major industry."]
    },
    {
      name: "Good Roads/Railroad Hub",
      corruption: 0,
      crime: 0,
      economy: 2,
      law: 0,
      lore: 0,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement has an extensive road network. These roads are well-maintained and allow for quick movement of troops and merchandise."]
    },
    {
      name: "Guilds",
      corruption: 1,
      crime: 0,
      economy: 1,
      law: 0,
      lore: -1,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["A variety of trade and mercantile guilds control the town’s industry and trade. These guilds are highly specialized (a printer’s guild, an eggler’s guild, a swordsmith’s guild, a diamond cutter’s guild, ect.), and usually semi-hereditary, with children following their parents into the guild."]
    },
    {
      name: "Holy Site",
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
      notes: ["The settlement hosts a shrine, temple, or landmark with great significance to one or more religions. The settlement has a higher percentage of divine spellcasters in its population."]
    },
    {
      name: "Insular",
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
      notes: ["The settlement is isolated, perhaps physically or even spiritually. Its citizens are fiercely loyal to one another."]
    },
    {
      name: "Magically Attuned",
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
      notes: ["The settlement is a haven for spellcasters due to its location; for example, it may lie at the convergence of multiple ley lines or near a well-known magical site."]
    },
    {
      name: "Majestic",
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
      notes: ["The settlement is known for its dramatic, sweeping architecture, monumental statuary and is built to a scale alien to most Medium size humanoids. Perhaps the settlement was once a domain of giants, or simply a human metropolis hewn to an epic scale for the sake of grandeur. Add +1d8 to the number of the most expensive category of magic items the settlement offers for sale, as determined by its size."]
    },
    {
      name: "Militarized",
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
      notes: ["The populace is devoted to the armed forces. Civil and military law is intertwined, punishments are harsh, and loyalty to the state is expected."]
    },
    {
      name: "Morally Permissive",
      corruption: 1,
      crime: 0,
      economy: 1,
      law: 0,
      lore: 0,
      society: 0,
      danger: 0,
      spellcastingBonus: -1,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["Divine indulgence or perhaps just a corrupt church selling indulgences has made this settlement famous (or infamous) for its lax morals. Select 1d4+1 acts that would normally be considered sinful or immoral; these acts are not crimes or sins within the settlement, and committing these acts does not violate a paladin or cleric’s moral code, so long as the offense is limited to within the settlement’s borders."]
    },
    {
      name: "No Questions Asked",
      corruption: 0,
      crime: 0,
      economy: 0,
      law: 0,
      lore: -1,
      society: 1,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The citizens mind their own business and respect a visitor’s privacy."]
    },
    {
      name: "Notorious",
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
      notes: ["The settlement has a reputation (deserved or not) for being a den of iniquity. Thieves, rogues, and cutthroats are much more common here."]
    },
    {
      name: "Phantasmal",
      corruption: 0,
      crime: 0,
      economy: -2,
      law: 0,
      lore: 0,
      society: -2,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement simply isn’t always there! This magical settlement might only appear in the moonlight, appear out of the mist on particularly holy or infamous dates, or only appear in this plane during thunderstorms or on particularly hot days. At other times, the settlement simply doesn’t exist on this plane; powerful, plane-crossing magic is required to access the settlement outside of the ‘proper’ time. The highly magical settlement is insular and clannish as a result of its isolation from the outside world. Increase spellcasting by two levels when dealing with planar magic or conjuration (summoning or teleportation) spells only."]
    },
    {
      name: "Pious",
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
      notes: ["The settlement is known for its inhabitants’ good manners, friendly spirit, and deep devotion to a deity (this deity must be of the same alignment as the community). Any faith more than one alignment step different than the community’s official religion is at best unwelcome and at worst outlawed—obvious worshipers of an outlawed deity must pay 150% of the normal price for goods and services and may face mockery, insult, or even violence)"]
    },
    {
      name: "Prosperous",
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
      notes: ["The settlement is a popular hub for trade. Merchants are wealthy and the citizens live well."]
    },
    {
      name: "Racially Intolerant",
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
      notes: ["The community is prejudiced against one or more races, which are listed in parentheses. (Members of the unwelcome race or races must pay 150% of the normal price for goods and services and may face mockery, insult, or even violence)"]
    },
    {
      name: "Resettled Ruins",
      corruption: 0,
      crime: 0,
      economy: 1,
      law: 0,
      lore: 1,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement is built amid the ruins of a more ancient structure. The settlement might be little more than a collection of tents and yurts erected in ruined plazas, or a thriving metropolis whose stones were recycled from long-forgotten temples and fortresses. While ruins provide a ready source of building materials, near-by dungeons to plunder and ancient artifacts to explore, they might also provide a hiding place for modern dangers or old curses. Add +1d3 to the amount of magic items in any category the settlement’s size would allow it to normally offer. If the settlement’s size would not normally allow it to have magic items of a particular category, it always has at least one randomly chosen item of that category for sale. However, if a buyer rolls a natural one on any Appraise or Diplomacy check made to examine or purchase a locally bought magic item, that item is always cursed."]
    },
    {
      name: "Religious Tolerance",
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
      notes: ["The settlement is known for its widespread religious tolerance, and many faiths have temples, cathedrals or monasteries here. Religious debates in the public square are common. Increase divine spellcasting by +2 levels."]
    },
    {
      name: "Resource Surplus",
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
      notes: ["A surplus of a certain community has made for very competitive markets in those kinds of goods. This commodity and items primarily made from it can be purchased for as little as half the normal cost. The additional cost of making an item with alchemical compounds related to that resource (for instance, alchemical silver for silver or cold iron for iron) is halved in this settlement’s marketplaces."]
    },
    {
      name: "Restrictive",
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
      notes: ["Foreigners who settle in this settlement are prohibited from owning property in certain districts and sometimes pay a higher price for goods. This disdain rarely involves violence towards foreigners, though the city guard monitors strangers to ensure they don’t cross the boundaries of the city without appropriate paperwork."]
    },
    {
      name: "Rule of Might",
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
      notes: ["The settlement has a tradition of rule by the strongest individual."]
    },
    {
      name: "Rumormongering Citizens",
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
      notes: ["The settlement’s citizens are nosy and gossipy to a fault—very little happens in the settlement that no one knows about."]
    },
    {
      name: "Strategic Location",
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
      notes: ["The settlement sits at an important crossroads or alongside a deepwater port, or it serves as a barrier to a pass or bridge."]
    },
    {
      name: "Subterranian",
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
      notes: ["The settlement is at least partially built underground, sheltering it from enemies but also isolating it culturally."]
    },
    {
      name: "Superstitious",
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
      notes: ["The community has a deep and abiding fear of magic and the unexplained, but this fear has caused its citizens to become more supportive and loyal to each other and their settlement."]
    },
    {
      name: "Supportive",
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
      notes: ["The settlement provides aid to its citizens. A number of programs provide food and shelter to he less fortunate. Everyone in the settlement is guaranteed at least two meals a day and a place to sleep with a roof over their head."]
    },
    {
      name: "Timid Citizens",
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
      notes: ["Citizens are quiet and keep to themselves. Crimes often go unreported."]
    },
    {
      name: "Therapeutic",
      corruption: 0,
      crime: 0,
      economy: 1,
      law: 0,
      lore: 1,
      society: 0,
      danger: 0,
      spellcastingBonus: 0,
      baseValueBonus: 0,
      purchaseLimitBonus: 0,
      notes: ["The settlement is known for its minor healing properties- medicinal hot springs, clean, invigorating mountain air, a plethora of locally grown healing herbs and fruits, or perhaps some divine blessing. Whatever the reason, hospitals, nurseries, retreats and sanitariums are common within the settlement. Heal checks made within the settlement’s borders also receive the settlement’s Lore modifier if positive."]
    },
    {
      name: "Tourist Attraction",
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
      notes: ["The settlement possesses some sort of landmark or event that draws visitors from far and wide."]
    }
    /*
    Boom Town:
      Crime +1; Economy +2
    Counterculture Movement:
      Corruption and Law -1; Lore and Society +1
    Financial:
      Corruption and Law +1; Economy +2; increase base value by 30%; increase purchase limit by 50%
    Government Capitol:
      All settlement modifiers +1; increase base value and purchase limit by 10%
    Hardened:
      Corruption -2; Crime -2; Society -2; Law +2
    Industrial:
      Corruption, Economy, and Lore +1; increase base value by 10%; increase purchase limit by 20%
    Massive Underground:
      Crime +2; Society -1; Danger +10
    Military Presence:
      Economy and Law +1; increase base value by 10%
    Monastic Order:
      Economy +1, Law +1; Society -2
    On the Shoulders of Giants:
      Lore +1, Society +1
    Organized Crime:
      Corruption, Crime, and Economy +1; Law -2; Danger +10
    Party Town:
      Corruption +1; Crime +1 [+3 during major events]; Economy +1; Society +1
    Rabble Rousers:
      Corruption +1; Society +1; Economy -1; reduce Base Value and Purchase Limit by 10%
    Tribal:
      Society -4, Law +2
    Under Siege:
      Economy -1, Society -1, Danger -10
    */
  ],

  governments: [{
      name: "Authocracy/Governor/Mayor",
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
    {
      name: "Council/Parliament",
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
    {
      name: "Dynasty/Mafia",
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
    {
      name: "Magical",
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
    {
      name: "Overlord/King/Warlord",
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
    {
      name: "Secret Syndicate",
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
    {
      name: "Plutocracy",
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
  ]
}