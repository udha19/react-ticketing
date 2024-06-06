import { mdiTableBorder } from '@mdi/js'
import Head from 'next/head'
import { ReactElement } from 'react'
import CardBox from '../components/CardBox'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import SectionTitleLineWithButton from '../components/Section/TitleLineWithButton'
import { getPageTitle } from '../config'
import TableSampleTickets from '../components/Table/SampleTickets'

const TablesPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Tables')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiTableBorder}
          title="Tickets"
        ></SectionTitleLineWithButton>

        <CardBox className="mb-6" hasTable>
          <TableSampleTickets />
        </CardBox>
      </SectionMain>
    </>
  )
}

TablesPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default TablesPage
