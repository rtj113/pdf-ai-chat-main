"use server"

import Stripe from 'stripe';
import { redirect } from 'next/navigation';
import {
    // NextRequest,
    NextResponse
} from "next/server";
import CompletePage from "../../../components/CompletePage";

// API Routes with Next JS Documentation: https://nextjs.org/docs/pages/building-your-application/routing/api-routes
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(
    // only request is used here, the standard NextRequest is old hat.
    request
    // NextRequest,
    // NextResponse,
) {
    if(request.method === "POST"){
        try {
            // The line items create the invoice layout in stripe's portal
            const session = await stripe.checkout.sessions.create({
                mode: 'subscription',
                customer: stripeCustomerId,
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: "price_1Q5Bis09KtmogQhaqZpXTcgJ",
                        price_data: {
                            currency: 'usd',
                            unit_amount: 599,
                            product_data: {
                              name: "professional_subscription",
                              description: 'A professional subscription for 5.99.',
                              images: [],
                            },
                          },
                        quantity: 1,
                    },
                ],
                success_url: `${getBaseUrl()}/dashboard?upgrade=true?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `http://localhost:3000/cancel`,
            });
            console.error('checkout_session try session.url: ', session.url);

            const sig = request.headers['stripe-signature'];
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

            // Successfully constructed event Stripe Session
            switch (event.type) {
                case 'identity.verification_session.verified': {
                  // All the verification checks passed
                  const verificationSession = event.data.object;
                  break;
                }
              }
            // next response sends sessionId from the export default POST method to the button click on PricingPage
            return NextResponse.json({ sessionId: session.id })
        } catch (error) {
            console.error('checkout_session catch error: ', error);
            console.log(`❌ Error message: ${err.message}`);
            if(error.message={500}){
                return NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
            } else if(error.message={400}){
                return NextResponse(JSON.stringify({ error: error.message }), { status: 400 });
            }
            
        }
        redirect(session.url)
    } else {
        NextResponse.status(405).end('Method Not Allowed');
    }
}
