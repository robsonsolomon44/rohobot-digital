import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandsSection from './components/BrandsSection';
import PortfolioShowcase from './components/PortfolioShowcase';
import ServicesSection from './components/ServicesSection';
import AboutUs from './components/AboutUs';
import CollaborationForm from './components/CollaborationForm';
import Footer from './components/Footer';
import MobileActionBar from './components/MobileActionBar';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState('');

  const handleSelectCTA = (topicTitle) => {
    setSelectedTopic(topicTitle);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Sticky Header with Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        {/* 1. Home */}
        <Hero />

        {/* 2. Who We Work With */}
        <BrandsSection />

        {/* 3. Selected Work & Video Portfolio (10 Real Productions) */}
        <PortfolioShowcase onSelectProjectCTA={handleSelectCTA} />

        {/* 4. Services */}
        <ServicesSection onSelectService={handleSelectCTA} />

        {/* 5. About Us */}
        <AboutUs />

        {/* 6. Contact Us */}
        <CollaborationForm preselectedTopic={selectedTopic} />
      </main>

      {/* Footer & Mobile Actions */}
      <Footer />
      <MobileActionBar />
    </div>
  );
}
