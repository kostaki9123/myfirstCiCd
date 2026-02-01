export async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  // 1️⃣ Same currency → no API call
  if (from === to) return amount

  try {
    const res = await fetch(
      `https://hexarate.paikama.co/api/rates/${from}/${to}/latest`,
      {
        // optional but good practice in Next / Node
        next: { revalidate: 60 * 60 }, // cache 1 hour
      }
    )

    if (!res.ok) {
      throw new Error("Failed to fetch exchange rate")
    }

    const data = await res.json()

    const rate = data?.mid

    if (!rate || typeof rate !== "number") {
      throw new Error("Invalid rate data")
    }

    const converted = amount * rate

    // optional rounding to 2 decimals
    return Math.round(converted * 100) / 100
  } catch (err) {
    console.error("Currency conversion failed:", err)

    // fallback: return original amount
    // you could also throw instead depending on business rules
    return amount
  }
}
