import { AboutSection } from "../components/AboutSection"
import { ArrivalsSection } from "../components/ArrivalsSection"
import { BannerSection } from "../components/BannerSection"
import { CategoriesSection } from "../components/CategoriesSection"
import { CircleSection } from "../components/CirclesSection"
import { Contact } from "../components/Contact"
import { Footer } from "../components/Footer"
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
      <div className="md:pt-40 md:px-40">
        <Contact />
        <Footer />
      </div>
      <Navbar bottom={true} />
    </div>
  )
}

export default Home
