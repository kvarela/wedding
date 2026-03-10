import { Box, Container, HStack, Link, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import Monogram from '@/components/Monogram'
import { weddingColors } from '@/theme/colors'

const HEADER_HEIGHT_PX = 160

const MENU_ITEMS: { label: string; targetId: string }[] = [
  { label: 'Home', targetId: 'home' },
  { label: 'Our Story', targetId: 'story' },
  { label: 'Schedule', targetId: 'itinerary' },
  { label: 'Dress Code', targetId: 'dress-code' },
  { label: 'RSVP', targetId: 'rsvp' },
  { label: 'Travel & Stay', targetId: 'travel' },
]

const scrollToSection = (targetId: string) => {
  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const NavigationHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuLinkClick = (targetId: string) => {
    setMenuOpen(false)
    scrollToSection(targetId)
  }

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={100}
        height={`${HEADER_HEIGHT_PX}px`}
        background={`linear-gradient(to bottom, ${weddingColors.charcoal} 0%, ${weddingColors.charcoal} 18%, rgba(31,31,31,0.85) 45%, rgba(31,31,31,0.4) 70%, transparent 100%)`}
        borderBottomWidth="0"
      >
        <Container maxW="container.xl" marginInline="auto" height="100%" px={{ base: 4, md: 6 }}>
          <HStack height="100%" justify="space-between" gap={6}>
            <Box
              as="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              outline="none"
              flexShrink={0}
              width={{ base: '102px', md: '114px' }}
              height={{ base: '102px', md: '114px' }}
              _focusVisible={{ boxShadow: '0 0 0 3px rgba(232,211,162,0.35)' }}
            >
              <Monogram glow />
            </Box>

          </HStack>
        </Container>
      </Box>

      {menuOpen && (
        <Box
          position="fixed"
          inset={0}
          zIndex={200}
          bg={weddingColors.menuBackground}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          px={6}
        >
          <Box
            as="button"
            position="absolute"
            top={6}
            left={6}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            color={weddingColors.menuText}
            fontSize="2xl"
            fontWeight="300"
            fontFamily="'Cormorant Garamond', serif"
            _hover={{ opacity: 0.8 }}
          >
            ✕
          </Box>

          <VStack
            as="nav"
            gap={8}
            align="center"
            justify="center"
            flex={1}
          >
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.targetId + item.label}
                as="button"
                type="button"
                onClick={() => handleMenuLinkClick(item.targetId)}
                fontFamily="'Cormorant Garamond', serif"
                fontSize={{ base: '3xl', md: '5xl' }}
                fontWeight="300"
                color={weddingColors.primaryGold}
                textDecoration="none"
                _hover={{ color: weddingColors.darkAntiqueGold, textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </VStack>
        </Box>
      )}
    </>
  )
}

export { HEADER_HEIGHT_PX }
export default NavigationHeader
