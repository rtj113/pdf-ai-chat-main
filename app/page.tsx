import { Button } from "@/components/ui/button";
import { BicepsFlexed, GlobeIcon, ZapIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FAQ from "@/components/Faq";

const features = [
  {
    name: "Almacene sus Documentos PDF",
    description: "Guarde todos sus archivos PDF importantes de manera segura y acceda a ellos fácilmente en cualquier momento y lugar.",
    icon: GlobeIcon
  },
  {
    name: "Respuestas en Tiempo Real",
    description: "Experimente respuestas ultrarrápidas con nuestros avanzados modelos de IA, que le garantizan la máxima información que necesita.",
    icon: ZapIcon
  },
  {
    name: "Aumente su Productividad",
    description: "Con Platika, ahorre tiempo y concéntrese en lo que realmente importa. No más búsquedas interminables en sus documentos.",
    icon: BicepsFlexed
  },
]

const securityFeatures = [
  "Autenticación de dos factores para proteger su cuenta",
  "Cumplimiento con estándares internacionales (GDPR, HIPAA, etc.)",
  "Auditorías de seguridad regulares y pruebas de penetración",
  "Control total sobre sus datos con opciones de eliminación permanente",
];

const cards = [
  {
    title: "Soluciones Innovadoras",
    content: "Transforme sus documentos en diálogos interactivos. Nuestra IA avanzada analiza y responde a sus preguntas, proporcionando información valiosa al instante.",
    image: "/magnifying-glass.png?height=200&width=300"
  },
  {
    title: "Acceso Rápido a la Información",
    content: "ídese de buscar manualmente en documentos extensos. Platika extrae la información relevante en segundos, ahorrándole tiempo y aumentando su productividad.",
    image: "/gradience.png?height=200&width=300"
  },
  {
    title: "Seguridad y Escalabilidad",
    content: "Proteja sus datos confidenciales con nuestra plataforma segura y escalable. Ideal para usuarios individuales, startups y grandes empresas por igual.",
    image: "/data-security.png?height=200&width=300"
  }
]

const experienceFeatures = [
  "Interfaz intuitiva para conversaciones naturales con sus documentos",
  "Respuestas precisas basadas en el contexto de sus archivos",
  "Integración segura con sus sistemas existentes",
  "Actualizaciones continuas con los últimos avances en IA",
];

const reviews = [
  {
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Marketing Director",
    rating: 5,
    comment: "Una plataforma increíble que ha aumentado nuestra productividad. Las funciones de análisis son de primera categoria y el servicio de atención al cliente es siempre responde. Muy recomendable para cualquier empresa en crecimiento."
  },
  {
    name: "Sara Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Director de producto",
    rating: 5,
    comment: "Ha cambiado las reglas del juego de nuestra gestión de proyectos. Interfaz intuitiva, fácil de incorporar a los miembros del equipo. Me encantan las opciones de personalización. Ha mejorado significativamente nuestro flujo de trabajo."
  },
  {
    name: "Dr. Elena García",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Investigadora Senior",
    rating: 4,
    comment: "Platika ha revolucionado mi proceso de investigación. Puedo cargar extensos artículos académicos y obtener resúmenes precisos al instante. La capacidad de hacer preguntas específicas sobre el contenido ahorra horas de lectura. Es una herramienta indispensable para cualquier investigador que maneje grandes volúmenes de documentación."
  },
  {
    name: "Emily Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Diseñador autónomo",
    rating: 5,
    comment: "Impresionante para la investigación de documentos. Puedo cargar informes del sector y obtener información clave en cuestión de segundos. Ha acelerado enormemente nuestro proceso de creación y estrategia de contenidos."
  },
  {
    name: "Sofia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Estudiante de Posgrado",
    rating: 5,
    comment: "Platika es un salvavidas para mis estudios. Puedo cargar artículos académicos y obtener resúmenes claros al instante. Me ayuda a comprender conceptos complejos rápidamente y a encontrar información relevante para mis ensayos. ¡Ha mejorado enormemente mi eficiencia en la investigación!"
  }
]

const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export default function Home() {
  return (
    <main className="relative flex-1 p-2 lg:p-5 bg-gradient-to-bl from-gray-700 to-violet-800 bg-black bg-opacity-40">
      <div className="absolute inset-0 bg-noise pointer-events-none"></div>
      <div className="relative z-10 bg-white py-24 sm:py-32 rounded-md drop-shadow-xl flex-1">
        <div className="relative flex flex-col items-center justify-center mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="absolute inset-0 z-0">
            <div className="relative h-full w-full bg-white">
              <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full">
            {/* Copy on the left */}
            <div className="w-full lg:w-1/2 lg:pr-12">
              <h3 className="text-base font-semibold leading-7 tracking-tight text-indigo-600">Tu Compañero Interactivo de Documentos</h3>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Convierte tus Documentos En Conversaciones Reales</h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Introduciendo{" "}
                <span className="font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Platika
                </span>
                <br />
                <br /> Sube tu documento y Platika se encargará de responder todas tus preguntas. Ideal para
                <span>{" "}todos{" "}</span>
                <span className="font-bold">y haz conversaciones más productivas</span> escalando tus proyectos.
              </p>
              <Button asChild className="mt-8 relative z-10 bg-indigo-600 hover:bg-indigo-500 hover:text-white shadow-md" size="lg">
                <Link href="/dashboard">Inicie Su Conversación Gratuita</Link>
              </Button>
            </div>

            {/* Image on the right */}
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 relative">
              <Image 
                src="/hero-image-summary.png"
                width={2432}
                height={1442}
                alt="Platika"
                className="rounded-xl shadow-2xl ring-1 ring-gray-900/10"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-white/95 pt-[15%] rounded-b-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div aria-hidden="true" className="relative">

          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-white sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <div className="inline text-xl font-bold text-white">
                <feature.icon className="absolute left-1 top-1 h-6 w-6 text-indigo-500" />
                {feature.name}
              </div>
              <dd>{feature.description}</dd>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src="/featured-image-unicorn.png"
              alt="Security illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">Seguridad Inquebrantable para sus Documentos</h2>
            <p className="text-lg text-white">
            En Platika, entendemos que sus documentos contienen información vital y confidencial. 
            Nuestra plataforma no solo transforma sus archivos en conversaciones inteligentes, 
            sino que también los protege con medidas de seguridad de vanguardia. Disfrute de la 
            innovación sin comprometer la confidencialidad.
            </p>
            <ul className="space-y-2">
              {securityFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>          
            </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">Experimente la Diferencia</h2>
            <p className="text-lg text-white">
            Platika revoluciona la forma en que interactúa con sus documentos. Nuestra plataforma impulsada por IA está diseñada para ofrecerle una experiencia única, permitiéndole extraer información valiosa de manera rápida y eficiente. 
            Olvídese de las búsquedas tediosas y descubra una nueva forma de trabajar con sus archivos.
            </p>
            <ul className="space-y-2">
              {experienceFeatures.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <CheckIcon className="w-5 h-5 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="bg-white text-primary hover:bg-indigo-500 hover:text-white" size="lg">Puebra Platika gratis</Button>
          </div>
          <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-0 bg-indigo-400 opacity-15 rounded-lg z-10"></div>
            <Image
              src="/unicorn.png?height=400&width=600"
              alt="Platform dashboard showcase"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl mb-8 text-center">
          Descubra Nuestras Principales Ofertas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={card.image}
                  alt={`Illustration for ${card.title}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-xl mb-2">{card.title}</CardTitle>
                <p className="text-muted-foreground">{card.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="relative z-10 mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Lo Que Dicen Nuestros Clientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card 
              key={index} 
              className={`bg-primary text-primary-foreground transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
                ${index % 2 !== 0 ? 'sm:mt-8' : ''}
              `
              }
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} alt={review.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground font-light">
                    {getInitials(review.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm opacity-90">{review.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{review.comment}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-primary-foreground opacity-50'}`} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> 
      
      <FAQ />
      
      <section className="relative z-10 mt-16 mb-10 sm:mt-20 md:mt-24">
        <div className="text-primary-foreground py-16 px-4 w-full">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="text-center space-y-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl md:text-5xl">
                  ¿Listo para convertir sus documentos en conversaciones interactivas?
                </h2>
                <p className="text-lg mx-auto">
                  Únase a miles de clientes satisfechos que han revolucionado sus interacciones documentales. Experimente el poder de las conversaciones basadas en IA con Platika.
                </p>
                <div className="pt-4">
                  <Button size="lg" variant="secondary" className="text-primary hover:bg-indigo-500 hover:text-white">
                    <Link href="/dashboard">Inicie Su Conversación</Link>
                  </Button>
                </div>
                <p className="text-sm opacity-80">
                  Pruebe Platika con dos documentos gratis, sin tarjeta de crédito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main> 
  );
}
