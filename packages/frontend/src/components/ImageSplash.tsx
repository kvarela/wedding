import { Box } from '@chakra-ui/react'

interface ImageSplashProps {
  imageUrl: string
  backgroundPosition?: string
  backgroundSize?: string
}

const ImageSplash = ({
  imageUrl,
  backgroundPosition = 'center top',
  backgroundSize = 'cover',
}: ImageSplashProps) => {
  return (
    <Box
      width="100%"
      position="relative"
      height={{ base: '40vh', md: '55vh' }}
      overflow="hidden"
    >
      <Box
        position="absolute"
        inset={0}
        width="100%"
        height="100%"
        backgroundImage={`url(${imageUrl})`}
        backgroundSize={backgroundSize}
        backgroundPosition={backgroundPosition}
        backgroundRepeat={
          backgroundSize === '100% auto' || backgroundSize === 'contain' ? 'no-repeat' : undefined
        }
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

export default ImageSplash
