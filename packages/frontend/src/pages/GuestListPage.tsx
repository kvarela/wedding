import { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Heading,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Badge,
  Spinner,
} from '@chakra-ui/react'
import { verifyPassword } from '@/api/auth'
import { apiUrl, } from '@/api/client'
import type { RsvpResponse, RsvpAttendance } from '@/api/rsvp'
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
            <Text color={weddingColors.menuText} fontSize="sm">
              This page is password protected
            </Text>
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

function GuestListView() {
  const [rsvps, setRsvps] = useState<RsvpResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  const attending = rsvps.filter((r) => r.attendance === 'YES')
  const notAttending = rsvps.filter((r) => r.attendance === 'NO')
  const maybe = rsvps.filter((r) => r.attendance === 'MAYBE')
  const totalGuests = attending.reduce((sum, r) => sum + r.numGuests, 0)

  if (loading) {
    return (
      <Box minH="100vh" bg={weddingColors.warmIvory} display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" color={weddingColors.primaryGold} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box minH="100vh" bg={weddingColors.warmIvory} display="flex" alignItems="center" justifyContent="center">
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
            <Text color={weddingColors.menuText} fontSize="sm">
              {rsvps.length} {rsvps.length === 1 ? 'party' : 'parties'} total
            </Text>
          </VStack>

          {/* Stats */}
          <HStack
            gap={4}
            justify="center"
            flexWrap="wrap"
          >
            <StatCard label="Attending" value={attending.length} sub={`${totalGuests} guests`} color="green.600" />
            <StatCard label="Not Attending" value={notAttending.length} color="red.500" />
            <StatCard label="Maybe" value={maybe.length} color="yellow.600" />
          </HStack>

          {/* RSVP cards */}
          <VStack gap={4} align="stretch">
            {rsvps.map((rsvp) => (
              <RsvpCard key={rsvp.id} rsvp={rsvp} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

function StatCard({ label, value, sub, color }: { label: string; value: number; sub?: string; color: string }) {
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
      <Text fontSize="2xl" fontWeight="bold" color={color}>{value}</Text>
      <Text fontSize="sm" color={weddingColors.menuText}>{label}</Text>
      {sub && <Text fontSize="xs" color="gray.400">{sub}</Text>}
    </Box>
  )
}

function RsvpCard({ rsvp }: { rsvp: RsvpResponse }) {
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
          <Text fontSize="xs" color="gray.400">
            {new Date(rsvp.createdAt).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            })}
          </Text>
        </HStack>

        {/* Contact info */}
        <Box fontSize="sm" color={weddingColors.menuText}>
          <HStack gap={4} flexWrap="wrap">
            <Text><strong>Email:</strong> {rsvp.email}</Text>
            {rsvp.phone && <Text><strong>Phone:</strong> {rsvp.phone}</Text>}
          </HStack>
          <Text mt={1}><strong>Address:</strong> {rsvp.address}</Text>
        </Box>

        {/* Guests */}
        {rsvp.guests.length > 0 && (
          <Box>
            <Text fontSize="xs" fontWeight="semibold" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="0.1em" mb={2}>
              Guests ({rsvp.numGuests})
            </Text>
            <VStack align="stretch" gap={1}>
              {rsvp.guests.map((guest) => (
                <HStack key={guest.id} justify="space-between" bg={weddingColors.warmIvory} px={3} py={1.5} borderRadius="sm">
                  <Text fontSize="sm" color={weddingColors.charcoal}>{guest.name}</Text>
                  <Text fontSize="xs" color={weddingColors.menuText}>{guest.mealChoice}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        )}

        {/* Message */}
        {rsvp.message && (
          <Box>
            <Text fontSize="xs" fontWeight="semibold" color={weddingColors.primaryGold} textTransform="uppercase" letterSpacing="0.1em" mb={1}>
              Message
            </Text>
            <Text fontSize="sm" color={weddingColors.menuText} fontStyle="italic">
              "{rsvp.message}"
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
