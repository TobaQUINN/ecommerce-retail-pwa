# Defines what Claude should do now
The content here will always change progressively, it contains what you will do at every moment of the way in this project, and is complemented with context/instruction from the chat window

# Current Task

## Objective

Complete the Firebase integration across the application.

The goal is to ensure every customer and administrator workflow is connected to Firestore using production-ready architecture.

## Context

Before implementation, read:

- CLAUDE.md
- docs/04_ARCHITECTURE.md
- docs/06_FIREBASE_STRUCTURE.md
- docs/12_CODING_STANDARDS.md
- playbooks/firebase-setup.prompt.md

## Deliverables

Complete integration for:

- Products
- Categories
- Customer Profiles
- Orders
- Messages
- Order Status Updates
- Admin Authentication
- Firestore Services
- Loading States
- Error Handling

Replace placeholder data with Firestore where appropriate.

## Constraints

Do not implement:

- Payment Verification
- Product Management
- Inventory Tracking
- Email Notifications

Focus only on completing Firebase integration and ensuring data consistency.

## Acceptance Criteria

All customer-facing pages and the admin dashboard should retrieve and update data through Firestore using reusable services.

Review the implementation and stop for approval.