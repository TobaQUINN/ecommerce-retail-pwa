# AMIRAH — Project Collaboration Log

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

Amirah successfully placed an order but it didn't appear in the My Orders page when she went back. Investigating the Firestore query and rules to resolve.
