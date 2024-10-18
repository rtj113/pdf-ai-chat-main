import { loadStripe, Stripe } from "@stripe/stripe-js";

declare var process: {
  env: {
    [x: string]: string
    NODE_ENV: string
  }
}
// let stripePromise: Promise<Stripe | null>;
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
console.log('stripe-js page, stripePublicKey: ', stripePublicKey)
const stripePromise = loadStripe(stripePublicKey)
console.log('stripe-js page, stripePromise: ', stripePromise)
// const webhookStripeSecret = process.env.STRIPE_SECRET_KEY

if (stripePromise === undefined) {
  throw new Error("STRIPE_PUBLISHABLE_KEY is not set");
}

const getStripe = (stripePublicKey: any): Promise<Stripe | null> => {
  if (!stripePromise) {
    // const options = {
    //   clientSecret: webhookStripeSecret,
    // }
    const stripePromise = loadStripe(stripePublicKey)
  }

  return stripePromise;
};

export default getStripe;
