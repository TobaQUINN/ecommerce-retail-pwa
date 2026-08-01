# Defines what Claude should do now
The content here will always change progressively, it contains what you will do at every moment of the way in this project, and is complemented with context/instruction from the chat window

# TASK: Shopping Cart & Buy Now Functionality

## Objective

Implement the complete Shopping Cart and Buy Now functionality connected to the Product Details page.

This task should make the existing **Add to Cart** and **Buy Now** buttons fully functional while maintaining the premium shopping experience of the website.

---

## Reference Documents

Read these documents before implementation:

- TASK.md
- CLAUDE.md
- docs/PROJECT_STRUCTURE.md
- docs/DATABASE.md
- docs/UI_GUIDELINES.md
- docs/ORDER_WORKFLOW.md
- docs/PRODUCTS.md

Follow all project conventions.

---

## Scope

### 1. Add to Cart

When the customer clicks **Add to Cart**:

- Add the selected product to the shopping cart.
- Store:
  - Product ID
  - Product name
  - Product image
  - Selected variation (if any)
  - Quantity
  - Unit price
  - Total price
- Show a success notification.
- Update the cart icon badge immediately.
- Do not reload the page.

If the product already exists:

- Increase quantity instead of creating duplicates.

---

### 2. Shopping Cart Page

Create or complete the cart page.

Display:

- Product image
- Product name
- Category
- Selected variation
- Unit price
- Quantity selector
- Item subtotal
- Remove item button

Bottom summary:

- Number of items
- Estimated subtotal

Buttons:

- Continue Shopping
- Proceed to Checkout

---

### 3. Quantity Management

Users can:

- Increase quantity
- Decrease quantity
- Remove item

Totals should update instantly.

---

### 4. Buy Now

When the customer clicks **Buy Now**:

Skip the cart and immediately begin checkout with only the selected product.

The purchased item should not depend on existing cart contents.

---

### 5. Cart Persistence

The shopping cart should remain available after:

- Page refresh
- Navigation between pages

Prepare the architecture for future database persistence after authentication is added.

---

### 6. Empty Cart

If the cart is empty:

Display a premium empty state including:

- Illustration placeholder
- Friendly message
- Continue Shopping button

---

### 7. Navigation

The cart icon in the header should:

- Open the cart page
- Display live item count
- Update automatically whenever products are added or removed

---

### 8. Responsive Design

Support:

- Desktop
- Tablet
- Mobile

---

## Out of Scope

Do NOT implement:

- Payment
- Order creation
- Checkout form
- Delivery calculation
- Inventory deduction

Those are future tasks.

---

## Acceptance Criteria

✓ Add to Cart works

✓ Buy Now works

✓ Cart updates instantly

✓ Cart badge updates

✓ Quantity adjustment works

✓ Remove item works

✓ Cart survives refresh

✓ Responsive UI

✓ Clean architecture ready for checkout integration

✓ No placeholder logic unless clearly marked