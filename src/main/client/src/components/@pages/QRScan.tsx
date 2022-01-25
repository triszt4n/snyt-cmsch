import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Center,
  CircularProgress,
  CloseButton,
  Fade,
  Heading
} from '@chakra-ui/react'
import axios from 'axios'
import { LinkButton } from 'components/@commons/LinkButton'
import { QRScanResultComponent } from 'components/@commons/QRScanResultComponent'
import { Page } from 'components/@layout/Page'
import React from 'react'
import { FaArrowLeft, FaQrcode } from 'react-icons/fa'
import QRreader from 'react-qr-reader'
import { useNavigate } from 'react-router-dom'
import { ScanResponseDTO, ScanStatus } from 'types/dto/token'
import { API_BASE_URL } from 'utils/configurations'
import { useServiceContext } from '../../utils/useServiceContext'

enum ScanViewState {
  Scanning,
  Loading,
  Success
}

interface ScanView {
  state: ScanViewState
  response?: ScanResponseDTO
}

export const QRScan: React.FC = (props) => {
  const [state, setState] = React.useState<ScanView>({ state: ScanViewState.Scanning })
  const { throwError } = useServiceContext()
  const handleScan = (qrData: any) => {
    if (qrData) {
      // set state to loading
      setState({ state: ScanViewState.Loading })

      //get token id from scanned url
      const token = (qrData as string)
        .split('/')
        .filter((part) => part !== '')
        .pop()

      //send token to backaend with post
      axios
        .post(`${API_BASE_URL}/api/token/${token}`)
        .then((res) => {
          setState({ state: ScanViewState.Success, response: res.data })
        })
        .catch(() => {
          throwError('Hálózati hiba a token érvényesítésénél', { toast: true })
          // wait a few moments, so users wont spam error messages.
          setTimeout(() => {
            setState({ state: ScanViewState.Scanning })
          }, 750)
        })
    }
  }
  //handle any scanner error
  const handleError = (err: any) => {
    console.log(err)
    throwError('Beolvasási hiba.', { toast: true })
  }

  const resetButtonHandler = () => {
    setState({ state: ScanViewState.Scanning, response: undefined })
  }

  return (
    <Page {...props} loginRequired>
      <Heading>Scanneld be a QR kódot</Heading>
      {state.state == ScanViewState.Scanning && <QRreader delay={300} onError={handleError} onScan={handleScan} />}
      {state.state == ScanViewState.Loading && (
        <Center>
          <CircularProgress isIndeterminate color="brand.300" size="120px" />
        </Center>
      )}
      {state.state == ScanViewState.Success && (
        <Fade in={state.state == ScanViewState.Success}>
          <QRScanResultComponent response={state.response || { status: ScanStatus.WRONG }} />
        </Fade>
      )}
      {state.state !== ScanViewState.Loading && (
        <ButtonGroup alignSelf="center">
          <LinkButton marginTop="3" leftIcon={<FaArrowLeft />} size="lg" href="/qr">
            Vissza
          </LinkButton>
          {state.state !== ScanViewState.Scanning && (
            <Button marginTop="3" colorScheme="brand" leftIcon={<FaQrcode />} onClick={resetButtonHandler} size="lg">
              Új QR scannelése
            </Button>
          )}
        </ButtonGroup>
      )}
    </Page>
  )
}
