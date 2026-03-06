import { Box, HStack } from '@chakra-ui/react'

import Monogram from '@/components/Monogram'
import { weddingColors } from '@/theme/colors'

interface SectionDividerProps {
  py?: { base?: number; md?: number }
}

const SectionDivider = ({ py = { base: 10, md: 14 } }: SectionDividerProps) => {
  return (
    <Box width="100%" bg={weddingColors.charcoal} py={py}>
      <HStack width="100%" maxW="container.lg" marginInline="auto" px={{ base: 4, md: 6 }} gap={4}>
        <Box height="1px" flex={1} bg={weddingColors.primaryGold} opacity={0.35} />
        <Monogram boxSize={{ base: '96px', md: '114px' }} />
        <Box height="1px" flex={1} bg={weddingColors.primaryGold} opacity={0.35} />
      </HStack>
    </Box>
  )
}

export default SectionDivider

