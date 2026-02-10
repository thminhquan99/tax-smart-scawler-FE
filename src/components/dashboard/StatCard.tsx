import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ReactNode;
    color?: 'blue' | 'red' | 'green' | 'purple';
}

const accentColors = {
    blue: { bg: 'var(--navy)', sealBg: 'linear-gradient(135deg, var(--navy-light), var(--navy))' },
    red: { bg: 'var(--burgundy)', sealBg: 'linear-gradient(135deg, var(--burgundy-light), var(--burgundy))' },
    green: { bg: 'var(--forest)', sealBg: 'linear-gradient(135deg, var(--forest-light), var(--forest))' },
    purple: { bg: 'var(--wood)', sealBg: 'linear-gradient(135deg, var(--wood), var(--wood-dark))' },
};

export function StatCard({ title, value, subtitle, icon, color = 'blue' }: StatCardProps) {
    const accent = accentColors[color];

    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '0 8px 24px var(--shadow-warm), 0 0 20px var(--glow-gold)' }}
            transition={{ duration: 0.3 }}
            className="parchment-card p-5"
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {/* Decorative corner */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 40,
                    height: 40,
                    background: `linear-gradient(135deg, transparent 50%, rgba(200,169,110,0.15) 50%)`,
                }}
            />

            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p
                        className="font-ui text-xs font-semibold mb-2"
                        style={{ color: 'var(--ink-light)', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                    >
                        {title}
                    </p>
                    <p
                        className="font-display text-3xl font-bold"
                        style={{ color: 'var(--ink-dark)', letterSpacing: '0.02em' }}
                    >
                        {value}
                    </p>
                    {subtitle && (
                        <p
                            className="font-ui text-xs mt-2"
                            style={{ color: 'var(--ink-faded)' }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
                <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                        width: 44,
                        height: 44,
                        background: accent.sealBg,
                        color: 'var(--parchment-light)',
                        boxShadow: '0 2px 6px var(--shadow-warm)',
                    }}
                >
                    {icon}
                </div>
            </div>
        </motion.div>
    );
}
