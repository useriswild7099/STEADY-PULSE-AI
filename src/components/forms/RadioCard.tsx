import React from 'react';

interface RadioCardProps {
  label: string;
  value: string;
  selectedValue: string;
  onChange: (value: string) => void;
  description?: string;
  icon?: React.ReactNode;
}

const RadioCard: React.FC<RadioCardProps> = ({ label, value, selectedValue, onChange, description, icon }) => {
    const isSelected = value === selectedValue;

    return (
        <label
            style={{
                display: 'block',
                position: 'relative',
                cursor: 'pointer',
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(15, 23, 42, 0.05)' : 'var(--color-input-bg)',
                border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                transition: 'all 0.2s ease',
            }}
            className="radio-card"
        >
            <input
                type="radio"
                value={value}
                checked={isSelected}
                onChange={() => onChange(value)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${isSelected ? 'var(--color-accent)' : '#cbd5e1'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}
                >
                    {isSelected && (
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            background: 'var(--color-accent)'
                        }} />
                    )}
                </div>
                <div>
                    <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{label}</div>
                    {description && (
                        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                            {description}
                        </div>
                    )}
                </div>
            </div>
        </label>
    );
};

export default RadioCard;
