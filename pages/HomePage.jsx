import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StatsSection from '../components/StatsSection';
import Authentication from '../components/Authentication';

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="bg-white text-black dark:bg-gray-200">
      <HeroSection onStartAuth={() => setShowAuth(true)} />
      <FeatureSection />
      <StatsSection />
      {showAuth && <Authentication onClose={() => setShowAuth(false)} />}
    </div>
  );
}

