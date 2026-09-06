import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

import { weddingColors } from '@/theme/colors'
import { itineraryDateHeadingFontSize } from '@/theme/typography'

const RegistrySection = () => {
  return (
    <Box id="registry" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal}>
      <Container maxW="container.md" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={4} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="300"
            color={weddingColors.primaryGold}
          >
            Gift Registry
          </Heading>
          <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
          <Text
            as="p"
            fontFamily="'Cormorant Garamond', serif"
            fontWeight="400"
            color="white"
            textAlign="center"
            fontSize={itineraryDateHeadingFontSize}
          >
            No gifts will be accepted. Your presence is more than enough.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default RegistrySection
