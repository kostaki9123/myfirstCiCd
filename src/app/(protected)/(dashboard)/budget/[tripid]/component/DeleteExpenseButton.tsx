'use client'

import React, { useState } from 'react'
import { deleteExpense } from '../action'

type Props = {
  budgetId: string
  expenseId: string
  onDeleted?: () => void // optional callback to refresh parent
}

const DeleteExpenseButton = ({ expenseId, onDeleted,budgetId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) return

    try {

      const actionFormData = new FormData()
       console.log(budgetId)
       actionFormData.append('expenseId', expenseId)
       actionFormData.append('budgetId', budgetId)

      setIsDeleting(true)
      await deleteExpense(actionFormData)

      // Notify parent to refresh or re-fetch
      if (onDeleted) onDeleted()
    } catch (err) {
      console.error('❌ Error deleting expense:', err)
      alert('Failed to delete expense')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <button
      className="text-red-600 hover:underline text-sm"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Deleting…' : 'Delete'}
    </button>
  )
}

export default DeleteExpenseButton
