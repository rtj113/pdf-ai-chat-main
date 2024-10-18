"use client"
import { useState, useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo transforma Platika mis documentos en conversaciones?",
    answer: "Platika utiliza modelos de IA avanzados para analizar sus documentos y generar respuestas en tiempo real. Simplemente cargue sus archivos PDF y comience a hacer preguntas como si estuviera conversando con un experto en el contenido.",
  },
  {
    question: "¿Qué tipos de documentos puedo usar con Platika?",
    answer: "Platika es compatible exclusivamente con archivos PDF. Nuestra plataforma procesa y analiza eficientemente cualquier documento PDF, permitiéndole interactuar con su contenido de manera inteligente.",
  },
  {
    question: "¿Es seguro usar Platika con documentos confidenciales?",
    answer: "Absolutamente. La seguridad es nuestra prioridad. Implementamos encriptación de nivel bancario, autenticación de dos factores y cumplimos con estándares internacionales como GDPR y HIPAA para garantizar la protección de sus datos confidenciales.",
  },
  {
    question: "¿Cómo mejora Platika mi productividad?",
    answer: "Platika elimina la necesidad de búsquedas manuales en documentos extensos. Obtiene respuestas precisas en segundos, ahorrándole horas de lectura y permitiéndole concentrarse en tareas de mayor valor. Es como tener un asistente experto disponible 24/7.",
  },
  {
    question: "¿Puedo integrar Platika con mis sistemas existentes?",
    answer: "Sí, Platika está diseñado para integrarse de manera segura con sus sistemas actuales. Ofrecemos APIs y opciones de integración personalizadas para garantizar una experiencia fluida y potenciar sus flujos de trabajo existentes.",
  },
  {
    question: "¿Platika es adecuado para equipos o solo para uso individual?",
    answer: "Platika es versátil y escalable. Es ideal tanto para profesionales individuales como para equipos y grandes empresas. Ofrecemos funciones de colaboración y opciones de gestión de acceso para facilitar el trabajo en equipo y el intercambio seguro de conocimientos.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto my-16 p-4">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isActive={activeIndex === index}
            onClick={() => toggleFAQ(index)}
          />
        ))}
      </div>
    </div>
  );
}

interface FAQItemProps {
  faq: { question: string; answer: string };
  isActive: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isActive, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`p-4 bg-white rounded-xl shadow-md border border-gray-200 transition-all duration-300 ${
        isActive ? "bg-white border-indigo-500" : ""
      }`}
    >
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={onClick}
      >
        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
        {isActive ? (
          <ChevronUp className="text-indigo-500 w-6 h-6 transition-transform duration-300" />
        ) : (
          <ChevronDown className="text-gray-400 w-6 h-6 transition-transform duration-300" />
        )}
      </button>
      <div
        ref={contentRef}
        className="mt-3 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isActive ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isActive ? 1 : 0,
        }}
      >
        <p className="text-muted-foreground text-base leading-6">{faq.answer}</p>
      </div>
    </div>
  );
};
