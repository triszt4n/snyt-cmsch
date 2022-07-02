import { Button, ButtonGroup, FormControl, FormLabel, Heading, Select, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Navigate, useNavigate } from 'react-router-dom'
import { GroupChangeDTO, GroupChangeStatus } from '../../types/dto/groupChange'
import { API_BASE_URL } from '../../utils/configurations'
import { useAuthContext } from '../../utils/useAuthContext'
import { useServiceContext } from '../../utils/useServiceContext'
import { LinkButton } from '../@commons/LinkButton'
import { Page } from '../@layout/Page'

export const GroupSelectionPage: React.FC = () => {
  const { profile, updateProfile } = useAuthContext()
  const [value, setValue] = useState<string>()
  const [error, setError] = useState<string>()
  const { throwError } = useServiceContext()
  const navigate = useNavigate()

  useEffect(() => {
    setValue(profile?.fallbackGroup.toString())
  }, [profile?.fallbackGroup])

  const onSubmit = () => {
    if (value)
      axios
        .post<GroupChangeDTO>(`${API_BASE_URL}/api/group/select/${value}`)
        .then((res) => {
          switch (res.data.status) {
            case GroupChangeStatus.OK:
              updateProfile()
              throwError('Sikeres mentés!', { toast: true, toastStatus: 'success' })
              navigate('/profil')
              break
            case GroupChangeStatus.INVALID_GROUP:
              setError('Érvénytelen kör!')
              break
            case GroupChangeStatus.LEAVE_DENIED:
              setError('Nem engedélyezett a módosítás!')
              break
            case GroupChangeStatus.UNAUTHORIZED:
              setError('Nem engedélyezett!')
              break
            default:
              setError('Valami nem stimmel.')
              break
          }
        })
        .catch(() => {
          throwError('Nem sikerült a mentés.', { toast: true })
        })
    else setError('Válassz kört!')
  }

  if (!profile || !profile.groupSelectionAllowed) return <Navigate to="/profil" />

  return (
    <Page>
      <Helmet title="Kör beállítása" />
      <Heading align="center">Kör beállítása</Heading>
      <Text mt={10} textAlign="center">
        Állítsd be a körödet, hogy részt vehess a feladatokban!
      </Text>
      <Text color="gray.500" textAlign="center">
        A Vendég jelentése: egyik körbe sem tartozol.
      </Text>
      <form>
        <VStack spacing={5} mt={10} maxW={80} mx="auto">
          <FormControl>
            <FormLabel>Melyik körbe tartozol?</FormLabel>
            <Select
              id="group"
              value={value}
              onChange={(evt) => {
                setValue(evt.target.value)
              }}
            >
              {Object.entries<string>(profile.availableGroups).map((entry) => (
                <option key={entry[0]} value={entry[0]}>
                  {entry[1]}
                </option>
              ))}
            </Select>
          </FormControl>
          <ButtonGroup spacing={4}>
            <LinkButton href="/profil" colorScheme="red" variant="outline">
              Mégse
            </LinkButton>
            <Button onClick={onSubmit} colorScheme="brand">
              Mentés
            </Button>
          </ButtonGroup>
          {error && (
            <Text color="red.500" textAlign="center">
              {error}
            </Text>
          )}
        </VStack>
      </form>
    </Page>
  )
}
