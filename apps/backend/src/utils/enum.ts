export const Category = {
  SEALED_PRODUCTS: "SEALED_PRODUCTS", // Booster boxes, packs, elite trainer boxes
  SINGLES: "SINGLES",                 // Individual cards
  SUPPLIES: "SUPPLIES",               // Sleeves, binders, deck boxes
  OTHERS: "OTHERS",                   // Anything that doesn't fit above
} as const

export type Category = (typeof Category)[keyof typeof Category]

export const Condition = {
  NM: "NM",   // Near Mint — no visible wear, print defects only
  LP: "LP",   // Lightly Played — minor wear on edges/corners
  MP: "MP",   // Moderately Played — noticeable wear, no creases
  HP: "HP",   // Heavily Played — significant wear, possible creases
  DMG: "DMG", // Damaged — tears, heavy creases, water damage
} as const

export type Condition = (typeof Condition)[keyof typeof Condition]

export const Game = {
  POKEMON: "POKEMON",
  OTHERS: "",
} as const

export type Game = (typeof Game)[keyof typeof Game]
