import { PaginatedNewsFeed } from '../components/news/PaginatedNewsFeed';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function NewsFeedPage() {
    return (
        <div>
            {/* Header with vintage wand decoration */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div
                        style={{
                            width: 40,
                            height: 2,
                            background: 'linear-gradient(90deg, transparent, var(--gold))',
                        }}
                    />
                    <BookOpen style={{ width: 28, height: 28, color: 'var(--gold-dark)' }} />
                    <div
                        style={{
                            width: 40,
                            height: 2,
                            background: 'linear-gradient(90deg, var(--gold), transparent)',
                        }}
                    />
                </div>
                <h2
                    className="font-display text-3xl font-bold"
                    style={{ color: 'var(--ink-dark)' }}
                >
                    Tax Library News Archive
                </h2>
                <p
                    className="font-body text-base mt-2"
                    style={{ color: 'var(--ink-light)' }}
                >
                    Discover the latest scrolls and manuscripts from the archives
                </p>
                {/* Decorative divider */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    <div style={{ width: 80, height: 1, background: 'var(--gold-dark)' }} />
                    <div
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--gold)',
                            boxShadow: '0 0 8px var(--glow-gold)',
                        }}
                    />
                    <div style={{ width: 80, height: 1, background: 'var(--gold-dark)' }} />
                </div>
            </motion.div>

            {/* News Feed */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-3xl mx-auto"
            >
                <PaginatedNewsFeed />
            </motion.div>
        </div>
    );
}
