import { Box, Container, Heading, Text, VStack, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface TimelineItem {
  year: string
  title: string
  description: string
}

const timeline: TimelineItem[] = [
  {
    year: '2020',
    title: 'First Meeting',
    description: 'Our paths crossed at a mutual friend\'s gathering in San Francisco. What started as a casual conversation turned into hours of talking about everything from travel to our dreams.',
  },
  {
    year: '2021',
    title: 'First Date',
    description: 'Karim took Felicia to a hidden rooftop restaurant overlooking the bay. The evening ended with a promise to explore the world together.',
  },
  {
    year: '2023',
    title: 'Moving In',
    description: 'We decided to make our relationship official by moving in together. Our little apartment became our sanctuary, filled with love, laughter, and countless memories.',
  },
  {
    year: '2025',
    title: 'The Proposal',
    description: 'During a sunset walk on the beach in Cabo San Lucas, Karim got down on one knee. Felicia said yes, and we knew this magical place would be where we\'d start our forever.',
  },
  {
    year: '2026',
    title: 'Our Wedding Day',
    description: 'We return to Cabo San Lucas to celebrate our love with family and friends, creating memories that will last a lifetime.',
  },
]

const StorySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 }
    )

    const items = sectionRef.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={sectionRef}
      py={{ base: 16, md: 24 }}
      bg="gray.50"
    >
      <Container maxW="container.lg">
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="300"
              color="gray.800"
            >
              Our Story
            </Heading>
            <Box height="1px" width="100px" bg="gray.400" />
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="2xl"
            >
              Every love story is special, but ours is our favorite
            </Text>
          </VStack>

          <VStack gap={12} width="100%" position="relative">
            {/* Timeline line */}
            <Box
              position="absolute"
              left="50%"
              top={0}
              bottom={0}
              width="2px"
              bg="gray.300"
              transform="translateX(-50%)"
              display={{ base: 'none', md: 'block' }}
            />

            {timeline.map((item, index) => (
              <Box
                key={index}
                className="timeline-item"
                data-index={index}
                width="100%"
                opacity={visibleItems.has(index) ? 1 : 0}
                transform={visibleItems.has(index) ? 'translateY(0)' : 'translateY(50px)'}
                transition="all 0.8s ease-out"
              >
                <HStack
                  gap={8}
                  flexDirection={{
                    base: 'column',
                    md: index % 2 === 0 ? 'row' : 'row-reverse',
                  }}
                  alignItems="center"
                >
                  <VStack
                    flex={1}
                    gap={3}
                    textAlign={{ base: 'center', md: index % 2 === 0 ? 'right' : 'left' }}
                  >
                    <Text
                      fontSize="3xl"
                      fontFamily="'Cormorant Garamond', serif"
                      color="gray.700"
                      fontWeight="500"
                    >
                      {item.year}
                    </Text>
                    <Heading
                      fontSize={{ base: 'xl', md: '2xl' }}
                      fontWeight="400"
                      color="gray.800"
                    >
                      {item.title}
                    </Heading>
                    <Text
                      fontSize={{ base: 'sm', md: 'md' }}
                      color="gray.600"
                      lineHeight="tall"
                    >
                      {item.description}
                    </Text>
                  </VStack>

                  {/* Timeline dot */}
                  <Box
                    width="16px"
                    height="16px"
                    borderRadius="full"
                    bg="gray.700"
                    border="4px solid"
                    borderColor="gray.50"
                    flexShrink={0}
                    zIndex={1}
                    display={{ base: 'none', md: 'block' }}
                  />

                  <Box flex={1} display={{ base: 'none', md: 'block' }} />
                </HStack>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

export default StorySection
