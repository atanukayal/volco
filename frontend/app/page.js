import Header from '../components/Header'
import Hero from '../components/Hero'
import LoginSection from '../components/LoginSection'
import JoinUsSection from '../components/JoinUsSection'
import OrganizationsSection from '../components/OrganizationsSection'
import TeamsSection from '../components/TeamsSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <LoginSection />
      <JoinUsSection />
      <OrganizationsSection />
      <TeamsSection />
      <Footer />
    </main>
  )
}

