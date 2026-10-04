// Planes de ejemplo
export const PLANS = [
  { months: 12, rate: 0.028 },
  { months: 24, rate: 0.032 },
  { months: 36, rate: 0.035 },
  { months: 48, rate: 0.038 },
] as const

// Cuota fija (sistema francés)
export function monthlyPayment(financed: number, rate: number, months: number) {
  if (financed <= 0) return 0
  return rate === 0 ? financed / months : (financed * rate) / (1 - Math.pow(1 + rate, -months))
}

export const usd = (n: number) => `US$ ${new Intl.NumberFormat('es-UY', { maximumFractionDigits: 0 }).format(Math.round(n))}`
