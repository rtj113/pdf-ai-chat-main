"use client"

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link, Loader2Icon, ShieldCheckIcon } from "lucide-react";
import useSubscription from "@/hooks/useSubscription";
import getStripe from "@/lib/stripe-js";

interface UpgradeButtonProps {
  className?: string;
}

export default function UpgradeButton({ className = "" }: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { hasActiveMembership } = useSubscription();

  const handleAccount = async () => {
    if (!user) return;

    setLoading(true);
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
      const stripe = await getStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      if (hasActiveMembership) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      } else {
        await stripe.redirectToCheckout(session);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!hasActiveMembership && !loading) {
    return (
      <Button asChild variant="default" className={`border-indigo-600 bg-indigo-600 hover:bg-indigo-500 ${className}`}>
        <Link href="/dashboard/upgrade">
          Upgrade<ShieldCheckIcon className="ml-3 fill-indigo-600 text-white" />
        </Link>
      </Button>
    );
  }

  if (loading) {
    return (
      <Button variant="default" className={`border-indigo-600 ${className}`}>
        <Loader2Icon className="animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      className={`border-indigo-600 bg-indigo-600 ${className}`}
      disabled={loading}
      onClick={handleAccount}
    >
      {hasActiveMembership ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
}