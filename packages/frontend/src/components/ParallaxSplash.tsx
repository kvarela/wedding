import { Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

interface ParallaxSplashProps {
  imageUrl: string
}

const ParallaxSplash = ({ imageUrl }: ParallaxSplashProps) => {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return
      const scrolled = window.scrollY
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.25}px)`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box
      className="parallax-section"
      width="100%"
      position="relative"
      height={{ base: '40vh', md: '55vh' }}
      overflow="hidden"
    >
      <Box
        ref={parallaxRef}
        className="parallax-bg"
        position="absolute"
        inset={0}
        width="100%"
        height="120%"
        minHeight="100%"
        backgroundImage={`url(${imageUrl})`}
        backgroundSize="100% auto"
        backgroundPosition="center top"
        backgroundRepeat="no-repeat"
        filter="grayscale(25%)"
      />
      <Box
        position="absolute"
        inset={0}
        width="100%"
        height="100%"
        zIndex={1}
        bg="black"
        opacity={0.35}
        pointerEvents="none"
      />
    </Box>
  )
}

export default ParallaxSplash

