import React from 'react'
import 'chart.js/auto'
import { Line } from 'react-chartjs-2'

const aggregateData = (tickets) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const statusCounts = {
    unresolved: Array(12).fill(0),
    open: Array(12).fill(0),
    onhold: Array(12).fill(0),
    resolved: Array(12).fill(0),
  }

  tickets?.forEach((ticket) => {
    const date = new Date(ticket.date)
    const month = date.getMonth()
    statusCounts[ticket.status][month] += 1
  })

  return { months, statusCounts }
}

const ChartLineTicket = ({ tickets }) => {
  const { months, statusCounts } = aggregateData(tickets)

  const dataTickets = {
    labels: months,
    datasets: [
      {
        label: 'Unresolved',
        data: statusCounts.unresolved,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        tension: 0.2,
      },
      {
        label: 'Open',
        data: statusCounts.open,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        tension: 0.2,
      },
      {
        label: 'On Hold',
        data: statusCounts.onhold,
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        fill: false,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        tension: 0.2,
      },
      {
        label: 'Resolved',
        data: statusCounts.resolved,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBorderColor: 'rgba(255,255,255,0)',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        tension: 0.2,
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: true,
      },
      x: {
        display: true,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  }

  return <Line data={dataTickets} options={options} />
}

export default ChartLineTicket
