import React, { useState } from 'react';
import { useGame } from './hooks/useGame';
import Header from './components/Header';
import Market from './components/Market';
import Locations from './components/Locations';
import Logs from './components/Logs';
import GameOver from './components/GameOver';
import { BankModal, SharkModal, StoreModal } from './components/Modals';
import { LOCATIONS, THEMES, MAX_DAYS_OPTIONS } from './constants';
import { Landmark, Skull, ShoppingBag } from 'lucide-react';

function App() {
  const {
    gameState, theme, day, maxDays, location, cash, bank, debt, pocket, inventory, prices, logs, score, activeProducts,
    initGame, travel, buy, sell, deposit, withdraw, payDebt, borrow, upgradePocket, setGameState
  } = useGame();

  const [activeModal, setActiveModal] = useState(null); // 'bank', 'shark', 'store'
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedTheme, setSelectedTheme] = useState(THEMES.NOW);

  // Apply theme to body
  React.useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  if (gameState === 'menu') {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', padding: '2rem', textAlign: 'center', gap: '2rem'
      }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-header)', fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>
            STREET TRADER
          </h1>
          <p style={{ opacity: 0.7 }}>Buy Low. Sell High. Don't Get Caught.</p>
        </div>

        <div className="card" style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Timeline</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <button
                className={`btn ${selectedTheme === THEMES.EIGHTIES ? '' : 'btn-outline'}`}
                onClick={() => setSelectedTheme(THEMES.EIGHTIES)}
                style={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem' }}
              >
                1985 (RETRO)
              </button>
              <button
                className={`btn ${selectedTheme === THEMES.NOW ? '' : 'btn-outline'}`}
                onClick={() => setSelectedTheme(THEMES.NOW)}
              >
                2026 (NOW)
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Duration</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {MAX_DAYS_OPTIONS.map(d => (
                <button
                  key={d}
                  className={`btn ${selectedDuration === d ? '' : 'btn-outline'}`}
                  onClick={() => setSelectedDuration(d)}
                >
                  {d} Days
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn"
            style={{ fontSize: '1.2rem', padding: '1rem' }}
            onClick={() => initGame(selectedDuration, selectedTheme)}
          >
            START HUSTLE
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'gameover') {
    return <GameOver score={score} onRestart={() => setGameState('menu')} theme={theme} />;
  }

  const currentLocationName = LOCATIONS.find(l => l.id === location)?.name || 'Unknown';

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <Header
        day={day}
        maxDays={maxDays}
        cash={cash}
        bank={bank}
        debt={debt}
        locationName={currentLocationName}
      />

      <div style={{ padding: '0 1rem', maxWidth: '600px', margin: '0 auto' }}>
        <Locations currentId={location} onTravel={travel} />

        <Market
          products={activeProducts}
          prices={prices}
          inventory={inventory}
          cash={cash}
          onBuy={buy}
          onSell={sell}
          pocket={pocket}
        />

        <div className="card" style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
          <button className="btn btn-outline" style={{ flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }} onClick={() => setActiveModal('bank')}>
            <Landmark size={20} /> Bank
          </button>
          <button className="btn btn-outline" style={{ flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }} onClick={() => setActiveModal('shark')}>
            <Skull size={20} /> Shark
          </button>
          <button className="btn btn-outline" style={{ flexDirection: 'column', gap: '4px', fontSize: '0.8rem' }} onClick={() => setActiveModal('store')}>
            <ShoppingBag size={20} /> Store
          </button>
        </div>

        <Logs logs={logs} />
      </div>

      {activeModal === 'bank' && (
        <BankModal
          cash={cash} bank={bank}
          onDeposit={deposit} onWithdraw={withdraw}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'shark' && (
        <SharkModal
          cash={cash} debt={debt}
          onPay={payDebt} onBorrow={borrow}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'store' && (
        <StoreModal
          cash={cash} pocket={pocket}
          onUpgrade={upgradePocket}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}

export default App;
