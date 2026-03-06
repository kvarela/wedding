import { Box } from '@chakra-ui/react'

import { Toaster } from '@/components/ui/toaster'
import ImageSplash from '@/components/ImageSplash'
import beachSunset from '@/assets/beach-sunset.png'
import familyBaby from '@/assets/family-baby.png'
import santorini from '@/assets/santorini.png'
import HeroSection from './sections/HeroSection'
import StorySection from './sections/StorySection'
import EventSection from './sections/EventSection'
import RSVPSection from './sections/RSVPSection'
import TravelSection from './sections/TravelSection'
import FooterSection from './sections/FooterSection'
import './App.css'

function App() {
  return (
    <Box width="100%">
      <Toaster />
      <HeroSection />
      <StorySection />
      <ImageSplash
        imageUrl={beachSunset}
        backgroundSize="100% auto"
        backgroundPosition="center 65%"
      />
      <EventSection />
      <ImageSplash imageUrl={familyBaby} />
      <RSVPSection />
      <ImageSplash imageUrl={santorini} backgroundPosition="center 90%" />
      <TravelSection />
      <FooterSection />
    </Box>
  )
}

export default App
