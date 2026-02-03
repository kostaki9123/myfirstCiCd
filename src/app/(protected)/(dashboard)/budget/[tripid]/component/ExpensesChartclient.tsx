"use client"

import { Bar } from "react-chartjs-2"
import "chart.js/auto"
import { BarChart3 } from "lucide-react"

type Props = {
  labels: string[]
  data: number[]
}

const ExpensesChartClient = ({ labels, data }: Props) => {
  const hasData = labels.length && data.some((value) => value > 0)

  if (!hasData) {
    return (
      <div
        className="border-2 border-dashed border-purple-300 xl:flex hidden
        items-center justify-center rounded-md p-6 text-center
        bg-gray-50
        base:row-start-3 base:row-end-4 base:col-start-1 base:col-end-2
        535:row-start-2 535:row-end-3 535:col-start-1 535:col-end-3
        986:row-start-1 986:row-end-5 986:col-start-2 986:col-end-4"
      >
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <BarChart3 className="w-10 h-10 text-purple-400" />
          <p className="text-sm font-medium">
            No expenses yet
          </p>
          <p className="text-xs text-gray-400">
            Add some transactions to see your chart 📊
          </p>
        </div>
      </div>
    )
  }

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expenses by category",
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div
      className="border-2 border-purple-400 xl:flex hidden items-center rounded-md justify-center p-2
      base:row-start-3 base:row-end-4 base:col-start-1 base:col-end-2
      535:row-start-2 535:row-end-3 535:col-start-1 535:col-end-3
      986:row-start-1 986:row-end-5 986:col-start-2 986:col-end-4"
    >
      <Bar data={chartData} />
    </div>
  )
}

export default ExpensesChartClient
