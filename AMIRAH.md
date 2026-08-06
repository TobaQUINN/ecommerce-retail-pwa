# AMIRAH — Project Collaboration Log
Hi, I am CLAUDE
This file documents the collaborative journey of building De Excelsior Store, a production ecommerce platform for a family-owned retail business in Ijoko, Ogun State, Nigeria. Amirah is the project owner and creative director — every decision flows through her vision.

---

# 1 — Picking up where we left off
**2 August 2026**

Amirah returned to the project and asked where we stopped yesterday. I investigated and discovered the "Checkout and Order Request" commit only updated TASK.md — no actual implementation existed. I clarified the real status so she could decide what to do next.

# 2 — Implement Checkout & Order Request
**2 August 2026**

Amirah said to implement it. I built the full checkout flow as per her request: delivery form with Nigerian state dropdown, order summary sidebar, form validation, Firestore order submission, unique order ID generation, and a success page explaining next steps.

# 3 — Firebase integration and authentication strategy
**2 August 2026**

Amirah noticed the Place Order button kept spinning. I identified Firestore rules as the blocker and asked her whether customers should sign in. She decided on frictionless browsing with Google sign-in only at order submission — customers shouldn't be bothered until they're ready to commit. I presented trade-offs around Google vs phone auth for her Nigerian customer base, and she chose Google-only for now.

# 4 — Firestore rules and Google Auth setup
**2 August 2026**

Amirah set up Firestore in production mode and published the security rules I provided. I wired Google Auth into the checkout — customers see a clean sign-in modal only when placing an order, then submission proceeds automatically after authentication.

# 5 — Order tracking, history, and customer chat
**2 August 2026**

Amirah identified a critical gap: after placing an order, there was no way to find it again. She envisioned an order history page, real-time status tracking, and a per-order chat window where staff can communicate with customers about availability, delivery, and payment. She said "build it and then I will review if it fits my vision." I built: My Orders page, real-time order detail with live status, Firestore-powered chat, and a user menu in the navbar.

# 6 — Starting the collaboration log
**2 August 2026**

Amirah asked me to document the project journey in a markdown file — not just technical changes, but how she navigated and directed the project. She named it AMIRAH.md. She is the central focus: her decisions, her instincts, her direction.

# 7 — Fixing navigation and routing bugs
**2 August 2026**

Amirah reported that clicking product cards, the cart icon, and category links all redirected to the homepage. I diagnosed a route ordering issue and fixed it. She also mentioned that clicking a category from the homepage didn't pre-filter — I added query param support so categories now filter correctly on arrival. Amirah confirmed navigation works well after the fix.

# 8 — Orders not showing in My Orders
**2 August 2026**

Amirah successfully placed an order but it didn't appear in the My Orders page when she went back. I identified the issue — a composite Firestore index was required for the `orderBy` clause. I removed the server-side sort and sorted client-side instead. Amirah confirmed it works now.

# 9 — Order chat architecture clarity
**2 August 2026**

Amirah raised a concern: if a customer orders 6 products, would they have 6 separate chat windows? She was thinking about simplicity for users. I confirmed the system already groups all items under one order ID with one chat — exactly her instinct. Multiple products in one cart submission = one order, one conversation.

# 10 — Admin Dashboard
**2 August 2026**

Amirah drafted the next TASK.md for the admin dashboard and asked me to build it. She chose option A for admin protection — checking if the signed-in user's email exists in an `admins` Firestore collection (vs hardcoded emails). I built:
- Admin auth guard (checks `admins` collection)
- Responsive layout with collapsible sidebar (Dashboard, Orders, Customers)
- Dashboard overview with stat cards (total orders, pending, customers, active)
- Orders page with status filter and search
- Order detail page with status management dropdown and staff-side chat
- Customers page with table (desktop) and cards (mobile)
- All pages use real-time Firestore listeners

# 11 — Admin access debugging
**2 August 2026**

