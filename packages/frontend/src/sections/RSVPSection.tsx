import {
  Box,
  Button,
  Container,
  Field,
  Grid,
  Heading,
  Input,
  NativeSelect,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { createRsvp, getStoredRsvp, storeRsvp, updateRsvp } from '@/api/rsvp'
import { toaster } from '@/components/ui/toaster'
import { weddingColors } from '@/theme/colors'
import type { RsvpMealChoice, RsvpResponse } from '@/api/rsvp'

const MIN_GUESTS = 1
const MAX_GUESTS_PARTY = 4
const TOAST_DURATION_MS = 10_000
const INPUT_PADDING_LEFT = 2

interface RsvpFormData {
  email: string
  phone: string
  address: string
  message: string
  attending: boolean
  mealChoices: RsvpMealChoice[]
}

const RSVPSection = () => {
  const [guestCountInput, setGuestCountInput] = useState('1')
  const [guestNames, setGuestNames] = useState<string[]>([''])
  const [formData, setFormData] = useState<RsvpFormData>({
    email: '',
    phone: '',
    address: '',
    message: '',
    attending: true,
    mealChoices: ['Fish'],
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
    const names = rsvp.guestNames?.length ? rsvp.guestNames : rsvp.guests?.map((g) => g.name) ?? ['']
    setGuestNames(names.length ? names : [''])
    const choices =
      rsvp.guests?.map((g) => g.mealChoice) ??
      (rsvp.guestNames?.length ? rsvp.guestNames.map(() => 'Fish' as RsvpMealChoice) : ['Fish'])
    setFormData({
      email: rsvp.email,
      phone: rsvp.phone ?? '',
      address: rsvp.address,
      message: rsvp.message ?? '',
      attending: rsvp.attendance === 'YES',
      mealChoices: choices,
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
    setFormData((prev) => {
      const choices = [...prev.mealChoices]
      if (n > choices.length) {
        return {
          ...prev,
          mealChoices: [...choices, ...Array(n - choices.length).fill('Fish')] as RsvpMealChoice[],
        }
      }
      return { ...prev, mealChoices: choices.slice(0, n) }
    })
  }

  const setGuestName = (index: number, value: string) => {
    setGuestNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  const setMealChoice = (index: number, value: RsvpMealChoice) => {
    setFormData((prev) => {
      const next = [...prev.mealChoices]
      next[index] = value
      return { ...prev, mealChoices: next }
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
    const mealChoices = formData.mealChoices.slice(0, numGuests)
    while (mealChoices.length < numGuests) {
      mealChoices.push('Fish')
    }
    const payload = {
      name: names[0],
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      guestNames: names,
      mealChoices,
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

  const renderDressCode = () => (
    <Box textAlign="center" pb={4}>
      <Heading
        as="h3"
        color={weddingColors.primaryGold}
        fontWeight="600"
        fontSize={{ base: 'xl', md: '2xl' }}
        mb={2}
      >
        Dress Code
      </Heading>
      <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.200" maxW="xl" marginInline="auto">
        In the spirit of Cuban Jazz Glamour, we invite you to wear Black and/or Gold
      </Text>
    </Box>
  )

  const renderRsvpInfo = (rsvp: RsvpResponse) => (
    <Box
      width="100%"
      p={8}
      bg={weddingColors.charcoal}
      borderRadius="lg"
      shadow="md"
      borderWidth="1px"
      borderColor={weddingColors.primaryGold}
    >
      <VStack gap={6} align="stretch">
        <Box textAlign="center" pb={4} borderBottomWidth="1px" borderColor="gray.100">
          <Heading fontSize="xl" fontWeight="600" color={weddingColors.primaryGold} mb={2}>
            Thank You!
          </Heading>
          <Text color="gray.200" fontSize="sm">
            We&apos;ve received your reservation. Here&apos;s what you submitted:
          </Text>
        </Box>
        {renderDressCode()}
        <Grid
          templateColumns={{ base: '1fr', md: '140px 1fr' }}
          gap={{ base: 1, md: 3 }}
          fontSize="sm"
        >
          <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
            Guests
          </Text>
          <Text color="gray.100">{rsvp.guestNames.join(', ')}</Text>

          <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
            Email
          </Text>
          <Text color="gray.100">{rsvp.email}</Text>

          {rsvp.phone && (
            <>
              <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
                Phone
              </Text>
              <Text color="gray.100">{rsvp.phone}</Text>
            </>
          )}

          <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
            Address
          </Text>
          <Text color="gray.100" whiteSpace="pre-wrap">
            {rsvp.address}
          </Text>

          <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
            Attendance
          </Text>
          <Text color="gray.100">
            {rsvp.attendance === 'YES' ? 'Attending' : 'Not attending'}
          </Text>

          <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
            Meal Choices
          </Text>
          <Text color="gray.100">
            {(rsvp.guests ?? rsvp.guestNames?.map((name) => ({ name, mealChoice: 'Fish' })) ?? [])
              .map((g) => `${g.name}: ${g.mealChoice}`)
              .join(', ')}
          </Text>

          {rsvp.message && (
            <>
              <Text fontWeight="600" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="wide">
                Message
              </Text>
              <Text color="gray.100" whiteSpace="pre-wrap">
                {rsvp.message}
              </Text>
            </>
          )}
        </Grid>
        <Button
          variant="outline"
          size="lg"
          onClick={handleUpdateClick}
          borderColor={weddingColors.primaryGold}
          color={weddingColors.primaryGold}
          _hover={{ bg: weddingColors.charcoal, borderColor: weddingColors.primaryGold }}
        >
          Update Reservation
        </Button>
      </VStack>
    </Box>
  )

  return (
    <Box id="rsvp" width="100%" py={{ base: 16, md: 24 }} bg={weddingColors.charcoal}>
      <Container maxW="container.md" marginInline="auto" px={{ base: 4, md: 6 }}>
        <VStack gap={12}>
          <VStack gap={4} textAlign="center">
            <Heading fontSize={{ base: '3xl', md: '5xl' }} fontWeight="300" color={weddingColors.primaryGold}>
              RSVP
            </Heading>
            <Box height="1px" width="100px" bg={weddingColors.primaryGold} />
          </VStack>

          {showForm ? (
            <Box
              as="form"
              onSubmit={handleSubmit}
              width="100%"
              p={8}
              bg={weddingColors.charcoal}
              borderRadius="lg"
              shadow="md"
              borderWidth="1px"
              borderColor={weddingColors.primaryGold}
            >
              <VStack gap={6}>
                {renderDressCode()}
                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="white"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Number of Guests (including yourself) *
                  </Field.Label>
                  <NativeSelect.Root size="lg">
                    <NativeSelect.Field
                      value={guestCountInput}
                      onChange={(e) => handleGuestCountChange(e.target.value)}
                      color="white"
                      bg={weddingColors.charcoal}
                      borderColor="gray.500"
                      pl={INPUT_PADDING_LEFT}
                      _focus={{
                        borderColor: 'gray.400',
                        shadow: 'sm',
                      }}
                    >
                      {[1, 2, 3, 4].map((n) => (
                        <option key={n} value={String(n)} style={{ backgroundColor: '#1F1F1F', color: '#fff' }}>
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
                      color="white"
                      textTransform="uppercase"
                      letterSpacing="wide"
                    >
                      Names of Everyone Attending *
                    </Field.Label>
                    {guestNames.map((name, index) => (
                      <Grid
                        key={index}
                        templateColumns={{ base: '1fr', md: '1fr minmax(140px, auto)' }}
                        gap={3}
                        alignItems="end"
                      >
                        <Field.Root width="100%">
                          <Field.Label
                            fontSize="xs"
                            fontWeight="500"
                            color="white"
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
                            color="white"
                            borderColor="gray.500"
                            pl={INPUT_PADDING_LEFT}
                            _placeholder={{ color: 'gray.400' }}
                            _focus={{
                              borderColor: 'gray.400',
                              shadow: 'sm',
                            }}
                          />
                        </Field.Root>
                        <Field.Root width="100%">
                          <Field.Label
                            fontSize="xs"
                            fontWeight="500"
                            color="white"
                            textTransform="uppercase"
                            letterSpacing="wide"
                          >
                            Meal Choice *
                          </Field.Label>
                          <NativeSelect.Root size="lg">
                            <NativeSelect.Field
                              value={formData.mealChoices[index] ?? 'Fish'}
                              onChange={(e) =>
                                setMealChoice(index, e.target.value as RsvpMealChoice)
                              }
                              color="white"
                              bg={weddingColors.charcoal}
                              borderColor="gray.500"
                              pl={INPUT_PADDING_LEFT}
                              _focus={{
                                borderColor: 'gray.400',
                                shadow: 'sm',
                              }}
                            >
                              <option value="Fish" style={{ backgroundColor: '#1F1F1F', color: '#fff' }}>Fish</option>
                              <option value="Chicken" style={{ backgroundColor: '#1F1F1F', color: '#fff' }}>Chicken</option>
                              <option value="Steak" style={{ backgroundColor: '#1F1F1F', color: '#fff' }}>Steak</option>
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        </Field.Root>
                      </Grid>
                    ))}
                  </Field.Root>
                </VStack>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="white"
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
                    color="white"
                    borderColor="gray.500"
                    pl={INPUT_PADDING_LEFT}
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'gray.400',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="white"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Phone Number *
                  </Field.Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                    required
                    size="lg"
                    color="white"
                    borderColor="gray.500"
                    pl={INPUT_PADDING_LEFT}
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'gray.400',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="white"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Mailing Address *
                  </Field.Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    rows={3}
                    size="lg"
                    color="white"
                    borderColor="gray.500"
                    pl={INPUT_PADDING_LEFT}
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'gray.400',
                      shadow: 'sm',
                    }}
                  />
                </Field.Root>

                <Field.Root width="100%">
                  <Field.Label
                    fontSize="sm"
                    fontWeight="500"
                    color="white"
                    textTransform="uppercase"
                    letterSpacing="wide"
                  >
                    Message (Optional)
                  </Field.Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Any dietary restrictions or special requests?"
                    rows={4}
                    size="lg"
                    color="white"
                    borderColor="gray.500"
                    pl={INPUT_PADDING_LEFT}
                    _placeholder={{ color: 'gray.400' }}
                    _focus={{
                      borderColor: 'gray.400',
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
                    color="gray.300"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  width="100%"
                  size="lg"
                  bg={weddingColors.primaryGold}
                  color="black"
                  fontSize="sm"
                  letterSpacing="wider"
                  textTransform="uppercase"
                  py={6}
                  _hover={{
                    bg: '#b8962f',
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
        </VStack>
      </Container>
    </Box>
  )
}

export default RSVPSection
