# Defines what Claude should do now
The content here will always change progressively, it contains what you will do at every moment of the way in this project, and is complemented with context/instruction from the chat window

# TASK: Checkout & Order Request

## Objective

Implement the checkout flow that allows customers to submit an order request. This is **not** an online payment system. Orders are reviewed manually before payment is requested.

---

## References

Read before implementation:

- CLAUDE.md
- TASK.md
- docs/PROJECT_STRUCTURE.md
- docs/DATABASE.md
- docs/ORDER_WORKFLOW.md
- docs/UI_GUIDELINES.md

---

## Scope

### Checkout Page

Create a premium checkout page using products from the Shopping Cart or Buy Now.

Collect:

- Full Name
- Phone Number
- Email (optional)
- State
- City
- Delivery Address
- Order Notes (optional)

Show:

- Ordered products
- Quantity
- Item subtotal
- Estimated total
- Delivery note stating shipping cost is confirmed later.

### Validation

Validate all required fields.

Prevent submission when required information is missing.

### Order Request

On submission:

- Generate a unique Order ID.
- Save the order and its items to the database.
- Mark status as **Pending Review**.
- Store customer details and timestamps.
- Clear the cart after a successful order.

### Success Page

Display:

- Success message
- Order ID
- Customer summary
- Ordered items
- Next steps explaining that the business will verify product availability, delivery location, shipping cost, and then contact the customer with payment instructions.

### Admin Readiness

Structure the data so future admin pages can:

- View pending orders
- Update order status
- Contact customers

---

## Out of Scope

Do not implement:

- Online payment
- Bank transfer verification
- Inventory deduction
- Order tracking
- Admin dashboard
- Email or SMS notifications

---

## Acceptance Criteria

- Checkout works from Cart and Buy Now.
- Orders are stored successfully.
- Unique Order IDs are generated.
- Validation works correctly.
- Success page displays correctly.
- Cart clears after successful submission.
- Responsive design maintained.
- Code is modular and production-ready.