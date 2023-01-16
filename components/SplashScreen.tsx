import Image from "next/image"
import React from "react"

export const SplashScreen = () => {
  return (
    <div id="splashscreen" className="align-items-center fixed top-0 right-0 flex h-screen w-screen animate-delayedFade justify-center bg-primary">
      <Image
        width="600"
        height="200"
        style={{ objectFit: "contain" }}
        src="/animation.webp"
        alt="Loading animation"
      />
    </div>
  )
}
