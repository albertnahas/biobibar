import React, { useState } from "react"

function DeleteConfirmation({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void
  onCancel: () => void
}) {
  const handleConfirm = () => {
    onConfirm()
  }
  const handleCancel = () => {
    onCancel()
  }

  return (
    <>
      <div
        style={{ background: "rgba(0,0,0,0.7)" }}
        className="z-1 fixed inset-x-0 top-0 left-0 m-auto h-screen w-screen"
      ></div>
      <div
        style={{ width: 350 }}
        className="fixed inset-x-0 left-0 right-0 top-1/2 z-50 m-auto px-4 pb-6 shadow-2xl"
      >
        <div className="rounded-lg bg-white px-4 py-3 shadow-md">
          <div className="mb-3">
            <p className="text-lg leading-5 text-gray-700">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex justify-end">
            <button
              className="px- rounded-l bg-transparent py-2 text-primary hover:bg-gray-300"
              onClick={handleConfirm}
            >
              Delete
            </button>
            <button
              className="rounded-r bg-transparent py-2 px-4 text-gray-500 hover:text-gray-500"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteConfirmation
