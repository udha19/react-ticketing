import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useSampleClients = () => {
  const { data, error } = useSWR('/admin-one-react-tailwind/data-sources/clients.json', fetcher)

  return {
    clients: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useSampleTransactions = () => {
  const { data, error } = useSWR('/admin-one-react-tailwind/data-sources/history.json', fetcher)

  return {
    transactions: data?.data ?? [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useTicketData = () => {
  const { data, error } = useSWR(
    'https://01043aff152941ce898de26d6f4a31bc.api.mockbin.io/',
    fetcher
  )

  return {
    tickets: data,
    isLoading: !error && !data,
    isError: error,
  }
}
