const createSessionBtn = document.querySelector('#pay');

createSessionBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:4000/create/checkout-session');
  const data = await response.json();
  console.log('checkout session:', data);
  location.href = data.url;
});
