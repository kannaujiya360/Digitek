# DigiTek storefront

React + Vite + Tailwind CSS v4. Frontend only.

## Run

```bash
npm install
npm run dev
```

Open the Local URL printed by Vite. Production build: `npm run build`. Preview it with `npm run preview`.

## Replace product images and details

Place your photographs inside `public/images/`, for example `public/images/hp-desktop.jpg`.
In `src/main.jsx`, edit the `products` array and set `image: '/images/hp-desktop.jpg'`.
Update each product's name, category, specifications, price, original price and badge in the same array. The catalogue uses the supplied local photographs in `public/images/`. Product names follow visible branding; confirm exact models and specifications before publishing. The catalogue prices and ratings are demonstration values.

The large homepage picture is in the `hero-visual` section of `src/main.jsx`. Replace its image `src` with your own local image. The brand mark is a lightweight CSS recreation inspired by your reference; the original reference image is not required at runtime.

## Features

Responsive catalogue; live search; category filters; price sorting; product details modal; wishlist; quantity controls and shopping bag. Bag and wishlist persist in this browser using localStorage. Telephone, email and directions links use the supplied business-card information.

There is no backend, payment processing or order submission. The bag offers a phone enquiry and makes this clear. Confirm all business details, product photos, pricing and warranty terms before publishing.
