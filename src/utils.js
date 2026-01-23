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
    if (r < 0.15) return 'cops';
    if (r < 0.25) return 'mugged';
    if (r < 0.35) return 'find';
    // Market events handled separately usually, but we can return general events here
    return null;
};
