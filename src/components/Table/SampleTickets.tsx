import { mdiCheck, mdiClose, mdiRefresh, mdiSearchWeb, mdiSort } from '@mdi/js'
import { useEffect, useState } from 'react'
import { useTicketData } from '../../hooks/sampleData'
import Button from '../Button'
import Buttons from '../Buttons'
import UserAvatar from '../UserAvatar'
import PillTag from '../PillTag'
import { format } from 'date-fns'
import FormField from '../Form/Field'
import { Field, Form, Formik, useFormik } from 'formik'
import * as Yup from 'yup'

const TableSampleTickets = () => {
  const { tickets } = useTicketData()
  const [ticketData, setTicketData] = useState([])
  const perPage = 10

  const [currentPage, setCurrentPage] = useState(0)

  const setPrevPage = (prev) => {
    setCurrentPage(prev)
  }

  const setNextPage = (next) => {
    setCurrentPage(next)
  }
  const [ticketsPaginated, setTicketsPaginated] = useState([])

  const dataMutation = (sorted) => {
    const ticket = sorted?.slice(perPage * currentPage, perPage * (currentPage + 1))
    setTicketsPaginated(ticket)
  }
  useEffect(() => {
    const ticket = ticketData?.slice(perPage * currentPage, perPage * (currentPage + 1))
    setTicketsPaginated(ticket)
  }, [ticketData])

  const numPages = ticketData?.length / perPage

  const pagesList = []
  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const lastPage = pagesList.length - 1

  const getPagination = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []
    let l

    range.push(1)
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i >= 2 && i <= lastPage - 1) {
        range.push(i)
      }
    }
    range.push(lastPage)

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    })

    return rangeWithDots
  }

  useEffect(() => {
    setTicketData(tickets)
  }, [tickets])

  const formatDate = (d) => {
    return format(new Date(d), 'dd MMM yyyy')
  }
  const sortData = (e) => {
    const val = e.target.value
    let sorted = []
    switch (val) {
      case 'date-asc':
        sorted = ticketData.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateB.getTime() - dateA.getTime()
        })
        dataMutation(sorted)
        break
      case 'date-desc':
        sorted = ticketData.sort((a, b) => {
          const dateA = new Date(a.date)
          const dateB = new Date(b.date)
          return dateA.getTime() - dateB.getTime()
        })
        dataMutation(sorted)
        break
      case 'name-asc':
        sorted = ticketData.sort((a, b) =>
          a.customer_name.toLowerCase() < b.customer_name.toLowerCase()
            ? -1
            : a.customer_name.toLowerCase() > b.customer_name.toLowerCase()
            ? 1
            : 0
        )
        dataMutation(sorted)
        break
      case 'name-desc':
        sorted = ticketData.sort((a, b) =>
          a.customer_name.toLowerCase() > b.customer_name.toLowerCase()
            ? -1
            : a.customer_name.toLowerCase() < b.customer_name.toLowerCase()
            ? 1
            : 0
        )
        dataMutation(sorted)
        break
      default:
        break
    }
  }
  const formik = useFormik({
    initialValues: {
      search: '',
      sort: 'date-asc',
    },
    validationSchema: Yup.object({
      search: Yup.string(),
    }),
    onSubmit: (values) => {
      const searchQuery = values.search.toLowerCase()
      const filtered = ticketData.filter(
        (ticket) =>
          ticket.customer_name.toLowerCase().includes(searchQuery) ||
          ticket.detail.toLowerCase().includes(searchQuery)
      )
      dataMutation(filtered)
    },
  })

  return (
    <>
      <div className="m-4 flex">
        <div className="w-10/12">
          <Formik
            initialValues={{
              search: '',
              sort: 'green',
            }}
            onSubmit={() => formik.handleSubmit()}
          >
            <Form>
              <FormField label="Search and filter" icons={[mdiSearchWeb, mdiSort]}>
                <Field
                  type="search"
                  name="search"
                  placeholder="search"
                  onChange={formik.handleChange}
                  value={formik.values.search}
                />
                <Field
                  name="color"
                  id="color"
                  component="select"
                  onChange={(event) => sortData(event)}
                >
                  <option value="date-asc">Newest</option>
                  <option value="date-desc">Oldest</option>
                  <option value="name-asc">Name Ascending</option>
                  <option value="name-desc">Name Descending</option>
                </Field>
              </FormField>
            </Form>
          </Formik>
        </div>
        <div className="w-2/12 h-full m-2 content-end self-end">
          <Button label="" icon={mdiRefresh} color="lightDark" className=" mx-4 self-end"></Button>
        </div>
      </div>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th />
            <th>Detail</th>
            <th>Customer Name</th>
            <th>Date</th>
            <th>Priority</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {/* eslint-disable-next-line */}
          {ticketsPaginated?.map((tickets: any) => (
            <tr key={tickets?.ticket_id}>
              <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar
                  username={tickets?.customer_name}
                  className="w-24 h-24 mx-auto lg:w-6 lg:h-6"
                />
              </td>
              <td data-label="Detail">{tickets?.detail}</td>
              <td data-label="Customer Name">{tickets?.customer_name}</td>
              <td data-label="Date">
                <small className="text-gray-500 dark:text-slate-400">
                  {formatDate(tickets?.date)}
                </small>
              </td>
              <td data-label="Priority" className="lg:w-32 text-center">
                {(() => {
                  if (tickets.priority == 'low') {
                    return <PillTag color="success" label={tickets.priority} />
                  } else if (tickets.priority == 'medium') {
                    return <PillTag color="warning" label={tickets.priority} />
                  } else {
                    return <PillTag color="danger" label={tickets.priority} />
                  }
                })()}
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <Buttons type="justify-start lg:justify-end" noWrap>
                  <Button color="info" icon={mdiCheck} small />
                  <Button color="danger" icon={mdiClose} small />
                </Buttons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 py-8 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <Buttons>
            {pagesList.length > 5 ? (
              <>
                <Button
                  label="<"
                  color="lightDark"
                  small
                  onClick={() => setPrevPage(currentPage - 1)}
                />

                {getPagination().map((page, index) => (
                  <Button
                    key={index}
                    small
                    onClick={() => setCurrentPage(index)}
                    disabled={page === '...' || index === currentPage}
                    color={page === currentPage ? 'lightDark' : 'whiteDark'}
                    label={page}
                  />
                ))}
                <Button
                  label=">"
                  color="lightDark"
                  small
                  onClick={() => setNextPage(currentPage + 1)}
                />
              </>
            ) : (
              pagesList.map((page) => (
                <Button
                  key={page}
                  active={page === currentPage}
                  label={page + 1}
                  color={page === currentPage ? 'lightDark' : 'whiteDark'}
                  small
                  onClick={() => setCurrentPage(page)}
                />
              ))
            )}
          </Buttons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {lastPage}
          </small>
        </div>
      </div>
    </>
  )
}

export default TableSampleTickets
