import { Box } from '@chakra-ui/react'

import { Toaster } from '@/components/ui/toaster'
import HeroSection from './sections/HeroSection'
import StorySection from './sections/StorySection'
import EventSection from './sections/EventSection'
import RSVPSection from './sections/RSVPSection'
import TravelSection from './sections/TravelSection'
import GallerySection from './sections/GallerySection'
import './App.css'

function App() {
  return (
    <Box width="100%">
      <Toaster />
      <HeroSection />
      <StorySection />
      <EventSection />
      <RSVPSection />
      <TravelSection />
      <GallerySection />
    </Box>
  )
}

export default App
