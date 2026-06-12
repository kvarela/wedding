import { useState } from 'react'
import { Box, Container, Heading, Link, Text, VStack, Card, Dialog } from '@chakra-ui/react'

import viceroyResortMapUrl from '@/assets/viceroy-resort-map.png'
import { weddingColors } from '@/theme/colors'
import { itineraryDateHeadingFontSize } from '@/theme/typography'

interface Event {
  time: string
  title: string
  description: string
  location: string
  date: 'nov5' | 'nov6' | 'nov7'
  modalContent?: string
  locationUrl?: string
  locationVenue?: string
  locationVenueUrl?: string
  locationAddress?: string
  locationAddressUrl?: string
}

const events: Event[] = [
  {
    time: 'TBD',
    title: 'Fishing Trip',
    description: 'Details coming soon.',
    location: 'The waters off the coast of Cabo San Lucas',
    date: 'nov6',
  },
  {
    time: 'TBD',
    title: 'Yoga & Tequila Tasting',
    description: 'Details coming soon.',
    location: 'TBD',
    date: 'nov5',
  },
  {
    time: '6:00 PM',
    title: 'Welcome Party',
    description:
      'Join us for welcome drinks and bites as we kick off the wedding festivities and gather with friends and family.',
    location: 'Cabo Arts District',
    date: 'nov6',
  },
  {
    time: '6:00 PM',
    title: 'Ceremony',
    description: 'We exchange our vows overlooking the beautiful Pacific Ocean.',
    location: 'Family Pool @ Viceroy Hotel',
    locationUrl: viceroyResortMapUrl,
    date: 'nov7',
  },
  {
    time: '6:30 PM',
    title: 'Cocktail Hour',
    description:
      "Celebrate with signature cocktails, cigars, and hors d'oeuvres while the DJ warms up.",
    location: 'Cielomar Rooftop @ Viceroy Hotel',
    locationUrl: viceroyResortMapUrl,
    date: 'nov7',
  },
  {
    time: '8:00 PM',
    title: 'Reception & Dinner',
    description:
      'Celebrate with us with dinner, dancing, and memorable toasts. If you want to make a speech, this is your chance!',
    location: 'Cielomar Rooftop @ Viceroy Hotel',
    locationUrl: viceroyResortMapUrl,
    date: 'nov7',
  },
  {
    time: '11:00 PM',
    title: 'After Party',
    description: 'Continue the celebration, if you dare.',
    location: 'Awacate Bar @ Viceroy Hotel',
    locationUrl: viceroyResortMapUrl,
    date: 'nov7',
  },
]

const eventsByDate = {
  nov5: events.filter((e) => e.date === 'nov5'),
  nov6: events.filter((e) => e.date === 'nov6'),
  nov7: events.filter((e) => e.date === 'nov7'),
}

