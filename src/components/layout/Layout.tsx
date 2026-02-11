import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicalParticles } from '../animations/MagicalParticles';
import { SmoothScroll } from '../animations/SmoothScroll';
import { useState } from 'react';
import { SearchModal } from '../news/SearchModal';
import { Header } from './Header';

export function Layout() {
    const location = useLocation();
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <SmoothScroll>
            <div className="min-h-screen flex flex-col" style={{ background: 'var(--wood-deep)' }}>
                <MagicalParticles />

                {/* ═══ Header ═══ */}
                <Header onSearchClick={() => setSearchOpen(true)} />

                {/* ═══ Main Content ═══ */}
                <main className="flex-1 relative z-10">
                    {/* Content Area */}
                    <div
                        className="parchment-bg min-h-[calc(100vh-80px)]"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
