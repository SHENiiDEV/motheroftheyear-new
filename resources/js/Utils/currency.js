export const CURRENCIES = {
    EUR: { code: 'EUR', symbol: '€', label: 'EUR (€)', rate: 1.0, flag: '🇪🇺' },
    USD: { code: 'USD', symbol: '$', label: 'USD ($)', rate: 1.08, flag: '🇺🇸' },
    GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', rate: 0.85, flag: '🇬🇧' },
};

export function formatPrice(eurAmount, currencyCode = 'EUR') {
    const curr = CURRENCIES[currencyCode] || CURRENCIES.EUR;
    const amount = Math.round(Number(eurAmount || 0) * curr.rate);
    return `${curr.symbol}${amount}`;
}
