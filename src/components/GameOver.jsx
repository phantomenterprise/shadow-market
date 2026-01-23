import React, { useRef } from 'react';
import html2canvas from 'html2canvas'; // Import html2canvas properly
// If html2canvas is not available as default import, check how it is installed. 
// Standard npm install usually allows default import.
import { formatMoney } from '../utils';

export default function GameOver({ score, onRestart, theme }) {
    const cardRef = useRef(null);

    const handleShare = async () => {
        if (cardRef.current) {
            try {
                const canvas = await html2canvas(cardRef.current, {
                    backgroundColor: theme === 'now' ? '#0f172a' : '#1a0b2e',
                });
                const image = canvas.toDataURL("image/png");

                // Create a fake link to download (simplest share for web)
                const link = document.createElement('a');
                link.href = image;
                link.download = 'street-trader-score.png';
                link.click();

                // Or use Web Share API if available
                if (navigator.share) {
                    const blob = await (await fetch(image)).blob();
                    const file = new File([blob], 'score.png', { type: 'image/png' });
                    try {
                        await navigator.share({
                            title: 'My Street Trader Score',
                            text: `I made ${formatMoney(score)} in Street Trader! Can you beat it?`,
                            files: [file]
                        });
                    } catch (e) {
                        console.log('Share failed', e);
                    }
                }
            } catch (e) {
                console.error("Screenshot failed", e);
            }
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--bg-color)', zIndex: 200,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '2rem'
        }}>
            <div
                ref={cardRef}
                className="card"
                style={{
                    textAlign: 'center', padding: '3rem', marginBottom: '2rem',
                    border: '2px solid var(--primary)',
                    boxShadow: '0 0 20px var(--primary)',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)'
                }}
            >
                <h1 style={{ fontFamily: 'var(--font-header)', marginBottom: '0.5rem' }}>GAME OVER</h1>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Your Hustle Is Done</p>

                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '2rem 0', color: 'var(--accent)' }}>
                    {formatMoney(score)}
                </div>

                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                    Net Worth (Cash + Bank - Debt)
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', width: '100%', maxWidth: '300px' }}>
                <button className="btn" onClick={handleShare}>📸 Share Score Card</button>
                <button className="btn btn-outline" onClick={onRestart}>Play Again</button>
            </div>
        </div>
    );
}
