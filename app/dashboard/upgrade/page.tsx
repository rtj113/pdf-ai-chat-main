"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { CheckIcon } from "lucide-react";
import useSubscription from "@/hooks/useSubscription";
import React, { useState, useTransition } from "react";
import getStripe from "@/lib/stripe-js";
import Link from "next/link";

export type UserDetails = {
  email: string;
  name: string;
  hasActiveMembership: boolean;
};

function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { hasActiveMembership } = useSubscription();
  const [isPending, startTransition] = useTransition();

  const handleUpgrade = async () => {
    if (!user) return;
    
    setLoading(true);
    startTransition(async () => {
      try {
        const response = await fetch('/api/checkout_sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create checkout session');
        }

        const session = await response.json();
        
        const stripe = await getStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (!stripe) {
          throw new Error('Failed to load Stripe');
        }

        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error during checkout:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-xl text-indigo-600 font-semibold mb-4">Planes de Precios</h2>
        <h1 className="text-4xl text-slate-800 font-bold mb-4">Aumente la Productividad de sus Documentos con la IA</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Elija un plan asequible repleto de las mejores funciones para interactuar con su documento PDF, mejorar la productividad y agilizar su proceso de flujo de trabajo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Free Plan */}
        <div className="border rounded-3xl p-8 pt-10 pb-12 shadow-lg">
          <h3 className="text-2xl font-semibold leading-8 text-gray-600">Plan de Inicio</h3>
          <p className="mb-4 text-sm leading-6 text-gray-600">Explore las funciones principales sin coste adicional</p><span className="text-4xl font-bold tracking-tight text-gray-900">Gratuito</span>
          <p className="text-3xl mt-1 font-bold mb-6">$0<span className="text-xl font-normal text-gray-600">/mes</span></p>
          <ul className="space-y-3 mb-20 mt-8 text-sm leading-6 text-gray-600">
            {['2 Documentos disponibles', 'Hasta 3 mensajes por documento', 'Asistencia por correo electronico', 'Pruebe la función de chat AI'].map((feature, index) => (
              <li key={index} className="flex gap-x-3 items-center">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button className="w-full px-4 py-2" variant="outline" id="checkout-button" asChild><Link href="/dashboard">Plan Actual</Link></Button>
        </div>

        {/* Premium Plan */}
        <div className="border rounded-3xl p-8 pb-12 shadow-lg ring-4 ring-indigo-600 text-primary-foreground">
          <h3 className="text-2xl font-semibold leading-8 text-indigo-600">Plan Profesional</h3>
          <p className="mb-4 text-sm leading-6 text-gray-600">Funciones básicas y premium para el día a día</p>
          <p className="text-4xl mt-6 font-bold mb-6 tracking-tight text-gray-900">$5.99<span className="text-sm font-semibold leading-6 text-gray-600">/mes</span></p>
          <ul className="space-y-3 mb-8 mt-8 text-sm leading-6 text-gray-600">
            {['Todas las funciones gratuitas', 'Almacene hasta 20 documentos', 'Posibilidad de eliminar documentos', 'Hasta 100 mensajes por documento', 'Funcionalidad completa de chat Power AI con recuperación de memoria', 'Tiempo de respuesta de asistencia de 24 horas'].map((feature, index) => (
              <li key={index} className="flex items-center gap-x-3">
                <CheckIcon className="h-5 w-5 text-green-300 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            className="bg-indigo-600 w-full text-white shadow-sm hover:bg-indigo-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={loading || isPending}
            onClick={handleUpgrade}
          >
            {isPending ? "Cargando..."
              : hasActiveMembership
                ? "Manage Subscription"
                : "Actualizar"}
          </Button>
        </div>
        
        {/* Business Plan */}
        <div className="border rounded-3xl p-8 pb-12 ring-2 ring-slate-800 shadow-lg text-primary-foreground">
          <h3 className="text-2xl font-semibold leading-8 text-gray-900">Pequeñas Empresas</h3>
          <p className="mb-4 text-sm leading-6 text-gray-600">Plan de inicio más funciones mejoradas para empresas</p>
          <p className="text-3xl text-gray-900 mt-6 font-semibold tracking-tight mb-6">Contáctenos</p>
          <ul className="space-y-3 mb-8 mt-8 text-sm leading-6 text-gray-600">
            {['Todas las funciones del Plan Profesional', 'Almacena hasta 100 documentos', 'Hasta 500 mensajes por documento', 'Ultima funcionalidad de chat Power AI con recuperación de memoria', 'Acceso a las funciones personalizadas', 'Tiempo de respuesta del soporte 24 hora'].map((feature, index) => (
              <li key={index} className="flex gap-x-3 items-center">
                <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            className="bg-slate-800 w-full px-3 py-2 text-white hover:text-white items-center hover:bg-slate-700 shadow-sm mt-6 block rounded-md text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-700" 
            variant="outline" 
            asChild>
            <Link href="/dashboard">Contáctenos</Link></Button>
        </div>
      </div>
    </div>
  )
}

export default UpgradePage;