import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

import heroImage from '@/assets/hero.png'
import { HEADER_HEIGHT_PX } from '@/components/NavigationHeader'
import { weddingColors } from '@/theme/colors'

const HeroSection = () => {
  return (
    <Box
      id="home"
      width="100%"
      position="relative"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        width="100%"
        height="100%"
        zIndex={0}
        backgroundImage={`url(${heroImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="saturate(0.9)"
      />
      <Box
        position="absolute"
        inset={0}
        width="100%"
        height="100%"
        zIndex={0}
        bg="black"
        opacity={0.45}
      />

      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <VStack
          gap={8}
          textAlign="center"
          color={weddingColors.warmIvory}
          textShadow="0 2px 10px rgba(0,0,0,0.75), 0 0 28px rgba(0,0,0,0.45)"
          pt={`${HEADER_HEIGHT_PX}px`}
        >
          <VStack gap={3}>
            <Heading
              fontSize={{ base: '4xl', md: '6xl', lg: '7xl' }}
              fontFamily="'Cinzel Decorative', serif"
              fontWeight="500"
              letterSpacing="wide"
            >
              Felicia{' '}
              <Text as="span" fontStyle="italic" fontWeight="400">
                &
              </Text>{' '}
              Karim
            </Heading>

            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontFamily="'Cinzel Decorative', serif"
              fontWeight="600"
              letterSpacing="wider"
              color={weddingColors.champagneGold}
              mt="20px"
            >
              November 7, 2026
            </Text>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontFamily="'Cinzel Decorative', serif"
              fontWeight="500"
              letterSpacing="wide"
              opacity={0.98}
            >
              Viceroy Los Cabos
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default HeroSection
