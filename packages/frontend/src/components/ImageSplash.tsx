import { Box } from '@chakra-ui/react'
import type { ComponentProps } from 'react'

type BoxBgProps = Pick<ComponentProps<typeof Box>, 'backgroundPosition' | 'backgroundSize' | 'height' | 'bg'>

interface ImageSplashProps {
  imageUrl: string
  backgroundPosition?: BoxBgProps['backgroundPosition']
  backgroundSize?: BoxBgProps['backgroundSize']
  splashHeight?: BoxBgProps['height']
  splashBg?: BoxBgProps['bg']
  fullBleed?: boolean
}

const ImageSplash = ({
  imageUrl,
  backgroundPosition = 'center top',
  backgroundSize = 'cover',
  splashHeight,
  splashBg,
  fullBleed = false,
}: ImageSplashProps) => {
  return (
    <Box
      position="relative"
      height={splashHeight ?? { base: '40vh', md: '55vh' }}
      overflow="hidden"
      bg={splashBg}
      width={fullBleed ? '100vw' : '100%'}
      maxW={fullBleed ? '100vw' : undefined}
      marginInline={fullBleed ? 'calc(50% - 50vw)' : undefined}
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
