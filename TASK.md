# Defines what Claude should do now
The content here will always change progressively, it contains what you will do at every moment of the way in this project, and is complemented with context/instruction from the chat window

# Current Task

## Objective

Extend the Admin Dashboard to support complete business data management.

This task establishes the administrative tools that will manage the production product catalog stored in Firestore.

## Context

Before implementation, read:

- CLAUDE.md
- docs/06_FIREBASE_STRUCTURE.md
- docs/09_ADMIN_FLOW.md
- docs/15_DATA_MANAGEMENT_STRATEGY.md
- docs/12_CODING_STANDARDS.md
- playbooks/admin-dashboard.prompt.md

## Deliverables

Implement administrative interfaces for:

- Product Management
- Category Management

Products should support:

- Create
- Read
- Update
- Delete

Categories should support:

- Create
- Read
- Update
- Delete

Product management should include:

- Name
- Department
- Category
- Price
- Description
- Availability
- Stock Quantity
- Product Image Upload (Firebase Storage)

## Requirements

- Store all production data in Firestore.
- Load customer-facing product data from Firestore.
- Use reusable services and components.
- Maintain responsive and accessible interfaces.
- Ensure appropriate loading, success, and error states.

## Constraints

Do not hardcode production products.

Do not rely on seed data for production.

Placeholder assets may remain until the visual refinement phase.

## Acceptance Criteria

Administrators should be able to manage the complete product catalog through the Admin Dashboard without modifying application code or redeploying the website.

Review the implementation and wait for approval before proceeding.