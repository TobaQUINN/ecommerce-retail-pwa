# Data Management Strategy

## Purpose

The application source code is not the source of truth for business data.

Firebase Firestore will store all production business data.

This includes:

- Products
- Categories
- Prices
- Inventory
- Product Images
- Customers
- Orders
- Messages

## Product Management

Products must only be managed through the Admin Dashboard.

Administrators should be able to:

- Add Products
- Edit Products
- Delete Products
- Update Prices
- Update Inventory
- Upload Product Images
- Mark Availability

No code changes should be required to update the product catalog.

## Category Management

Categories should be manageable through the Admin Dashboard.

Adding a new category should immediately make it available when creating products.

## Customer Website

The customer website must never contain hardcoded production products.

All product information should be loaded from Firestore.

## Development

Placeholder products and placeholder images may be used during development.

These should be replaced through the Admin Dashboard after deployment.

The public repository should never contain sensitive business data or production inventory.