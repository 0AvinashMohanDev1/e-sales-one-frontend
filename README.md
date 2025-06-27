# 🛍️ E-Commerce Web App

A responsive and modern e-commerce platform built with **Next.js**, **TypeScript**, **Formik**, and **Zod**. Users can browse products, customize their selections, add items to the cart, and complete purchases with a seamless checkout experience.

## 🚀 Live Demo

https://e-sales-one-frontend.vercel.app/

---

## 🔧 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Form Handling:** Formik
- **Validation:** Zod
- **Styling:** Tailwind CSS (or your choice)
- **Payment:** Stripe / Razorpay / (Your provider)

---

## 📦 Features

| Feature                  | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| Product Listing          | Browse all available products                                               |
| Product Customization    | Select size, color, and quantity (limit: 5)                                |
| Cart Page                | View added products, remove or update them                                 |
| Checkout Page            | Enter personal and card details securely                                   |
| Form Validation          | Robust Zod-based validation using Formik                                   |
| Payment Gateway          | Integration with online card payment system                                |

---

## 🧭 Navigation Flow

1. **Home / Products Page**
   - Displays list of products
   - Allows size, color, and quantity selection

2. **Add to Cart**
   - Items with user-selected options are added to cart
   - Quantity is limited to a maximum of 5

3. **Cart Page**
   - View all selected products and total price
   - Proceed to checkout

4. **Checkout Page**
   - Form collects:
     - Name
     - Email
     - Phone
     - Address
     - Card Information
   - Validated with Zod

5. **Order Submission**
   - Valid form triggers payment
   - Success or failure message shown

---

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/0AvinashMohanDev1/e-sales-one-frontend/
   cd e-sales-one-frontend