const EventCard = ({ event, onClick }: { event: Event; onClick?: () => void }) => {
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
      _hover={
        isClickable
          ? {
              transform: 'translateY(-8px)',
              shadow: 'xl',
              borderColor: weddingColors.primaryGold,
            }
          : undefined
      }
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
        <VStack gap={1} align="start" flex={1}>
          <Heading fontSize="xl" fontWeight="500" color="white">
            {event.title}
          </Heading>
          <Text fontSize="1.3125rem" lineHeight={1.4} color="gray.200">
            {event.description}
          </Text>
        </VStack>
        {event.locationVenue != null && event.locationAddress != null ? (
          <VStack gap={1} align="start">
            {event.locationVenueUrl ? (
              <Link
                href={event.locationVenueUrl}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                color={weddingColors.primaryGold}
                fontStyle="italic"
                textDecoration="underline"
                textUnderlineOffset="2px"
                _hover={{
                  fontWeight: 'bold',
                  textShadow: `0 0 12px ${weddingColors.primaryGold}, 0 0 20px ${weddingColors.primaryGold}`,
                }}
              >
                📍 {event.locationVenue}
              </Link>
            ) : (
              <Text fontSize="sm" color={weddingColors.primaryGold} fontStyle="italic">
                📍 {event.locationVenue}
              </Text>
            )}
            {event.locationAddressUrl ? (
              <Link
                href={event.locationAddressUrl}
                target="_blank"
                rel="noopener noreferrer"
                fontSize="sm"
                color={weddingColors.primaryGold}
                fontStyle="italic"
                textDecoration="underline"
                textUnderlineOffset="2px"
                _hover={{
                  fontWeight: 'bold',
                  textShadow: `0 0 12px ${weddingColors.primaryGold}, 0 0 20px ${weddingColors.primaryGold}`,
                }}
              >
                {event.locationAddress}
              </Link>
            ) : (
              <Text fontSize="sm" color={weddingColors.primaryGold} fontStyle="italic">
                {event.locationAddress}
              </Text>
            )}
          </VStack>
        ) : event.locationUrl ? (
          <Link
            href={event.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            fontSize="sm"
            color={weddingColors.primaryGold}
            fontStyle="italic"
            textDecoration="underline"
            textUnderlineOffset="2px"
            _hover={{
              fontWeight: 'bold',
              textShadow: `0 0 12px ${weddingColors.primaryGold}, 0 0 20px ${weddingColors.primaryGold}`,
            }}
          >
            📍 {event.location}
          </Link>
        ) : (
          <Text fontSize="sm" color={weddingColors.primaryGold} fontStyle="italic">
            📍 {event.location}
          </Text>
        )}
      </VStack>
    </Card.Root>
  )
}

const EventSection = () => {
  const [openModalEvent, setOpenModalEvent] = useState<Event | null>(null)

  return (
    <Box
      id="itinerary"
      width="100%"
      py={{ base: 16, md: 24 }}
      bg={weddingColors.charcoal}
      position="relative"
    >
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="300"
              color={weddingColors.primaryGold}
            >
              Itinerary
            </Heading>
            <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
          </VStack>

          <VStack gap={12} width="100%" align="stretch">
            <VStack gap={6} width="100%" align="stretch">
              <Text
                as="h2"
                fontFamily="'Cormorant Garamond', serif"
                fontWeight="400"
                color={weddingColors.primaryGold}
                textAlign="center"
                fontSize={itineraryDateHeadingFontSize}
              >
                Thursday, November 5th
              </Text>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov5.map((event, index) => (
                  <EventCard key={index} event={event} onClick={() => setOpenModalEvent(event)} />
                ))}
              </VStack>
            </VStack>

            <VStack gap={6} width="100%" align="stretch">
              <Text
                as="h2"
                fontFamily="'Cormorant Garamond', serif"
                fontWeight="400"
                color={weddingColors.primaryGold}
                textAlign="center"
                fontSize={itineraryDateHeadingFontSize}
              >
                Friday, November 6th
              </Text>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov6.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </VStack>
            </VStack>

            <VStack gap={6} width="100%" align="stretch">
              <Text
                as="h2"
                fontFamily="'Cormorant Garamond', serif"
                fontWeight="400"
                color={weddingColors.primaryGold}
                textAlign="center"
                fontSize={itineraryDateHeadingFontSize}
              >
                Saturday, November 7th
              </Text>
              <VStack gap={4} width="100%" align="stretch">
                {eventsByDate.nov7.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Container>

      {eventsByDate.nov5
        .filter((e) => e.modalContent)
        .map((event, index) => (
          <Dialog.Root
            key={index}
            open={openModalEvent?.title === event.title}
            onOpenChange={(details) => {
              if (!details.open) setOpenModalEvent(null)
            }}
          >
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content
                bg={weddingColors.charcoal}
                borderColor={weddingColors.primaryGold}
                borderWidth="1px"
              >
                <Dialog.Header>
                  <Dialog.Title color={weddingColors.primaryGold}>{event.title}</Dialog.Title>
                  <Dialog.CloseTrigger />
                </Dialog.Header>
                <Dialog.Body>
                  <Text fontSize="1.3125rem" lineHeight={1.4} color="gray.200">
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
