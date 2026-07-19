# 05_DATABASE_SCHEMA.md

# Database Schema

## Overview

The platform uses Cloud Firestore.

Collections should remain modular and scalable.

Avoid deeply nested structures unless necessary.

---

## Collections

products

categories

orders

customers

payments

admins

notifications

settings

---

# products

Stores product information.

Fields

- id
- name
- slug
- description
- department
- categoryId
- price
- currency
- images
- availability
- stockQuantity
- featured
- newArrival
- bestSeller
- discountPercentage
- createdAt
- updatedAt

---

# categories

Stores product categories.

Fields

- id
- name
- slug
- department
- icon
- image
- description

---

# customers

Stores customer information.

Fields

- id
- fullName
- phone
- email
- address
- state
- localGovernment
- createdAt

Guest checkout should still create a customer record.

---

# orders

Stores customer orders.

Fields

- id
- orderNumber
- customerId
- items
- subtotal
- deliveryFee
- total
- paymentStatus
- orderStatus
- deliveryMethod
- deliveryAddress
- notes
- createdAt
- updatedAt

---

# payments

Stores payment verification.

Fields

- id
- orderId
- amount
- paymentMethod
- transferReference
- paymentProof
- verificationStatus
- verifiedBy
- verifiedAt

---

# admins

Stores administrator accounts.

Fields

- id
- fullName
- email
- role
- permissions
- lastLogin

---

# notifications

Stores notifications.

Examples

- New Order
- Payment Submitted
- Order Approved
- Order Delivered

Fields

- id
- type
- recipient
- title
- message
- read
- createdAt

---

# settings

Application configuration.

Examples

- Business Information
- Bank Accounts
- Contact Numbers
- Delivery Settings
- Social Links

---

# Product Availability

Possible values

- In Stock
- Limited Stock
- Out of Stock

Availability should be updated by administrators.

---

# Order Status

Supported statuses

- Pending Verification
- Ready for Payment
- Payment Submitted
- Payment Confirmed
- Processing
- Ready for Pickup
- Out for Delivery
- Delivered
- Cancelled

---

# Payment Status

Supported values

- Pending
- Awaiting Verification
- Verified
- Rejected

---

# Relationships

Category

↓

Products

↓

Orders

↓

Payments

Customer

↓

Orders

Admin

↓

Payment Verification

↓

Order Management

---

# Future Expansion

The schema should support future additions without major restructuring.

Potential additions include:

- Reviews
- Wishlist
- Coupons
- Loyalty Program
- Delivery Tracking
- Inventory History
- Sales Analytics
- Customer Accounts