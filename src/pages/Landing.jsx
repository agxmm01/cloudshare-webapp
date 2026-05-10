import HeroSection from "../components/landing/HeroSection.jsx";
import FeaturesSection from "../components/landing/FeaturesSection.jsx";
import PricingSection from "../components/landing/PricingSection.jsx";
import TestimonialsSection from "../components/landing/TestimonialsSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";
import PillNav from "../components/landing/PillNav.jsx";
import { features, pricingPlans, testimonials } from "../assets/data.js";
import { useClerk, useUser } from '@clerk/react';
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext.jsx";

const Landing = () => {
    const { openSignIn, openSignUp } = useClerk();
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
    const { setForceTheme } = useTheme();

    useEffect(() => {
        if (isSignedIn) navigate("/dashboard");
    }, [isSignedIn, navigate]);

    // Force light mode on landing page
    useEffect(() => {
        setForceTheme("light");
        return () => setForceTheme(null);
    }, [setForceTheme]);

    // Smooth-scroll helper for anchor links
    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const navItems = [
        { label: 'Home',         href: '#home',         onClick: () => scrollTo('home') },
        { label: 'Features',     href: '#features',     onClick: () => scrollTo('features') },
        { label: 'Pricing',      href: '#pricing',      onClick: () => scrollTo('pricing') },
        { label: 'Testimonials', href: '#testimonials', onClick: () => scrollTo('testimonials') },
        { label: 'Sign In',      href: '#signin',       onClick: () => openSignIn() },
        { label: 'Get Started',  href: '#signup',       onClick: () => openSignUp(), cta: true },
    ];

    return (
        <div className="landing-page relative" style={{ background: '#f5f3ff' }}>
            {/* ── PillNav ─────────────────────────────────────────── */}
            <div className="sticky top-0 z-50">
                <PillNav
                    logo="/logo.png"
                    logoAlt="CloudShare"
                    items={navItems}
                    activeHref={location.hash || '#home'}
                    initialLoadAnimation={true}
                    ease="power3.out"
                    baseColor="#7c3aed"
                    pillColor="#ffffff"
                    hoveredPillTextColor="#ffffff"
                    pillTextColor="#18181b"
                />
            </div>

            {/* ── Sections with anchor IDs ─────────────────────────── */}
            <div id="home">
                <HeroSection openSignIn={openSignIn} openSignUp={openSignUp} />
            </div>

            <div id="features">
                <FeaturesSection features={features} />
            </div>

            <div id="pricing">
                <PricingSection pricingPlans={pricingPlans} openSignUp={openSignUp} />
            </div>

            <div id="testimonials">
                <TestimonialsSection testimonials={testimonials} />
            </div>

            <CTASection openSignUp={openSignUp} />

            <Footer />
        </div>
    );
};

export default Landing;