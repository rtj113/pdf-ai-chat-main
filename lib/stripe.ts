import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_API_KEY;

if (!stripeSecretKey) {
  throw new Error("STRIPE_API_KEY is not set");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-06-20"
});

export default stripe
//nodejs stripe instance setup
//TODO: Update Stripe API Key to route from developer to live mode
//TODO: Update Stripe Webhook in Stripe Dashboard
//TODO: Test that the updated Stripe API is connecting to the correct endpoint 
//TODO: Update and include OpenAI API key