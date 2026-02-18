import { Box, Container, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import { useState } from 'react'

// Placeholder images with gradient backgrounds
const placeholderImages = [
  { id: 1, color: 'linear(to-br, blue.400, purple.600)', alt: 'Engagement photo 1' },
  { id: 2, color: 'linear(to-br, pink.400, orange.500)', alt: 'Engagement photo 2' },
  { id: 3, color: 'linear(to-br, green.400, teal.600)', alt: 'Engagement photo 3' },
  { id: 4, color: 'linear(to-br, purple.400, pink.600)', alt: 'Engagement photo 4' },
  { id: 5, color: 'linear(to-br, yellow.400, red.500)', alt: 'Engagement photo 5' },
  { id: 6, color: 'linear(to-br, teal.400, blue.600)', alt: 'Engagement photo 6' },
  { id: 7, color: 'linear(to-br, red.400, pink.500)', alt: 'Engagement photo 7' },
  { id: 8, color: 'linear(to-br, indigo.400, purple.600)', alt: 'Engagement photo 8' },
]

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <Box
      width="100%"
      py={{ base: 16, md: 24 }}
      bg="gray.50"
    >
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="300"
              color="gray.800"
            >
              Our Gallery
            </Heading>
            <Box height="1px" width="100px" bg="gray.400" />
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="2xl"
            >
              Moments we've shared together
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 2, md: 3, lg: 4 }}
            gap={4}
            width="100%"
          >
            {placeholderImages.map((image) => (
              <Box
                key={image.id}
                position="relative"
                paddingBottom="100%"
                overflow="hidden"
                borderRadius="lg"
                cursor="pointer"
                transition="all 0.3s"
                _hover={{
                  transform: 'scale(1.05)',
                  shadow: 'xl',
                }}
                onClick={() => setSelectedImage(image.id)}
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient={image.color}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    color="white"
                    fontSize="sm"
                    fontWeight="500"
                    opacity={0.7}
                  >
                    {image.alt}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>

          {selectedImage && (
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.900"
              zIndex={1000}
              display="flex"
              alignItems="center"
              justifyContent="center"
              onClick={() => setSelectedImage(null)}
              cursor="pointer"
            >
              <Box
                width={{ base: '90%', md: '70%', lg: '50%' }}
                height={{ base: '60%', md: '70%' }}
                bgGradient={placeholderImages.find(img => img.id === selectedImage)?.color}
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={(e) => e.stopPropagation()}
              >
                <Text color="white" fontSize="xl" fontWeight="500">
                  {placeholderImages.find(img => img.id === selectedImage)?.alt}
                </Text>
              </Box>
              <Box
                position="absolute"
                top={4}
                right={4}
                color="white"
                fontSize="2xl"
                fontWeight="bold"
                cursor="pointer"
                onClick={() => setSelectedImage(null)}
              >
                ✕
              </Box>
            </Box>
          )}

          <Text
            fontSize="sm"
            color="gray.500"
            textAlign="center"
            fontStyle="italic"
          >
            More photos coming soon! We can't wait to share memories from our special day.
          </Text>
        </VStack>
      </Container>

      {/* Footer */}
      <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }} mt={16}>
        <Box
          py={8}
          borderTopWidth="1px"
          borderColor="gray.300"
          textAlign="center"
        >
          <VStack gap={4}>
            <Text
              fontSize="2xl"
              fontFamily="'Cormorant Garamond', serif"
              color="gray.700"
            >
              Karim & Felicia
            </Text>
            <Text fontSize="sm" color="gray.500">
              November 7, 2026 • Cabo San Lucas, Mexico
            </Text>
            <Text fontSize="xs" color="gray.400" mt={4}>
              © 2026 All rights reserved
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

export default GallerySection
