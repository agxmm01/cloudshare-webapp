import { Check, Sparkles, ArrowRight } from "lucide-react";
import BorderGlow from "../BorderGlow.jsx";

const PricingSection = ({ pricingPlans, openSignUp }) => {
    return (
        <section className="py-32 relative overflow-hidden">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50/40 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">

                {/* Heading */}
                <div className="text-center max-w-4xl mx-auto mb-24">

                    <span className="section-badge mb-7 inline-flex text-slate-900 dark:text-slate-100 text-lg px-5 py-2">
                        💳 Pricing
                    </span>

                    <h2 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100">
                        Simple,{" "}

                        <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            transparent
                        </span>{" "}

                        pricing
                    </h2>

                    <p className="mt-8 text-2xl text-slate-900 dark:text-slate-100 leading-relaxed max-w-3xl mx-auto">
                        Start free. Buy credits when you need more.
                        No subscriptions, no surprises.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center">

                    {pricingPlans.map((plan, index) => {

                        const isPopular = plan.highlighted;

                        return (
                            <BorderGlow
                                key={index}
                                className={`transition-all duration-300 ${isPopular ? "lg:scale-[1.08] z-10" : "hover:-translate-y-2"}`}
                                glowColor="268 100 76"
                                borderRadius={24}
                                backgroundColor="white"
                                animated={isPopular}
                            >
                                <div
                                    className={`relative flex flex-col rounded-[24px] transition-all duration-300 h-full
                                    
                                    ${isPopular
                                            ? "shadow-2xl shadow-purple-500/20 ring-2 ring-purple-500 bg-white"
                                            : "card hover:shadow-2xl bg-white"
                                        }`}
                                >

                                    {/* Popular Top Border */}
                                    {isPopular && (
                                        <div className="h-2 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500 rounded-t-[24px]" />
                                    )}

                                    {/* Card Content */}
                                    <div className="px-10 pt-10 pb-7">

                                        {/* Plan Name */}
                                        <div className="flex items-center justify-between mb-3">

                                            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                                                {plan.name}
                                            </h3>

                                            {isPopular && (
                                                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                                                    <Sparkles size={14} />
                                                    Most Popular
                                                </span>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className="text-lg text-slate-900 dark:text-slate-100 mb-8 leading-relaxed">
                                            {plan.description}
                                        </p>

                                        {/* Price */}
                                        <div className="flex items-end gap-3">

                                            <span className="text-7xl font-black text-slate-900 dark:text-slate-100">
                                                ₹{plan.price}
                                            </span>

                                            <span className="text-slate-900 dark:text-slate-100 text-lg mb-3 font-medium">
                                                {(plan.price === "0" || plan.price === 0)
                                                    ? "forever free"
                                                    : "one-time"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px mx-10 bg-slate-200" />

                                    {/* Features */}
                                    <div className="px-10 py-8 flex-1 flex flex-col">

                                        <ul className="space-y-5 flex-1">

                                            {plan.features.map((feature, i) => (

                                                <li
                                                    key={i}
                                                    className="flex items-center gap-4"
                                                >

                                                    {/* Check Icon */}
                                                    <div
                                                        className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                                                        
                                                        ${isPopular
                                                                ? "bg-gradient-to-br from-purple-500 to-indigo-500"
                                                                : "bg-purple-100"
                                                            }`}
                                                    >

                                                        <Check
                                                            size={15}
                                                            className={isPopular
                                                                ? "text-white"
                                                                : "text-purple-700"}
                                                            strokeWidth={3}
                                                        />
                                                    </div>

                                                    {/* Feature Text */}
                                                    <span className="text-lg text-slate-900 dark:text-slate-100 font-medium">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* CTA Button */}
                                        <button
                                            onClick={() => openSignUp()}
                                            className={`mt-10 w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-bold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]

                                            ${isPopular
                                                    ? "btn-primary"
                                                    : "border border-slate-300 text-slate-900 dark:text-slate-100 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
                                                }`}
                                        >
                                            {plan.cta}

                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </BorderGlow>
                        );
                    })}
                </div>

                {/* Bottom Note */}
                <p className="text-center text-lg text-slate-900 dark:text-slate-100 mt-14 font-medium">
                    All plans include 5 free credits on sign-up ·
                    No hidden fees · Secure payments
                </p>
            </div>
        </section>
    );
};

export default PricingSection;