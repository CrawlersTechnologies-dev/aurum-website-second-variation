// Centralized Pricing, VAT and Currency Configuration

export const pricingTiers = [
  {
    id: "starter",
    name: "Silver",
    priceBase: 1099,
  },
  {
    id: "enterprise", // "Gold" plan (using the old id from content.js)
    name: "Gold",
    priceBase: 1399,
  },
  {
    id: "diamond",
    name: "Diamond",
    priceBase: 1999,
  }
];

export const countriesList = [
  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "BH", name: "Bahrain" },
  { code: "KW", name: "Kuwait" },
  { code: "OM", name: "Oman" },
  { code: "QA", name: "Qatar" },
  { code: "UK", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "IN", name: "India" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "ZA", name: "South Africa" },
  { code: "OTHER", name: "Other / Not Listed" },
];

/**
 * Calculates pricing details based on the selected plan and country.
 * @param {string} planId
 * @param {string} countryCode
 */
export function calculatePricing(planId, countryCode) {
  const plan = pricingTiers.find(p => p.id === planId);
  if (!plan) {
    throw new Error("Invalid plan selected");
  }

  let currency = "EUR";
  let vatPercentage = 0;

  // Business Rules:
  // UAE/VAT-applicable region -> AED + 5% VAT
  // Other regions -> EUR + 0% VAT
  if (countryCode === "AE") {
    currency = "AED";
    vatPercentage = 5;
  }

  // Calculate amounts (always handle in smallest currency unit, e.g. cents)
  // For AED and EUR, 1 unit = 100 cents
  const basePriceValue = plan.priceBase;
  const vatAmountValue = Math.round((basePriceValue * vatPercentage) / 100);
  const totalValue = basePriceValue + vatAmountValue;

  return {
    planName: plan.name,
    basePrice: basePriceValue,
    vatPercentage,
    vatAmount: vatAmountValue,
    total: totalValue,
    currency: currency.toLowerCase(),
    currencyUpper: currency.toUpperCase()
  };
}
