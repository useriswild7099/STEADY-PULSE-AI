import React from 'react';
import './forms.css';

interface FormInputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  style?: React.CSSProperties;
}

const FormInput: React.FC<FormInputProps> = ({ label, type = 'text', placeholder, value, onChange, name, required = false, style }) => {
    return (
        <div className="form-group" style={{ marginBottom: '1.5rem', ...style }}>
            {label && (
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: 'var(--color-text-main)'
                }}>
                    {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
                </label>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-input-bg)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-main)',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-accent)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(15, 23, 42, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)';
                    e.target.style.boxShadow = 'none';
                }}
            />
        </div>
    );
};

export default FormInput;
