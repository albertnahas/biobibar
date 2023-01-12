import { AboutSection } from "../components/AboutSection"
import { ArrivalsSection } from "../components/ArrivalsSection"
import { BannerSection } from "../components/BannerSection"
import { CategoriesSection } from "../components/CategoriesSection"
import { CircleSection } from "../components/CirclesSection"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CircleSection />
      <ArrivalsSection />
      <CategoriesSection />
      <BannerSection />
      <div className="container mx-auto px-4 py-2">
        {/* your home page content */}
      </div>
    </div>
  )
}

export default Home
