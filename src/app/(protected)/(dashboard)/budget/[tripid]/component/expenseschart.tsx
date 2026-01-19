"use client"

import React from 'react'
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";


const userdata = {
  labels: ["accomodaton","gas","food","trasportation",5,6,7,8,9],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 200, 40,69, 51, 20],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };

const Expenseschart = () => {
  return (
    <div className='border-2 border-purple-400  xl:flex items-center rounded-md justify-center p-2 hidden    base:row-start-3 base:row-end-4 base:col-start-1 base:col-end-2       535:row-start-2 535:row-end-3 535:col-start-1 535:col-end-3      986:row-start-1 986:row-end-5 986:col-start-2 986:col-end-4 '>    
           <Bar data={userdata}/> 
    </div>
  )
}

export default Expenseschart