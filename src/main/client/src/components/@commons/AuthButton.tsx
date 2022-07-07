import React from 'react'
import { Button } from '@chakra-ui/react'
import { useAuthContext } from '../../utils/useAuthContext'
import { FaSignInAlt } from 'react-icons/fa'

export const AuthButton: React.FC = () => {
  const { isLoggedIn, login } = useAuthContext()
  if (isLoggedIn) return null
  return (
    <Button colorScheme="brand" onClick={login} leftIcon={<FaSignInAlt />}>
      Bejelentkezés
    </Button>
  )
}
