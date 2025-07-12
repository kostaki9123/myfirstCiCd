import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const Allexpenses = () => {
  return (
    <div className=' bg-[#ACA7CB] overflow-y-auto relative rounded-md p-2       base:row-start-4 base:row-end-5 base:col-start-1 base:col-end-2           535:row-start-2 535:row-end-3 535:col-start-1 535:col-end-3        986:row-start-5 986:row-end-9 986:col-start-1 986:col-end-3 '>
         <h4 className=" bg-[#ACA7CB] scroll-m-20 text-xl font-semibold tracking-tight   z-10  ">
             Expenses
         </h4>
            <Table>
             <TableHeader>
               <TableRow>
                 <TableHead className="w-[100px]">Invoice</TableHead>
                 <TableHead>Status</TableHead>
                 <TableHead>Method</TableHead>
                 <TableHead className="text-right">Amount</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {invoices.map((invoice) => (
                 <TableRow key={invoice.invoice}>
                   <TableCell className="font-medium">{invoice.invoice}</TableCell>
                   <TableCell>{invoice.paymentStatus}</TableCell>
                   <TableCell>{invoice.paymentMethod}</TableCell>
                   <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
              </TableFooter>
        </Table>
    </div>
  )
}

export default Allexpenses