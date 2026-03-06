import { Box } from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'

import monogramUrl from '@/assets/monogram.png'

interface MonogramProps extends Omit<BoxProps, 'as' | 'src'> {
  alt?: string
  glow?: boolean
}

const Monogram = ({ alt = 'FK monogram', glow = true, ...props }: MonogramProps) => {
  return (
    <Box
      as="img"
      src={monogramUrl}
      alt={alt}
      userSelect="none"
      filter={
        glow
          ? 'drop-shadow(0 2px 10px rgba(0,0,0,0.65)) drop-shadow(0 0 18px rgba(184,150,74,0.25))'
          : undefined
      }
      {...props}
    />
  )
}

export default Monogram

