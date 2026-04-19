import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  CloseButton,
  Container,
  Dialog,
  Field,
  Heading,
  HStack,
  Input,
  Button,
  NativeSelect,
  Spinner,
  Badge,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import { verifyPassword } from '@/api/auth'
import { apiUrl } from '@/api/client'
import {
  deleteRsvp,
  updateRsvp,
  DEFAULT_MEAL_CHOICE,
  RSVP_MEAL_OPTIONS,
  type CreateRsvpPayload,
  type RsvpAttendance,
  type RsvpMealChoice,
  type RsvpResponse,
} from '@/api/rsvp'
import { weddingColors } from '@/theme/colors'

const SESSION_KEY = 'guest-list-auth'

function attendanceBadgeColor(attendance: RsvpAttendance): string {
  if (attendance === 'YES') return 'green'
  if (attendance === 'NO') return 'red'
  return 'yellow'
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const ok = await verifyPassword(password)
      if (ok) {
        sessionStorage.setItem(SESSION_KEY, '1')
        onUnlock()
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Unable to verify password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      minH="100vh"
      bg={weddingColors.warmIvory}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container maxW="sm">
        <VStack gap={8} textAlign="center">
          <VStack gap={2}>
            <Heading
              fontSize="2xl"
              fontFamily="'Cormorant Garamond', serif"
              color={weddingColors.charcoal}
              letterSpacing="0.08em"
            >
              Guest List
            </Heading>
            <Text fontSize="sm">This page is password protected</Text>
          </VStack>

          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack gap={4}>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderColor={weddingColors.champagneGold}
                focusRingColor={weddingColors.primaryGold}
                bg="white"
                _placeholder={{ color: 'gray.400' }}
                size="lg"
                autoFocus
              />
              {error && (
                <Text color="red.500" fontSize="sm">
                  {error}
                </Text>
              )}
              <Button
                type="submit"
                width="100%"
                size="lg"
                bg={weddingColors.primaryGold}
                color="white"
                _hover={{ bg: weddingColors.darkAntiqueGold }}
                loading={loading}
                disabled={!password}
              >
                Enter
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

function EditModal({
  rsvp,
  onClose,
  onSave,
}: {
  rsvp: RsvpResponse
  onClose: () => void
  onSave: (updated: RsvpResponse) => void
}) {
  const [guestNames, setGuestNames] = useState<string[]>(rsvp.guests.map((g) => g.name))
  const [mealChoices, setMealChoices] = useState<RsvpMealChoice[]>(rsvp.guests.map((g) => g.mealChoice))
  const [email, setEmail] = useState(rsvp.email)
  const [phone, setPhone] = useState(rsvp.phone ?? '')
  const [address, setAddress] = useState(rsvp.address)
  const [message, setMessage] = useState(rsvp.message ?? '')
  const [attendance, setAttendance] = useState<RsvpAttendance>(rsvp.attendance)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateGuestName = (i: number, value: string) => {
    const next = [...guestNames]
    next[i] = value
    setGuestNames(next)
  }

  const updateMealChoice = (i: number, value: RsvpMealChoice) => {
    const next = [...mealChoices]
    next[i] = value
    setMealChoices(next)
  }

  const addGuest = () => {
    if (guestNames.length >= 4) return
    setGuestNames([...guestNames, ''])
    setMealChoices([...mealChoices, DEFAULT_MEAL_CHOICE])
  }

  const removeGuest = (i: number) => {
    if (guestNames.length <= 1) return
    setGuestNames(guestNames.filter((_, idx) => idx !== i))
    setMealChoices(mealChoices.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const trimmedNames = guestNames.map((n) => n.trim()).filter(Boolean)
    if (!trimmedNames.length) {
      setError('At least one guest name is required')
      return
    }
    setLoading(true)
    try {
      const payload: CreateRsvpPayload = {
        name: trimmedNames[0],
        email: email.trim(),
        phone: phone.trim(),
        guestNames: trimmedNames,
        mealChoices: mealChoices.slice(0, trimmedNames.length),
        address: address.trim(),
        message: message.trim() || undefined,
        attendance,
      }
      const updated = await updateRsvp(rsvp.id, payload)
      onSave(updated)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open onOpenChange={(e) => { if (!e.open) onClose() }}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="lg">
          <Dialog.Header>
            <Dialog.Title fontFamily="'Cormorant Garamond', serif">Edit RSVP</Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body>
            <Box as="form" id="edit-rsvp-form" onSubmit={handleSubmit}>
              <VStack gap={4} align="stretch">
                {/* Guests */}
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    color={weddingColors.primaryGold}
                    textTransform="uppercase"
                    letterSpacing="0.1em"
                    mb={2}
                  >
                    Guests
                  </Text>
                  <VStack gap={3} align="stretch">
                    {guestNames.map((name, i) => (
                      <HStack key={i} gap={2} align="flex-end">
                        <VStack gap={2} flex={1} align="stretch">
                          <Input
                            placeholder={`Guest ${i + 1} name`}
                            value={name}
                            onChange={(e) => updateGuestName(i, e.target.value)}
                            size="sm"
                          />
                          <NativeSelect.Root size="sm">
                            <NativeSelect.Field
                              value={mealChoices[i] ?? DEFAULT_MEAL_CHOICE}
                              onChange={(e) => updateMealChoice(i, e.target.value as RsvpMealChoice)}
                            >
                              {RSVP_MEAL_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        </VStack>
                        {guestNames.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            colorPalette="red"
                            onClick={() => removeGuest(i)}
                            aria-label="Remove guest"
                            mb={1}
                          >
                            ×
                          </Button>
                        )}
                      </HStack>
                    ))}
                    {guestNames.length < 4 && (
                      <Button size="sm" variant="outline" onClick={addGuest}>
                        + Add Guest
                      </Button>
                    )}
                  </VStack>
                </Box>

                <Field.Root>
                  <Field.Label fontSize="sm">Email</Field.Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    size="sm"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Phone</Field.Label>
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    size="sm"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Address</Field.Label>
                  <Textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    rows={2}
                    size="sm"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Message</Field.Label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    size="sm"
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label fontSize="sm">Attendance</Field.Label>
                  <NativeSelect.Root size="sm">
                    <NativeSelect.Field
                      value={attendance}
                      onChange={(e) => setAttendance(e.target.value as RsvpAttendance)}
                    >
                      <option value="YES">Yes</option>
                      <option value="NO">No</option>
                      <option value="MAYBE">Maybe</option>
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                {error && (
                  <Text color="red.500" fontSize="sm">
                    {error}
                  </Text>
                )}
              </VStack>
            </Box>
          </Dialog.Body>
          <Dialog.Footer gap={2}>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="edit-rsvp-form"
              size="sm"
              bg={weddingColors.primaryGold}
              color="white"
              _hover={{ bg: weddingColors.darkAntiqueGold }}
              loading={loading}
            >
              Save Changes
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

function DeleteConfirmModal({
  rsvp,
  onClose,
  onConfirm,
}: {
  rsvp: RsvpResponse
  onClose: () => void
  onConfirm: () => Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root open onOpenChange={(e) => { if (!e.open) onClose() }}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content maxW="sm">
          <Dialog.Header>
            <Dialog.Title fontFamily="'Cormorant Garamond', serif">Delete RSVP</Dialog.Title>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Header>
          <Dialog.Body>
            <Text fontSize="sm">
              Are you sure you want to delete the RSVP for{' '}
              <Text as="span" fontWeight="semibold">
                {rsvp.name}
              </Text>
              ? This cannot be undone.
            </Text>
          </Dialog.Body>
          <Dialog.Footer gap={2}>
            <Button variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button colorPalette="red" size="sm" loading={loading} onClick={handleConfirm}>
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}

function GuestListView() {
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingRsvp, setEditingRsvp] = useState<RsvpResponse | null>(null)
  const [deletingRsvp, setDeletingRsvp] = useState<RsvpResponse | null>(null)

  useEffect(() => {
    fetch(apiUrl('rsvp'))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load guest list')
        return res.json() as Promise<RsvpResponse[]>
      })
      .then(setRsvps)
      .catch(() => setError('Failed to load guest list.'))
      .finally(() => setLoading(false))
  }, [])

  const handleEditSave = (updated: RsvpResponse) => {
    setRsvps((prev) => prev.map((r) => (r.id === updated.id ? updated : r)))
    setEditingRsvp(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deletingRsvp) return
    await deleteRsvp(deletingRsvp.id)
    setRsvps((prev) => prev.filter((r) => r.id !== deletingRsvp.id))
    setDeletingRsvp(null)
  }

  const attending = rsvps.filter((r) => r.attendance === 'YES')
  const notAttending = rsvps.filter((r) => r.attendance === 'NO')
  const maybe = rsvps.filter((r) => r.attendance === 'MAYBE')
  const totalGuests = attending.reduce((sum, r) => sum + r.numGuests, 0)

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg={weddingColors.warmIvory}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" color={weddingColors.primaryGold} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box
        minH="100vh"
        bg={weddingColors.warmIvory}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="red.500">{error}</Text>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg={weddingColors.warmIvory} py={12}>
      <Container maxW="4xl">
        <VStack gap={8} align="stretch">
          <VStack gap={1} textAlign="center">
            <Heading
              fontSize={{ base: '2xl', md: '3xl' }}
              fontFamily="'Cormorant Garamond', serif"
              color={weddingColors.charcoal}
              letterSpacing="0.08em"
            >
              Guest List
            </Heading>
            <Text fontSize="sm">
              {rsvps.length} {rsvps.length === 1 ? 'party' : 'parties'} total
            </Text>
          </VStack>

          {/* Stats */}
          <HStack gap={4} justify="center" flexWrap="wrap">
            <StatCard
              label="Attending"
              value={attending.length}
              sub={`${totalGuests} guests`}
              color="green.600"
            />
            <StatCard label="Not Attending" value={notAttending.length} color="red.500" />
            <StatCard label="Maybe" value={maybe.length} color="yellow.600" />
          </HStack>

          {/* RSVP cards */}
          <VStack gap={4} align="stretch">
            {rsvps.map((rsvp) => (
              <RsvpCard
                key={rsvp.id}
                rsvp={rsvp}
                onEdit={() => setEditingRsvp(rsvp)}
                onDelete={() => setDeletingRsvp(rsvp)}
              />
            ))}
          </VStack>
        </VStack>
      </Container>

      {editingRsvp && (
        <EditModal
          rsvp={editingRsvp}
          onClose={() => setEditingRsvp(null)}
          onSave={handleEditSave}
        />
      )}

      {deletingRsvp && (
        <DeleteConfirmModal
          rsvp={deletingRsvp}
          onClose={() => setDeletingRsvp(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </Box>
  )
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: number
  sub?: string
  color: string
}) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={weddingColors.champagneGold}
      borderRadius="md"
      px={6}
      py={4}
      textAlign="center"
      minW="120px"
    >
      <Text fontSize="2xl" fontWeight="bold" color={color}>
        {value}
      </Text>
      <Text fontSize="sm">{label}</Text>
      {sub && (
        <Text fontSize="xs" color="gray.400">
          {sub}
        </Text>
      )}
    </Box>
  )
}

function RsvpCard({
  rsvp,
  onEdit,
  onDelete,
}: {
  rsvp: RsvpResponse
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor={weddingColors.champagneGold}
      borderRadius="md"
      p={5}
    >
      <VStack align="stretch" gap={3}>
        {/* Header row */}
        <HStack justify="space-between" flexWrap="wrap" gap={2}>
          <HStack gap={3} flexWrap="wrap">
            <Heading
              fontSize="lg"
              fontFamily="'Cormorant Garamond', serif"
              color={weddingColors.charcoal}
            >
              {rsvp.name}
            </Heading>
            <Badge colorPalette={attendanceBadgeColor(rsvp.attendance)} variant="solid" size="sm">
              {rsvp.attendance}
            </Badge>
          </HStack>
          <HStack gap={2}>
            <Text fontSize="xs" color="gray.400">
              {new Date(rsvp.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
            <Button
              size="xs"
              variant="outline"
              borderColor={weddingColors.champagneGold}
              color={weddingColors.charcoal}
              _hover={{ bg: weddingColors.warmIvory }}
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              size="xs"
              variant="outline"
              borderColor="red.200"
              color="red.500"
              _hover={{ bg: 'red.50' }}
              onClick={onDelete}
            >
              Delete
            </Button>
          </HStack>
        </HStack>

        {/* Contact info */}
        <Box fontSize="sm">
          <HStack gap={4} flexWrap="wrap">
            <Text>
              <strong>Email:</strong> {rsvp.email}
            </Text>
            {rsvp.phone && (
              <Text>
                <strong>Phone:</strong> {rsvp.phone}
              </Text>
            )}
          </HStack>
          <Text mt={1}>
            <strong>Address:</strong> {rsvp.address}
          </Text>
        </Box>

        {/* Guests */}
        {rsvp.guests.length > 0 && (
          <Box>
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={weddingColors.primaryGold}
              textTransform="uppercase"
              letterSpacing="0.1em"
              mb={2}
            >
              Guests ({rsvp.numGuests})
            </Text>
            <VStack align="stretch" gap={1}>
              {rsvp.guests.map((guest) => (
                <HStack
                  key={guest.id}
                  justify="space-between"
                  bg={weddingColors.warmIvory}
                  px={3}
                  py={1.5}
                  borderRadius="sm"
                >
                  <Text fontSize="sm">{guest.name}</Text>
                  <Text fontSize="xs">{guest.mealChoice}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        )}

        {/* Message */}
        {rsvp.message && (
          <Box>
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color={weddingColors.primaryGold}
              textTransform="uppercase"
              letterSpacing="0.1em"
              mb={1}
            >
              Message
            </Text>
            <Text fontSize="sm" fontStyle="italic">
              &quot;{rsvp.message}&quot;
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  )
}

export default function GuestListPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const handleUnlock = useCallback(() => setUnlocked(true), [])

  if (!unlocked) {
    return <PasswordGate onUnlock={handleUnlock} />
  }

  return <GuestListView />
}
