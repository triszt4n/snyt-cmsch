import { Box, Stack } from '@chakra-ui/react'
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
            {navItem.label}
          </LinkButton>
        </Box>
      ))}
      <AuthButton />
    </Stack>
  )
}

export { DesktopNav }
