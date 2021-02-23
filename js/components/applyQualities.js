import roll from "./rollArray.js";

export default function (settlement) {

    // calculate number of qualities, and roll for them.
    let qualities = roll(qualityTables, settlement.qualityNumber);


    qualities.forEach(quality => {
        applyQuality(settlement, quality);
    });

    settlement.purchaseLimitTotal = settlement.purchaseLimit + settlement.statistics.purchaseLimitBonus;
    settlement.baseValueTotal = settlement.baseValue + settlement.statistics.baseValueBonus;

    return settlement;
}

function applyQuality (settlement, quality) {
    // console.log(settlement);
    // console.log(quality);

    settlement.qualities.push(quality.name);
    settlement.notes = [...settlement.notes, ...quality.statistics.notes];
    
    settlement.statistics.corruption += quality.statistics.corruption;
    settlement.statistics.crime += quality.statistics.crime;
    settlement.statistics.economy += quality.statistics.economy;
    settlement.statistics.law += quality.statistics.law;
    settlement.statistics.lore += quality.statistics.lore;
    settlement.statistics.society += quality.statistics.society;
    settlement.statistics.danger += quality.statistics.danger;
    
    settlement.statistics.spellcastingBonus +=  quality.statistics.spellcastingBonus;
    settlement.statistics.baseValueBonus += settlement.baseValue * quality.statistics.baseValueBonus
    settlement.statistics.purchaseLimitBonus += settlement.purchaseLimit * quality.statistics.purchaseLimitBonus
}