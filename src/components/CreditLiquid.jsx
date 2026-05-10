import { Zap } from 'lucide-react';

const CreditLiquid = ({ remaining, max = 5, uploadingCount = 0 }) => {
    // Determine the total capacity
    const actualMax = Math.max(max, remaining + uploadingCount);
    
    // The "fill" represents used credits
    const used = actualMax - remaining;

    // Preview fill shows what will happen after current upload completes
    const previewUsed = used + uploadingCount;

    // Calculate percentages
    const fillPercent = Math.min(100, Math.max(0, (used / actualMax) * 100));
    const previewPercent = Math.min(100, Math.max(0, (previewUsed / actualMax) * 100));

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[400px]">
            {/* Ambient background glow */}
            <div 
                className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/5 blur-3xl pointer-events-none transition-opacity duration-1000"
                style={{ opacity: fillPercent > 0 ? 1 : 0.5 }}
            />

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 z-10 flex items-center gap-2">
                <Zap size={24} className="text-purple-500" />
                Credit Usage
            </h3>
            
            {/* The Glass Container */}
            <div className="relative w-36 h-56 rounded-[40px] border-4 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 shadow-inner overflow-hidden z-10 flex items-end">
                
                {/* Preview Fill Layer (Light Purple) */}
                <div 
                    className="absolute bottom-0 w-full transition-all duration-700 ease-in-out opacity-50 dark:opacity-40"
                    style={{ height: `${previewPercent}%` }}
                >
                    <div className="absolute bottom-full w-[200%] flex" style={{ animation: 'wave 3s linear infinite' }}>
                        <svg viewBox="0 0 800 100" className="w-[50%] h-6 text-purple-400 dark:text-purple-300 fill-current" preserveAspectRatio="none">
                            <path d="M0,50 C150,100 250,0 400,50 C550,100 650,0 800,50 L800,100 L0,100 Z" />
                        </svg>
                        <svg viewBox="0 0 800 100" className="w-[50%] h-6 text-purple-400 dark:text-purple-300 fill-current" preserveAspectRatio="none">
                            <path d="M0,50 C150,100 250,0 400,50 C550,100 650,0 800,50 L800,100 L0,100 Z" />
                        </svg>
                    </div>
                    <div className="w-full h-full bg-purple-400 dark:bg-purple-300" />
                </div>

                {/* Actual Fill Layer (Solid Purple) */}
                <div 
                    className="absolute bottom-0 w-full transition-all duration-1000 ease-in-out"
                    style={{ height: `${fillPercent}%` }}
                >
                    <div className="absolute bottom-full w-[200%] flex" style={{ animation: 'wave 4s linear infinite' }}>
                        <svg viewBox="0 0 800 100" className="w-[50%] h-8 text-purple-600 dark:text-purple-500 fill-current" preserveAspectRatio="none">
                            <path d="M0,50 C150,100 250,0 400,50 C550,100 650,0 800,50 L800,100 L0,100 Z" />
                        </svg>
                        <svg viewBox="0 0 800 100" className="w-[50%] h-8 text-purple-600 dark:text-purple-500 fill-current" preserveAspectRatio="none">
                            <path d="M0,50 C150,100 250,0 400,50 C550,100 650,0 800,50 L800,100 L0,100 Z" />
                        </svg>
                    </div>
                    <div className="w-full h-full bg-purple-600 dark:bg-purple-500" />
                </div>
            </div>

            <div className="mt-8 text-center z-10 w-full flex justify-around">
                <div>
                    <p className="text-3xl font-black text-slate-900 dark:text-slate-100">
                        {used} 
                        {uploadingCount > 0 && <span className="text-sm text-purple-500 ml-1 animate-pulse">(+{uploadingCount})</span>}
                    </p>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Used</p>
                </div>
                <div>
                    <p className="text-3xl font-black text-purple-600 dark:text-purple-500">
                        {remaining}
                        {uploadingCount > 0 && <span className="text-sm text-red-400 ml-1 animate-pulse">(-{uploadingCount})</span>}
                    </p>
                    <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Available</p>
                </div>
            </div>
            
            {remaining === 0 && (
                <p className="text-sm font-bold text-red-500 mt-4 z-10">
                    Capacity Full!
                </p>
            )}
        </div>
    );
};

export default CreditLiquid;
