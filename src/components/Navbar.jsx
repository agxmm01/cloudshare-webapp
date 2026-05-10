import { useContext, useEffect, useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from '@clerk/react';
import SideMenu from "./SideMenu.jsx";
import CreditsDisplay from "./CreditsDisplay.jsx";
import { UserCreditsContext } from "../context/UserCreditsContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const { credits, fetchUserCredits } = useContext(UserCreditsContext);
    const { isSignedIn } = useUser();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        fetchUserCredits();
    }, [fetchUserCredits]);

    return (
        <div className="glass-nav flex items-center justify-between gap-5 py-4 px-4 sm:px-7 sticky top-0 z-30">
            {/* Left side */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setOpenSideMenu(!openSideMenu)}
                    className="block lg:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg transition-colors"
                >
                    {openSideMenu ? <X size={22} /> : <Menu size={22} />}
                </button>

                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="/logo.png"
                        alt="CloudShare logo"
                        className="w-8 h-8 rounded-lg shadow-sm"
                    />
                    <span className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                        Cloud<span className="text-purple-600">Share</span>
                    </span>
                </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle dark mode"
                    className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-700 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-200 dark:hover:border-purple-700 transition-all duration-200 shadow-sm"
                >
                    {isDark ? <Sun size={17} /> : <Moon size={17} />}
                </button>

                {isSignedIn && (
                    <>
                        <Link to="/subscriptions">
                            <CreditsDisplay credits={credits} />
                        </Link>
                        <UserButton />
                    </>
                )}
            </div>

            {/* Mobile side menu */}
            {openSideMenu && (
                <div className="fixed top-[73px] left-0 right-0 sidebar-panel border-b border-gray-100 lg:hidden z-20">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    );
};

export default Navbar;