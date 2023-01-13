import React from "react"
import Link from "next/link"

interface BreadcrumbItem {
  label: string
  path: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex">
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          <Link
            href={item.path}
            className={`text-${
              index !== items.length - 1 ? "gray-600" : "primary"
            } hover:text-primary ${
              index === items.length - 1 ? "font-medium" : ""
            }`}
          >
            {item.label}
          </Link>
          {index !== items.length - 1 && (
            <span className="mx-2 text-primary">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumb
