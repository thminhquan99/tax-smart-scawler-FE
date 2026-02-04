import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md bg-opacity-90">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Tax Law Tracker
                        </h1>
                        <p className="text-xs text-gray-500 font-medium tracking-wide">
                            INTELLIGENT MONITORING SYSTEM
                        </p>
                    </div>
                    <div className="text-sm text-gray-500">
                        v1.0.0 (MVP)
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}
