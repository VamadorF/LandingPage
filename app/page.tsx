import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Archetypes from './components/Archetypes'
import PreregisterForm from './components/PreregisterForm'
import Footer from './components/Footer'




export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Archetypes />
      <PreregisterForm />
      <Footer />
    </main>
  )
}
