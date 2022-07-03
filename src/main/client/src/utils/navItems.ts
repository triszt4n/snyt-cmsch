import { NavItem } from '../types/NavItem'

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Bucketlist',
    href: '/bucketlist',
    loginRequired: true
  },
  {
    label: 'Riddle',
    href: '/riddles',
    loginRequired: true
  },
  {
    label: 'QR pecsétek',
    href: '/qr',
    loginRequired: true
  },
  {
    label: 'Profil',
    href: '/profile',
    loginRequired: true
  }
]
