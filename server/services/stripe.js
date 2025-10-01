import Stripe from 'stripe';

const webhookSecret = process.env.WEBHOOK_SECRET;

export const stripe = new Stripe(process.env.STRIPE_API_KEY);

export const createCheckoutSession = async () => {
  try {
    const { url } = await stripe.checkout.sessions.create({
      success_url: `${process.env.REDIRECT_URI}?session_id={CHECKOUT_SESSION_ID}`,
      // billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['IN', 'RU', 'PA', 'US', 'CH', 'NP', 'BD'],
      },
      metadata: {}, // same as Razorpay notes
      ui_mode: 'hosted',
      line_items: [
        {
          adjustable_quantity: { enabled: true },
          price_data: {
            product_data: {
              name: 'Type Script',
              description:
                'This is your time to rise/shine! kickout your knowledge in depth on Type script ',
              images: ['http://localhost:5500/creating-checkout-session/typescript.png'],
            },
            currency: 'USD',
            unit_amount: 30000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });
    return url;
  } catch (error) {
    console.log('Error while creating Checkout Session:', error);
  }
};

export const verifyCheckoutSession = async ({ ch_id }) => {
  try {
    const checkoutInfo = await stripe.checkout.sessions.retrieve(ch_id);
    console.log(checkoutInfo.payment_status);
    return checkoutInfo.payment_status;
  } catch (error) {
    console.log('error while verifying checkout session:', error);
  }
};

export const verifyWebhookSignature = async ({ sign, data }) => {
  return stripe.webhooks.constructEvent(data, sign, webhookSecret);
};
