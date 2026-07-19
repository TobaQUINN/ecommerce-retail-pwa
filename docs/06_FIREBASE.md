# 06_FIREBASE_STRUCTURE.md

# Firebase Structure

## Overview

Firebase serves as the backend platform for Modern Retail Platform.

It provides:

- Authentication
- Database
- Storage
- Hosting (optional)
- Security Rules

Business logic should remain in the application whenever possible.

---

## Firebase Services

Cloud Firestore

Stores application data.

Firebase Storage

Stores product images and uploaded payment proofs.

Firebase Authentication

Secures administrator access.

Cloud Functions

Reserved for future automation if needed.

---

## Firestore Collections

products

categories

customers

orders

payments

admins

notifications

settings

---

## Firebase Storage

Suggested folder structure

products/

electronics/

fashion/

payment-proofs/

logos/

banners/

categories/

Images should be optimized before upload.

Prefer WebP whenever practical.

---

## Authentication

Only administrators require authentication.

Customers may place orders as guests.

Future support may include customer accounts.

---

## Administrator Roles

Owner

Full system access.

Manager

Manage products, inventory and orders.

Staff

Limited operational permissions.

Roles should be expandable.

---

## Firestore Security

Public Users

Can:

- View products
- View categories
- Submit order requests

Cannot:

- Modify products
- Delete data
- Access admin collections

Administrators

Can:

- Manage inventory
- Verify payments
- Update orders
- Manage categories
- View analytics

Security Rules should enforce these permissions.

---

## Image Management

Product images

Stored in Firebase Storage.

Database stores only image URLs.

Never store image files directly inside Firestore.

---

## Payment Proofs

Customers upload payment screenshots.

Each upload should be linked to an Order ID.

Admins review uploaded proof before confirming payment.

---

## Notifications

Notifications should be generated for:

- New Order Request
- Payment Submitted
- Payment Verified
- Order Ready
- Order Delivered

Initially these may be sent through EmailJS.

Future support may include:

- Push Notifications
- WhatsApp
- SMS

---

## Configuration

Application settings should be stored inside the settings collection.

Examples

- Business Name
- Contact Information
- Bank Accounts
- Delivery Areas
- Delivery Fees
- Business Hours
- Social Media Links

Avoid hardcoding configurable values.

---

## Backup Strategy

Firestore should support periodic exports.

Critical assets such as product images should have backup copies.

Business data should never depend on a single device.

---

## Future Integrations

The Firebase architecture should remain flexible enough to support:

- Paystack
- Flutterwave
- Inventory Automation
- Customer Accounts
- Recommendation Engine
- AI Search
- Business Analytics

Future integrations should not require major restructuring of the existing database.