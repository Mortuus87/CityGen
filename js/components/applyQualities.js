import roll from "./rollArray.js";

export default function (settlement) {
    // calculate number of qualities, and roll for them.
    let qualities = roll(settlementTables.qualities, settlement.qualityNumber);
    let government = roll(settlementTables.governments);

    for (let i = 0; i < qualities.length; i++) {
        const quality = qualities[i];
        applyQuality(settlement, quality);
    }

    applyQuality(settlement, government)

    settlement.government = government.name;
    settlement.purchaseLimitTotal = settlement.purchaseLimit + settlement.statistics.purchaseLimitBonus;
    settlement.baseValueTotal = settlement.baseValue + settlement.statistics.baseValueBonus;
    settlement.spellcastingLevel = settlementTables.spellcasting[settlement.spellcasting];
    settlement.magicItems.minor = settlementTables.magicItemBySpellcasting[settlement.size+4];
    settlement.magicItems.medium = settlementTables.magicItemBySpellcasting[settlement.size+2];
    settlement.magicItems.major = settlementTables.magicItemBySpellcasting[settlement.size+0];

    return settlement;
}

function applyQuality (settlement, quality) {
    settlement.qualities.push(quality.name);
    settlement.notes = [...settlement.notes, ...quality.statistics.notes];
    
    settlement.statistics.corruption += quality.statistics.corruption;
    settlement.statistics.crime += quality.statistics.crime;
    settlement.statistics.economy += quality.statistics.economy;
    settlement.statistics.law += quality.statistics.law;
    settlement.statistics.lore += quality.statistics.lore;
    settlement.statistics.society += quality.statistics.society;
    settlement.statistics.danger += quality.statistics.danger;

    // settlement.spellcasting += quality.statistics.spellcastingBonus;
    settlement.statistics.baseValueBonus += settlement.baseValue * quality.statistics.baseValueBonus
    settlement.statistics.purchaseLimitBonus += settlement.purchaseLimit * quality.statistics.purchaseLimitBonus
    // console.log(quality);
}