import { Box, Container, Heading, Text, VStack, HStack } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { weddingColors } from '@/theme/colors'

interface TimelineItem {
  year: string
  title: string
  description: string
}

const TIMELINE: TimelineItem[] = [
  {
    year: 'February 2020',
    title: 'First Encounter',
    description:
      'It all started at the Lanea Superbowl Party in Santa Monica, where we shared political views, tequila shots, and a spark that lingered longer than expected',
  },
  {
    year: 'July 2020',
    title: 'First Date',
    description:
      'At the start of lockdown, Karim invited Felicia over for dinner — and imaginitively turned unicorns and rainbows into a very convincing first overture',
  },
  {
    year: 'April 2022',
    title: 'First Big Step',
    description: 'We decided to make a home together in Venice — and never looked back',
  },
  {
    year: 'March 2023',
    title: 'Enter Luna Bean',
    description:
      "Then the greatest chapter of our love story began — baby Luna was born — the best thing we've ever done",
  },
  {
    year: 'April 2025',
    title: 'The Proposal',
    description:
      "At sunset beneath the arches in Cabo, Karim got down on one knee. Felicia said yes — and we knew we'd found the place where our forever would begin",
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
    <Box ref={sectionRef} id="story" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal}>
      <Container maxW="container.lg" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color={weddingColors.primaryGold}>
              Our Story
            </Heading>
            <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
            <Text
              fontSize={{ base: '1.3rem', md: '1.4625rem' }}
              lineHeight={1.4}
              color="gray.200"
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
              bg={weddingColors.primaryGold}
              opacity={0.4}
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
                    gap={2}
                    textAlign={{ base: 'center', md: index % 2 === 0 ? 'right' : 'left' }}
                  >
                    <Text
                      fontSize="3xl"
                      fontFamily="'Cormorant Garamond', serif"
                      color={weddingColors.primaryGold}
                      fontWeight="500"
                    >
                      {item.year}
                    </Text>
                    <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="400" color="white">
                      {item.title}
                    </Heading>
                    <Text
                      fontSize={{ base: '1.3125rem', md: '1.5rem' }}
                      lineHeight={1.4}
                      color="gray.200"
                    >
                      {item.description}
                    </Text>
                  </VStack>

                  {/* Timeline dot */}
                  <Box
                    width="16px"
                    height="16px"
                    borderRadius="full"
                    bg={weddingColors.primaryGold}
                    border="4px solid"
                    borderColor={weddingColors.charcoal}
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
