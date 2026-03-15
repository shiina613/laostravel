import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import IntroSection from '../components/IntroSection';
import DestinationsSection from '../components/DestinationsSection';
import FestivalsSection from '../components/FestivalsSection';
import ArticlesSection from '../components/ArticlesSection';
import WhyLaosSection from '../components/WhyLaosSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <DestinationsSection />
      <FestivalsSection />
      <ArticlesSection />
      <WhyLaosSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
