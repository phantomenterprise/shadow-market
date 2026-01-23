export const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(amount);
};

export const generatePrices = (products) => {
    const prices = {};
    products.forEach(p => {
        prices[p.id] = rand(p.min, p.max);
        // Occasional spikes
        if (Math.random() > 0.85) {
            if (Math.random() > 0.5) {
                prices[p.id] *= 2; // High demand
            } else {
                prices[p.id] = Math.floor(prices[p.id] / 2); // Surplus
            }
        }
    });
    return prices;
};

export const rollEvent = () => {
    const r = Math.random();
    if (r < 0.08) return 'cops';      // 8%
    if (r < 0.14) return 'mugged';    // 6%
    if (r < 0.22) return 'find';      // 8%
    if (r < 0.28) return 'dealer';    // 6%
    if (r < 0.32) return 'tip';       // 4%
    if (r < 0.40) return 'market';    // 8% - New: Price spike/crash
    return null;
};
