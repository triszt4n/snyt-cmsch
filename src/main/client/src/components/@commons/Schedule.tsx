import { Flex, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { EVENTS } from 'content/events'
import { format } from 'date-fns'
import { hu } from 'date-fns/locale'
import { EventsView } from 'types/dto/events'

export const prettyPrintInterval = (ts1: number, ts2: number): string[] => [
  format(new Date(ts1 * 1000), 'HH:mm'),
  format(new Date(ts2 * 1000), 'HH:mm')
]

export const Schedule = ({ eventsList }: { eventsList: EventsView }) => {
  const keys = Array.from(EVENTS.keys())
  const today = format(new Date(), 'EEEE', { locale: hu })
  const defaultDayIndex = keys.indexOf(today[0].toUpperCase() + today.substring(1))

  return (
    <Tabs defaultIndex={defaultDayIndex === -1 ? 0 : defaultDayIndex} isFitted mt={4} variant="soft-rounded" colorScheme="green">
      <TabList>
        {keys.map((key) => (
          <Tab key={key} color="brand.400">
            {useBreakpointValue({ base: key.substring(0, key === 'Csütörtök' ? 4 : 3) + '.', sm: key })}
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {keys.map((key) => {
          const result = eventsList.allEvents.filter((event) => event.category === key)
          return (
            <TabPanel key={key}>
              <VStack gap={4} align="stretch">
                {result.length === 0 ? (
                  <Text textAlign="center" fontStyle="italic">
                    Nincs esemény kihirdetve erre a napra.
                  </Text>
                ) : (
                  result.map((event) => {
                    const times = prettyPrintInterval(event.timestampStart, event.timestampEnd)
                    return (
                      <HStack spacing={{ base: 4, md: 10 }} key={event.title}>
                        <Flex flex={{ base: 0, md: 1 }} justifyContent="end">
                          <VStack spacing={0} textAlign="center">
                            <Text fontSize="xl" color={useColorModeValue('brand.500', 'brand.600')}>
                              {times[0]}&nbsp;-&nbsp;{times[1]}
                            </Text>
                            <Text>{event.place}</Text>
                          </VStack>
                        </Flex>
                        <VStack spacing={1} align="stretch" flex={{ base: 1, md: 3 }}>
                          <Text fontSize="xl" fontWeight={700}>
                            {event.title}
                          </Text>
                          <Text fontSize="sm">{event.previewDescription}</Text>
                        </VStack>
                      </HStack>
                    )
                  })
                )}
              </VStack>
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
