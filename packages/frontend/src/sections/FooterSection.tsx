import { Box, Container, Text, VStack } from '@chakra-ui/react'

import { weddingColors } from '@/theme/colors'

const FooterSection = () => (
  <Box width="100%" py={8} bg={weddingColors.charcoal}>
    <Container maxW="container.xl" marginInline="auto" px={{ base: 4, md: 6 }}>
      <Box
        py={8}
        borderTopWidth="1px"
        borderColor={weddingColors.primaryGold}
        textAlign="center"
      >
        <VStack gap={4}>
          <Text
            fontSize="2xl"
            fontFamily="'Cormorant Garamond', serif"
            color={weddingColors.primaryGold}
          >
            Karim & Felicia
          </Text>
          <Text fontSize="sm" color="gray.300">
            November 7, 2026 • San Jose Del Cabo, Mexico
          </Text>
          <Text fontSize="xs" color="gray.500" mt={4}>
            © 2026 All rights reserved
          </Text>
        </VStack>
      </Box>
    </Container>
  </Box>
)

export default FooterSection
