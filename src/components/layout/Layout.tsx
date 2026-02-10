import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicalParticles } from '../animations/MagicalParticles';
import { SmoothScroll } from '../animations/SmoothScroll';
import { LayoutDashboard, Newspaper, BarChart3, Settings, BookOpen, Search } from 'lucide-react';
import { useState } from 'react';
import { SearchModal } from '../news/SearchModal';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', spineClass: 'spine-dashboard' },
    { to: '/news', icon: Newspaper, label: 'News Feed', spineClass: 'spine-news' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics', spineClass: 'spine-analytics' },
    { to: '/settings', icon: Settings, label: 'Settings', spineClass: 'spine-settings' },
];

export function Layout() {
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <SmoothScroll>
            <div className="min-h-screen flex" style={{ background: 'var(--wood-deep)' }}>
                <MagicalParticles />

                {/* ═══ Sidebar ═══ */}
                <aside
                    className="fixed left-0 top-0 bottom-0 z-30 flex flex-col"
                    style={{
                        width: 'var(--sidebar-width)',
                        background: `
              repeating-linear-gradient(90deg, transparent, rgba(92, 61, 46, 0.05) 2px, transparent 4px),
              linear-gradient(180deg, #4a3020 0%, var(--wood-deep) 100%)
            `,
                        borderRight: '3px solid var(--gold-dark)',
                        boxShadow: '4px 0 20px rgba(0,0,0,0.4)',
                    }}
                >
                    {/* Logo Area */}
                    <div
                        className="p-5 text-center"
                        style={{
                            borderBottom: '2px solid var(--gold-dark)',
                            background: 'linear-gradient(180deg, rgba(200,169,110,0.1) 0%, transparent 100%)',
                        }}
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <BookOpen style={{ width: 24, height: 24, color: 'var(--gold)' }} />
                        </div>
                        <h1
                            className="font-display text-base"
                            style={{ color: 'var(--gold-light)', lineHeight: 1.3 }}
                        >
                            Magical Library
                        </h1>
                        <p
                            className="font-display text-xs mt-1"
                            style={{ color: 'var(--gold-dark)', letterSpacing: '0.08em' }}
                        >
                            News Archive
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 mt-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={({ isActive }) =>
                                    `book-spine ${item.spineClass} flex items-center gap-3 ${isActive ? 'active' : ''}`
                                }
                            >
                                <item.icon style={{ width: 18, height: 18, opacity: 0.9 }} />
                                <span>{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Search Button */}
                    <div className="p-4" style={{ borderTop: '1px solid rgba(200,169,110,0.2)' }}>
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded"
                            style={{
                                background: 'rgba(200, 169, 110, 0.1)',
                                border: '1px solid rgba(200, 169, 110, 0.2)',
                                color: 'var(--gold)',
                                fontFamily: 'var(--font-ui)',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(200, 169, 110, 0.2)';
                                e.currentTarget.style.borderColor = 'var(--gold)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(200, 169, 110, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(200, 169, 110, 0.2)';
                            }}
                        >
                            <Search style={{ width: 16, height: 16 }} />
                            <span>Search...</span>
                        </button>
                    </div>

                    {/* Bottom Decoration */}
                    <div
                        className="p-4 text-center"
                        style={{
                            borderTop: '1px solid rgba(200,169,110,0.2)',
                            color: 'var(--ink-faded)',
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-ui)',
                        }}
                    >
                        v1.0 • Tax Law Tracker
                    </div>
                </aside>

                {/* ═══ Main Content ═══ */}
                <main
                    className="flex-1"
                    style={{
                        marginLeft: 'var(--sidebar-width)',
                        minHeight: '100vh',
                    }}
                >
                    {/* Wood Frame Top */}
                    <div
                        style={{
                            height: 'var(--frame-thickness)',
                            background: 'linear-gradient(180deg, var(--wood) 0%, var(--wood-dark) 100%)',
                            borderBottom: '1px solid var(--gold-dark)',
                        }}
                    />

                    {/* Content Area */}
                    <div
                        className="parchment-bg"
                        style={{ minHeight: 'calc(100vh - var(--frame-thickness))' }}
                    >
                        <div className="max-w-7xl mx-auto px-6 py-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={location.pathname}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                >
                                    <Outlet />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </main>

                {/* Search Modal */}
                <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            </div>
        </SmoothScroll>
    );
}
