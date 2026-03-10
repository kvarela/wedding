import { Box, Container, Heading, Image, Text, VStack } from '@chakra-ui/react'

import havanaNightsReception from '@/assets/havana-nights-reception.png'
import { weddingColors } from '@/theme/colors'

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
            fontSize={{ base: 'xs', md: 'sm' }}
            color="gray.200"
            maxW="xl"
            marginInline="auto"
          >
            In the spirit of Havana Nights, we invite all our guests to wear black and gold.
          </Text>

          <Box
            width="100%"
            maxW="md"
            marginInline="auto"
            mt={8}
            aspectRatio="3/4"
            borderRadius="md"
            overflow="hidden"
          >
            <Image
              src={havanaNightsReception}
              alt="Havana Nights reception with candlelit tables and golden ambiance"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default DressCodeSection
