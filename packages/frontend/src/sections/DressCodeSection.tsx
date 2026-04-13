import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'

import dressCodeReception from '@/assets/dress-code-reception.png'
import { weddingColors } from '@/theme/colors'
import { itineraryDateHeadingFontSize } from '@/theme/typography'

const DressCodeSection = () => {
  return (
    <Box id="dress-code" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal}>
      <Container maxW="container.md" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={4} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="300"
            color={weddingColors.primaryGold}
          >
            Dress Code
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
            In the spirit of Havana Nights, we invite all our guests to wear black and/or gold.
          </Text>
        </VStack>
      </Container>

      <Box
        width="100vw"
        maxW="100vw"
        marginInline="calc(50% - 50vw)"
        mt={{ base: 8, md: 10, lg: 12 }}
        height={{ base: 'min(48vh, 22rem)', md: 'min(62vh, 560px)', lg: 'min(72vh, 640px)' }}
        position="relative"
        overflow="hidden"
        role="img"
        aria-label="Evening beach reception with candlelit tables, string lights, and live music"
      >
        <Box
          position="absolute"
          inset={0}
          width="100%"
          height="100%"
          backgroundImage={`url(${dressCodeReception})`}
          backgroundSize="cover"
          backgroundPosition={{ base: 'center 40%', md: 'center 42%', lg: 'center 40%' }}
          backgroundRepeat="no-repeat"
        />
      </Box>
    </Box>
  )
}

export default DressCodeSection
