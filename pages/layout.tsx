import React from "react"
import { Navbar } from "../components/Navbar"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mt-8 px-12 md:px-24">{children}</div>
      <Navbar bottom={true} />
    </div>
  )
}

export default Layout