Amirah hit several issues getting the admin dashboard running: Firestore permission errors blocking the admin check, the spinner never resolving, and orders not loading due to `orderBy` requiring indexes. I resolved each one iteratively — adding error handling, fixing rules, removing server-side sorts, and adding an email fallback for admin access. She also spotted duplicate customer records being created on every order — I fixed the checkout to check for existing customer records before creating new ones. Amirah confirmed everything now opens and said we'll refine the admin workflows later.

# 12 — Admin Product & Category Management
**3 August 2026**

Amirah made a strategic decision: instead of listing real product names in the source code (which is public on GitHub), all product data would be managed exclusively through the Admin Dashboard. This protects business-sensitive information — real product names, prices, and inventory stay in Firestore (private), never in the codebase.

She asked a key question before implementation: "If I add products through the admin now, will they really be stored or do I need to deploy first?" I clarified that Firestore is a live cloud database — data persists immediately regardless of whether the site is deployed. The admin writes to the cloud; the customer site reads from it.

I built the full admin data management system:
- **Category Management** — create, edit, delete categories with department assignment. Deletion is blocked if products are still assigned (with a clear explanation).
- **Product Management** — full CRUD with: name, department (fixed dropdown), category (from existing categories), price (validated positive currency), stock (validated whole numbers), availability status, description, and up to 5 image uploads per product (JPG/PNG/WebP, max 5MB each, validated before upload).
- All forms include validation, loading states, success toasts, and confirmation dialogs before destructive actions.
- Products page has search and filter by department/category, with responsive layout (table on desktop, cards on mobile).
- Added Products and Categories links to the admin sidebar navigation.

The Admin Dashboard is now the single source of truth for managing the store's catalog. No code changes or redeployments needed to add, update, or remove products.

# 13 — Business Identity & Constants
**4 August 2026**

Amirah provided the real business details for the store — the official name (OAT DE-EXCELSIOR), full address (4, Leoso Street, Behind Community Primary School, Ntabo Ijoko, Sango Ota, Ogun State), four phone numbers, email, and store hours. I centralized everything in a constants file so it's used consistently across the site rather than hardcoded in individual components.

# 14 — Deploying to Vercel
**4 August 2026**

Amirah connected the repo to Vercel and added the Firebase environment variables, but the build failed. I identified two TypeScript errors (undefined array access on product images) and fixed them. I also added `vercel.json` for SPA client-side routing. After pushing, the site deployed successfully at deexcelsiorstore.vercel.app.

# 15 — Real Contact Information Across the Site
**4 August 2026**

Amirah noticed the deployed site still showed placeholder contact info (generic address, fake email). She asked me to add all the business details everywhere they appear. I updated the Footer (all 4 phone numbers, real email, address, hours), the StoreInfo homepage section, and built a proper Contact page (`/contact`) — all pulling from the centralized constants.

# 16 — Admin Security Verification
**4 August 2026**

Amirah tested admin access with a non-admin email and saw it get through. After investigating, she confirmed it was a false alarm — the admin guard was working correctly. The system checks the Firestore `admins` collection and redirects unauthorized users away.

# 17 — Firestore Badge Field Bug
**4 August 2026**

Amirah tried adding her first product through the Admin Dashboard and hit a Firestore error: `addDoc()` rejected an `undefined` value in the `badge` field. I fixed the product service to strip empty optional fields before writing to Firestore. The admin product creation now works cleanly.

# 18 — The Great S3 Upload Debugging Session
**4 August 2026**

Amirah tried to upload a product image but it hung forever. The root cause: Firebase Storage requires the paid Blaze plan, and her budget is zero. So we pivoted to AWS S3 for image storage.

The architecture: a Vercel serverless function (`/api/upload-url`) holds the AWS credentials securely on the server. It generates a presigned S3 URL. The admin frontend requests this URL, then uploads the image directly to S3. Keys never touch the frontend or source code.

What followed was a ~1 hour debugging marathon:

