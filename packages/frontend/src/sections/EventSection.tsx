import { useState } from 'react'
import { Box, Container, Heading, Text, VStack, Card, Dialog } from '@chakra-ui/react'

import { weddingColors } from '@/theme/colors'

interface Event {
  time: string
  title: string
  description: string
  location: string
  date: 'nov5' | 'nov6' | 'nov7'
  modalContent?: string
}

const events: Event[] = [
  {
    time: 'TBD',
    title: 'Fishing Trip',
    description: 'Click for details.',
    location: 'TBD',
    date: 'nov5',
    modalContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
  {
    time: 'TBD',
    title: 'Yoga & Tequila Tasting',
    description: 'Click for details.',
    location: 'TBD',
    date: 'nov5',
    modalContent:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.',
  },
  {
    time: '5:00 PM',
    title: 'Welcome Party',
    description: 'Join us for refreshments and mingling as our guests arrive.',
    location: 'TBD',
    date: 'nov6',
  },
  {
    time: '5:30 PM',
    title: 'Ceremony',
    description: 'We exchange our vows overlooking the beautiful Pacific Ocean.',
    location: 'Family Pool @ Viceroy Hotel',
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
  nov5: events.filter((e) => e.date === 'nov5'),
  nov6: events.filter((e) => e.date === 'nov6'),
  nov7: events.filter((e) => e.date === 'nov7'),
}

const EventCard = ({
  event,
  onClick,
}: {
  event: Event
  onClick?: () => void
}) => {
  const isClickable = !!event.modalContent
  return (
    <Card.Root
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={weddingColors.primaryGold}
      bg={weddingColors.charcoal}
      transition="all 0.3s"
      cursor={isClickable ? 'pointer' : 'default'}
      onClick={isClickable ? onClick : undefined}
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
  )
}

const EventSection = () => {
  const [openModalEvent, setOpenModalEvent] = useState<Event | null>(null)

  return (
    <Box id="itinerary" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal} position="relative">
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color={weddingColors.primaryGold}>
              Itinerary
            </Heading>
            <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
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
                Thursday, November 5th, 2026
              </Heading>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov5.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    onClick={() => setOpenModalEvent(event)}
                  />
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
                Friday, November 6th, 2026
              </Heading>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov6.map((event, index) => (
                  <EventCard key={index} event={event} />
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
                Saturday, November 7th, 2026
              </Heading>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov7.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Container>

      {eventsByDate.nov5.map((event, index) => (
        <Dialog.Root
          key={index}
          open={openModalEvent?.title === event.title}
          onOpenChange={(details) => {
            if (!details.open) setOpenModalEvent(null)
          }}
        >
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content bg={weddingColors.charcoal} borderColor={weddingColors.primaryGold} borderWidth="1px">
              <Dialog.Header>
                <Dialog.Title color={weddingColors.primaryGold}>{event.title}</Dialog.Title>
                <Dialog.CloseTrigger />
              </Dialog.Header>
              <Dialog.Body>
                <Text color="gray.200" lineHeight="tall">
                  {event.modalContent}
                </Text>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      ))}
    </Box>
  )
}

export default EventSection
