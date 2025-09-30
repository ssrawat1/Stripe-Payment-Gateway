import express from 'express';
import { createCheckoutSession, verifyCheckoutSession } from './services/stripe.js';

const app = express();

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

app.post('/webhook/verify-payment', (req, res, next) => {
  console.log(req.headers);
  console.log('Stripe Payment Status(Webhook):', req.body);
  if (req.body) {
    return res.status(200).json({ message: 'Payment has been successfully received' });
  }
  return res.status(404).json({ message: 'Payment does not received yet' });
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
