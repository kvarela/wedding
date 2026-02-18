import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

const HeroSection = () => {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      className="parallax-section"
      position="relative"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Box
        ref={parallaxRef}
        className="parallax-bg"
        bgGradient="linear(to-b, #1a202c, #2d3748)"
        opacity={0.95}
      />
      
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack gap={8} textAlign="center" color="white">
          <Heading
            fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
            fontWeight="300"
            letterSpacing="wider"
            textTransform="uppercase"
          >
            Karim <Text as="span" fontStyle="italic">&</Text> Felicia
          </Heading>
          
          <Box height="1px" width="200px" bg="white" opacity={0.5} />
          
          <VStack gap={4}>
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontFamily="'Cormorant Garamond', serif"
              fontWeight="300"
              letterSpacing="wide"
            >
              are getting married
            </Text>
            
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="300"
              letterSpacing="wider"
            >
              NOVEMBER 7, 2026
            </Text>
            
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight="300"
              opacity={0.9}
            >
              Viceroy Hotel • Cabo San Lucas, Mexico
            </Text>
          </VStack>
          
          <Box
            as="button"
            mt={8}
            px={8}
            py={3}
            border="1px solid"
            borderColor="white"
            color="white"
            fontSize="sm"
            letterSpacing="wider"
            textTransform="uppercase"
            transition="all 0.3s"
            _hover={{
              bg: 'white',
              color: 'gray.900',
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
