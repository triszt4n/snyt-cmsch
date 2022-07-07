import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { LinkButton } from 'components/@commons/LinkButton'
import React from 'react'
import { NAV_ITEMS } from '../../../utils/navItems'
import { useAuthContext } from '../../../utils/useAuthContext'
import { AuthButton } from '../../@commons/AuthButton'

const DesktopNav: React.FC = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.filter((navItem) => (navItem.loginRequired && isLoggedIn) || !navItem.loginRequired).map((navItem) => (
        <Box key={navItem.label} p={2}>
          <LinkButton href={navItem.href || '#'} style={navItem.href ? {} : { cursor: 'default' }} variant="ghost" leftIcon={navItem.icon}>
            <HStack
              _hover={{
                textDecoration: 'none',
                color: useColorModeValue('brand.500', 'brand.600')
              }}
            >
              <Text fontSize="md" fontWeight={500}>
                {navItem.label}
              </Text>
            </HStack>
          </LinkButton>
        </Box>
      ))}
      <AuthButton />
    </Stack>
  )
}

export { DesktopNav }
