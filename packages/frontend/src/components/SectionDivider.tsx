import { Box, Button, HStack } from '@chakra-ui/react'

import Monogram from '@/components/Monogram'
import { weddingColors } from '@/theme/colors'

interface SectionDividerProps {
  py?: { base?: number; md?: number }
  onLogoClick?: () => void
}

const SectionDivider = ({ py = { base: 10, md: 14 }, onLogoClick }: SectionDividerProps) => {
  const monogram = <Monogram boxSize={{ base: '96px', md: '114px' }} />

  return (
    <Box width="100%" bg={weddingColors.charcoal} py={py}>
      <HStack width="100%" maxW="container.lg" marginInline="auto" px={{ base: 4, md: 6 }} gap={4}>
        <Box height="1px" flex={1} bg={weddingColors.primaryGold} opacity={0.35} />
        {onLogoClick ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onLogoClick}
            aria-label="Open menu"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            p={0}
            h="auto"
            minW="unset"
            bg="transparent"
            color="inherit"
            outline="none"
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent' }}
            _focusVisible={{ boxShadow: '0 0 0 3px rgba(184,150,74,0.35)' }}
          >
            {monogram}
          </Button>
        ) : (
          monogram
        )}
        <Box height="1px" flex={1} bg={weddingColors.primaryGold} opacity={0.35} />
      </HStack>
    </Box>
  )
}

export default SectionDivider

