import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, BarChart3, Settings, Search, Menu, X } from 'lucide-react';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/news', icon: Newspaper, label: 'News Feed' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
];

interface HeaderProps {
    onSearchClick: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            className="sticky top-0 z-40 w-full"
            style={{
                background: `
                    repeating-linear-gradient(90deg, transparent, rgba(92, 61, 46, 0.05) 2px, transparent 4px),
                    linear-gradient(180deg, #4a3020 0%, var(--wood-deep) 100%)
                `,
                borderBottom: '3px solid var(--gold-dark)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="p-0 rounded overflow-hidden" style={{ width: 64, height: 64 }}>
                            <DotLottiePlayer
                                src="/animations/Book.lottie"
                                autoplay
                                speed={0.5}
                                loop
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-display text-lg text-gold-light leading-tight">
                                Tax Library
                            </h1>
                            <p className="font-display text-[0.65rem] text-gold-dark tracking-[0.15em] uppercase">
                                News Archive
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 h-full">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={({ isActive }) =>
                                    `relative px-4 h-full flex items-center gap-2 font-display text-sm font-bold tracking-wide transition-all duration-300
                                    ${isActive
                                        ? 'text-parchment bg-wood-dark border-x border-t border-gold-dark/50 translate-y-[1px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]'
                                        : 'text-gold-dark hover:text-gold hover:bg-wood-light/10'
                                    }`
                                }
                            >
                                <item.icon size={16} />
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={onSearchClick}
                            className="p-2 text-gold-dark hover:text-gold transition-colors duration-200"
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gold-dark hover:text-gold transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-wood-deep/95 backdrop-blur-sm border-t border-gold-dark/30"
                    >
                        <nav className="flex flex-col p-4 space-y-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${isActive
                                            ? 'bg-wood-dark text-gold border border-gold-dark/30 shadow-inner'
                                            : 'text-gold-dark hover:text-gold hover:bg-wood-light/10'
                                        }`
                                    }
                                >
                                    <item.icon size={18} />
                                    <span className="font-display font-medium tracking-wide">{item.label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
