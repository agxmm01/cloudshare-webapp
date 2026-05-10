import { PieChart, HardDrive, FileText, Image as ImageIcon, Video, Music, File } from "lucide-react";

const StorageAnalytics = ({ files }) => {
    // Total storage limit (5GB placeholder for visual purposes)
    const TOTAL_QUOTA = 5 * 1024 * 1024 * 1024; // 5GB in bytes

    const calculateStats = () => {
        let totalUsed = 0;
        const typeStats = {
            images: { size: 0, count: 0, label: 'Images', color: 'bg-purple-500', icon: ImageIcon },
            videos: { size: 0, count: 0, label: 'Videos', color: 'bg-blue-500', icon: Video },
            audio: { size: 0, count: 0, label: 'Audio', color: 'bg-green-500', icon: Music },
            documents: { size: 0, count: 0, label: 'Documents', color: 'bg-amber-500', icon: FileText },
            others: { size: 0, count: 0, label: 'Others', color: 'bg-gray-400', icon: File }
        };

        files.forEach(file => {
            const size = file.size;
            totalUsed += size;
            
            const ext = file.name.split('.').pop().toLowerCase();
            
            if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) {
                typeStats.images.size += size;
                typeStats.images.count++;
            } else if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(ext)) {
                typeStats.videos.size += size;
                typeStats.videos.count++;
            } else if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(ext)) {
                typeStats.audio.size += size;
                typeStats.audio.count++;
            } else if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'csv'].includes(ext)) {
                typeStats.documents.size += size;
                typeStats.documents.count++;
            } else {
                typeStats.others.size += size;
                typeStats.others.count++;
            }
        });

        return { totalUsed, typeStats };
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
        else return (bytes / 1073741824).toFixed(2) + ' GB';
    };

    const { totalUsed, typeStats } = calculateStats();
    const usagePercentage = Math.min(100, (totalUsed / TOTAL_QUOTA) * 100);
    
    const categories = Object.values(typeStats).filter(cat => cat.size > 0).sort((a, b) => b.size - a.size);

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 w-full mb-6">
            <div className="flex items-center gap-2 mb-6">
                <PieChart className="text-purple-500" size={20} />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Storage Overview</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Visual Donut Chart representation using CSS */}
                <div className="relative w-40 h-40 flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* Background circle */}
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="20" className="dark:stroke-slate-700" />
                        
                        {categories.length === 0 ? (
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" className="dark:stroke-slate-600" strokeDasharray="251.2" strokeDashoffset="0" />
                        ) : (
                            categories.map((cat, index) => {
                                // Calculate offset based on previous items
                                const previousSizes = categories.slice(0, index).reduce((acc, curr) => acc + curr.size, 0);
                                const offsetPercentage = totalUsed > 0 ? previousSizes / totalUsed : 0;
                                const currentPercentage = totalUsed > 0 ? cat.size / totalUsed : 0;
                                
                                const circumference = 2 * Math.PI * 40; // 251.2
                                const strokeDasharray = `${currentPercentage * circumference} ${circumference}`;
                                const strokeDashoffset = -(offsetPercentage * circumference);

                                // Map custom colors to hex for SVG stroke
                                const colorMap = {
                                    'bg-purple-500': '#a855f7',
                                    'bg-blue-500': '#3b82f6',
                                    'bg-green-500': '#22c55e',
                                    'bg-amber-500': '#f59e0b',
                                    'bg-gray-400': '#9ca3af'
                                };

                                return (
                                    <circle 
                                        key={cat.label}
                                        cx="50" cy="50" r="40" 
                                        fill="transparent" 
                                        stroke={colorMap[cat.color]} 
                                        strokeWidth="20" 
                                        strokeDasharray={strokeDasharray} 
                                        strokeDashoffset={strokeDashoffset}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                );
                            })
                        )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <HardDrive size={24} className="text-slate-600 dark:text-slate-400 dark:text-slate-500 mb-1" />
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {formatSize(totalUsed)}
                        </span>
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Total Usage</p>
                            <p className="text-xs text-slate-900 dark:text-slate-100">
                                {formatSize(totalUsed)} / {formatSize(TOTAL_QUOTA)}
                            </p>
                        </div>
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            {usagePercentage.toFixed(1)}%
                        </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-6 flex">
                        {categories.map((cat) => (
                            <div 
                                key={cat.label}
                                className={`h-full ${cat.color}`} 
                                style={{ width: `${(cat.size / totalUsed) * 100}%` }}
                                title={`${cat.label}: ${formatSize(cat.size)}`}
                            />
                        ))}
                        {categories.length === 0 && (
                            <div className="h-full w-full bg-slate-200 dark:bg-slate-600" />
                        )}
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <div key={cat.label} className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-slate-900 dark:text-slate-100">{cat.label}</span>
                                        <span className="text-[10px] text-slate-900 dark:text-slate-100">{formatSize(cat.size)} ({cat.count})</span>
                                    </div>
                                </div>
                            );
                        })}
                        {categories.length === 0 && (
                            <div className="text-sm text-slate-900 dark:text-slate-100">
                                No files uploaded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorageAnalytics;
