import { Stack } from '@chakra-ui/react'
import { LinkButton } from 'components/@commons/LinkButton'
import React from 'react'
import { NAV_ITEMS } from '../../../utils/navItems'
import { useAuthContext } from '../../../utils/useAuthContext'
import { AuthButton } from '../../@commons/AuthButton'

const MobileNav: React.FC = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <Stack p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.filter((navItem) => (navItem.loginRequired && isLoggedIn) || !navItem.loginRequired).map((navItem) => (
        <LinkButton key={navItem.label} href={navItem.href || '#'} leftIcon={navItem.icon} variant="ghost">
          {navItem.label}
        </LinkButton>
      ))}
      <AuthButton />
    </Stack>
  )
}

export { MobileNav }
