import React from 'react';
import { Calendar, Wallet, Landmark, Skull, Zap } from 'lucide-react';
import { formatMoney } from '../utils';

export default function Header({ day, maxDays, cash, bank, debt, weapon, locationName }) {
    return (
        <header className="sticky-top">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl font-bold m-0" style={{ fontFamily: 'var(--font-header, inherit)' }}>
                    {locationName}
                </h1>
                <span className="text-sm opacity-70">
                    Day {day} / {maxDays}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                <div className="flex flex-col items-center">
                    <Wallet size={16} color="var(--primary)" />
                    <span>{formatMoney(cash)}</span>
                </div>
                <div className="flex flex-col items-center">
                    <Landmark size={16} color="var(--secondary)" />
                    <span>{formatMoney(bank)}</span>
                </div>
                <div className="flex flex-col items-center">
                    <Skull size={16} color="var(--danger)" />
                    <span style={{ color: 'var(--danger)' }}>{formatMoney(debt)}</span>
                </div>
                <div className="flex flex-col items-center">
                    <Zap size={16} color={weapon ? 'var(--accent)' : '#666'} />
                    <span style={{ color: weapon ? 'var(--accent)' : '#666' }}>
                        {weapon ? weapon.power : 0}
                    </span>
                </div>
            </div>
        </header>
    );
}
