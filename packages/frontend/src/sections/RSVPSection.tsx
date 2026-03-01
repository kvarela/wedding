import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Input,
  NativeSelect,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Field } from '@chakra-ui/react'

import { createRsvp, getStoredRsvp, storeRsvp, updateRsvp } from '@/api/rsvp'
import { toaster } from '@/components/ui/toaster'
import type { RsvpResponse } from '@/api/rsvp'

const MIN_GUESTS = 1
const MAX_GUESTS_PARTY = 4
const INPUT_PADDING_LEFT = 2
const TOAST_DURATION_MS = 10_000

const RSVPSection = () => {
  const [guestCountInput, setGuestCountInput] = useState('1')
  const [guestNames, setGuestNames] = useState<string[]>([''])
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    address: '',
    message: '',
    attending: true,
  })
  const [storedRsvp, setStoredRsvp] = useState<RsvpResponse | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const rsvp = getStoredRsvp()
    if (rsvp) setStoredRsvp(rsvp)
  }, [])

  const numGuests = (() => {
    const parsed = parseInt(guestCountInput, 10)
    if (Number.isNaN(parsed) || guestCountInput === '') return 1
    return Math.min(MAX_GUESTS_PARTY, Math.max(MIN_GUESTS, parsed))
  })()

  const showForm = !storedRsvp || editing

  const populateFormFromRsvp = (rsvp: RsvpResponse) => {
    setGuestCountInput(String(rsvp.numGuests))
    setGuestNames(rsvp.guestNames.length ? rsvp.guestNames : [''])
    setFormData({
      email: rsvp.email,
      phone: rsvp.phone ?? '',
      address: rsvp.address,
      message: rsvp.message ?? '',
      attending: rsvp.attendance === 'YES',
    })
  }

  const handleGuestCountChange = (value: string) => {
    setGuestCountInput(value)
    const parsed = parseInt(value, 10)
    const n =
      Number.isNaN(parsed) || value === ''
        ? 1
        : Math.min(MAX_GUESTS_PARTY, Math.max(MIN_GUESTS, parsed))
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
    const payload = {
      name: names[0],
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      guestNames: names,
      address: formData.address.trim(),
      message: formData.message.trim() || undefined,
      attendance: formData.attending ? ('YES' as const) : ('NO' as const),
    }
    try {
      let response: RsvpResponse
      if (storedRsvp && editing) {
        response = await updateRsvp(storedRsvp.id, payload)
      } else {
        response = await createRsvp(payload)
      }
      storeRsvp(response)
      setStoredRsvp(response)
      setEditing(false)
      toaster.create({
        title: 'Thank you!',
        description: "We've received your RSVP and can't wait to celebrate with you!",
        type: 'success',
        duration: TOAST_DURATION_MS,
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateClick = () => {
    if (storedRsvp) {
      populateFormFromRsvp(storedRsvp)
      setEditing(true)
    }
  }

  const renderRsvpInfo = (rsvp: RsvpResponse) => (
    <Box
      width="100%"
      p={8}
      bg="white"
      borderRadius="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <VStack gap={6} align="stretch">
        <Box textAlign="center" pb={4} borderBottomWidth="1px" borderColor="gray.100">
          <Heading fontSize="xl" fontWeight="600" color="green.700" mb={2}>
            Thank You!
          </Heading>
          <Text color="gray.600" fontSize="sm">
            We've received your reservation. Here's what you submitted:
          </Text>
        </Box>
        <Grid
          templateColumns={{ base: '1fr', md: '140px 1fr' }}
          gap={{ base: 1, md: 3 }}
          fontSize="sm"
        >
          <Text fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wide">
            Guests
          </Text>
          <Text color="gray.800">{rsvp.guestNames.join(', ')}</Text>

          <Text fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wide">
            Email
          </Text>
          <Text color="gray.800">{rsvp.email}</Text>

          {rsvp.phone && (
            <>
              <Text
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Phone
              </Text>
              <Text color="gray.800">{rsvp.phone}</Text>
            </>
          )}

          <Text fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wide">
            Address
          </Text>
          <Text color="gray.800" whiteSpace="pre-wrap">
            {rsvp.address}
          </Text>

          <Text fontWeight="600" color="gray.500" textTransform="uppercase" letterSpacing="wide">
            Attendance
          </Text>
          <Text color="gray.800">{rsvp.attendance === 'YES' ? 'Attending' : 'Not attending'}</Text>

          {rsvp.message && (
            <>
              <Text
                fontWeight="600"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Message
              </Text>
              <Text color="gray.800" whiteSpace="pre-wrap">
                {rsvp.message}
              </Text>
            </>
          )}
        </Grid>
        <Button
          variant="outline"
          size="lg"
          onClick={handleUpdateClick}
          borderColor="gray.400"
          color="gray.700"
          _hover={{ bg: 'gray.50', borderColor: 'gray.500' }}
        >
          Update Reservation
        </Button>
      </VStack>
    </Box>
  )

  return (
    <Box id="rsvp" width="100%" py={{ base: 16, md: 24 }} bg="gray.50">
      <Container maxW="container.md" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color="gray.800">
              RSVP
            </Heading>
            <Box height="1px" width="100px" bg="gray.400" />
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="2xl">
              Please let us know if you can join us
            </Text>
          </VStack>

          {showForm ? (
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
                    Number of Guests (including yourself) *
                  </Field.Label>
                  <NativeSelect.Root size="lg">
                    <NativeSelect.Field
                      value={guestCountInput}
                      onChange={(e) => handleGuestCountChange(e.target.value)}
                      borderColor="gray.300"
                      pl={INPUT_PADDING_LEFT}
                      _focus={{
                        borderColor: 'gray.600',
                        shadow: 'sm',
                      }}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={String(n)}>
                          {n}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <VStack gap={4} width="100%">
                  <Field.Root width="100%">
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
                          pl={INPUT_PADDING_LEFT}
                          _focus={{
                            borderColor: 'gray.600',
                            shadow: 'sm',
                          }}
                        />
                      </Field.Root>
                    ))}
                  </Field.Root>
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
                    pl={INPUT_PADDING_LEFT}
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
                    Phone Number
                  </Field.Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Optional"
                    size="lg"
                    borderColor="gray.300"
                    pl={INPUT_PADDING_LEFT}
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
                    pl={INPUT_PADDING_LEFT}
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
                    pl={INPUT_PADDING_LEFT}
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

                {storedRsvp && editing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(false)}
                    color="gray.600"
                  >
                    Cancel
                  </Button>
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
                  {storedRsvp && editing ? 'Update RSVP' : 'Submit RSVP'}
                </Button>
              </VStack>
            </Box>
          ) : (
            storedRsvp && renderRsvpInfo(storedRsvp)
          )}

          <Text fontSize="sm" color="gray.500" textAlign="center" maxW="lg">
            Please RSVP by September 1st, 2026. If you have any questions, feel free to reach out to
            us directly.
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}

export default RSVPSection
