import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StatsSection from '../components/StatsSection';

export default function HomePage() {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <HeroSection />
      <FeatureSection />
      <StatsSection />
    </div>
  );
}
