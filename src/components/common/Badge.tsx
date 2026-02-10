import React from 'react';

const variants = {
    blue: 'wax-seal-blue',
    red: 'wax-seal-red',
    green: 'wax-seal-green',
    yellow: 'wax-seal-amber',
    amber: 'wax-seal-amber',
    gray: 'wax-seal-amber',
};

interface BadgeProps {
    children: React.ReactNode;
    variant?: keyof typeof variants;
}

export function Badge({ children, variant = 'gray' }: BadgeProps) {
    return (
        <span className={`wax-seal ${variants[variant]}`}>
            {children}
        </span>
    );
}
