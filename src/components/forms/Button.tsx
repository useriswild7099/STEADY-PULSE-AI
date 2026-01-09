import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', type = 'button', style = {}, disabled = false }) => {
    const baseStyle: React.CSSProperties = {
        padding: '1rem 2rem',
        borderRadius: 'var(--radius-md)',
        fontSize: '1rem',
        fontWeight: '600',
        transition: 'transform 0.1s, box-shadow 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        border: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit'
    };

    const variants = {
        primary: {
            background: 'var(--color-accent)',
            color: 'white',
            boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)',
        },
        secondary: {
            background: 'white',
            color: 'var(--color-text-main)',
            border: '1px solid var(--color-border)',
        },
        ghost: {
            background: 'transparent',
            color: 'var(--color-text-muted)',
            boxShadow: 'none',
        }
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={{ ...baseStyle, ...variants[variant], ...style }}
            onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={(e) => !disabled && (e.currentTarget.style.transform = 'scale(1)')}
        >
            {children}
        </button>
    );
};

export default Button;
