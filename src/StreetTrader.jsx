import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  DollarSign,
  Flame,
  MapPin,
  Package,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

const TIMELINES = {
  '1980s': {
    name: '1980s Era',
    currency: '$',
    locations: [
      { id: 'bronx', name: 'Bronx', icon: '🏙️', x: 20, y: 25 },
      { id: 'brooklyn', name: 'Brooklyn', icon: '🌉', x: 52, y: 55 },
      { id: 'manhattan', name: 'Manhattan', icon: '🏢', x: 38, y: 15 },
      { id: 'queens', name: 'Queens', icon: '🏘️', x: 70, y: 26 },
      { id: 'staten', name: 'Staten Island', icon: '🏝️', x: 15, y: 70 },
      { id: 'harlem', name: 'Harlem', icon: '🎵', x: 40, y: 33 },
      { id: 'jersey', name: 'Jersey City', icon: '🌆', x: 8, y: 45 },
      { id: 'yonkers', name: 'Yonkers', icon: '🏘️', x: 25, y: 8 },
    ],
    products: [
      { name: 'Contraband Electronics', basePrice: 300, volatility: 0.8, icon: '📻' },
      { name: 'Black Market Watches', basePrice: 500, volatility: 0.7, icon: '⌚' },
      { name: 'Stolen Car Parts', basePrice: 200, volatility: 0.6, icon: '🔧' },
      { name: 'Bootleg Tapes', basePrice: 50, volatility: 0.5, icon: '📼' },
      { name: 'Hot Jewelry', basePrice: 800, volatility: 0.9, icon: '💎' },
      { name: 'Counterfeit Designer Bags', basePrice: 150, volatility: 0.65, icon: '👜' },
    ],
    startCash: 2000,
    maxDebt: 5000,
    daysTotal: 30,
    vibe: 'Neon-lit streets and analog hustle.',
  },
  '2020s': {
    name: '2020s Era',
    currency: '$',
    locations: [
      { id: 'downtown', name: 'Downtown', icon: '🏙️', x: 30, y: 35 },
      { id: 'tech', name: 'Tech Hub', icon: '💻', x: 60, y: 25 },
      { id: 'arts', name: 'Arts District', icon: '🎨', x: 45, y: 55 },
      { id: 'marina', name: 'Marina', icon: '⛵', x: 72, y: 50 },
      { id: 'university', name: 'University', icon: '🎓', x: 25, y: 20 },
      { id: 'suburbs', name: 'Suburbs', icon: '🏡', x: 82, y: 35 },
      { id: 'industrial', name: 'Industrial', icon: '🏭', x: 12, y: 52 },
      { id: 'financial', name: 'Financial', icon: '💼', x: 50, y: 15 },
    ],
    products: [
      { name: 'Cryptocurrency Miners', basePrice: 1200, volatility: 0.85, icon: '⛏️' },
      { name: 'Scalped GPUs', basePrice: 800, volatility: 0.75, icon: '🎮' },
      { name: 'Counterfeit Luxury Sneakers', basePrice: 300, volatility: 0.7, icon: '👟' },
      { name: 'Black Market Phones', basePrice: 600, volatility: 0.65, icon: '📱' },
      { name: 'Stolen Designer Clothing', basePrice: 400, volatility: 0.8, icon: '👔' },
      { name: 'Hot Electronics', basePrice: 500, volatility: 0.7, icon: '💻' },
    ],
    startCash: 5000,
    maxDebt: 15000,
    daysTotal: 30,
    vibe: 'Digital smuggling in hyper-connected districts.',
  },
};

