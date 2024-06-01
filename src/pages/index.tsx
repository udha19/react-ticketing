import {
  mdiAlertCircle,
  mdiArchiveCheck,
  mdiCalendarAlert,
  mdiChartTimelineVariant,
  mdiListBoxOutline,
} from '@mdi/js'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import CardBoxWidget from '../components/CardBox/Widget'
import { useTicketData } from '../hooks/sampleData'
import CardBox from '../components/CardBox'

import ChartLineTicket from '../components/ChartLineTicket'

import { getPageTitle } from '../config'

const DashboardPage = () => {
  const { tickets } = useTicketData()

  const [ticketData, setTicketData] = useState([])

  const [unresolved, setUnresolved] = useState(0)
  const [overdue, setOverdue] = useState(0)
  const [onhold, setOnhold] = useState(0)
  const [open, setOpen] = useState(0)

  useEffect(() => {
    if (tickets != undefined && tickets.length > 1) {
      const ticketData = tickets?.filter((ticket) => {
        const now = new Date()
        const ticketDate = new Date(ticket.date)
        const diff = now.getTime() - ticketDate.getTime()
        const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24))
        return dayDiff < 365
      })
      setTicketData(ticketData)
      const unresolved = tickets?.filter((ticket) => ticket.status === 'unresolved').length
      setUnresolved(unresolved)
      const hold = tickets?.filter((ticket) => ticket.status === 'onhold').length
      setOnhold(hold)
      const open = tickets?.filter((ticket) => ticket.status === 'open').length
      setOpen(open)
      const overdue = tickets?.filter((ticket) => {
        const now = new Date()
        const ticketDate = new Date(ticket.date)
        const diff = now.getTime() - ticketDate.getTime()
        const dayDiff = Math.floor(diff / (1000 * 60 * 60 * 24))
        return ticket.status === 'onhold' && dayDiff > 7
      }).length
      setOverdue(overdue)
    }
  }, [tickets])

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title="Overview"
          main
        ></SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
          <CardBoxWidget
            icon={mdiAlertCircle}
            iconColor="danger"
            number={unresolved}
            label="Unresolved"
          />
          <CardBoxWidget
            icon={mdiCalendarAlert}
            iconColor="danger"
            number={overdue}
            numberPrefix=""
            label="Overdue"
          />
          <CardBoxWidget icon={mdiListBoxOutline} iconColor="info" number={open} label="Open" />
          <CardBoxWidget icon={mdiArchiveCheck} iconColor="info" number={onhold} label="Onhold" />
        </div>

        <CardBox className="mb-6">{<ChartLineTicket tickets={ticketData} />}</CardBox>
      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
