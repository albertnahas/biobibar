import React from "react"

export const Animate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-aos="fade-in" data-aos-duration="1000">
      {children}
    </div>
  )
}
