import { adminDb } from "@/firebaseAdmin";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const headersList = headers();
  const body = await req.text();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.log("⚠️ Stripe webhook secret is not set.");
    return NextResponse.json(
      { error: "Stripe webhook secret is not set" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`Webhook Error: ${err instanceof Error ? err.message : err}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err instanceof Error ? err.message : err}` },
      { status: 400 }
    );
  }

  // Get user details from Firebase
  const getUserDetails = async (customerId: string) => {
    const userDoc = await adminDb
      .collection("users")
      .where("stripeCustomerId", "==", customerId)
      .limit(1)
      .get();

    return userDoc.empty ? null : userDoc.docs[0];
  };

  switch (event.type) {
    case "checkout.session.completed":
    case "payment_intent.succeeded": {
      const invoicePaymentSucceeded = event.data.object;
      const customerId = invoicePaymentSucceeded.customer as string;

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Update the user's subscription status
      await adminDb.collection("users").doc(userDetails.id).update({
        hasActiveMembership: true,
      });

      break;
    }
    case "customer.subscription.deleted":
    case "subscription_schedule.canceled": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const userDetails = await getUserDetails(customerId);
      if (!userDetails?.id) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await adminDb.collection("users").doc(userDetails.id).update({
        hasActiveMembership: false,
      });
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ message: "Webhook received" });
}