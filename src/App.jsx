import SiteHeader from './components/layout/SiteHeader'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Contact from './components/sections/Contact'
import SiteFooter from './components/layout/SiteFooter'
import ThemeProvider from './theme/ThemeProvider'
import './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
      <SiteFooter />
    </ThemeProvider>
  )
}
