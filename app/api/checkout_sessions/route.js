import { NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { auth } from '@clerk/nextjs/server';

// API Routes with Next JS Documentation: https://nextjs.org/docs/pages/building-your-application/routing/api-routes

export async function POST(request) {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { email, name } = await request.json();

        const baseUrl = process.env.NEXT_PUBLIC_URL || 
                        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: process.env.STRIPE_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${baseUrl}/dashboard?success=true`,
            cancel_url: `${baseUrl}/dashboard?canceled=true`,
            customer_email: email,
            client_reference_id: userId,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}