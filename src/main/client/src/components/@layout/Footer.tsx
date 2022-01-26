import * as React from 'react'
import { Box, Flex, HStack, Icon, Image, Link, StackProps, Text, useColorModeValue, VStack, Wrap } from '@chakra-ui/react'
import { BUGREPORT_URL, KIRDEV_ORANGE, KIRDEV_URL } from 'utils/configurations'
import { socialPages } from 'content/socialPages'
import { FaHeart } from 'react-icons/fa'
import { Container } from './Container'

type impresszumWrapItemProps = {
  display: {
    base?: string
    md: string
  }
  key: string
}
const ImpressumWrapItem: React.FC<impresszumWrapItemProps> = ({ display, key }) => {
  return (
    <FooterWrapItem key={key} display={display}>
      <Text marginBottom={3} align="center" fontSize="xl">
        <Link textColor={KIRDEV_ORANGE} href="/impresszum">
          Impresszum
        </Link>
        {' | '}
        <Link textColor={KIRDEV_ORANGE} isExternal href="https://www.youtube.com/watch?v=YLR6tqJDHEc">
          Adatkezelés
        </Link>
      </Text>
      <Box align="center">
        <Text>@ kir-dev [kukac] sch.bme.hu</Text>
        <Text>© 2022</Text>
      </Box>
    </FooterWrapItem>
  )
}

export const Footer: React.FC = () => (
  <Box borderTopWidth={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')} py={5}>
    <Container>
      <Wrap justify="space-between" spacing={2} align="center">
        <FooterWrapItem>
          <FooterBigImage src="/img/communities/sssl.svg" filter={useColorModeValue('', 'invert(100%)')} />
          <HStack spacing={1}>
            {socialPages.map((sociaPage) => (
              <HStack as={Link} _hover={{ color: KIRDEV_ORANGE }} href={sociaPage.href} isExternal key={sociaPage.label}>
                <Icon as={sociaPage.icon} boxSize="2rem" />
              </HStack>
            ))}
          </HStack>
        </FooterWrapItem>
        <ImpressumWrapItem key="bigDisplay" display={{ base: 'none', md: 'block' }} />
        <FooterWrapItem>
          <Flex direction="row" align="center">
            <Text mr={2}>Made with</Text>
            <FaHeart color="red" size="1.5rem" />
            <Text ml={2}>by</Text>
          </Flex>
          <FooterBigImage src="/img/communities/kirdev.svg" />
          <Box>
            <Link isExternal fontSize="xl" _hover={{ color: KIRDEV_ORANGE, textDecorationLine: 'underline' }} href={KIRDEV_URL}>
              Kir-Dev
            </Link>
            {' | '}
            <Link isExternal fontSize="xl" _hover={{ color: KIRDEV_ORANGE, textDecorationLine: 'underline' }} href={BUGREPORT_URL}>
              Contact
            </Link>
          </Box>
        </FooterWrapItem>
        <ImpressumWrapItem key="smallDisplay" display={{ md: 'none' }} />
      </Wrap>
    </Container>
  </Box>
)

const FooterWrapItem: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <VStack py={5} spacing={1} align="center" width={{ base: '100%', md: 'fit-content' }} {...props}>
      {children}
    </VStack>
  )
}

const FooterBigImage: React.FC<{ src: string; filter?: string }> = ({ src, filter = '' }) => {
  return <Image src={src} w="10rem" h="10rem" my={3} filter={filter} />
}
