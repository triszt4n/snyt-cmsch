import { ButtonGroup, Heading, Stack } from '@chakra-ui/react'
import axios from 'axios'
import { StampComponent } from 'components/@commons/StampComponent'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaQrcode, FaStamp } from 'react-icons/fa'
import { ProfileDTO } from 'types/dto/profile'
import { TokenDTO } from 'types/dto/token'
import { API_BASE_URL } from 'utils/configurations'
import { useAuthContext } from 'utils/useAuthContext'
import { Loading } from '../../utils/Loading'
import { useServiceContext } from '../../utils/useServiceContext'
import { LinkButton } from '../@commons/LinkButton'
import { Page } from '../@layout/Page'

interface TokenProgress {
  totalTokenCount: number
  minTokenToComplete: number
  acquiredTokenCount: number
  tokens: TokenDTO[]
  groupName: string
}

export const QRList: React.FC = (props) => {
  const { throwError } = useServiceContext()
  const { profile } = useAuthContext()
  const [progress, setProgress] = useState<TokenProgress>({
    totalTokenCount: 0,
    minTokenToComplete: 0,
    acquiredTokenCount: 0,
    tokens: [],
    groupName: ''
  })
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_BASE_URL}/api/profile`)
      .then((res) => {
        const profile = res.data as ProfileDTO
        setProgress({
          tokens: profile.tokens,
          minTokenToComplete: profile.minTokenToComplete,
          totalTokenCount: profile.totalTokenCount,
          acquiredTokenCount: profile.collectedTokenCount,
          groupName: profile.groupName
        })
        setLoading(false)
      })
      .catch(() => {
        throwError('Nem sikerült lekérni a QR kódokat.')
      })
  }, [])

  if (loading) return <Loading />

  return (
    <Page {...props} loginRequired groupRequired>
      <Helmet title="QR kódok" />
      <Heading as="h1">QR kódok</Heading>
      <ButtonGroup mt="5">
        <LinkButton colorScheme="brand" leftIcon={<FaQrcode />} href="/qr/scan">
          QR kód beolvasása
        </LinkButton>
        {profile?.role === 'ADMIN' && (
          <LinkButton colorScheme="brand" leftIcon={<FaStamp />} href="/control/stamps" external newTab={false}>
            Beolvasási statisztika
          </LinkButton>
        )}
      </ButtonGroup>
      {progress.tokens.length > 0 && (
        <>
          <Heading as="h4" size="md" mt="5">
            Amiket eddig beolvastál
          </Heading>
          <Stack spacing="5" mt="1">
            {progress.tokens.map((token, i) => {
              return <StampComponent key={i} title={token.title} type={token.type} />
            })}
          </Stack>
        </>
      )}
    </Page>
  )
}
