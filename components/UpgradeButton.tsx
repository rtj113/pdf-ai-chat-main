"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import useSubscription from "@/hooks/useSubscription";
import React, { MouseEventHandler, useState, useTransition
  // , useEffect
} from "react";
import getStripe from "@/lib/stripe-js";
import CompletePage from "../components/CompletePage";
import { Link, Loader2Icon, ShieldCheckIcon } from "lucide-react";

declare var process : {
    env: {
      [x: string]: string
      NODE_ENV: string
    }
}
interface Props {
    state: {
        [x: string]: any;
        user?: any;
        priceId: string;
        onSuccess: (session: any) => void;
        // onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
        // onSuccess?: (session: any) => void;
        onClick?: MouseEventHandler<Props>;
        disabled: boolean;
        variant: string;  
        session: string;
        stripePromise: string;
        className: string;
        userDetails: {
            id: number;
            email:string;
            name: string;
            hasActiveMembership: any;
            // user: string;
            // userId:number;
        }
    };
}
export type UserDetails = {
    email: string;
    name: string;
    hasActiveMembership: any;
  };
 function UpgradeButton(
    props: Props) {
        const [loading
            // , setLoading
          ] = useState(false);
          const { user } = useUser();
          // const router = useRouter();
          const { hasActiveMembership } = useSubscription();
          const [isPending
            // , startTransition
          ] = useTransition();
    //Create stripe portal if user is already a member and render out
    const handleAccount = () => {
        {async () => {
            if (!user) return;
              const userDetails: UserDetails = {
                email: user.primaryEmailAddress?.toString()!,
                name: user.fullName!,
                hasActiveMembership: user.getOrganizationMemberships,
              };
              const response = await fetch('/api/checkout_sessions', {
                method: 'POST',
              });
              const stripeClient = getStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
            );
              const stripe = await stripeClient;
              console.log('response: ', response);
              const session = await response.json();
              console.log('session: ', session);
                await stripe?.redirectToCheckout( session );
              if (!hasActiveMembership || !stripe) {
                return
              } else if (hasActiveMembership){
                const sessionId = await response.json();
                stripe?.redirectToCheckout({ sessionId });
                if (sessionId.error) {
                    console.error(sessionId.error.message);
                  }
              }
          };
    if (!hasActiveMembership && !loading)
        return (
            <Button asChild variant={"default"} className={"border-indigo-600 bg-indigo-600 hover:bg-indigo-500"}>
                <Link href="/dashboard/upgrade">
                Upgrade<ShieldCheckIcon className={"ml-3 fill-indigo-600 text-white"} /></Link>
            </Button>
        )
        if(loading)
  return (
            <Button variant={"default"} className={"border-indigo-600"}>
                <Loader2Icon className={"animate-spin"} />
            </Button>
        )
        return (
            <>
                <Button
                    // className="bg-indigo-600 w-full text-white shadow-sm hover:bg-indigo-500 mt-6 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    className="border-indigo-600 bg-indigo-600"
                    disabled={loading || isPending}
                    onClick={handleAccount}
                    >
                    { isPending ? "Cargando..."
                        : hasActiveMembership
                        ? "Manage Subscription"
                        : "Actualizar"}
                </Button>
            </>
        )
        }
    }
}
export default UpgradeButton;
