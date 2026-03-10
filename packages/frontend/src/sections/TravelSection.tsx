import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, Link } from '@chakra-ui/react'

import { weddingColors } from '@/theme/colors'

interface TravelInfo {
  icon: string
  title: string
  description: string
  link?: string
}

const TRAVEL_DETAILS: TravelInfo[] = [
  {
    icon: '✈️',
    title: 'Getting There',
    description:
      'Fly into Los Cabos International Airport (SJD). The airport is approximately 30 minutes from the Viceroy Hotel.',
  },
  {
    icon: '🏨',
    title: 'Accommodations',
    description:
      'We have reserved a room block at the Viceroy Hotel with special rates. Use code "2612FEKAWD" when booking.',
    link: `https://www.viceroyhotelsandresorts.com/los-cabos#/booking/step-2?data=('hBhd!'cabo-viceroy'~ae765dt785fBfr!'adultG2'H,('fr!'childG0'3rBat!2~cn!0~cg.9alCpo*co*gp!'2612FEKAWD'~rn.3ry*rk*re.9rr*ss.3ax!0~cy*ds!('pIls*as*st*hIee4)~myCsIcIne4)*4~.!%5B3H94!null5%2F2026'~7!'11%2F09%5D~Bs.('C!false~G'~os.'H%5D)Ie*%01IHGCB97543.*_`,
  },
  {
    icon: '🚗',
    title: 'Transportation',
    description:
      'Complimentary shuttle service will be provided from the airport to the hotel for our guests. Details will be shared closer to the date.',
  },
  {
    icon: '🌴',
    title: 'Weather',
    description:
      'November in Cabo offers perfect weather - expect temperatures between 75-85°F with sunny skies and cool evenings.',
  },
  {
    icon: '📋',
    title: 'What to Pack',
    description:
      "Sunscreen, comfortable beach attire, formal evening wear, and your dancing shoes! Don't forget your passport.",
  },
  {
    icon: '🗺️',
    title: 'Things to Do',
    description:
      'Cabo offers amazing activities - snorkeling, whale watching, zip-lining, and world-class dining. Arrive a few days early to explore!',
  },
]

const TravelSection = () => {
  return (
    <Box id="travel" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal}>
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color={weddingColors.primaryGold}>
              Travel & Stay
            </Heading>
            <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.200" maxW="2xl">
              Everything you need to know for your trip to San Jose Del Cabo
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} width="100%">
            {TRAVEL_DETAILS.map((detail, index) => (
              <Card.Root
                key={index}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={weddingColors.primaryGold}
                bg={weddingColors.charcoal}
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-4px)',
                  shadow: 'lg',
                  borderColor: weddingColors.primaryGold,
                }}
              >
                <VStack gap={4} align="start">
                  <Text fontSize="4xl">{detail.icon}</Text>

                  <Heading fontSize="xl" fontWeight="500" color={weddingColors.primaryGold}>
                    {detail.title}
                  </Heading>

                  <Text fontSize="sm" color="gray.200" lineHeight="tall">
                    {detail.description}
                  </Text>

                  {detail.link && (
                    <Link
                      href={detail.link}
                      color={weddingColors.primaryGold}
                      fontSize="sm"
                      fontWeight="500"
                      textDecoration="underline"
                      _hover={{
                        color: weddingColors.champagneGold,
                      }}
                      target="_blank"
                    >
                      Book Now →
                    </Link>
                  )}
                </VStack>
              </Card.Root>
            ))}
          </SimpleGrid>

          <Box
            mt={8}
            p={8}
            bg={weddingColors.charcoal}
            borderRadius="lg"
            width="100%"
            textAlign="center"
            borderWidth="1px"
            borderColor={weddingColors.primaryGold}
          >
            <VStack gap={4}>
              <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="400" color={weddingColors.primaryGold}>
                Viceroy Hotel, San Jose Del Cabo
              </Heading>
              <Text fontSize="md" color="gray.200">
                Camino Viejo a San Jose Km 2, San Jose Del Cabo, 23450, Mexico
              </Text>
              <Link
                href="https://maps.google.com/?q=Viceroy+Hotel+San+Jose+Del+Cabo"
                color={weddingColors.primaryGold}
                fontSize="sm"
                fontWeight="500"
                textDecoration="underline"
                mt={2}
                _hover={{
                  color: weddingColors.champagneGold,
                }}
                target="_blank"
              >
                View on Google Maps →
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default TravelSection
