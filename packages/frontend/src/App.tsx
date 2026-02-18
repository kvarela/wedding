import { Box } from '@chakra-ui/react'
import HeroSection from './sections/HeroSection'
import StorySection from './sections/StorySection'
import EventSection from './sections/EventSection'
import RSVPSection from './sections/RSVPSection'
import TravelSection from './sections/TravelSection'
import GallerySection from './sections/GallerySection'
import './App.css'

function App() {
  return (
    <Box>
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
