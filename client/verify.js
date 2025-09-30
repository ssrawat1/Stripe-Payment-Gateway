const checkoutSessionId = new URLSearchParams(location.search).get('session_id');

if (checkoutSessionId) {
  const response = await fetch(`http://localhost:4000/verify-payment?ch_id=${checkoutSessionId}`, {
    method: 'POST',
  });
  const payment = await response.json();
  console.log(payment)
  payment.status === 'success'
    ? (location.href = `/creating-checkout-session/client/success.html`)
    : (location.href = '/creating-checkout-session/client/index.html');
} else {
  location.href = '/creating-checkout-session/client/index.html';
}
