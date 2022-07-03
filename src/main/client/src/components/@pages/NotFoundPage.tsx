import { ButtonGroup, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Helmet } from 'react-helmet'
import { LinkButton } from '../@commons/LinkButton'
import { Page } from '../@layout/Page'

export const NotFoundPage: React.FC = () => (
  <Page>
    <Helmet title="Error 404" />
    <Heading textAlign="center">Az oldal nem található</Heading>
    <Text textAlign="center" marginTop={10}>
      A keresett oldal nem található vagy többé nem elérhető.
    </Text>
    <ButtonGroup justifyContent="center" marginTop={10}>
      <LinkButton href="/" variant="ghost">
        Főoldal
      </LinkButton>
    </ButtonGroup>
  </Page>
)
