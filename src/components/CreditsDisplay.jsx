import { Zap } from "lucide-react";

const CreditsDisplay = ({ credits }) => {
    const isLow = credits <= 2;
    return (
        <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
            ${isLow
                ? "bg-red-50 text-red-600 border-red-200"
                : "bg-purple-50 text-purple-700 border-purple-200"
            }`}
        >
            <Zap size={14} className={isLow ? "text-red-500" : "text-purple-500"} fill="currentColor" />
            <span>{credits}</span>
            <span className="text-xs font-normal opacity-70">credits</span>
        </div>
    );
};

export default CreditsDisplay;