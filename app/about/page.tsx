import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us | Platika PDF',
  description: 'Learn more about Platika PDF, our mission, and core values.',
}

const TopHeadline = () => (
  <div className="bg-white text-center py-16 mb-10 mt-16">
    <div className="max-w-5xl mx-auto px-6 lg:px-10">
      <p className="text-violet-600 tracking-tight font-semibold mb-2 leading-7 text-base">Acerca de nosotros</p>
      <h1 className="text-6xl font-semibold tracking-tight text-gray-900 mb-4">Fomento de la innovación en la interacción con documentos</h1>
      <p className="text-lg text-muted-foreground border-b-2 border-gray-200 pb-10">
        Estamos aquí para transformar la forma en que los profesionales crean, visualizan e interactúan con sus documentos.
      </p>
    </div>
  </div>
)

const InfoSection = () => (
  <div className="mb-24 mt-16">
    <h3 className="text-3xl font-semibold text-center tracking-tight text-white mb-6">Quiénes Somos</h3>
    <p className="text-white text-lg text-center max-w-3xl mx-auto leading-7">
    Platika PDF es una plataforma vanguardista de interacción con documentos que aprovecha la IA para revolucionar la forma de trabajar con documentos PDF. 
    <br />
    <br />
    Nuestra misión es hacer que el análisis de documentos y la recuperación de información sean tan intuitivos como mantener una conversación, capacitando a estudiantes, 
    investigadores, profesionales y propietarios de empresas para aumentar la productividad y extraer información valiosa con facilidad.
    </p>
  </div>
)

const CoreValueCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h4 className="text-xl font-semibold text-indigo-600 mb-3">{title}</h4>
    <p className="text-muted-foreground">{description}</p>
  </div>
)

const CoreValuesSection = () => (
  <div className='mt-16'>
    <h3 className="text-2xl font-semibold text-center text-white mb-8">Nuestros Valores Fundamentales</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <CoreValueCard 
        title="Integridad" 
        description="Mantenemos los más altos estándares de honestidad y transparencia en todas nuestras interacciones." 
      />
      <CoreValueCard 
        title="Innovación" 
        description="Superamos continuamente los límites de lo que es posible en el análisis de documentos y IA."
      />
      <CoreValueCard 
        title="Trabajo en equipo" 
        description="Creemos en el poder de la colaboración para lograr resultados extraordinarios."
      />
    </div>
  </div>
)

const ClosingSection = () => (
  <div className="bg-white text-center py-16 pb-20">
    <div className="max-w-5xl mx-auto px-6 lg:px-10">
      <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-6">Experimente el futuro de la interacción con documentos</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Descubra cómo Platika PDF puede transformar su flujo de trabajo. Comience su viaje hacia el análisis de documentos sin esfuerzo.
      </p>
      <Button variant="default" size="lg" className="bg-violet-600 hover:bg-violet-700 text-white" asChild>
        <Link href="/dashboard">
          Empieza Ahora
        </Link>
      </Button>
    </div>
  </div>
)

export default function AboutPage() {
  return (
    <main className="flex-1">
      <TopHeadline />
      <div className="bg-gradient-to-bl from-gray-700 to-violet-800 py-12 px-6 lg:py-16 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <InfoSection />
          <CoreValuesSection />
        </div>
      </div>
      <ClosingSection />
    </main>
  )
}