import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { FaBottleWater } from "react-icons/fa6";
import { BsCupHotFill } from "react-icons/bs";
import { CiBeerMugFull } from "react-icons/ci";

import { pointT } from '@/types/next-authd';
import Avgproductdropdown from './avgproductdropdown';

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Water",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV002",
    paymentStatus: "Cappuccino",
    totalAmount: "$150.00",
  },
  {
    invoice: "INV003",
    paymentStatus: "Beer",
    totalAmount: "$350.00",
  },
  {
    invoice: "INV004",
    paymentStatus: "Water",
    totalAmount: "$450.00",
  },
  {
    invoice: "INV005",
    paymentStatus: "Water",
    totalAmount: "$550.00",
  },
]

const getIcon = (paymentStatus: any) => {
  switch (paymentStatus) {
    case 'Water':
      return <FaBottleWater fontSize="20px" />;
    case 'Cappuccino':
      return <BsCupHotFill fontSize="20px" />;
    case 'Beer':
      return <CiBeerMugFull fontSize="20px" />;
    default:
      return null;
  }
}

type Props = {
  tripId: string
  cyrclesArr: pointT[]
  selectedAvgpcountry?: string
}

const Avgproductprice = (props: Props) => {
  return (
    <div className='bg-[#ACA7CB] p-2 rounded-md overflow-hidden relative    base:row-start-5 base:row-end-6 base:col-start-1 base:col-end-2       535:row-start-4 535:row-end-5 535:col-start-1 535:col-end-2     787:row-start-5 787:row-end-9 787:col-start-3 787:col-end-4 '>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
        Average prices
      </h4>

      {/* Removed the recursive call here */}
      <Avgproductdropdown />

      <Table className='mt-4'>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium hover:bg-[#ACA7CB]"> {getIcon(invoice.paymentStatus)}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Avgproductprice
