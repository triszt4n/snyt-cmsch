import { Alert, AlertIcon, Box, ButtonGroup, Flex, Heading, Image, useColorModeValue, VStack } from '@chakra-ui/react'
import { SimpleLink } from 'components/@commons/SimpleLink'
import React from 'react'
import { Helmet } from 'react-helmet'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import customTheme from '../../utils/customTheme'
import { LinkButton } from '../@commons/LinkButton'
import { Paragraph } from '../@commons/Paragraph'
import { Schedule } from '../@commons/Schedule'
import { Page } from '../@layout/Page'

export const Home: React.FC = () => {
  return (
    <Page>
      <Helmet />
      <Heading size="3xl" textAlign="center" marginTop={10}>
        Üdv az{' '}
        <Heading as="span" color={useColorModeValue('brand.500', 'brand.400')} size="3xl">
          SNYT 2022
        </Heading>{' '}
        portálon!
      </Heading>
      <Flex align="center">
        <BlockQuote quoteMarkSize={4}>
          <Paragraph>Kedves Szakkollégisták!</Paragraph>
          <Paragraph>
            Idén is szeretettel vár minden szakkollégiumi tagot, öregtagot és újoncot a Simonyi Nyári Tábor, ezúttal Patcán, a Katica
            Tanyán. 🐞 A szokásos 📑workshopok 👵👴öregavatás 🍷borkóstolás 🤸‍♀️vetélkedők 👨‍💼👩‍💼elnökválasztás mellett idén készülük olyan új,
            izgalmas programokkal is, mint ✨ éjszakai túra 🐄 élményközpont látogatás és ezen felül is rengeteg program, jókedv, barátok
            várnak majd a táborban! 😉
          </Paragraph>
          <Paragraph>
            Helyszín és hozzá Maps navigáció:{' '}
            <SimpleLink href="https://g.page/katica-tanya-patca?share" isExternal>
              Patca, Hrsz 025, 7477
            </SimpleLink>{' '}
            Katica Tanya.
          </Paragraph>
          <Paragraph>
            Üdv,
            <br />
            Főrendezők 🐐🐓🐑🐄🐎🐖🦆
          </Paragraph>
        </BlockQuote>
        <Image src="/img/big_stork_logo.png" h="30rem" display={{ base: 'none', md: 'block' }} />
      </Flex>
      <Heading as="h2" size="lg" marginTop={20} textAlign="center">
        Információk
      </Heading>
      <ButtonGroup marginTop={10} justifyContent="center">
        <LinkButton external newTab={false} href="#esemenyek" variant="outline" colorScheme="brand">
          Események
        </LinkButton>
      </ButtonGroup>
      <Heading as="h2" size="lg" marginTop={20} textAlign="center">
        Feladatok
      </Heading>
      <Paragraph textAlign="center">Három típusú feladatot tudtok teljesíteni. Ezekhez AuthSch fiók használata szükséges!</Paragraph>
      <ButtonGroup marginTop={10} justifyContent="center">
        <LinkButton href="/riddles" variant="outline" colorScheme="brand">
          Riddle
        </LinkButton>
        <LinkButton href="/bucketlist" variant="outline" colorScheme="brand">
          Bucketlist
        </LinkButton>
        <LinkButton href="/qr" variant="outline" colorScheme="brand">
          QR kódok
        </LinkButton>
      </ButtonGroup>
      <Heading as="h2" size="lg" textAlign="center" marginTop={20} id="esemenyek">
        Események
      </Heading>
      <Alert marginTop={10} variant="left-accent" width="fit-content" marginX="auto">
        <AlertIcon />A változás jogát fenntartjuk! Kísérd figyelemmel az oldal tetején megjelenő értesítéseket!
      </Alert>
      <Schedule />
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
