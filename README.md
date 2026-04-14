# E-commerce App

Full-stack e-commerce project with a customer storefront, admin dashboard, and Express API.

## Project Structure

```text
admin/     Admin dashboard built with React and Vite
backend/   Express API with MongoDB, authentication, products, cart, orders, and payments
frontend/  Customer storefront built with React and Vite
```

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Express
- MongoDB with Mongoose
- JWT authentication
- Cloudinary image uploads
- Stripe and Razorpay payments

## Setup

Install dependencies in each app:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

Create environment files from the examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp admin/.env.example admin/.env
```

Update the values in `backend/.env` for MongoDB, JWT, Cloudinary, Stripe, and Razorpay.

The frontend and admin app currently point to the API on port `5050`. Either set this in `backend/.env`:

```env
PORT=5050
```

or update `frontend/vite.config.js`, `frontend/.env`, and `admin/.env` to use your backend port.

## Run Locally

Start the backend API:

```bash
cd backend
npm run server
```

Start the customer storefront:

```bash
cd frontend
npm run dev
```

Start the admin dashboard:

```bash
cd admin
npm run dev
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Admin: `http://localhost:5175`
- API: `http://localhost:5050`

## Useful Scripts

Backend:

```bash
npm start
npm run server
npm run seed:admin
```

Frontend:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Admin:

```bash
npm run dev
npm run build
npm run preview
```

## Admin Seed

To create the first admin user, set these values in `backend/.env`:

```env
SEED_ADMIN_EMAIL=admin@forever.com
SEED_ADMIN_PASSWORD=admin123456
```

Then run:

```bash
cd backend
npm run seed:admin
```
