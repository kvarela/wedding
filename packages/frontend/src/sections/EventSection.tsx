import { Box, Container, Heading, Text, VStack, Card } from '@chakra-ui/react'

import { weddingColors } from '@/theme/colors'

interface Event {
  time: string
  title: string
  description: string
  location: string
  date: 'nov6' | 'nov7'
}

const events: Event[] = [
  {
    time: '5:00 PM',
    title: 'Welcome Reception',
    description: 'Join us for refreshments and mingling as our guests arrive.',
    location: 'Kiddie Pool @ Viceroy Hotel',
    date: 'nov6',
  },
  {
    time: '5:30 PM',
    title: 'Ceremony',
    description: 'We exchange our vows overlooking the beautiful Pacific Ocean.',
    location: 'Kiddie Pool @ Viceroy Hotel',
    date: 'nov7',
  },
  {
    time: '6:00 PM',
    title: 'Cocktail Hour',
    description:
      "Celebrate with signature cocktails, cigars, and hors d'oeuvres while the DJ warms up.",
    location: 'Cielomar Rooftop @ Viceroy Hotel',
    date: 'nov7',
  },
  {
    time: '7:00 PM',
    title: 'Reception & Dinner',
    description:
      'Celebrate with us with dinner, dancing, and memorable toasts. If you want to make a speech, this is your chance!',
    location: 'Cielomar Rooftop @ Viceroy Hotel',
    date: 'nov7',
  },
  {
    time: '10:00 PM',
    title: 'After Party',
    description: 'Continue the celebration, if you dare.',
    location: 'Awacate Bar @ Viceroy Hotel',
    date: 'nov7',
  },
]

const eventsByDate = {
  nov6: events.filter((e) => e.date === 'nov6'),
  nov7: events.filter((e) => e.date === 'nov7'),
}

const EventSection = () => {
  return (
    <Box id="itinerary" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal} position="relative">
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color={weddingColors.primaryGold}>
              Schedule
            </Heading>
            <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.200" maxW="2xl">
              November 6th & 7th, 2026
            </Text>
          </VStack>

          <VStack gap={12} width="100%" align="stretch">
            <VStack gap={6} width="100%" align="stretch">
              <Heading
                as="h2"
                size="lg"
                fontWeight="400"
                color={weddingColors.primaryGold}
                textAlign="center"
              >
                Thursday, November 6th, 2026
              </Heading>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov6.map((event, index) => (
                  <Card.Root
                    key={index}
                    p={6}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={weddingColors.primaryGold}
                    bg={weddingColors.charcoal}
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-8px)',
                      shadow: 'xl',
                      borderColor: weddingColors.primaryGold,
                    }}
                  >
                    <VStack gap={4} align="start" height="100%">
                      <Text
                        fontSize="2xl"
                        fontFamily="'Cormorant Garamond', serif"
                        color={weddingColors.primaryGold}
                        fontWeight="500"
                      >
                        {event.time}
                      </Text>

                      <VStack gap={2} align="start" flex={1}>
                        <Heading fontSize="xl" fontWeight="500" color="white">
                          {event.title}
                        </Heading>

                        <Text fontSize="sm" color="gray.200" lineHeight="tall">
                          {event.description}
                        </Text>
                      </VStack>

                      <Text fontSize="sm" color={weddingColors.primaryGold} fontStyle="italic">
                        📍 {event.location}
                      </Text>
                    </VStack>
                  </Card.Root>
                ))}
              </VStack>
            </VStack>

            <VStack gap={6} width="100%" align="stretch">
              <Heading
                as="h2"
                size="lg"
                fontWeight="400"
                color={weddingColors.primaryGold}
                textAlign="center"
              >
                Friday, November 7th, 2026
              </Heading>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov7.map((event, index) => (
                  <Card.Root
                    key={index}
                    p={6}
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor={weddingColors.primaryGold}
                    bg={weddingColors.charcoal}
                    transition="all 0.3s"
                    _hover={{
                      transform: 'translateY(-8px)',
                      shadow: 'xl',
                      borderColor: weddingColors.primaryGold,
                    }}
                  >
                    <VStack gap={4} align="start" height="100%">
                      <Text
                        fontSize="2xl"
                        fontFamily="'Cormorant Garamond', serif"
                        color={weddingColors.primaryGold}
                        fontWeight="500"
                      >
                        {event.time}
                      </Text>

                      <VStack gap={2} align="start" flex={1}>
                        <Heading fontSize="xl" fontWeight="500" color="white">
                          {event.title}
                        </Heading>

                        <Text fontSize="sm" color="gray.200" lineHeight="tall">
                          {event.description}
                        </Text>
                      </VStack>

                      <Text fontSize="sm" color={weddingColors.primaryGold} fontStyle="italic">
                        📍 {event.location}
                      </Text>
                    </VStack>
                  </Card.Root>
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default EventSection
