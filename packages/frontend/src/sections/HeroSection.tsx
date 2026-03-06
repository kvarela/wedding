import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

import proposalImage from '@/assets/proposal.jpg'
import { weddingColors } from '@/theme/colors'

const HeroSection = () => {
  return (
    <Box
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
        backgroundImage={`url(${proposalImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="grayscale(100%)"
      />
      <Box
        position="absolute"
        inset={0}
        width="100%"
        height="100%"
        zIndex={0}
        bg="black"
        opacity={0.55}
      />

      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <VStack
          gap={8}
          textAlign="center"
          color="white"
          textShadow="0 2px 8px rgba(0,0,0,0.8), 0 0 24px rgba(0,0,0,0.5)"
        >
          <Heading
            fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
            fontWeight="600"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            Karim{' '}
            <Text as="span" fontStyle="italic">
              &
            </Text>{' '}
            Felicia
          </Heading>

          <Box height="1px" width="200px" bg={weddingColors.primaryGold} opacity={0.9} />

          <VStack gap={4}>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontFamily="'Cormorant Garamond', serif"
              fontWeight="600"
              letterSpacing="wide"
            >
              are getting married
            </Text>

            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="600"
              letterSpacing="wider"
              color={weddingColors.primaryGold}
            >
              NOVEMBER 7, 2026
            </Text>

            <Text fontSize={{ base: 'md', md: 'lg' }} fontWeight="500" opacity={0.95}>
              Viceroy Hotel • San Jose Del Cabo, Mexico
            </Text>
          </VStack>

          <Box
            as="button"
            mt={8}
            px={8}
            py={3}
            border="1px solid"
            borderColor={weddingColors.primaryGold}
            color="white"
            fontSize="sm"
            fontWeight="600"
            letterSpacing="wider"
            textTransform="uppercase"
            transition="all 0.3s"
            _hover={{
              bg: weddingColors.primaryGold,
              color: 'black',
            }}
            onClick={() => {
              document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            RSVP Now
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default HeroSection
