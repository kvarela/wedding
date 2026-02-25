import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Field } from '@chakra-ui/react'

import { createRsvp } from '@/api/rsvp'

const MIN_GUESTS = 1
const MAX_GUESTS = 3

const RSVPSection = () => {
  const [numGuests, setNumGuests] = useState(1)
  const [guestNames, setGuestNames] = useState<string[]>([''])
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    message: '',
    attending: true,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateGuestCount = (count: number) => {
    const n = Math.min(MAX_GUESTS, Math.max(MIN_GUESTS, count))
    setNumGuests(n)
    setGuestNames((prev) => {
      if (n > prev.length) {
        return [...prev, ...Array(n - prev.length).fill('')]
      }
      return prev.slice(0, n)
    })
  }

  const setGuestName = (index: number, value: string) => {
    setGuestNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const names = guestNames.map((n) => n.trim()).filter(Boolean)
    if (names.length !== numGuests) {
      setError(`Please enter a name for all ${numGuests} guest${numGuests > 1 ? 's' : ''}.`)
      setLoading(false)
      return
    }
    try {
      await createRsvp({
        email: formData.email.trim(),
        phone: '',
        guestNames: names,
        address: formData.address.trim(),
        message: formData.message.trim() || undefined,
        attendance: formData.attending ? 'YES' : 'NO',
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setNumGuests(1)
        setGuestNames([''])
        setFormData({
          email: '',
          address: '',
          message: '',
          attending: true,
        })
      }, 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      id="rsvp"
      width="100%"
      py={{ base: 16, md: 24 }}
      bg="gray.50"
    >
      <Container maxW="container.md" marginInline="auto" px={{ base: 4, md: 6 }}>
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
                    Number of Guests *
                  </Field.Label>
                  <Input
                    type="number"
                    min={MIN_GUESTS}
                    max={MAX_GUESTS}
                    value={numGuests}
                    onChange={(e) => updateGuestCount(parseInt(e.target.value, 10) || 1)}
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

                <VStack gap={4} width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="gray.700"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Names of Everyone Attending *
                  </Field.Label>
                  {guestNames.map((name, index) => (
                    <Field.Root key={index} width="100%">
                      <Field.Label
                        fontSize="xs"
                        fontWeight="500"
                        color="gray.600"
                        textTransform="uppercase"
                        letterSpacing="wide"
                      >
                        Guest {index + 1} {index === 0 ? '(you)' : ''}
                      </Field.Label>
                      <Input
                        value={name}
                        onChange={(e) => setGuestName(index, e.target.value)}
                        required
                        placeholder="Full name"
                        size="lg"
                        borderColor="gray.300"
                        _focus={{
                          borderColor: 'gray.600',
                          shadow: 'sm',
                        }}
                      />
                    </Field.Root>
                  ))}
                </VStack>

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
                    Mailing Address *
                  </Field.Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    placeholder="Where should we send your physical invitation?"
                    rows={3}
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

                {error && (
                  <Box
                    width="100%"
                    p={3}
                    borderRadius="md"
                    bg="red.50"
                    borderWidth="1px"
                    borderColor="red.200"
                  >
                    <Text color="red.700" fontSize="sm">
                      {error}
                    </Text>
                  </Box>
                )}

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
                  loading={loading}
                  disabled={loading}
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
