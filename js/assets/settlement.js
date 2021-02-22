const settlementTables = {
  alignment: {
    all: ["LG", "NG", "CG", "LN", "TN", "CN", "LE", "NE", "CE"],
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
  spellcasting: ["-", "0th", "1st", "2nd", "3rd", "4th", "5th", "6th"]



}