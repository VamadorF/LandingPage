import Hero from './components/Hero'
import Features from './components/Features'
import Archetypes from './components/Archetypes'
import PreregisterForm from './components/PreregisterForm'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Archetypes />
      <PreregisterForm />
      <TermsOfService />
      <PrivacyPolicy />
      <Footer />
    </main>
  )
}

