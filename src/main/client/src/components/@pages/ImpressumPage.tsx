import { Heading, HStack, Link, Tag, Text, Image, Wrap, WrapItem, Center, Flex } from '@chakra-ui/react'
import { Paragraph } from 'components/@commons/Basics'
import { Page } from 'components/@layout/Page'
import { DEVS } from 'content/devs'
import { GITHUB_ORG_URL, KIRDEV_ORANGE, KIRDEV_URL } from 'utils/configurations'

type ImpressumPageProps = {}

export const ImpressumPage: React.FC<ImpressumPageProps> = () => {
  return (
    <Page>
      <Heading>Impresszum</Heading>
      <Paragraph>
        A Gólyakörte 2022 weblapját az SSSL megbízásából a{' '}
        <Link isExternal color={KIRDEV_ORANGE} href={KIRDEV_URL}>
          Kir-Dev
        </Link>{' '}
        <Text as="i">speed-run munkasoport</Text> készítette.
      </Paragraph>
      <Text my="2" fontSize="3xl" align="center">
        Fejlesztők
      </Text>
      <Wrap justify="center">
        {DEVS.map((dev) => (
          <WrapItem border="2px" borderColor="brand.100" key={dev.name}>
            <Center w="20rem" h="20rem">
              <Flex direction="column" align="center">
                <Text fontSize="2xl">{dev.name}</Text>
                <HStack spacing={2} my={2}>
                  {dev.tags.map((tag) => (
                    <Tag size={'md'} variant="solid" colorScheme="brand" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </HStack>
                <Image src={dev.img} h="15rem" fallbackSrc="/img/communities/kirdev.svg" />
              </Flex>
            </Center>
          </WrapItem>
        ))}
      </Wrap>
      <Paragraph>
        Felhasznált technológiák: Kotlin, Spring-boot, Typescript és React. Mint ahogy az összes többi projektünk ez is{' '}
        <Link isExternal color={KIRDEV_ORANGE} href={GITHUB_ORG_URL}>
          nyílt forráskódú
        </Link>
        . Ha kérdésed van vagy érdekel a többi projektünk is, látogass el az{' '}
        <Link isExternal color={KIRDEV_ORANGE} href={KIRDEV_URL}>
          oldalunkra
        </Link>{' '}
        vagy keress fel minket a Kir-Dev standnál!
      </Paragraph>
      <Paragraph>Az alaklamazás a KSZK Kubernetes clusterjében fut, köszönjük az erőforrást és a segítséget nekik ezúton is!</Paragraph>
    </Page>
  )
}
