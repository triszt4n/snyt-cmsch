import { Box, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { EVENTS } from 'content/events'

export const Schedule = () => {
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
              {EVENTS.get(key)!.map((event, idx) => (
                <HStack gap={4} key={idx} fontSize="xl">
                  <Box textAlign="right">
                    <Text color={useColorModeValue('brand.500', 'brand.600')}>
                      {event.start}-{event.end}
                    </Text>
                  </Box>
                  <HStack flexDir={{ base: 'column', md: 'row' }}>
                    <Text>{event.name}</Text>
                    <Text display={{ base: 'none', md: 'inline' }}>&bull;</Text>
                    <Text color="gray.500">{event.location}</Text>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  )
}
