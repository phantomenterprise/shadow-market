# Shadow Market 🏙️

A high-stakes underground trading simulation game where you navigate the volatile black market economy across two distinct time periods.

## 🎮 Game Overview

Shadow Market is an economic strategy game inspired by classic trading simulators. Travel between locations, buy low, sell high, and manage your resources carefully to maximize your wealth before time runs out.

## ⚡ Features

### Two Unique Timelines
- **1980s Era**: Navigate the classic New York underground scene across 8 iconic locations
- **2020s Era**: Trade modern contraband in contemporary urban districts

### Dynamic Gameplay Elements
- **Random Market Events**: Police raids, market floods, gang wars, and more affect prices unpredictably
- **Travel Events**: Face risks while moving between locations including shakedowns, ambushes, and police stops
- **Heat System**: Monitor your risk level - high heat brings more danger
- **Inventory Management**: Limited carrying capacity forces strategic decisions
- **Debt System**: Take loans to expand your operation, but watch out for daily interest
- **8 Unique Locations**: Each timeline features distinct neighborhoods with varying market conditions

### Products to Trade
Each era features 6 different contraband items:
- 1980s: Electronics, watches, car parts, bootleg tapes, jewelry, and designer bags
- 2020s: Crypto miners, GPUs, luxury sneakers, phones, designer clothing, and electronics

## 🎯 How to Play

### Starting the Game
1. Choose your era (1980s or 2020s)
2. Read the game instructions
3. Click "Start Game"

### Basic Mechanics
- **Starting Cash**: $2,000 (1980s) or $5,000 (2020s)
- **Game Duration**: 30 days
- **Inventory Capacity**: 100 items (may increase with special events)

### Trading
- **Buy**: Purchase items at current market prices
  - Use "B1" to buy 1 item
  - Use "B5" to buy 5 items at once
- **Sell**: Sell items from your inventory
  - Use "S1" to sell 1 item
  - Use "All" to sell all of that item type

### Travel
- Click on any location button to travel there
- Each trip advances the game by 1 day
- Traveling may trigger random events (good or bad)
- Market prices change with each location

### Financial Management
- **Take Loan**: Borrow up to $2,000 (increases debt and heat)
- **Repay Debt**: Pay back loans to reduce interest burden
- **Daily Interest**: 10% interest accrues on debt each day

## 📊 Game Metrics

### Status Indicators
- **Day**: Current day out of 30 total
- **Cash**: Available money for trading
- **Debt**: Total amount owed (accrues 10% interest daily)
- **Space**: Current inventory / maximum capacity
- **Heat**: Risk level meter (green = safe, yellow = caution, red = danger)

### Net Worth
Your final score is calculated as:
```
Net Worth = Cash + Inventory Value - Debt
```

## 🎲 Random Events

### Market Events (40% chance per location)
- **Police Raid**: Prices spike by 50% due to scarcity
- **Market Flood**: Prices drop by 40% due to oversupply
- **Gang War**: Massive volatility (2x price swings)
- **Warehouse Fire**: Prices increase by 60%
- **Informant Tip**: Heat level decreases
- **Inventory Bonus**: Temporary capacity increase to 150 items
- And more!

### Travel Events
- **Smooth Sailing**: Safe arrival (most common)
- **Minor Shakedown**: Lose 5% of cash
- **Trouble**: Lose 10% of cash
- **Police Stop**: Lose 15% of cash
- **Ambush**: Lose 20% of cash AND 30% of inventory

## 🏆 Scoring

### Performance Rankings
- **10x+ Starting Cash**: Legendary hustler! 👑
- **5x+ Starting Cash**: Major player! 💎
- **2x+ Starting Cash**: Solid work! 💰
- **1x+ Starting Cash**: You survived! ✅
- **Below Starting Cash**: Better luck next time! 💀

## 💡 Strategy Tips

1. **Buy Low, Sell High**: Watch for price patterns across locations
2. **Manage Capacity**: Don't max out inventory too early - leave room for better deals
3. **Monitor Heat**: High heat increases risk of negative travel events
4. **Debt is Risky**: 10% daily interest compounds quickly
5. **Diversify**: Don't put all your money into one product type
6. **Plan Ahead**: You only have 30 days - make each move count
7. **React to Events**: Market events create opportunities for huge profits
8. **Travel Smart**: Sometimes staying put is better than risking a trip

## 📱 Mobile Optimization

The game is fully responsive and optimized for mobile devices:
- Touch-friendly buttons with adequate size
- Condensed layout for smaller screens
- Grid-based location selection for easy tapping
- Readable text at all screen sizes

## 🎨 Game Design

### Visual Elements
- Dark theme with vibrant accent colors
- Icon-based representation for products and locations
- Color-coded status indicators (red = danger, yellow = caution, green = safe)
- Animated event notifications
- Real-time price updates

### User Interface
- Clean, organized layout
- Sticky event notifications
- Intuitive buy/sell controls
- Quick-access financial tools
- At-a-glance status dashboard

## 🔧 Technical Details

Built with:
- React (functional components with Hooks)
- Tailwind CSS for responsive styling
- Lucide React for icons
- Mobile-first responsive design

## ▶️ Run from GitHub

This repository currently contains the game UI source files (`src/App.jsx` and `src/StreetTrader.jsx`). To run it from GitHub, use one of the options below.

### Option 1: GitHub Codespaces (recommended)
1. Open the repo on GitHub.
2. Click **Code → Codespaces → Create codespace**.
3. In the Codespaces terminal, create a React app scaffold:
   ```bash
   npm create vite@latest shadow-market -- --template react
   cd shadow-market
   npm install
   ```
4. Copy `src/App.jsx` and `src/StreetTrader.jsx` from this repository into the new Vite project.
5. Install dependencies and run:
   ```bash
   npm install lucide-react
   npm run dev
   ```
6. Use the forwarded URL provided by Codespaces to open the app in your browser.

### Option 2: GitHub Pages (static deploy)
1. Create a React app scaffold (Vite recommended).
2. Replace the generated `src/App.jsx` and add `src/StreetTrader.jsx` from this repo.
3. Add a GitHub Actions workflow that runs:
   ```bash
   npm install
   npm run build
   ```
4. Configure GitHub Pages to deploy the `dist/` output.

## 🎓 Learning Outcomes

Playing Shadow Market helps develop:
- **Economic Thinking**: Supply and demand, market volatility
- **Risk Management**: Balancing opportunity vs. danger
- **Resource Management**: Limited capacity and time constraints
- **Strategic Planning**: Multi-step decision making
- **Financial Literacy**: Debt, interest, net worth calculations

## 📜 License

This is an original game created for entertainment and educational purposes. The game mechanics are inspired by classic economic trading simulations but feature completely original content, design, and implementation.

## 🎮 Have Fun!

Remember: In Shadow Market, every decision matters. Trade wisely, manage your risks, and see if you can build an underground empire before time runs out!

Good luck, trader! 💰
