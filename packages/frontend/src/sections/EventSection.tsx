import { Box, Container, Heading, Text, VStack, SimpleGrid, Card } from '@chakra-ui/react'

interface Event {
  time: string
  title: string
  description: string
  location: string
}

const events: Event[] = [
  {
    time: '4:00 PM',
    title: 'Welcome Reception',
    description: 'Join us for refreshments and mingling as our guests arrive.',
    location: 'Kiddie Pool @ Viceroy Hotel',
  },
  {
    time: '5:30 PM',
    title: 'Ceremony',
    description: 'We exchange our vows overlooking the beautiful Pacific Ocean.',
    location: 'Kiddie Pool @ Viceroy Hotel',
  },
  {
    time: '6:00 PM',
    title: 'Cocktail Hour',
    description:
      "Celebrate with signature cocktails, cigars, and hors d'oeuvres while the DJ warms up.",
    location: 'Cielomar Rooftop @ Viceroy Hotel',
  },
  {
    time: '7:00 PM',
    title: 'Reception & Dinner',
    description:
      'Celebrate with us with dinner, dancing, and memorable toasts. If you want to make a speech, this is your chance!',
    location: 'Cielomar Rooftop @ Viceroy Hotel',
  },
  {
    time: '10:00 PM',
    title: 'After Party',
    description: 'Continue the celebration, if you dare.',
    location: 'Awacate Bar @ Viceroy Hotel',
  },
]

const EventSection = () => {
  return (
    <Box width="100%" py={{ base: 16, md: 24 }} bg="white" position="relative">
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color="gray.800">
              Schedule
            </Heading>
            <Box height="1px" width="100px" bg="gray.400" />
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="2xl">
              Friday, November 7th, 2026
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} width="100%">
            {events.map((event, index) => (
              <Card.Root
                key={index}
                p={6}
                borderRadius="lg"
                borderWidth="1px"
                borderColor="gray.200"
                bg="white"
                transition="all 0.3s"
                _hover={{
                  transform: 'translateY(-8px)',
                  shadow: 'xl',
                  borderColor: 'gray.400',
                }}
              >
                <VStack gap={4} align="start" height="100%">
                  <Text
                    fontSize="2xl"
                    fontFamily="'Cormorant Garamond', serif"
                    color="gray.700"
                    fontWeight="500"
                  >
                    {event.time}
                  </Text>

                  <VStack gap={2} align="start" flex={1}>
                    <Heading fontSize="xl" fontWeight="500" color="gray.800">
                      {event.title}
                    </Heading>

                    <Text fontSize="sm" color="gray.600" lineHeight="tall">
                      {event.description}
                    </Text>
                  </VStack>

                  <Text fontSize="sm" color="gray.500" fontStyle="italic">
                    📍 {event.location}
                  </Text>
                </VStack>
              </Card.Root>
            ))}
          </SimpleGrid>

          <VStack gap={4} mt={8} textAlign="center">
            <Text fontSize="md" color="gray.700" fontWeight="500">
              Dress Code
            </Text>
            <Text fontSize="lg" fontFamily="'Cormorant Garamond', serif" color="gray.600">
              Formal Beach Attire
            </Text>
            <Text fontSize="sm" color="gray.500" maxW="xl">
              Think elegant and comfortable. Light fabrics, flowing dresses, and light-colored suits
              are perfect for our beach celebration.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default EventSection
