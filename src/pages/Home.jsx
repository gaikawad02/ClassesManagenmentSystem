import { Box } from '@mui/material';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StatsSection from '../components/StatsSection';
import TestimonialSection from '../components/TestimonialSection';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <Box>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <TestimonialSection />
      <CallToAction />
    </Box>
  );
};

export default Home;