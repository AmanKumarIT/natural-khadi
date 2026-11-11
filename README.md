# Khadi Natural – React storefront

Your original `code.html` storefront converted to React (Vite + React Router + Tailwind v3) with the requested functionality added.
Layout, colours, fonts and Tailwind tokens are carried over unchanged from the zip.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```
Requires Node 18+. Needs internet for the fonts, icons and product images (same as the original page).

## What was added
| Area | What it does |
|---|---|
| Promo bar | Arrows + auto-rotate through the offers; each message links to a collection |
| Nav bar | Hover/keyboard dropdowns for all 10 headers (Skin Care & Hair Care from your screenshots, the rest in `src/data/navMenu.js`) |
| Search icon | Search panel with live results; Enter opens `/collection/all?q=…` |
| Product cards | Image/title open `/product/:id`; ADD TO CART adds + opens the cart drawer |
| Product page | One template (image, name, price, details, qty, Add to Cart, Buy Now, related items) driven by `src/data/products.js` |
| Cart drawer | Right-side drawer exactly like your empty-cart screenshot, plus filled state (qty, remove, subtotal) |
| Login | Overlay modal (phone → OTP → profile). Only asked when you press **Proceed to Checkout** or the profile icon |
| Profile | Dropdown under the profile icon: name, phone, email only. Edit / Logout |
| Checkout | `/checkout` – layout of your reference, in Khadi style: bag review, promo code, 2 free mini samples, gift message, order summary, then delivery + payment, then confirmation |
| Collections | `/collection/:slug` pages for nav items, concerns, ingredients, "View all" (hard-coded cards) |
| Footer / chat | Footer links work; the chat bubble opens a small contact panel |

## Frontend-only (backend later)
All backend seams are in two small files, each marked `TODO(backend)`:
* `src/services/authService.js` – send OTP, verify OTP, save profile
* `src/services/orderService.js` – place order

**Demo OTP:** any 6-digit code works (e.g. `123456`). Cart, user, profile and orders are stored in `localStorage`.

## Things you should review / replace
* `src/config/site.js` – social URLs (currently generic homepages), contact info, shipping fee (**₹49 below ₹249 is an assumption**), prepaid discount (5%), GST (18%, informational)
* `src/config/promos.js` – `HAIR25` (25% off hair care) and `DWB1G1` (buy 1 get 1) – taken from the page copy
* `src/data/products.js` – product descriptions, benefits, ingredients and how-to-use are **placeholders**; categories/concerns are assigned by me
* `src/data/samples.js` – the 3 mini samples in checkout (placeholders)
* `src/data/heroSlides.js` – slide 1 is your original hero; slides 2-4 reuse the three offer banners. Add more here
* Payments are simulated (no real charge)
