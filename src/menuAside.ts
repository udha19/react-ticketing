import {
  mdiAccountCircle,
  mdiMonitor,
  mdiTable,
  mdiAccountSupervisorCircle,
  mdiCog,
  mdiLicense,
  mdiLightbulb,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/tables',
    label: 'Tickets',
    icon: mdiTable,
  },
  {
    href: '/forms',
    label: 'Ideas',
    icon: mdiLightbulb,
  },
  {
    href: '/ui',
    label: 'Contacts',
    icon: mdiAccountSupervisorCircle,
  },
  {
    href: '/profile',
    label: 'Agents',
    icon: mdiAccountCircle,
  },
  {
    href: '/profile',
    label: 'Settings',
    icon: mdiCog,
  },
  {
    href: '/profile',
    label: 'Subscriptions',
    icon: mdiLicense,
  },
]

export default menuAside
