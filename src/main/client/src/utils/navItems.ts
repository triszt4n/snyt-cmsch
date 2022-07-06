import { NavItem } from '../types/NavItem'

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Bucketlist',
    href: '/bucketlist',
    loginRequired: true
  },
  {
    label: 'Kódgyűjtés',
    href: '/qr',
    loginRequired: true
  },
  {
    label: 'Profil',
    href: '/profile',
    loginRequired: true
  }
]
