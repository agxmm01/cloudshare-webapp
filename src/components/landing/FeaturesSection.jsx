import {
    ArrowUpCircle,
    Clock,
    CreditCard,
    FileText,
    Share2,
    Shield,
} from "lucide-react";
import BorderGlow from "../BorderGlow.jsx";

const iconMap = {
    ArrowUpCirlce: ArrowUpCircle,
    Shield,
    Share2,
    CreditCard,
    FileText,
    Clock,
};

const gradients = [
    ["from-purple-500", "to-violet-600"],
    ["from-indigo-500", "to-blue-600"],
    ["from-violet-500", "to-purple-600"],
    ["from-fuchsia-500", "to-pink-600"],
    ["from-blue-500", "to-cyan-600"],
    ["from-emerald-500", "to-teal-600"],
];

const FeaturesSection = ({ features }) => {
    return (
        <section className="py-32 relative overflow-hidden">

            {/* Top Border Glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-24">

                    <span className="section-badge mb-7 inline-flex text-slate-900 dark:text-slate-100 text-lg px-5 py-2">
                        ✦ Features
                    </span>

                    <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
                        Everything you need for{" "}
                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            seamless sharing
                        </span>
                    </h2>

                    <p className="mt-8 text-2xl text-slate-900 dark:text-slate-100 leading-relaxed max-w-3xl mx-auto">
                        Purpose-built tools to upload, protect, and share your
                        digital content — all in one place.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature, index) => {

                        const Icon = iconMap[feature.iconName] || FileText;

                        const [from, to] =
                            gradients[index % gradients.length];

                        return (
                            <BorderGlow
                                key={index}
                                className="hover:-translate-y-2 transition-all duration-300"
                                glowColor="268 100 76"
                                borderRadius={24}
                                backgroundColor="white"
                            >
                                <div
                                    className="group relative card p-10 cursor-default rounded-[24px] h-full"
                                >
                                    {/* Hover Glow */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${from} ${to} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 rounded-[24px]`}
                                    />

                                    {/* Icon */}
                                    <div
                                        className={`inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-br ${from} ${to} shadow-xl mb-7`}
                                    >
                                        <Icon
                                            size={30}
                                            className="text-white"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-4 leading-snug">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-lg text-slate-900 dark:text-slate-100 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Bottom Gradient Line */}
                                    <div
                                        className={`mt-7 h-[3px] w-12 rounded-full bg-gradient-to-r ${from} ${to} group-hover:w-full transition-all duration-500`}
                                    />
                                </div>
                            </BorderGlow>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;