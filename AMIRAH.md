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

