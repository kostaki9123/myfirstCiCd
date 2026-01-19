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
    description: "Steak restaurant",
    category: "Food" ,
    amount: "$250.00",
  
  },
  {
     description: "Food",
     category: "Food",
     amount: "$150.00",   
  },
  {
    category: "Gas",
    description: "gas for rent car",
    amount: "$250.00",
  },
  {
    
    description: "gas for rent car",
    category: "Gas" ,
    amount: "$100.00",
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
                 <TableHead className="w-[100px]">Description</TableHead>
                 <TableHead>Category</TableHead>
                 <TableHead className="text-right">Amount</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {invoices.map((invoice ,key) => (
                 <TableRow key={key} >
                   <TableCell className="font-medium">{invoice.description}</TableCell>
                   <TableCell>{invoice.category}</TableCell>                
                   <TableCell className="text-right">{invoice.amount}</TableCell>
                 </TableRow>
               ))}
             </TableBody>
        </Table>
    </div>
  )
}

export default Allexpenses