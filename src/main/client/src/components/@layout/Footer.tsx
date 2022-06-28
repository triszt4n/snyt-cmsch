import { Box, Grid, GridItem, HStack, Icon, Image, Link, Text, useBreakpointValue, useColorModeValue, VStack } from '@chakra-ui/react'
import { socialPages } from 'content/socialPages'
import * as React from 'react'
import { KIRDEV_URL } from 'utils/configurations'
import customTheme from '../../utils/customTheme'
import { Container } from './Container'

export const Footer: React.FC = () => (
  <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
    <Container>
      <Grid py={5} alignItems="center" templateColumns={`repeat(${useBreakpointValue({ base: '1', md: '3' })}, 1fr)`} gap={6}>
        <GridItem as={VStack} w="100%">
          <Image src={useColorModeValue('/img/communities/simonyi.svg', '/img/communities/simonyi-white.svg')} h="4rem" my={3} />
          <Link
            isExternal
            fontSize="xl"
            _hover={{ color: customTheme.colors.kirDev, textDecorationLine: 'underline' }}
            href="https://simonyi.bme.hu"
          >
            Weboldal
          </Link>
        </GridItem>
        <GridItem as={VStack} w="100%">
          <Box align="center">
            <Image h="10rem" src={`/img/${useColorModeValue('footer_logo.png', 'footer_logo_white.png')}`} />
          </Box>
          <HStack spacing={1} justify="center">
            {socialPages.map((socialPage) => (
              <HStack as={Link} _hover={{ color: customTheme.colors.kirDev }} href={socialPage.href} isExternal key={socialPage.label}>
                <Icon as={socialPage.icon} boxSize="2rem" />
              </HStack>
            ))}
          </HStack>
          <Box align="center">
            <Text>@ snyt [at] simonyi.bme.hu</Text>
            <Text>© Simonyi Károly Szakkollégium 2022</Text>
          </Box>
        </GridItem>
        <GridItem as={VStack} w="100%">
          <Image src={useColorModeValue('/img/communities/kirdev.svg', '/img/communities/kirdev-white.svg')} h="7rem" />
          <HStack align="center">
            <Link isExternal fontSize="xl" _hover={{ color: customTheme.colors.kirDev, textDecorationLine: 'underline' }} href={KIRDEV_URL}>
              Weboldal
            </Link>
          </HStack>
        </GridItem>
      </Grid>
    </Container>
  </Box>
)
