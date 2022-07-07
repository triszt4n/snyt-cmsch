import { Flex, Stack, Text } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/system'
import { LinkButton } from 'components/@commons/LinkButton'
import React from 'react'
import { NavItem } from '../../../types/NavItem'
import { NAV_ITEMS } from '../../../utils/navItems'
import { useAuthContext } from '../../../utils/useAuthContext'
import { AuthButton } from '../../@commons/AuthButton'

const MobileNavItem: React.FC<NavItem> = ({ label, href, icon }) => {
  return (
    <LinkButton href={href || '#'} leftIcon={icon}>
      <Flex
        py={2}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text color={useColorModeValue('gray.800', 'gray.200')}>{label}</Text>
      </Flex>
    </LinkButton>
  )
}

const MobileNav: React.FC = () => {
  const { isLoggedIn } = useAuthContext()
  return (
    <Stack p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.filter((navItem) => (navItem.loginRequired && isLoggedIn) || !navItem.loginRequired).map((navItem) => (
        <MobileNavItem key={navItem.label} label={navItem.label} href={navItem.href} />
      ))}
      <AuthButton />
    </Stack>
  )
}

export { MobileNav }
