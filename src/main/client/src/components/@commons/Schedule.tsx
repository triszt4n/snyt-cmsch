import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import axios from 'axios'
import { EVENTS } from 'content/events'
import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { EventsView } from 'types/dto/events'
import { API_BASE_URL } from 'utils/configurations'

const prettyPrintInterval = (ts1: number, ts2: number): string[] => [
  format(new Date(ts1 * 1000), 'HH:mm'),
  format(new Date(ts2 * 1000), 'HH:mm')
]

export const Schedule = () => {
  const [eventsList, setEventsList] = useState<EventsView>({
    warningMessage: '',
    allEvents: []
  })

  useEffect(() => {
    axios.get<EventsView>(`${API_BASE_URL}/api/events`).then((res) => {
      if (res.status !== 200) {
        console.log(res)
        return
      }
      setEventsList(res.data)
    })
  }, [])

  const keys = Array.from(EVENTS.keys())

  return (
    <Tabs isFitted mt={4}>
      <TabList>
        {keys.map((key) => (
          <Tab key={key}>{useBreakpointValue({ base: key.substring(0, key === 'Csütörtök' ? 4 : 3) + '.', sm: key })}</Tab>
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
                      <HStack gap={4} key={event.title}>
                        <VStack>
                          <Text fontSize="xl" color={useColorModeValue('brand.500', 'brand.600')}>
                            {times[0]}&nbsp;-&nbsp;{times[1]}
                          </Text>
                          <Text>{event.place}</Text>
                        </VStack>
                        <VStack align="stretch">
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
