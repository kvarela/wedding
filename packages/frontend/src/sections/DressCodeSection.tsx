import { Box, Container, Heading, Image, Text, VStack } from '@chakra-ui/react'

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

          <Box
            width="100%"
            mt={8}
            mx="auto"
            maxW={{ base: '100%', md: 'min(100%, 32rem)' }}
            h={{ base: 'min(52vh, 36rem)', md: 'min(68vh, 40rem)' }}
            overflow="hidden"
          >
            <Image
              src={dressCodeReception}
              alt="Sunset beach reception with candlelit tables, string lights, and live music"
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="center 35%"
              loading="lazy"
              decoding="async"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default DressCodeSection
