import { Box, Container, Heading, Text, VStack, Input, Button, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { Field } from '@chakra-ui/react'

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    message: '',
    attending: true,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // TODO: Integrate with backend API
    console.log('RSVP Submission:', formData)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        guests: '',
        message: '',
        attending: true,
      })
    }, 3000)
  }

  return (
    <Box
      id="rsvp"
      py={{ base: 16, md: 24 }}
      bg="gray.50"
    >
      <Container maxW="container.md">
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading
              fontSize={{ base: '3xl', md: '5xl' }}
              fontWeight="300"
              color="gray.800"
            >
              RSVP
            </Heading>
            <Box height="1px" width="100px" bg="gray.400" />
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="2xl"
            >
              Please let us know if you can join us
            </Text>
          </VStack>

          {submitted ? (
            <Box
              p={8}
              bg="green.50"
              borderRadius="lg"
              borderWidth="2px"
              borderColor="green.200"
              textAlign="center"
            >
              <Heading fontSize="2xl" color="green.700" mb={2}>
                Thank You!
              </Heading>
              <Text color="green.600">
                We've received your RSVP and can't wait to celebrate with you!
              </Text>
            </Box>
          ) : (
            <Box
              as="form"
              onSubmit={handleSubmit}
              width="100%"
              p={8}
              bg="white"
              borderRadius="lg"
              shadow="md"
            >
              <VStack gap={6}>
                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Full Name *
                  </Field.Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                    size="lg"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: 'gray.600',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Email Address *
                  </Field.Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="your.email@example.com"
                    size="lg"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: 'gray.600',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Number of Guests *
                  </Field.Label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    required
                    placeholder="Including yourself"
                    size="lg"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: 'gray.600',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Message (Optional)
                  </Field.Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any dietary restrictions or special requests?"
                    rows={4}
                    size="lg"
                    borderColor="gray.300"
                    _focus={{
                      borderColor: 'gray.600',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Button
                  type="submit"
                  width="100%"
                  size="lg"
                  bg="gray.800"
                  color="white"
                  fontSize="sm"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  py={6}
                  _hover={{
                    bg: 'gray.700',
                  }}
                  transition="all 0.3s"
                >
                  Submit RSVP
                </Button>
              </VStack>
            </Box>
          )}

          <Text
            fontSize="sm"
            color="gray.500"
            textAlign="center"
            maxW="lg"
          >
            Please RSVP by September 1st, 2026. If you have any questions, feel free to reach out to us directly.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default RSVPSection
