import React, { useState } from 'react';
import { formatMoney } from '../utils';

const ModalOverlay = ({ children, onClose }) => (
    <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.8)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }} onClick={onClose}>
        <div className="card" onClick={e => e.stopPropagation()} style={{ width: '90%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }}>
            {children}
        </div>
    </div>
);

export const BankModal = ({ cash, bank, onDeposit, onWithdraw, onClose }) => {
    const [amount, setAmount] = useState('');
    return (
        <ModalOverlay onClose={onClose}>
            <h3>First City Bank</h3>
            <p>Cash: {formatMoney(cash)} | Bank: {formatMoney(bank)}</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount"
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid #444' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button className="btn" onClick={() => { onDeposit(Number(amount)); onClose(); }}>Deposit</button>
                <button className="btn btn-outline" onClick={() => { onWithdraw(Number(amount)); onClose(); }}>Withdraw</button>
            </div>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', fontSize: '0.8rem' }}>
                <button className="btn-outline" style={{ padding: '2px 8px' }} onClick={() => setAmount(cash)}>Max Dep.</button>
                <button className="btn-outline" style={{ padding: '2px 8px' }} onClick={() => setAmount(bank)}>Max With.</button>
            </div>
            <button onClick={onClose} style={{ width: '100%', marginTop: '1rem', background: 'transparent', border: 'none', color: '#999' }}>Cancel</button>
        </ModalOverlay>
    );
};

export const SharkModal = ({ cash, debt, onPay, onBorrow, onClose }) => {
    const [amount, setAmount] = useState('');
    return (
        <ModalOverlay onClose={onClose}>
            <h3>Vinny the Shark</h3>
            <p style={{ color: 'var(--danger)' }}>Debt: {formatMoney(debt)} (5% daily interest)</p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="Amount"
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', background: 'rgba(0,0,0,0.2)', color: 'white', border: '1px solid #444' }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button className="btn" onClick={() => { onPay(Number(amount)); onClose(); }}>Pay Back</button>
                <button className="btn btn-danger" onClick={() => { onBorrow(Number(amount)); onClose(); }}>Borrow</button>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                <button className="btn-outline" style={{ padding: '2px 8px' }} onClick={() => setAmount(Math.min(cash, debt))}>Max Pay</button>
            </div>
            <button onClick={onClose} style={{ width: '100%', marginTop: '1rem', background: 'transparent', border: 'none', color: '#999' }}>Cancel</button>
        </ModalOverlay>
    );
};

export const StoreModal = ({ cash, pocket, weapon, weapons, onUpgrade, onBuyWeapon, onClose }) => {
    const upgradeCost = pocket * 100;
    return (
        <ModalOverlay onClose={onClose}>
            <h3>Black Market Store</h3>

            {/* Pocket Upgrade */}
            <div style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>Trenchcoat Upgrade (+10 slots)</h4>
                <p style={{ color: 'var(--accent)', margin: '0 0 0.5rem 0' }}>Current: {pocket} | Cost: {formatMoney(upgradeCost)}</p>
                <button
                    className="btn"
                    disabled={cash < upgradeCost}
                    onClick={() => { onUpgrade(); onClose(); }}
                    style={{ width: '100%', fontSize: '0.85rem', padding: '0.5rem' }}
                >
                    Buy Upgrade
                </button>
            </div>

            {/* Weapons */}
            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Weapons</h4>
                {weapon && (
                    <div style={{ padding: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '4px', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                        Current: <strong>{weapon.name}</strong> (Power: {weapon.power})
                    </div>
                )}
                <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {weapons.map(w => (
                        <div key={w.id} style={{
                            padding: '0.75rem',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{w.name}</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Power: {w.power} | {formatMoney(w.cost)}</div>
                            </div>
                            <button
                                className="btn"
                                disabled={cash < w.cost || (weapon && weapon.id === w.id)}
                                onClick={() => { onBuyWeapon(w); onClose(); }}
                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                            >
                                {weapon && weapon.id === w.id ? 'Owned' : 'Buy'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button onClick={onClose} style={{ width: '100%', marginTop: '1rem', background: 'transparent', border: 'none', color: '#999' }}>Cancel</button>
        </ModalOverlay>
    );
};
