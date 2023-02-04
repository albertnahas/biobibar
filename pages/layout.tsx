import React from "react"
import Facebook from "../components/Facebook"
import { Navbar } from "../components/Navbar"

interface LayoutProps {
  children: React.ReactNode
  isAdmin?: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, isAdmin }) => {
  return (
    <div>
      <Navbar isAdmin={isAdmin} />
      <div className="container mt-8 px-12 lg:px-24">{children}</div>
      <Facebook />
      <Navbar isAdmin={isAdmin} bottom={true} />
    </div>
  )
}

export default Layout
