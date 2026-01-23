import React from 'react';

export default function Logs({ logs }) {
    return (
        <div className="card" style={{ marginTop: '1rem', maxHeight: '150px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1rem', marginTop: 0 }}>StepLog</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                {logs.map((L, i) => (
                    <li key={i} style={{ padding: '2px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        &gt; {L}
                    </li>
                ))}
            </ul>
        </div>
    );
}
