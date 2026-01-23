import {
    Disc, CassetteTape, Radio, Gamepad2, Film, Watch,
    Smartphone, Cpu, Wifi, Battery, Server, MapPin
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
        { id: 'boots', name: 'Bootleg Tapes', min: 10, max: 60, icon: CassetteTape },
        { id: 'cigs', name: 'Imported Cigs', min: 40, max: 150, icon: Disc },
        { id: 'watches', name: 'Fake Rolexes', min: 100, max: 400, icon: Watch },
        { id: 'radar', name: 'Radar Detectors', min: 300, max: 900, icon: Radio },
        { id: 'arcades', name: 'PCB Boards', min: 1500, max: 4500, icon: Gamepad2 },
        { id: 'vcr', name: 'Modded VCRs', min: 5000, max: 12000, icon: Film },
    ],
    [THEMES.NOW]: [
        { id: 'vapes', name: 'Mega Vapes', min: 15, max: 80, icon: Battery },
        { id: 'ids', name: 'Fake IDs', min: 100, max: 300, icon: MapPin },
        { id: 'phones', name: 'Burner Phones', min: 200, max: 600, icon: Smartphone },
        { id: 'crypto', name: 'Cold Wallets', min: 500, max: 1500, icon: Wifi },
        { id: 'gpus', name: 'Mining GPUs', min: 2000, max: 5000, icon: Cpu },
        { id: 'ai', name: 'AI Models', min: 10000, max: 30000, icon: Server },
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
