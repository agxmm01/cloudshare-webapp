import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RedirectToSignIn } from '@clerk/react';
import { Toaster } from "react-hot-toast";
import { UserCreditsProvider } from "./context/UserCreditsContext.jsx";
import { useUser } from '@clerk/react';
import { PageSkeleton } from "./components/Skeletons.jsx";

const Landing = lazy(() => import("./pages/Landing.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Upload = lazy(() => import("./pages/Upload.jsx"));
const MyFiles = lazy(() => import("./pages/MyFiles.jsx"));
const Subscription = lazy(() => import("./pages/Subscription.jsx"));
const Transactions = lazy(() => import("./pages/Transactions.jsx"));
const PublicFileView = lazy(() => import("./pages/PublicFileView.jsx"));

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <img src="/logo.png" alt="CloudShare" className="w-12 h-12 rounded-2xl animate-pulse" />
                <div className="flex gap-1.5">
                    {[0,1,2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                </div>
            </div>
        </div>
    );

    return isSignedIn ? children : <RedirectToSignIn />;
}

const App = () => {
    return (
        <UserCreditsProvider>
            <BrowserRouter>
                <Toaster />
                <Suspense fallback={<PageSkeleton />}>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
                        <Route path="/my-files" element={<ProtectedRoute><MyFiles /></ProtectedRoute>} />
                        <Route path="/subscriptions" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
                        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                        <Route path="/file/:fileId" element={<PublicFileView />} />
                        <Route path="/*" element={<RedirectToSignIn />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </UserCreditsProvider>
    )
}

export default App;