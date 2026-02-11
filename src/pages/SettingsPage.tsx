import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, X } from 'lucide-react';

export function SettingsPage() {
    const [accountSettings, setAccountSettings] = useState(true);
    const [currentPassword, setCurrentPassword] = useState(false);
    const [volume, setVolume] = useState(65);
    const [brightness, setBrightness] = useState(80);
    const [notifMessages, setNotifMessages] = useState(true);
    const [notifEmail, setNotifEmail] = useState(true);

    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8"
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex items-center justify-center rounded"
                        style={{
                            width: 36,
                            height: 36,
                            background: 'linear-gradient(135deg, var(--wood), var(--wood-dark))',
                            border: '1px solid var(--gold-dark)',
                        }}
                    >
                        <Settings style={{ width: 18, height: 18, color: 'var(--gold-light)' }} />
                    </div>
                    <div>
                        <h1 className="font-display text-sm" style={{ color: 'var(--ink-faded)', letterSpacing: '0.08em' }}>
                            Tax Library News Archive
                        </h1>
                    </div>
                </div>
                <button
                    className="flex items-center justify-center rounded"
                    style={{
                        width: 32,
                        height: 32,
                        background: 'linear-gradient(135deg, var(--burgundy), #6b2030)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--parchment-light)',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px var(--shadow-warm)',
                    }}
                >
                    <X style={{ width: 14, height: 14 }} />
                </button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="parchment-card p-8"
            >
                <h2
                    className="font-display text-2xl font-bold text-center mb-8"
                    style={{ color: 'var(--ink-dark)' }}
                >
                    Settings Panel
                </h2>

                {/* Account Section */}
                <div className="mb-8">
                    <h3
                        className="font-display text-lg font-bold mb-4"
                        style={{ color: 'var(--ink-dark)' }}
                    >
                        Account
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <span className="font-body" style={{ color: 'var(--ink-medium)' }}>
                                Account Settings
                            </span>
                            <ToggleSwitch value={accountSettings} onChange={setAccountSettings} />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="font-body" style={{ color: 'var(--ink-medium)' }}>
                                Current Password
                            </span>
                            <ToggleSwitch value={currentPassword} onChange={setCurrentPassword} />
                        </div>
                    </div>
                </div>

                {/* Appearance Section */}
                <div
                    className="mb-8 pt-6"
                    style={{ borderTop: '1px solid var(--parchment-dark)' }}
                >
                    <h3
                        className="font-display text-lg font-bold mb-4"
                        style={{ color: 'var(--ink-dark)' }}
                    >
                        Appearance
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-body" style={{ color: 'var(--ink-medium)' }}>
                                    Volume Adjustment
                                </span>
                                <span className="font-ui text-xs" style={{ color: 'var(--ink-faded)' }}>{volume}%</span>
                            </div>
                            <WoodenSlider value={volume} onChange={setVolume} />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-body" style={{ color: 'var(--ink-medium)' }}>
                                    Brightness Adjustment
                                </span>
                                <span className="font-ui text-xs" style={{ color: 'var(--ink-faded)' }}>{brightness}%</span>
                            </div>
                            <WoodenSlider value={brightness} onChange={setBrightness} />
                        </div>
                    </div>
                </div>

                {/* Notifications Section */}
                <div
                    className="pt-6"
                    style={{ borderTop: '1px solid var(--parchment-dark)' }}
                >
                    <h3
                        className="font-display text-lg font-bold mb-4"
                        style={{ color: 'var(--ink-dark)' }}
                    >
                        Notifications
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <span className="font-body" style={{ color: 'var(--ink-medium)' }}>
                                Notifications messages
                            </span>
                            <WaxCheckbox checked={notifMessages} onChange={setNotifMessages} />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="font-body" style={{ color: 'var(--ink-medium)' }}>
                                Notifications email
                            </span>
                            <WaxCheckbox checked={notifEmail} onChange={setNotifEmail} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

/* ═══ Vintage Toggle Switch ═══ */
function ToggleSwitch({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!value)}
            className="relative flex items-center rounded-full transition-all duration-300"
            style={{
                width: 72,
                height: 32,
                background: value
                    ? 'linear-gradient(135deg, var(--forest-light), var(--forest))'
                    : 'linear-gradient(135deg, var(--ink-faded), var(--ink-light))',
                border: '2px solid var(--gold-dark)',
                cursor: 'pointer',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3), 0 1px 2px var(--shadow-warm)',
            }}
        >
            <motion.div
                animate={{ x: value ? 40 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="rounded-full flex items-center justify-center"
                style={{
                    width: 26,
                    height: 26,
                    background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
            >
                <span className="font-ui text-xs font-bold" style={{ color: 'var(--wood-dark)', fontSize: '0.55rem' }}>
                    {value ? 'ON' : 'OFF'}
                </span>
            </motion.div>
        </button>
    );
}

/* ═══ Wooden Slider ═══ */
function WoodenSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <div
            className="relative"
            style={{ height: 28 }}
        >
            {/* Track background (ruler) */}
            <div
                className="absolute top-1/2 left-0 right-0 rounded-full"
                style={{
                    transform: 'translateY(-50%)',
                    height: 12,
                    background: 'linear-gradient(135deg, var(--wood), var(--wood-dark))',
                    border: '1px solid var(--gold-dark)',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                }}
            >
                {/* Ruler ticks */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                    {Array.from({ length: 11 }, (_, i) => (
                        <div
                            key={i}
                            style={{
                                width: 1,
                                height: i % 5 === 0 ? 8 : 4,
                                background: 'var(--gold-dark)',
                                opacity: 0.5,
                            }}
                        />
                    ))}
                </div>

                {/* Fill */}
                <div
                    className="absolute top-0 left-0 bottom-0 rounded-full"
                    style={{
                        width: `${value}%`,
                        background: 'linear-gradient(90deg, var(--gold-dark), var(--gold))',
                        opacity: 0.3,
                    }}
                />
            </div>

            {/* Actual input */}
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                style={{ height: 28, zIndex: 2 }}
            />

            {/* Custom thumb */}
            <div
                className="absolute top-1/2 rounded-sm"
                style={{
                    left: `calc(${value}% - 10px)`,
                    transform: 'translateY(-50%)',
                    width: 20,
                    height: 24,
                    background: 'linear-gradient(135deg, var(--gold-light), var(--brass))',
                    border: '2px solid var(--gold-dark)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    borderRadius: 3,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: 2,
                        height: 10,
                        background: 'var(--wood-dark)',
                        opacity: 0.4,
                    }}
                />
            </div>
        </div>
    );
}

/* ═══ Wax Seal Checkbox ═══ */
function WaxCheckbox({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className="flex items-center justify-center rounded-full transition-all duration-300"
            style={{
                width: 32,
                height: 32,
                background: checked
                    ? 'linear-gradient(135deg, var(--burgundy-light), var(--burgundy))'
                    : 'linear-gradient(135deg, var(--parchment-dark), var(--parchment))',
                border: checked
                    ? '2px solid rgba(255,255,255,0.15)'
                    : '2px solid var(--parchment-dark)',
                cursor: 'pointer',
                boxShadow: checked
                    ? '0 2px 6px var(--shadow-warm), 0 0 10px rgba(139,45,58,0.2)'
                    : '0 1px 3px var(--shadow-warm)',
            }}
        >
            {checked && (
                <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <path
                        d="M3 8L6.5 11.5L13 5"
                        stroke="var(--parchment-light)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            )}
        </button>
    );
}
