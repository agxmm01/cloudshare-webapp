import { useUser } from '@clerk/react';
import Navbar from "../components/Navbar.jsx";
import SideMenu from "../components/SideMenu.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useUser();
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="max-[1080px]:hidden flex-shrink-0">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    {/* Main content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-6xl mx-auto px-6 py-8">
                            {children}
                        </div>
                    </main>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;