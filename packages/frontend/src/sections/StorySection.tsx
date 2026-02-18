import { Box, Container, Heading, Text, VStack, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

interface TimelineItem {
  year: string
  title: string
  description: string
}

const TIMELINE: TimelineItem[] = [
  {
    year: 'February, 2020',
    title: 'First Tequila Shot',
    description:
      'The spark started Lanea in Santa Monica at Superbowl party. We shared shots of Nosotros Tequila and wondered if it would be crazy for us to date',
  },
  {
    year: 'July, 2020',
    title: 'First Date',
    description:
      "There were no restaurants open, so Karim invited Felicia over for a salmon dinner with unicorns and etched a spot in Felicia's heart",
  },
  {
    year: 'April, 2022',
    title: 'Moving In',
    description: 'We decided to make a home together in Venice.',
  },
  {
    year: 'March, 2023',
    title: 'Luna Bean',
    description: 'And then a miracle happened and Luna came to be.',
  },
  {
    year: 'April, 2025',
    title: 'The Proposal',
    description:
      "During a sunset cruise to the arches of Cabo San Lucas, Karim got down on one knee. Felicia said yes, and we knew this magical place would be where we'd start our forever.",
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
      { threshold: 0.3 },
    )

    const items = sectionRef.current?.querySelectorAll('.timeline-item')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <Box ref={sectionRef} width="100%" py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="container.lg" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color="gray.800">
              Our Story
            </Heading>
            <Box height="1px" width="100px" bg="gray.400" />
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="2xl">
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

            {TIMELINE.map((item, index) => (
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
                    <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="400" color="gray.800">
                      {item.title}
                    </Heading>
                    <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.600" lineHeight="tall">
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
