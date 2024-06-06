import {
  mdiAccount,
  mdiCogOutline,
  mdiEmail, mdiThemeLightDark
} from '@mdi/js'
import { MenuNavBarItem } from './interfaces'

const menuNavBar: MenuNavBarItem[] = [
  {
    icon: mdiThemeLightDark,
    label: 'Light/Dark',
    isDesktopNoLabel: true,
    isToggleLightDark: true,
  },
  {
    isCurrentUser: true,
    menu: [
      {
        icon: mdiAccount,
        label: 'My Profile',
        href: '/profile',
      },
      {
        icon: mdiCogOutline,
        label: 'Settings',
      },
      {
        icon: mdiEmail,
        label: 'Messages',
      },
      {
        isDivider: true,
      },
    ],
  },
]

export default menuNavBar
