import { Box, Container, HStack, Link } from '@chakra-ui/react'

import Monogram from '@/components/Monogram'
import { weddingColors } from '@/theme/colors'

const HEADER_HEIGHT_PX = 132

const navItems = [
  { label: 'Our Story', targetId: 'our-story' },
  { label: 'Travel', targetId: 'travel' },
  { label: 'Schedule', targetId: 'schedule' },
  { label: 'RSVP', targetId: 'rsvp' },
]

const scrollToSection = (targetId: string) => {
  if (targetId === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const NavigationHeader = () => {
  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      height={`${HEADER_HEIGHT_PX}px`}
      bg={weddingColors.charcoal}
      borderBottomWidth="1px"
      borderColor="rgba(184,150,74,0.35)"
    >
      <Container maxW="container.xl" marginInline="auto" height="100%" px={{ base: 4, md: 6 }}>
        <HStack height="100%" justify="space-between" gap={6}>
          <Box
            as="button"
            type="button"
            onClick={() => scrollToSection('home')}
            aria-label="Go to homepage"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            outline="none"
            _focusVisible={{ boxShadow: '0 0 0 3px rgba(232,211,162,0.35)' }}
          >
            <Monogram boxSize={{ base: '102px', md: '114px' }} glow />
          </Box>

          <HStack gap={{ base: 4, md: 8 }} flexWrap="wrap" justify="flex-end">
            {navItems.map((item) => (
              <Link
                key={item.targetId}
                as="button"
                type="button"
                onClick={() => scrollToSection(item.targetId)}
                fontSize={{ base: 'xs', md: 'sm' }}
                fontWeight="600"
                letterSpacing="wider"
                textTransform="uppercase"
                color={weddingColors.warmIvory}
                _hover={{ color: weddingColors.champagneGold, textDecoration: 'none' }}
              >
                {item.label}
              </Link>
            ))}
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export { HEADER_HEIGHT_PX }
export default NavigationHeader

