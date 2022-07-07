import { NavItem } from '../types/NavItem'
import { GiFishBucket } from 'react-icons/gi'
import { MdQrCode2 } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Bucketlist',
    href: '/bucketlist',
    loginRequired: true,
    icon: <GiFishBucket />
  },
  {
    label: 'Kódgyűjtés',
    href: '/qr',
    loginRequired: true,
    icon: <MdQrCode2 />
  },
  {
    label: 'Profil',
    href: '/profile',
    loginRequired: true,
    icon: <FaUserCircle />
  }
]
