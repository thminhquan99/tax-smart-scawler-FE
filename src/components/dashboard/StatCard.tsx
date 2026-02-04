import React from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: React.ReactNode;
    color?: 'blue' | 'red' | 'green' | 'purple';
}

const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
};

export function StatCard({ title, value, subtitle, icon, color = 'blue' }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1 tracking-wide">{title}</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
                    </div>
                    {subtitle && (
                        <p className="text-xs text-gray-500 mt-2 font-medium">{subtitle}</p>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${colorClasses[color]} bg-opacity-60`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
