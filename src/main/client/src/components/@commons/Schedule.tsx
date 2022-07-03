import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import axios from 'axios'
import { EVENTS } from 'content/events'
import { useEffect, useState } from 'react'
import { EventsView } from 'types/dto/events'
import { API_BASE_URL } from 'utils/configurations'

const prettyPrintInterval = (ts1: number, ts2: number): string => {
  const date1 = new Date(ts1 * 1000)
  const date2 = new Date(ts2 * 1000)
  return `${date1.getHours()}:${date1.getMinutes()}—${date2.getHours()}:${date2.getMinutes()}`
}

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
          <Tab>{useBreakpointValue({ base: key.substring(0, key === 'Csütörtök' ? 4 : 3) + '.', sm: key })}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {keys.map((key) => (
          <TabPanel key={key}>
            <VStack gap={4}>
              {eventsList.allEvents
                .filter((event) => event.category === key)
                .map((event) => (
                  <HStack gap={4} key={event.title} fontSize="lg">
                    <VStack>
                      <Text color={useColorModeValue('brand.500', 'brand.600')}>
                        {prettyPrintInterval(event.timestampStart, event.timestampEnd)}
                      </Text>
                      <Text>{event.place}</Text>
                    </VStack>
                    <VStack>
                      <Text>{event.title}</Text>
                      <Text fontSize="sm">{event.previewDescription}</Text>
                    </VStack>
                  </HStack>
                ))}
            </VStack>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
