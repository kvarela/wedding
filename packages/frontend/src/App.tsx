import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import NavigationHeader from '@/components/NavigationHeader'
import SectionDivider from '@/components/SectionDivider'
import { Toaster } from '@/components/ui/toaster'
import ImageSplash from '@/components/ImageSplash'
import beachSunset from '@/assets/beach-sunset.png'
import familyBaby from '@/assets/family-baby.png'
import santorini from '@/assets/santorini.png'
import HeroSection from './sections/HeroSection'
import StorySection from './sections/StorySection'
import EventSection from './sections/EventSection'
import DressCodeSection from './sections/DressCodeSection'
import RSVPSection from './sections/RSVPSection'
import TravelSection from './sections/TravelSection'
import FooterSection from './sections/FooterSection'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Box width="100%">
      <Toaster />
      <NavigationHeader menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} onCloseMenu={() => setMenuOpen(false)} />
      <HeroSection />
      <StorySection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <ImageSplash
        imageUrl={beachSunset}
        backgroundSize="100% auto"
        backgroundPosition="center 65%"
      />
      <EventSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <ImageSplash imageUrl={familyBaby} backgroundPosition="center center" />
      <DressCodeSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <RSVPSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <ImageSplash imageUrl={santorini} backgroundPosition="center 90%" />
      <TravelSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <FooterSection />
    </Box>
  )
}

export default App
