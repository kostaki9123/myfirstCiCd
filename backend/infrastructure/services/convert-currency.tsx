export const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 151.5,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.90,
  CNY: 7.23,
  INR: 83.1,
  KRW: 1340,
  SGD: 1.35,
  HKD: 7.82,
  NZD: 1.65,
  MXN: 16.8,
  BRL: 5.05,
  ZAR: 18.5,
  SEK: 10.5,
  NOK: 10.7,
  DKK: 6.9,
  PLN: 4.0,
  TRY: 32.0,
  THB: 36.5,
  IDR: 15800,
  MYR: 4.7,
  PHP: 56.5,
  VND: 24500,
  AED: 3.67,
  SAR: 3.75,
  ILS: 3.7,
  EGP: 48.0,
  TWD: 31.5,
  ARS: 860,
  CLP: 950,
  COP: 3900,
  PEN: 3.8,
  CZK: 23.5,
  HUF: 360,
  RON: 4.6,
  NGN: 1500,
  MAD: 10.0,
}



export function convertCurrency(
  amount: number,
  from: string,
  to: string
): number {
  if (from === to) return amount

  const fromRate = RATES[from]
  const toRate = RATES[to]

  if (!fromRate || !toRate) {
    console.error("Missing rate:", { from, to })
    return amount
  }

  // Convert → USD → target
  const amountInUSD = amount / fromRate
  const converted = amountInUSD * toRate

  return Math.round(converted * 100) / 100
}