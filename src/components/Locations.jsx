import React from 'react';
import { Map, Navigation } from 'lucide-react';
import { LOCATIONS } from '../constants';

export default function Locations({ currentId, onTravel }) {
    return (
        <div className="card" style={{ marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Map size={20} /> Travel
            </h2>
            <div className="grid-layout">
                {LOCATIONS.map(loc => (
                    <button
                        key={loc.id}
                        className={`btn ${currentId === loc.id ? 'btn-outline' : ''}`}
                        onClick={() => onTravel(loc.id)}
                        disabled={currentId === loc.id}
                        style={{
                            justifyContent: 'flex-start',
                            opacity: currentId === loc.id ? 0.6 : 1
                        }}
                    >
                        <Navigation size={16} />
                        {loc.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