const RANDOM_EVENTS = [
  { text: 'Police raid nearby! Prices spike due to scarcity.', effect: 'priceIncrease', multiplier: 1.5, icon: '🚨' },
  { text: 'Major shipment arrives - market flooded!', effect: 'priceDecrease', multiplier: 0.6, icon: '📦' },
  { text: 'Heat is on! Cops are watching closely.', effect: 'heatIncrease', multiplier: 1.3, icon: '👮' },
  { text: 'Found a connection - bonus inventory space!', effect: 'inventoryBonus', multiplier: 1.5, icon: '🤝' },
  { text: 'Rival gang war disrupts supply chains!', effect: 'volatility', multiplier: 2, icon: '💥' },
  { text: 'Informant tipped you off - safe passage today.', effect: 'safe', multiplier: 0.5, icon: '🕵️' },
  { text: 'Economic boom in the area - high demand!', effect: 'priceIncrease', multiplier: 1.4, icon: '💰' },
  { text: 'Warehouse fire destroys competitor stock!', effect: 'priceIncrease', multiplier: 1.6, icon: '🔥' },
  { text: 'Undercover operation failed - market normalizes.', effect: 'normal', multiplier: 1, icon: '✅' },
  { text: 'Turf control shifts - new opportunities!', effect: 'volatility', multiplier: 1.8, icon: '🎲' },
];

const TRAVEL_EVENTS = [
  { text: 'Smooth sailing - arrived safely!', damage: 0, icon: '✨' },
  { text: 'Smooth sailing - arrived safely!', damage: 0, icon: '✨' },
  { text: 'Smooth sailing - arrived safely!', damage: 0, icon: '✨' },
  { text: 'Minor shakedown - lost some cash!', damage: 0.05, icon: '💸' },
  { text: 'Ran into trouble - paid protection!', damage: 0.1, icon: '🤕' },
  { text: 'Cops stopped you - paid a fine!', damage: 0.15, icon: '🚓' },
  { text: 'Ambushed! Lost inventory!', damage: 0.2, inventoryLoss: true, icon: '⚠️' },
];

const EVENT_STYLES = {
  danger: 'from-red-500/90 to-orange-500/90 border-red-300',
  travel: 'from-amber-500/90 to-yellow-500/90 border-amber-300',
};

