import {
    Pill, Leaf, Zap, Ghost, Snowflake, Skull, Gem, FlaskConical, Syringe, TestTube,
    Cannabis // Check if Cannabis exists, implies Leaf is safer. Stick to Leaf.
} from 'lucide-react';

export const THEMES = {
    EIGHTIES: 'eighties',
    NOW: 'now',
};

export const LOCATIONS = [
    { id: 'bronx', name: 'Bronx', x: 10, y: 10 },
    { id: 'brooklyn', name: 'Brooklyn', x: 10, y: 90 },
    { id: 'manhattan', name: 'Manhattan', x: 50, y: 50 },
    { id: 'queens', name: 'Queens', x: 90, y: 50 },
    { id: 'jersey', name: 'Jersey City', x: 10, y: 50 },
    { id: 'staten', name: 'Staten Is.', x: 50, y: 90 },
];

export const PRODUCTS = {
    [THEMES.EIGHTIES]: [
        { id: 'ludes', name: 'Ludes', min: 10, max: 60, icon: Pill },
        { id: 'weed', name: 'Weed', min: 40, max: 150, icon: Leaf },
        { id: 'shrooms', name: 'Magic Mushrooms', min: 100, max: 400, icon: Ghost },
        { id: 'speed', name: 'Speed', min: 300, max: 900, icon: Zap },
        { id: 'crack', name: 'Crack', min: 1500, max: 4500, icon: TestTube },
        { id: 'coke', name: 'Cocaine', min: 5000, max: 12000, icon: Snowflake },
    ],
    [THEMES.NOW]: [
        { id: 'fent', name: 'Fentanyl', min: 15, max: 80, icon: Skull },
        { id: 'spice', name: 'Spice / K2', min: 50, max: 180, icon: Leaf },
        { id: 'molly', name: 'Molly', min: 100, max: 300, icon: Gem },
        { id: 'ketamine', name: 'Ketamine', min: 500, max: 1500, icon: FlaskConical },
        { id: 'meth', name: 'Crystal Meth', min: 2000, max: 5000, icon: Zap },
        { id: 'heroin', name: 'Pure Heroin', min: 10000, max: 30000, icon: Syringe },
    ]
};

export const EVENTS = [
    { id: 'cops', text: 'Police Raid! You ran but dropped some product.', type: 'bad' },
    { id: 'find', text: 'You found a stash in a dumpster!', type: 'good' },
    { id: 'mugged', text: 'Muggers jumped you! Lost some cash.', type: 'bad' },
    { id: 'deal', text: 'A local buyer offers a premium for ', type: 'market' }, // "for [Product]"
    { id: 'bust', text: 'Market crash! Prices plummeted for ', type: 'market' }, // "for [Product]"
];

export const MAX_DAYS_OPTIONS = [30, 60];
export const STARTING_CASH = 2000;
export const STARTING_DEBT = 5500;
export const STARTING_POCKET = 20; // limit 
