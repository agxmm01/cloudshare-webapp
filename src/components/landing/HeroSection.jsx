import { ArrowRight, Shield, Zap, Lock, CheckCircle } from "lucide-react";
import { assets } from "../../assets/assets.js";

const HeroSection = ({ openSignIn, openSignUp }) => {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* Ambient Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full bg-purple-400/10 blur-[140px]" />
                <div className="absolute -bottom-40 -right-32 w-[650px] h-[650px] rounded-full bg-indigo-400/10 blur-[120px]" />

                {/* Dot Grid */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.06]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="dots"
                            x="0"
                            y="0"
                            width="24"
                            height="24"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="2" cy="2" r="1.2" fill="#7c3aed" />
                        </pattern>
                    </defs>

                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
                <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

                    {/* LEFT SIDE */}
                    <div className="flex flex-col items-start">

                        {/* Logo + Badge */}
                        <div className="flex items-center gap-4 mb-9">
                            <img
                                src="/logo.png"
                                alt="CloudShare logo"
                                className="w-16 h-16 rounded-3xl shadow-lg shadow-purple-500/30 ring-2 ring-purple-200/60"
                            />

                            <span className="section-badge text-slate-900 dark:text-slate-100 text-lg px-5 py-2">
                                Next-Gen Cloud File Sharing
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-6xl xl:text-[82px] font-extrabold tracking-tight leading-[1.02]">
                            <span className="text-slate-900 dark:text-slate-100">
                                Share Files
                            </span>

                            <br />

                            <span
                                className="bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-600 bg-clip-text text-transparent"
                                style={{ WebkitBackgroundClip: "text" }}
                            >
                                Securely &amp; Instantly
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-7 text-2xl text-slate-900 dark:text-slate-100 leading-relaxed max-w-[620px]">
                            Enterprise-grade encryption meets blazing-fast sharing.
                            Upload once, access everywhere — your files, your rules.
                        </p>

                        {/* Checklist */}
                        <ul className="mt-8 space-y-4">
                            {[
                                "AES-256 end-to-end encryption",
                                "Share via public link in one click",
                                "Pay only for what you use",
                            ].map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-slate-100"
                                >
                                    <CheckCircle
                                        size={22}
                                        className="text-purple-500 flex-shrink-0"
                                    />

                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row items-start gap-5">

                            <button
                                onClick={() => openSignUp()}
                                className="btn-primary text-xl px-10 py-5 gap-3 rounded-2xl"
                            >
                                Get Started Free
                                <ArrowRight size={22} />
                            </button>

                            <button
                                onClick={() => openSignIn()}
                                className="btn-outline text-xl px-10 py-5 rounded-2xl text-slate-900 dark:text-slate-100"
                            >
                                Sign In
                            </button>
                        </div>

                        {/* Trust Strip */}
                        <div className="mt-10 flex flex-wrap items-center gap-6">
                            {[
                                { icon: Shield, label: "AES-256" },
                                { icon: Zap, label: "Instant" },
                                { icon: Lock, label: "99.9% uptime" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100"
                                >
                                    <Icon
                                        size={18}
                                        className="text-purple-500"
                                    />

                                    {label}
                                </div>
                            ))}

                            <span className="text-slate-900 dark:text-slate-100 text-sm hidden sm:inline">
                                •
                            </span>

                            <span className="text-base font-medium text-slate-900 dark:text-slate-100">
                                No credit card required
                            </span>
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="relative hidden lg:flex items-center justify-center">

                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-500/15 to-indigo-500/20 rounded-3xl blur-3xl scale-110 pointer-events-none" />

                        <div className="relative w-full">

                            {/* Dashboard */}
                            <div className="glass-hero rounded-3xl p-[8px] shadow-[0_30px_90px_rgba(109,40,217,0.25)] ring-1 ring-white/40">

                                <img
                                    src={assets.dashboard}
                                    alt="CloudShare dashboard preview"
                                    className="w-full rounded-2xl object-cover object-top"
                                    style={{ maxHeight: 520 }}
                                />

                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                            </div>

                            {/* Floating Card 1 */}
                            <div
                                className="absolute -top-8 -left-12 bg-white rounded-3xl px-7 py-5 shadow-2xl border border-purple-100"
                                style={{ animation: "float 6s ease-in-out infinite" }}
                            >
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                    Files Shared
                                </p>

                                <p className="text-4xl font-black text-slate-900 dark:text-slate-100 mt-1">
                                    1.2M
                                    <span className="text-purple-500">+</span>
                                </p>
                            </div>

                            {/* Floating Card 2 */}
                            <div
                                className="absolute -bottom-8 -right-12 bg-white rounded-3xl px-7 py-5 shadow-2xl border border-purple-100"
                                style={{ animation: "float 6s ease-in-out 2s infinite" }}
                            >
                                <p className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                                    Happy Users
                                </p>

                                <p className="text-4xl font-black text-slate-900 dark:text-slate-100 mt-1">
                                    50K
                                    <span className="text-indigo-500">+</span>
                                </p>
                            </div>

                            {/* Floating Logo Badge */}
                            <div
                                className="absolute bottom-6 -left-10 flex items-center gap-3 bg-white rounded-3xl px-5 py-4 shadow-xl border border-purple-100"
                                style={{ animation: "float 6s ease-in-out 1s infinite" }}
                            >
                                <img
                                    src="/logo.png"
                                    alt="logo"
                                    className="w-10 h-10 rounded-xl"
                                />

                                <div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                        Powered by
                                    </p>

                                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                                        CloudShare
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;