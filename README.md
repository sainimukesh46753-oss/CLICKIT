# CLICKIT

CLICKIT is a quick-commerce storefront prototype with a separate admin dashboard.

## Pages
- Customer storefront: `/`
- Admin preview: `/admin/`

## Current features
- Responsive customer storefront and product search
- Product categories and starter grocery catalogue
- Browser-local cart, demo checkout and order history
- Separate admin dashboard with demo login and order overview
- CLICKIT SVG brand logo

## Run locally
Open `index.html` in a browser, or serve this folder with any static web server.

## Admin preview
Open `/admin/` and use the demo key `clickit-admin-demo`.

**Important:** This repository currently contains a front-end prototype. Cart, checkout and admin preview data are stored only in the same browser using localStorage. The admin gate is not production authentication. Real customer accounts, shared orders, inventory, secure admin roles, payments, delivery-partner dispatch, maps and genuine 10-minute delivery require backend configuration and operational coverage. Do not accept real payments or promise a guaranteed 10-minute delivery based on this demo.

## Suggested production stack
Next.js + TypeScript, Supabase (Auth/Postgres/Row Level Security), payment gateway, maps/geocoding and delivery-partner integration.
