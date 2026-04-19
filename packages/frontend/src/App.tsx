import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

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
import GuestListPage from './pages/GuestListPage'
import './App.css'

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Box width="100%">
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
      <ImageSplash
        imageUrl={familyBaby}
        backgroundPosition={{ base: 'center 46%', md: 'center 42%' }}
      />
      <DressCodeSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <RSVPSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <ImageSplash
        imageUrl={santorini}
        backgroundSize="cover"
        backgroundPosition={{ base: '50% 86%', md: '42% 72%', lg: '44% 70%' }}
        splashHeight={{ base: 'min(78vh, 900px)', md: 'min(88vh, 1000px)', lg: 'min(94vh, 1120px)' }}
        fullBleed
      />
      <TravelSection />
      <SectionDivider onLogoClick={() => setMenuOpen(true)} />
      <FooterSection />
    </Box>
  )
}

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guest-list" element={<GuestListPage />} />
      </Routes>
    </>
  )
}

export default App
