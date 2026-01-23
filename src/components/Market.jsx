import React from 'react';
import { ShoppingBag, DollarSign } from 'lucide-react';
import { formatMoney } from '../utils';

export default function Market({ products, prices, inventory, cash, onBuy, onSell, pocket, maxPocket }) {
    const currentPocketLoad = Object.values(inventory).reduce((a, b) => a + b, 0);

    return (
        <div className="card" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.2rem', margin: 0 }}>Marketplace</h2>
                <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                    Pocket: {currentPocketLoad} / {pocket}
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {products.map(p => {
                    const price = prices[p.id];
                    const owned = inventory[p.id] || 0;
                    const canAfford = Math.floor(cash / price);
                    const space = pocket - currentPocketLoad;
                    const maxBuy = Math.min(canAfford, space);
                    const Icon = p.icon;

                    return (
                        <div key={p.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                                <div style={{ padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '50%' }}>
                                    <Icon size={20} color="var(--primary)" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{p.name}</div>
                                    <div style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>{formatMoney(price)}</div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                                <div style={{ fontSize: '0.8rem' }}>Owned: {owned}</div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button
                                        className="btn"
                                        style={{ padding: '4px 8px', fontSize: '0.8rem', background: 'var(--secondary)' }}
                                        disabled={owned === 0}
                                        onClick={() => onSell(p.id, 1)}
                                    >
                                        Sell
                                    </button>
                                    <button
                                        className="btn"
                                        style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                                        disabled={maxBuy <= 0}
                                        onClick={() => onBuy(p.id, 1)}
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
