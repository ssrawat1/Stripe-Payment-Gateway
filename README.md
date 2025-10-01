# Stripe Payment Gateway Integration

A Node.js/Express backend integration for Stripe payment processing.  
This project demonstrates how to securely create checkout sessions, handle payments, and verify webhooks using Stripe.

---

## 🔹 Features

- ✅ Create Stripe Checkout Sessions
- ✅ Accept payments securely via Stripe
- ✅ Verify payment status using Stripe Webhooks
- ✅ Prevent unauthorized access to sensitive data via `.env`
- ✅ Example webhook middleware to handle Stripe events
- ✅ Clean and secure project structure

---

 # Stripe Checkout Session (Test Data)

This repository contains a **dummy Stripe Checkout Session object** generated in **test mode**.  
It is intended **only for educational and demonstration purposes**.  
No real payment or sensitive information is included.

---

## 📌 About the Data

- **Mode**: Test (sandbox)  
- **Purpose**: To showcase the structure of a Stripe Checkout Session object.  
- **Safe to Share**: Yes ✅ (no live keys, no real transactions).  
- **Format**: JSON  

---

## 🗂️ File Structure

📦 Stripe-Payment-Gateway
┣ 📂 server
┃ ┣ 📄 index.js # Express server entry
┃ ┣ 📄 app.js # Core application logic
┃ ┣ 📄 webhook.js # Stripe webhook handler
┃ ┣ 📄 data.json # ✅ Dummy Stripe Checkout Session (test data)
┃ ┣ 📄 .env.example # ✅ Example env file (safe to share)
┃ ┗ 📄 .env # ⚠️ Real secrets (never commit)
┣ 📂 client
┃ ┣ 📄 index.html # Checkout page
┃ ┣ 📄 verify.html # Payment verification page
┃ ┗ 📄 script.js # Client-side logic
┗ 📄 README.md