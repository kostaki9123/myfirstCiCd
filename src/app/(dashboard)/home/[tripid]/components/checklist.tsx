import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, label: 'Book flights', checked: false },
    { id: 2, label: 'Reserve hotel', checked: false },
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id:number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const addItem = () => {
    const trimmed = newItem.trim();
    if (!trimmed) return;

    setItems((prev) => [
      ...prev,
      { id: Date.now(), label: trimmed, checked: false },
    ]);
    setNewItem('');
  };

  const deleteItem = (id:number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const markAllDone = () => {
    setItems((prev) => prev.map((item) => ({ ...item, checked: true })));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Open checklist"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12h6m2 6H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v2"
            />
          </svg>
          <span className="font-semibold text-sm sm:text-base">Checklist</span>
        </button>
      </DialogTrigger>

      <DialogContent className="w-[90vw] sm:w-[400px] max-w-full">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Trip Checklist</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Add, check off, or remove tasks to plan your trip.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4 max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 bg-gray-50 px-3 py-2 rounded-md"
            >
              <label className="flex items-center space-x-3 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => toggleItem(item.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span
                  className={`text-sm sm:text-base ${
                    item.checked ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {item.label}
                </span>
              </label>

              <button
                onClick={() => deleteItem(item.id)}
                className="text-red-500 hover:text-red-700 text-md"
                aria-label="Delete item"
                title="Delete"
              >
                <MdDeleteOutline />
              </button>
            </div>
          ))}

          {/* Input to add new item */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addItem()}
              placeholder="Add new item"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={addItem}
              className="rounded-md bg-blue-600 px-4 py-2 text-white text-sm transition hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={markAllDone}
            className="mt-4 w-full rounded-md bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            Mark All as Done
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Checklist;