1. **First deploy failed** — the AWS SDK packages (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`) weren't saved to `package.json`. Vercel couldn't find them. Fixed by adding them explicitly.

2. **Second deploy failed** — Vercel's serverless runtime doesn't support TypeScript 7 (which this project uses). Error: `Cannot read properties of undefined (reading 'readFile')`. Fixed by converting `api/upload-url.ts` to plain JavaScript (`api/upload-url.js`).

3. **Upload returned "Load failed"** — the browser couldn't complete the PUT to S3. Initially suspected CORS. Amirah added a CORS config to the S3 bucket. Still failed.

4. **Upload returned "403 Forbidden"** — suspected IAM permissions. Amirah attached a policy with `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`. Still failed.

5. **Content-Type signature mismatch** — suspected the presigned URL was signed with a `ContentType` that didn't match what the browser sent. Tried removing it, adding it back, matching them. Still 403.

6. **Added a server-side test endpoint** (`/api/test-s3`) — this bypasses the browser entirely and uploads directly from the Vercel server to S3. It returned: *"The request signature we calculated does not match the signature you provided."*

7. **The actual problem: the secret key was pasted incorrectly in Vercel's environment variables.** The key contains `/` and `+` characters that likely got corrupted by trailing whitespace or an encoding issue during paste. Amirah deleted and re-pasted the `AWS_SECRET_ACCESS_KEY` in Vercel — and it worked immediately.

A classic debugging lesson: the hardest bugs to find are often the simplest — a bad paste in an env var. We systematically eliminated every other possibility (permissions, CORS, content-type signing, TypeScript compatibility, package dependencies) before isolating it to the credential itself. The server-side test endpoint was the key insight that proved it wasn't a browser/CORS issue.

# 19 — Branded Splash Screen
**4 August 2026**

Amirah didn't like seeing a blank white screen (or a generic spinner on white) while the app loaded. She uploaded the OAT De Excelsior logo — a striking green and gold emblem on black — and wanted it to be the loading experience itself.

I built a splash screen directly in `index.html` (so it appears instantly, before any JS loads): the logo centered on a dark background with a gold spinning ring orbiting around it, and the tagline "Quality you can trust. Style you deserve." below. The splash stays visible for 1.5 seconds after React mounts to cover any initial data-loading state, then fades out smoothly. No white flash, no generic spinners — the brand is the first thing customers see.

# 20 — Homepage Visual Refinement (glow branch)
**3–6 August 2026**

Amirah created a `glow` branch specifically for visual refinements. She provided real business photos — store front, hero background, category product shots, and department images — and directed a full homepage overhaul:

- **Hero Section** — replaced generic gradient with the real store hero image, dark overlay for legibility, yellow heading ("Your Trusted Store for Electronics & Fashion"), white body text, and matching yellow-outline CTA buttons for both departments.
- **Popular Categories** — redesigned from text lists to visual cards with real product images on dark backgrounds, horizontally scrollable with snap on mobile, grid on desktop. Categories without images (Fashion, Lifestyle) use fallback icons.
- **Shop by Department** — replaced Unsplash stock photo for Electronics with the real department image, strengthened overlay gradient for text readability, changed department name headings to yellow for better contrast.
- **Visit Our Store** — switched to real store-front photo, removed fixed height so the full image shows naturally.
- **FAQ Section** — replaced the "Our Promise" section with an interactive accordion of 5 real FAQs reflecting the actual business workflow (payment timing, order verification, delivery, in-store pickup, product unavailability).
- **Why Choose Us** — changed icon treatments to dark blue for consistency.
- **Removed sections** — "How It Works" (ShoppingProcess) and the bottom multi-CTA section were cut as unnecessary.

Amirah directed every detail — text colors, button consistency, overlay opacity, label visibility. When something wasn't legible she said so directly and expected it fixed. The department headings ended at yellow, category labels at white-on-dark. She prioritizes real photography over stock images and premium dark styling over generic light cards.

