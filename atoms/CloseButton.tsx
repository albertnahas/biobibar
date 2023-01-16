import React from "react"

export const CloseButton = ({
  onClick,
  transparent,
}: {
  onClick: () => void
  transparent?: boolean
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md ${
        transparent ? "" : "bg-white"
      } p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
      onClick={onClick}
    >
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  )
}