export default function StreetTrader() {
  const [timeline, setTimeline] = useState('1980s');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [day, setDay] = useState(1);
  const [cash, setCash] = useState(0);
  const [debt, setDebt] = useState(0);
  const [health] = useState(100);
  const [location, setLocation] = useState('');
  const [inventory, setInventory] = useState({});
  const [prices, setPrices] = useState({});
  const [currentEvent, setCurrentEvent] = useState(null);
  const [travelEvent, setTravelEvent] = useState(null);
  const [maxInventory, setMaxInventory] = useState(100);
  const [heatLevel, setHeatLevel] = useState(0);

  const config = TIMELINES[timeline];

  const initGame = () => {
    setCash(config.startCash);
    setDebt(0);
    setDay(1);
    setLocation(config.locations[0].id);
    setInventory({});
    setCurrentEvent(null);
    setTravelEvent(null);
    setMaxInventory(100);
    setHeatLevel(0);
    setGameOver(false);
    setGameStarted(true);
    generatePrices();
  };

  const generatePrices = (eventMultiplier = 1) => {
    const newPrices = {};

    config.products.forEach((product) => {
      const variance = (Math.random() - 0.5) * 2 * product.volatility;
      newPrices[product.name] = Math.max(
        Math.round(product.basePrice * (1 + variance) * eventMultiplier),
        Math.round(product.basePrice * 0.3)
      );
    });

    setPrices(newPrices);
  };

  const triggerRandomEvent = () => {
    if (Math.random() < 0.4) {
      const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      setCurrentEvent(event);

      switch (event.effect) {
        case 'priceIncrease':
        case 'priceDecrease':
        case 'volatility':
          generatePrices(event.multiplier);
          break;
        case 'inventoryBonus':
          setMaxInventory(150);
          break;
        case 'heatIncrease':
          setHeatLevel((prev) => Math.min(100, prev + 30));
          break;
        case 'safe':
          setHeatLevel((prev) => Math.max(0, prev - 20));
          break;
        default:
          break;
      }

      setTimeout(() => setCurrentEvent(null), 4000);
    }
  };

  const getTotalInventory = () => Object.values(inventory).reduce((sum, qty) => sum + qty, 0);

  const buyProduct = (productName, quantity) => {
    const price = prices[productName];
    const cost = price * quantity;
    const newTotal = getTotalInventory() + quantity;

    if (newTotal > maxInventory) {
      alert(`Not enough carrying capacity! You can only carry ${maxInventory} items total.`);
      return;
    }

    if (cost > cash) {
      alert('Not enough cash!');
      return;
    }

    setCash((prev) => prev - cost);
    setInventory((prev) => ({
      ...prev,
      [productName]: (prev[productName] || 0) + quantity,
    }));
  };

  const sellProduct = (productName, quantity) => {
    if (!inventory[productName] || inventory[productName] < quantity) {
      alert('Not enough inventory!');
      return;
    }

    const price = prices[productName];
    const revenue = price * quantity;

    setCash((prev) => prev + revenue);
    setInventory((prev) => ({
      ...prev,
      [productName]: prev[productName] - quantity,
    }));
  };

  const travelTo = (newLocation) => {
    if (newLocation === location) return;

    const tEvent = TRAVEL_EVENTS[Math.floor(Math.random() * TRAVEL_EVENTS.length)];
    setTravelEvent(tEvent);

    if (tEvent.damage > 0) {
      const cashLoss = Math.round(cash * tEvent.damage);
      setCash((prev) => Math.max(0, prev - cashLoss));

      if (tEvent.inventoryLoss) {
        const lostItems = {};
        Object.keys(inventory).forEach((key) => {
          lostItems[key] = Math.max(0, inventory[key] - Math.floor(inventory[key] * 0.3));
        });
        setInventory(lostItems);
      }
    }

    setTimeout(() => setTravelEvent(null), 3000);

    setLocation(newLocation);
    setDay((prev) => prev + 1);

    if (debt > 0) {
      const interest = Math.round(debt * 0.1);
      setDebt((prev) => prev + interest);
    }

    setHeatLevel((prev) => Math.max(0, prev - 5));
    setMaxInventory(100);

    generatePrices();
    triggerRandomEvent();

    if (day >= config.daysTotal) {
      endGame();
    }
  };

  const takeLoan = () => {
    const loanAmount = Math.min(2000, config.maxDebt - debt);
    if (loanAmount <= 0) {
      alert('Maximum debt reached!');
      return;
    }
    setCash((prev) => prev + loanAmount);
    setDebt((prev) => prev + loanAmount);
    setHeatLevel((prev) => Math.min(100, prev + 10));
  };

  const repayDebt = () => {
    const payment = Math.min(cash, debt);
    setCash((prev) => prev - payment);
    setDebt((prev) => prev - payment);
  };

  const endGame = () => {
    setGameOver(true);
  };

  const netWorth = useMemo(
    () =>
      cash -
      debt +
      Object.entries(inventory).reduce((sum, [name, qty]) => sum + (prices[name] || 0) * qty, 0),
    [cash, debt, inventory, prices]
  );

  const getCurrentLocation = () => config.locations.find((loc) => loc.id === location);

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200 border border-red-500/30">
              <Sparkles size={16} /> Underground Trading Simulator
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-300">
              Shadow Market
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
              Navigate volatile black markets, dodge heat, and build a legend across two eras of high-risk trade.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_0_40px_-20px_rgba(239,68,68,0.6)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Choose your era</h2>
                  <p className="text-sm text-slate-400">Each timeline has unique markets and starting stakes.</p>
                </div>
                <Flame className="text-red-400" />
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {Object.entries(TIMELINES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setTimeline(key)}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      timeline === key
                        ? 'border-red-400 bg-gradient-to-br from-red-500/30 to-orange-500/20 shadow-lg'
                        : 'border-white/10 bg-slate-900/60 hover:border-red-400/60 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{value.name}</h3>
                      <span className="text-xs uppercase text-slate-400">{value.daysTotal} days</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">{value.vibe}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-slate-200">
                      <span className="rounded-full bg-black/30 px-3 py-1">Start {value.currency}{value.startCash}</span>
                      <span className="rounded-full bg-black/30 px-3 py-1">Max Debt {value.currency}{value.maxDebt}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="text-red-400" size={20} />
                How to play
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-red-400" />
                  Travel between locations to hunt for price gaps.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-orange-400" />
                  Keep heat low to avoid costly travel events.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-yellow-300" />
                  Manage debt carefully—daily interest hits hard.
                </li>
              </ul>
              <button
                onClick={initGame}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 py-3 text-base font-bold text-slate-900 shadow-lg shadow-red-500/30 transition hover:brightness-110"
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white p-6 flex items-center justify-center">
        <div className="max-w-xl w-full rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center">
          <h1 className="text-4xl font-bold">Game Over</h1>
          <p className="mt-3 text-sm text-slate-400">You made it through the underground.</p>
          <div className="mt-6 rounded-xl border border-white/10 bg-slate-950/70 px-6 py-5">
            <p className="text-sm text-slate-400">Final Net Worth</p>
            <p className={`mt-2 text-5xl font-black ${netWorth >= config.startCash ? 'text-emerald-400' : 'text-red-400'}`}>
              {config.currency}{netWorth.toLocaleString()}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              {netWorth >= config.startCash * 10
                ? 'Legendary hustler! 👑'
                : netWorth >= config.startCash * 5
                  ? 'Major player! 💎'
                  : netWorth >= config.startCash * 2
                    ? 'Solid work! 💰'
                    : netWorth >= config.startCash
                      ? 'You survived! ✅'
                      : 'Better luck next time! 💀'}
            </p>
          </div>
          <button
            onClick={() => {
              setGameStarted(false);
              setGameOver(false);
            }}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 py-3 font-bold text-slate-900"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-950 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6">
        {currentEvent && (
          <div className={`fixed left-1/2 top-4 z-50 w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border bg-gradient-to-r ${EVENT_STYLES.danger} p-3 shadow-2xl backdrop-blur`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{currentEvent.icon}</span>
              <p className="text-sm font-semibold sm:text-base">{currentEvent.text}</p>
            </div>
          </div>
        )}

        {travelEvent && (
          <div className={`fixed left-1/2 top-20 z-50 w-[92vw] max-w-lg -translate-x-1/2 rounded-2xl border bg-gradient-to-r ${EVENT_STYLES.travel} p-3 shadow-2xl backdrop-blur`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{travelEvent.icon}</span>
              <p className="text-sm font-semibold sm:text-base">{travelEvent.text}</p>
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-lg">
          <div className="grid gap-4 sm:grid-cols-5">
            <div className="flex items-center gap-3">
              <Calendar className="text-red-400" size={18} />
              <div>
                <p className="text-xs text-slate-400">Day</p>
                <p className="text-base font-semibold">{day}/{config.daysTotal}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="text-emerald-400" size={18} />
              <div>
                <p className="text-xs text-slate-400">Cash</p>
                <p className="text-base font-semibold">{config.currency}{cash.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="text-orange-400" size={18} />
              <div>
                <p className="text-xs text-slate-400">Debt</p>
                <p className="text-base font-semibold">{config.currency}{debt.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className="text-sky-400" size={18} />
              <div>
                <p className="text-xs text-slate-400">Space</p>
                <p className="text-base font-semibold">{getTotalInventory()}/{maxInventory}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className={`${heatLevel > 70 ? 'text-red-500' : heatLevel > 40 ? 'text-yellow-400' : 'text-emerald-400'}`} size={18} />
              <div className="w-full">
                <p className="text-xs text-slate-400">Heat</p>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all ${heatLevel > 70 ? 'bg-red-500' : heatLevel > 40 ? 'bg-yellow-400' : 'bg-emerald-400'}`}
                    style={{ width: `${heatLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="text-red-400" size={18} />
                <h2 className="text-lg font-bold">City Grid</h2>
              </div>
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-200">{getCurrentLocation()?.name}</span>
            </div>

            <div className="relative mt-4 h-56 rounded-2xl border border-white/10 bg-slate-950/70">
              <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
                {config.locations.map((loc, index) =>
                  config.locations.slice(index + 1).map((loc2) => (
                    <line
                      key={`${loc.id}-${loc2.id}`}
                      x1={`${loc.x}%`}
                      y1={`${loc.y}%`}
                      x2={`${loc2.x}%`}
                      y2={`${loc2.y}%`}
                      stroke="#475569"
                      strokeWidth="1"
                      strokeDasharray="4"
                    />
                  ))
                )}
              </svg>
              {config.locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => travelTo(loc.id)}
                  disabled={loc.id === location}
                  className={`group absolute -translate-x-1/2 -translate-y-1/2 transition-all ${
                    loc.id === location
                      ? 'scale-110 text-red-300'
                      : 'text-slate-300 hover:scale-110 hover:text-white'
                  }`}
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-2xl">{loc.icon}</span>
                    <span className={`text-[10px] font-semibold ${loc.id === location ? 'text-red-200' : 'text-slate-200 group-hover:text-white'}`}>
                      {loc.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-slate-950/60 p-3 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-200">Health</span>
                <span>{health}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-400" style={{ width: `${health}%` }} />
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <button
                onClick={takeLoan}
                disabled={debt >= config.maxDebt}
                className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500/90 py-2 text-sm font-semibold text-slate-900 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Briefcase size={16} /> Borrow {config.currency}2,000
              </button>
              <button
                onClick={repayDebt}
                disabled={debt === 0 || cash === 0}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <DollarSign size={16} /> Repay Debt
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="text-red-400" size={18} />
                <h2 className="text-lg font-bold">Market - {getCurrentLocation()?.name}</h2>
              </div>
              <span className="text-xs text-slate-400">Prices update each trip</span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-slate-950/70 text-xs uppercase text-slate-400">
                  <tr>
                    <th className="px-3 py-2 text-left">Item</th>
                    <th className="px-3 py-2 text-right">Price</th>
                    <th className="px-3 py-2 text-right">Owned</th>
                    <th className="px-3 py-2 text-right">Trade</th>
                  </tr>
                </thead>
                <tbody>
                  {config.products.map((product) => (
                    <tr key={product.name} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{product.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-100">{product.name}</p>
                            <p className="text-[11px] text-slate-400">Volatility {(product.volatility * 100).toFixed(0)}%</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-right font-semibold text-emerald-400">
                        {config.currency}{prices[product.name]?.toLocaleString()}
                      </td>
                      <td className="px-3 py-3 text-right text-slate-200">{inventory[product.name] || 0}</td>
                      <td className="px-3 py-3">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            onClick={() => buyProduct(product.name, 1)}
                            className="rounded-lg bg-sky-500/90 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-sky-400"
                          >
                            Buy 1
                          </button>
                          <button
                            onClick={() => buyProduct(product.name, 5)}
                            className="rounded-lg bg-sky-500/90 px-3 py-1 text-xs font-semibold text-slate-900 hover:bg-sky-400"
                          >
                            Buy 5
                          </button>
                          <button
                            onClick={() => sellProduct(product.name, 1)}
                            disabled={!inventory[product.name]}
                            className="rounded-lg bg-rose-500/90 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-400 disabled:opacity-40"
                          >
                            Sell 1
                          </button>
                          <button
                            onClick={() => sellProduct(product.name, inventory[product.name] || 0)}
                            disabled={!inventory[product.name]}
                            className="rounded-lg bg-rose-500/90 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-400 disabled:opacity-40"
                          >
                            Sell All
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400">Net Worth</p>
              <p className="text-2xl font-bold">{config.currency}{netWorth.toLocaleString()}</p>
              <p className="text-xs text-slate-400">Cash + Inventory Value - Debt</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Zap className={`${heatLevel > 70 ? 'text-red-400 animate-pulse' : 'text-yellow-300'}`} size={18} />
              <span>Heat Level {heatLevel}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
