export const creditMap: Record<string, number> = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: 20, // 5 USD
  [process.env.STRIPE_PLUS_PRICE_ID!]: 50, // 9 USD
  [process.env.STRIPE_PRO_PRICE_ID!]: 100 // 14 USD
}
