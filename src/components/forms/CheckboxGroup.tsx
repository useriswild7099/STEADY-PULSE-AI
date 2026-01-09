import React from 'react';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selectedValues = [], onChange }) => {
    const handleToggle = (value: string) => {
        if (selectedValues.includes(value)) {
            onChange(selectedValues.filter(v => v !== value));
        } else {
            onChange([...selectedValues, value]);
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => handleToggle(option.value)}
                        style={{
                            padding: '0.75rem 1.25rem',
                            borderRadius: '24px',
                            border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border)'}`,
                            background: isSelected ? 'var(--color-accent)' : 'transparent',
                            color: isSelected ? 'white' : 'var(--color-text-main)',
                            fontSize: '0.95rem',
                            fontWeight: isSelected ? '600' : '400',
                            transition: 'all 0.2s',
                            cursor: 'pointer',
                        }}
                    >
                        {option.label}
                    </button>
                );
            })}
        </div>
    );
};

export default CheckboxGroup;
