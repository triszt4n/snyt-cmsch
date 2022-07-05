import { ArrowDownIcon, InfoIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  chakra,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import axios from 'axios'
import { SimpleLink } from 'components/@commons/SimpleLink'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import { EventsPreviewDTO, EventsView } from 'types/dto/events'
import { API_BASE_URL } from 'utils/configurations'
import customTheme from '../../utils/customTheme'
import { LinkButton } from '../@commons/LinkButton'
import { Paragraph } from '../@commons/Paragraph'
import { prettyPrintInterval, Schedule } from '../@commons/Schedule'
import { Page } from '../@layout/Page'

enum EventState {
  RUNNING,
  UPCOMING,
  OLD
}

const getState = (currentEvent: EventsPreviewDTO): EventState => {
  const now = new Date()
  if (now > new Date(currentEvent.timestampStart * 1000))
    if (now < new Date(currentEvent.timestampEnd * 1000)) return EventState.RUNNING
    else return EventState.OLD
  else return EventState.UPCOMING
}

export const Home: React.FC = () => {
  const [eventsList, setEventsList] = useState<EventsView>({
    warningMessage: '',
    allEvents: []
  })
  const [currentEvent, setCurrentEvent] = useState<EventsPreviewDTO | undefined>(undefined)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    axios.get<EventsView>(`${API_BASE_URL}/api/events`).then((res) => {
      if (res.status !== 200) {
        console.log(res)
        return
      }
      setEventsList(res.data)
      setCurrentEvent(
        eventsList.allEvents
          .sort((a, b) => a.timestampStart - b.timestampStart)
          .find((event) => {
            return event.timestampEnd * 1000 > new Date().getTime()
          })
      )
    })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true)
    }, 400)
  })

  return (
    <Page>
      <Helmet />
      <Flex align="center" flexDirection={{ base: 'column-reverse', md: 'row' }} mt={10}>
        <BlockQuote quoteMarkSize={4}>
          <Paragraph fontWeight={700}>Kedves Szakkollégisták!</Paragraph>
          <Paragraph>
            Idén is szeretettel vár minden szakkollégiumi tagot, öregtagot és újoncot a Simonyi Nyári Tábor, ezúttal Patcán, a Katica
            Tanyán. 🐞 A szokásos workshopok, öregavatás, borkóstolás, vetélkedők, és kiváló vacsorák mellett idén készülünk olyan új,
            izgalmas programokkal is, mint az éjszakai túra, élményközpont látogatás és ezen felül is rengeteg program, jókedv, barátok
            várnak majd a táborban! 😉
          </Paragraph>
          <Paragraph>
            Helyszín és hozzá Maps navigáció:{' '}
            <SimpleLink href="https://g.page/katica-tanya-patca?share" isExternal color="brand.600">
              Patca, Hrsz 025, 7477
            </SimpleLink>{' '}
            Katica Tanya.
          </Paragraph>
          <Paragraph>
            Üdv,
            <br />a Főrendezők 🦆
          </Paragraph>
        </BlockQuote>
        <Flex marginTop={10} display={{ base: 'flex', md: 'none' }}>
          <a href="#esemenyek">
            <Button colorScheme="brand" rightIcon={<ArrowDownIcon />}>
              Események
            </Button>
          </a>
        </Flex>
        <Box position="relative" textAlign="center">
          <Image src="/img/big_stork_logo.png" maxH="35rem" />
          {currentEvent && useBreakpointValue({ base: true, md: false }) && (
            <AnimatePresence>
              {isVisible && (
                <motion.div key="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Box
                    position="absolute"
                    top="0"
                    left="50%"
                    transform="translate(-50%, 25%)"
                    shadow="md"
                    borderRadius="md"
                    bgColor={useColorModeValue('brand.200', 'brand.700')}
                    p={2}
                  >
                    <Text fontSize="xs" mb={1}>
                      {getState(currentEvent) === EventState.UPCOMING && 'Hamarosan:'}
                      {getState(currentEvent) === EventState.RUNNING && 'Most megy:'}
                    </Text>
                    <EventOverlay event={currentEvent} />
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </Box>
      </Flex>
      <Box
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        marginTop={20}
        bgColor={useColorModeValue('brand.50', 'brand.800')}
        p={1}
        pb={10}
        id="esemenyek"
        maxW="54rem"
        w="full"
        mx="auto"
      >
        <Heading as="h2" size="lg" textAlign="center">
          Események
        </Heading>
        <HStack marginTop={4} variant="left-accent" width="fit-content" marginX="auto">
          <InfoIcon />
          <Box>
            A változás jogát fenntartjuk!
            <chakra.span display={{ base: 'none', md: 'inline' }}>
              &nbsp;Kísérd figyelemmel az oldal tetején megjelenő értesítéseket!
            </chakra.span>
          </Box>
        </HStack>
        <Schedule eventsList={eventsList} />
      </Box>
      <Heading as="h2" size="lg" marginTop={20} textAlign="center">
        Feladatok
      </Heading>
      <Paragraph textAlign="center">Három típusú feladatot tudtok teljesíteni. Ezekhez AuthSch fiók használata szükséges!</Paragraph>
      <ButtonGroup marginTop={4} justifyContent="center">
        <LinkButton href="/riddles" colorScheme="brand">
          Riddle
        </LinkButton>
        <LinkButton href="/bucketlist" colorScheme="brand">
          Bucketlist
        </LinkButton>
        <LinkButton href="/qr" colorScheme="brand">
          QR kódok
        </LinkButton>
      </ButtonGroup>
    </Page>
  )
}

type BlockQuoteProps = {
  quoteMarkSize: number
}

const BlockQuote: React.FC<BlockQuoteProps> = ({ children, quoteMarkSize }) => {
  return (
    <VStack
      px={quoteMarkSize / 2 + 'rem'}
      py={quoteMarkSize + 'rem'}
      marginTop={20}
      color={useColorModeValue('gray.700', 'gray.300')}
      maxW={800}
      marginX="auto"
      align="flex-start"
      spacing={5}
      position="relative"
    >
      <QuoteMark side="left" size={quoteMarkSize} />
      {children}
      <QuoteMark side="right" size={quoteMarkSize} />
    </VStack>
  )
}

type QuoteMarkProps = {
  side: 'left' | 'right'
  size: number
}

const QuoteMark: React.FC<QuoteMarkProps> = ({ side, size }) => {
  return (
    <Box
      position="absolute"
      top={side === 'left' ? 0 : undefined}
      bottom={side === 'right' ? 0 : undefined}
      left={side === 'left' ? 0 : undefined}
      right={side === 'right' ? 0 : undefined}
    >
      {side === 'left' ? (
        <FaQuoteLeft size={size + 'rem'} color={useColorModeValue(customTheme.colors.brand['500'], customTheme.colors.brand['600'])} />
      ) : (
        <FaQuoteRight size={size + 'rem'} color={useColorModeValue(customTheme.colors.brand['500'], customTheme.colors.brand['600'])} />
      )}
    </Box>
  )
}

const EventOverlay = ({ event }: { event?: EventsPreviewDTO }) => {
  if (!event) return null
  const times = prettyPrintInterval(event.timestampStart, event.timestampEnd)
  return (
    <VStack spacing={2}>
      <VStack spacing={0}>
        <Text fontWeight={700} fontSize="xl">
          {times[0]}&nbsp;-&nbsp;{times[1]}
        </Text>
        <Text fontWeight={700} fontSize="2xl">
          {event.title}
        </Text>
        <Text fontSize="sm">{event.place}</Text>
      </VStack>
    </VStack>
  )
}
