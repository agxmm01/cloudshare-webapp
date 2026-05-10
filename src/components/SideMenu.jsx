import { useUser, useAuth, useClerk } from '@clerk/react';
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../assets/data.js";
import { LogOut, HardDrive } from "lucide-react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../util/apiEndpoints.js';

const SideMenu = ({ activeMenu }) => {
    const { user } = useUser();
    const { signOut } = useClerk();
    const { getToken, isSignedIn } = useAuth();
    const navigate = useNavigate();
    return (
        <aside className="w-64 h-[calc(100vh-73px)] sticky top-[73px] z-20 flex flex-col sidebar-panel overflow-hidden">
            {/* User profile card */}
            <div className="px-5 pt-6 pb-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    {user?.imageUrl ? (
                        <img
                            src={user.imageUrl}
                            alt="Profile"
                            className="w-10 h-10 rounded-full ring-2 ring-purple-300/60 dark:ring-purple-700/60 object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {user?.firstName?.[0] || "U"}
                        </div>
                    )}
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-slate-900 dark:text-slate-100 truncate">
                            {user?.primaryEmailAddress?.emailAddress || ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100 px-3 mb-3">
                    Navigation
                </p>
                {SIDE_MENU_DATA.map((item) => {
                    const isActive = activeMenu === item.label;
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer group
                                ${isActive
                                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                                    : "text-slate-900 dark:text-slate-100 hover:bg-white/60 dark:hover:bg-white/5"
                                }`}
                        >
                            <span className={`flex-shrink-0 ${isActive ? "text-white" : "text-slate-900 dark:text-slate-100 group-hover:text-purple-500"}`}>
                                <item.icon size={18} />
                            </span>
                            {item.label}
                            {isActive && (
                                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Sign Out */}
            <div className="px-3 pb-5 pt-3 border-t border-gray-100">
                <button
                    onClick={() => signOut(() => navigate("/"))}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100 hover:bg-red-50/80 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 cursor-pointer group"
                >
                    <LogOut size={18} className="group-hover:text-red-500 transition-colors" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

export default SideMenu;