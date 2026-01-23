import { useState, useEffect, useCallback } from 'react';
import { LOCATIONS, PRODUCTS, STARTING_CASH, STARTING_DEBT, STARTING_POCKET } from '../constants';
import { rand, generatePrices, rollEvent } from '../utils';

export const useGame = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing, gameover
    const [theme, setTheme] = useState('now');
    const [maxDays, setMaxDays] = useState(30);

    const [day, setDay] = useState(1);
    const [location, setLocation] = useState(LOCATIONS[0].id);
    const [cash, setCash] = useState(STARTING_CASH);
    const [bank, setBank] = useState(0);
    const [debt, setDebt] = useState(STARTING_DEBT);
    const [pocket, setPocket] = useState(STARTING_POCKET);
    const [inventory, setInventory] = useState({});
    const [prices, setPrices] = useState({});
    const [logs, setLogs] = useState([]);
    const [score, setScore] = useState(0);

    const activeProducts = PRODUCTS[theme];

    const addLog = (msg) => {
        setLogs(prev => [msg, ...prev].slice(0, 50));
    };

    const initGame = (selectedDuration, selectedTheme) => {
        setTheme(selectedTheme);
        setMaxDays(selectedDuration);
        setDay(1);
        setCash(STARTING_CASH);
        setBank(0);
        setDebt(STARTING_DEBT);
        setPocket(STARTING_POCKET);
        setInventory(PRODUCTS[selectedTheme].reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));
        setLocation(LOCATIONS[0].id);
        setLogs(['Welcome to the streets. Good luck.']);

        // Initial prices
        setPrices(generatePrices(PRODUCTS[selectedTheme]));
        setGameState('playing');
    };

    const travel = (newLocId) => {
        if (day >= maxDays) {
            endGame();
            return;
        }

        setDay(d => d + 1);
        setLocation(newLocId);

        // Debt Interest (5% daily) - Predatory!
        const interest = Math.ceil(debt * 0.05);
        setDebt(d => d + interest);

        // Dynamic Prices
        const newPrices = generatePrices(activeProducts);
        setPrices(newPrices);

        // Random Events
        const evt = rollEvent();
        if (evt === 'cops') {
            const runSuccess = Math.random() > 0.4; // 60% chance to fail running? Make it fair. 50/50
            if (Math.random() > 0.5) {
                addLog("👮 Police raid! You managed to escape.");
            } else {
                // Lose random product
                const items = Object.keys(inventory).filter(k => inventory[k] > 0);
                if (items.length > 0) {
                    const itemToLose = items[rand(0, items.length - 1)];
                    const lostAmount = Math.ceil(inventory[itemToLose] * 0.5);
                    setInventory(prev => ({ ...prev, [itemToLose]: prev[itemToLose] - lostAmount }));
                    addLog(`👮 Police caught you! Confiscated ${lostAmount} ${itemToLose}.`);
                } else {
                    addLog("👮 Police stopped you, but you were clean.");
                }
            }
        } else if (evt === 'mugged') {
            const lost = Math.floor(cash * 0.2); // Lose 20%
            if (lost > 0) {
                setCash(c => c - lost);
                addLog(`😠 Mugged! They took $${lost}.`);
            }
        } else if (evt === 'find') {
            const amount = rand(500, 2000);
            setCash(c => c + amount);
            addLog(`💰 Found a stash! +$${amount}.`);
        } else {
            addLog(`You traveled to ${LOCATIONS.find(l => l.id === newLocId).name}.`);
        }

        if (day + 1 > maxDays) {
            endGame();
        }
    };

    const buy = (productId, count) => {
        const cost = prices[productId] * count;
        if (cash >= cost) {
            setCash(c => c - cost);
            setInventory(prev => ({ ...prev, [productId]: (prev[productId] || 0) + count }));
        }
    };

    const sell = (productId, count) => {
        const revenue = prices[productId] * count;
        if (inventory[productId] >= count) {
            setCash(c => c + revenue);
            setInventory(prev => ({ ...prev, [productId]: prev[productId] - count }));
        }
    };

    const deposit = (amount) => {
        if (cash >= amount) {
            setCash(c => c - amount);
            setBank(b => b + amount);
        }
    };

    const withdraw = (amount) => {
        if (bank >= amount) {
            setBank(b => b - amount);
            setCash(c => c + amount);
        }
    };

    const payDebt = (amount) => {
        if (cash >= amount) {
            setCash(c => c - amount);
            setDebt(d => d - amount);
        }
    };

    const borrow = (amount) => {
        setCash(c => c + amount);
        setDebt(d => d + amount);
    };

    const upgradePocket = () => {
        const cost = pocket * 100;
        if (cash >= cost) {
            setCash(c => c - cost);
            setPocket(p => p + 10);
            addLog(`🎒 Pocket upgraded! Now holds ${pocket + 10}.`);
        }
    }

    const endGame = () => {
        const finalScore = cash + bank - debt;
        setScore(finalScore);
        setGameState('gameover');
    };

    return {
        gameState,
        theme,
        day,
        maxDays,
        location,
        cash,
        bank,
        debt,
        pocket,
        inventory,
        prices,
        logs,
        score,
        activeProducts,
        // Actions
        initGame,
        travel,
        buy,
        sell,
        deposit,
        withdraw,
        payDebt,
        borrow,
        upgradePocket,
        setGameState, // for restarts
    };
};
