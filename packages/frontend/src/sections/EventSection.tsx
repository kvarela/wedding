import { Box, Container, Heading, Link, Text, VStack, Card } from '@chakra-ui/react'

import viceroyResortMapUrl from '@/assets/viceroy-resort-map.png'
import { weddingColors } from '@/theme/colors'
import { itineraryDateHeadingFontSize } from '@/theme/typography'

interface Event {
  time: string
  title: string
  description: string
  location: string
  date: 'nov6' | 'nov7'
  locationUrl?: string
  locationVenue?: string
  locationVenueUrl?: string
  locationAddress?: string
  locationAddressUrl?: string
  rsvpUrl?: string
}

const events: Event[] = [
  {
    time: '10:00 AM - 3:00 PM',
    title: 'Fishing Trip',
    description:
      'Five hours aboard a 50ft Bertram. Live bait, drinking water, ice, beer, ceviche, chips, guacamole, and fishing licenses are all included. Spots are limited, so RSVP on Partiful.',
    location: 'Dock I @ IGY Marina',
    locationUrl: 'https://maps.app.goo.gl/7s3xcLaUJ5zD2jEd9',
    rsvpUrl: 'https://partiful.com/e/KJPKQFABDV1BUQRrrX0K?c=sqrFVukc',
    date: 'nov6',
  },
  {
    time: '6:00 PM - 8:00 PM',
    title: 'Welcome Party',
    description:
      'Join us for welcome drinks and bites as we kick off the wedding festivities and gather with friends and family.',
    location: 'Agave @ Los Cabos Arts District',
    locationUrl:
      'https://maps.google.com/maps/place//data=!4m2!3m1!1s0x86af509d83942891:0xc76d9425fdb56d61',
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
    location: 'Archaea Speakeasy @ Viceroy Hotel',
    locationUrl: viceroyResortMapUrl,
    date: 'nov7',
  },
]

const eventsByDate = {
  nov6: events.filter((e) => e.date === 'nov6'),
  nov7: events.filter((e) => e.date === 'nov7'),
}

const EventCard = ({ event }: { event: Event }) => {
  return (
    <Card.Root
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={weddingColors.primaryGold}
      bg={weddingColors.charcoal}
      transition="all 0.3s"
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
        {event.rsvpUrl && (
          <Link
            href={event.rsvpUrl}
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
            🎟️ RSVP on Partiful
          </Link>
        )}
      </VStack>
    </Card.Root>
  )
}

const EventSection = () => {
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

    </Box>
  )
}

export default EventSection
