import { NavItem } from '../types/NavItem'

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Bucketlist',
    href: '/bucketlist',
    loginRequired: true
  },
  {
    label: 'QR kódok',
    href: '/qr',
    loginRequired: true
  },
  {
    label: 'Profil',
    href: '/profile',
    loginRequired: true
  }
]
