import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import IssueCategories from '../components/IssueCategories';
import RecentIssues from '../components/RecentIssues';
import StatsSection from '../components/StatsSection';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with proper spacing */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* Issue Categories Section */}
      <section className="relative z-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <IssueCategories />
        </div>
      </section>

      {/* Weekly Trends Section */}
      <section className="relative z-10">
        <RecentIssues />
      </section>

      {/* Stats Section */}
      <section className="relative z-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
