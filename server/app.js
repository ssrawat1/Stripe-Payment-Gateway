import express from 'express';
import { writeFile } from 'fs/promises';
import {
  createCheckoutSession,
  verifyCheckoutSession,
  verifyWebhookSignature,
} from './services/stripe.js';

const app = express();

app.post('/webhook/verify-payment', express.raw({ type: 'application/json' }), async (req, res) => {
  const webhookIps = [
    '3.18.12.63',
    '3.130.192.231',
    '13.235.14.237',
    '13.235.122.149',
    '18.211.135.69',
    '35.154.171.200',
    '52.15.183.38',
    '54.88.130.119',
    '54.88.130.237',
    '54.187.174.169',
    '54.187.205.235',
    '54.187.216.72',
  ];
  if (webhookIps.includes(req.headers['x-forwarded-for'])) {
    const signature = req.headers['stripe-signature'];
    console.log(signature);

    try {
      const event = await verifyWebhookSignature({ sign: signature, data: req.body });
      console.log('Event received:', event.type);
      /* Handling checkout session here */
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        if (session.payment_status === 'paid' && session.status === 'complete') {
          console.log('Payment successful:', session.id);
          await writeFile('data.json', JSON.stringify(session, null, 2));
        } else {
          console.log('Payment not completed yet:', session.id);
        }
      }

      res.sendStatus(200);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      res.sendStatus(400);
    }
  }
});

app.use(express.json());

app.use((req, res, next) => {
  res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' });
  next();
});

app.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'Connected with ngrok server' });
});

app.get('/create/checkout-session', async (req, res, next) => {
  const url = await createCheckoutSession();
  console.log({ url });
  return res.status(200).json({ url });
});

app.post('/verify-payment', async (req, res, next) => {
  console.log('Payment Verify Request...');
  const id = req.query;
  console.log({ id });
  const paymentStatus = await verifyCheckoutSession(id);
  if (paymentStatus === 'paid') {
    return res
      .status(201)
      .json({ status: 'success', message: 'You have been purchased the course successfully' });
  }
  return res
    .status(404)
    .json({ status: 'failed', message: 'sorry,for our inconvenience try again' });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is listening on address,http://localhost:${PORT}`);
});
