import { ArrowRight } from "lucide-react";

const CTASection = ({ openSignUp }) => {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-200 dark:via-purple-800 to-transparent" />

            <div className="max-w-4xl mx-auto relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/15 via-violet-500/20 to-indigo-500/15 rounded-[40px] blur-3xl pointer-events-none" />

                <div className="relative rounded-3xl overflow-hidden border border-purple-100 dark:border-purple-900/50 bg-gradient-to-br from-white via-purple-50/50 to-indigo-50/40 dark:from-[#1a1730] dark:via-[#1e1540] dark:to-[#161a38]">
                    <div className="p-12 sm:p-16 text-center">
                        {/* Decorative circles */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-purple-400/8 to-indigo-400/8 rounded-full pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-violet-400/8 to-purple-400/8 rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex justify-center mb-7">
                                <img src="/logo.png" alt="CloudShare"
                                    className="w-16 h-16 rounded-2xl shadow-xl shadow-purple-500/25 ring-4 ring-purple-100 dark:ring-purple-900/50" />
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Ready to get started?
                            </h2>
                            {/* Body — slate-700 */}
                            <p className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                                Join thousands of professionals already using CloudShare to securely manage and share their files.
                            </p>

                            <div className="mt-10">
                                <button onClick={() => openSignUp()}
                                    className="btn-primary text-base px-10 py-4 gap-2 shadow-2xl shadow-purple-500/30">
                                    Create Free Account <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Guarantee pills — slate-700 text */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                {["5 free credits", "No credit card", "Cancel anytime"].map((item) => (
                                    <span key={item}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-700">
                                        <span className="text-purple-600">✓</span> {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;