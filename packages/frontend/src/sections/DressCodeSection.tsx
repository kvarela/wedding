import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react'

import { weddingColors } from '@/theme/colors'

const DressCodeSection = () => {
  return (
    <Box id="dress-code" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal}>
      <Container maxW="container.md" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={4} textAlign="center">
          <Heading
            as="h2"
            fontSize={{ base: '3xl', md: '5xl' }}
            fontWeight="300"
            color={weddingColors.primaryGold}
          >
            Dress Code
          </Heading>
          <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
          <Text
            fontSize={{ base: 'xs', md: 'sm' }}
            color="gray.200"
            maxW="xl"
            marginInline="auto"
          >
            In the spirit of Cuban Jazz Glamour, we invite you to wear Black and/or Gold
          </Text>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 4, md: 6 }}
            width="100%"
            maxW="4xl"
            marginInline="auto"
            mt={8}
          >
            {[1, 2, 3].map((i) => (
              <Box
                key={i}
                aspectRatio="3/4"
                bg="gray.700"
                borderRadius="md"
                borderWidth="1px"
                borderColor="gray.600"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="sm" color="gray.500">
                  Image {i}
                </Text>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}

export default DressCodeSection
