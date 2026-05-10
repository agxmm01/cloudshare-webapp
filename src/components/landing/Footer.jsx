import { Mail, Globe, ArrowUpRight } from "lucide-react";

const footerLinks = {
    Product:  ["Features", "Pricing", "Changelog", "Roadmap"],
    Company:  ["About", "Blog", "Careers", "Press"],
    Legal:    ["Privacy", "Terms", "Security", "Cookies"],
};

const Footer = () => {
    return (
        <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d0b1a]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <img src="/logo.png" alt="CloudShare" className="w-9 h-9 rounded-xl shadow-sm" />
                            <span className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                                Cloud<span className="text-purple-600">Share</span>
                            </span>
                        </div>
                        {/* Description — slate-600 */}
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-[220px]">
                            Enterprise-grade file sharing built for modern teams. Secure, fast, and simple.
                        </p>
                        <div className="flex items-center gap-2.5 mt-5">
                            {[Mail, Globe, ArrowUpRight].map((Icon, i) => (
                                <a key={i} href="#"
                                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            {/* Section heading — slate-800 */}
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-slate-400 mb-4">
                                {section}
                            </p>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        {/* Link text — slate-600 */}
                                        <a href="#"
                                            className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-150">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    {/* Copyright — slate-600 */}
                    <p className="text-xs text-slate-600 dark:text-slate-500">© 2025 CloudShare, Inc. All rights reserved.</p>
                    <p className="text-xs text-slate-600 dark:text-slate-500">Built with ❤️ for secure file sharing</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;