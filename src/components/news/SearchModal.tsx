import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const tabs = ['Topics', 'Archive', 'My Library'] as const;

const topicTags = ['Archive', 'Topics', 'Tradeenames', 'Precatamonts', 'News.Svenbls'];
const archiveLinks = ['News', 'Collection', 'Archive', 'All library', 'Navigator'];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Topics');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        style={{ background: 'rgba(30, 20, 10, 0.6)', backdropFilter: 'blur(4px)' }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && onClose()}
                    >
                        <div
                            className="w-full max-w-2xl rounded-lg overflow-hidden"
                            style={{
                                background: `
                  linear-gradient(135deg, var(--paper-cream) 0%, var(--parchment) 100%)
                `,
                                border: '2px solid var(--gold-dark)',
                                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px var(--glow-gold)',
                            }}
                        >
                            {/* Header */}
                            <div
                                className="flex items-center justify-between p-4"
                                style={{
                                    borderBottom: '2px solid var(--parchment-dark)',
                                    background: 'linear-gradient(135deg, var(--wood) 0%, var(--wood-dark) 100%)',
                                }}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <Search style={{ width: 20, height: 20, color: 'var(--gold)' }} />
                                    <input
                                        type="text"
                                        placeholder="Search the archives..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="flex-1 bg-transparent outline-none text-base"
                                        style={{
                                            color: 'var(--parchment-light)',
                                            fontFamily: 'var(--font-body)',
                                            fontSize: '1.1rem',
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded hover:bg-white/10 transition-colors"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    <X style={{ width: 18, height: 18 }} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-1 p-3" style={{ borderBottom: '1px solid var(--parchment-dark)' }}>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className="px-4 py-2 rounded font-ui text-sm font-semibold transition-all"
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            fontSize: '0.8rem',
                                            letterSpacing: '0.03em',
                                            background: activeTab === tab
                                                ? 'linear-gradient(135deg, var(--wood) 0%, var(--wood-dark) 100%)'
                                                : 'transparent',
                                            color: activeTab === tab ? 'var(--gold-light)' : 'var(--ink-light)',
                                            border: activeTab === tab ? '1px solid var(--gold-dark)' : '1px solid transparent',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Content */}
                            <div className="p-6 grid grid-cols-2 gap-6" style={{ minHeight: 200 }}>
                                {/* Left Column */}
                                <div>
                                    <h3
                                        className="font-display text-sm font-bold mb-3"
                                        style={{ color: 'var(--ink-dark)', letterSpacing: '0.05em' }}
                                    >
                                        {activeTab}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {topicTags.map((tag) => (
                                            <motion.button
                                                key={tag}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="btn-parchment text-xs"
                                                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                                            >
                                                {tag}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    <h3
                                        className="font-display text-sm font-bold mb-3"
                                        style={{ color: 'var(--ink-dark)', letterSpacing: '0.05em' }}
                                    >
                                        Quick Access
                                    </h3>
                                    <ul className="space-y-2">
                                        {archiveLinks.map((link) => (
                                            <li key={link}>
                                                <button
                                                    className="w-full text-left px-3 py-2 rounded text-sm transition-all"
                                                    style={{
                                                        fontFamily: 'var(--font-body)',
                                                        color: 'var(--ink-medium)',
                                                        cursor: 'pointer',
                                                        background: 'transparent',
                                                        border: 'none',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = 'rgba(200, 169, 110, 0.15)';
                                                        e.currentTarget.style.color = 'var(--ink-dark)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = 'transparent';
                                                        e.currentTarget.style.color = 'var(--ink-medium)';
                                                    }}
                                                >
                                                    {link}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
