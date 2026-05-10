import React from 'react';

export const PageSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="flex gap-2">
                {[0, 1, 2].map(i => (
                    <div key={i} className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
            </div>
        </div>
    </div>
);

export const CardSkeleton = () => (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse">
        <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="w-3/4 h-5 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
        <div className="w-1/2 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
            <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
        </div>
    </div>
);

export const RowSkeleton = () => (
    <tr className="animate-pulse border-b border-slate-100 dark:border-slate-700">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
                <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-700 mr-3" />
                <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="w-12 h-6 bg-slate-200 dark:bg-slate-700 rounded-full" />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
        </td>
    </tr>
);

export const RecentFileSkeleton = () => (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700 animate-pulse">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
            <div>
                <div className="w-32 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
        </div>
        <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
    </div>
);
