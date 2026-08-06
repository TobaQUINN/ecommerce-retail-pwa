# Defines what Claude should do now
The content here will always change progressively, it contains what you will do at every moment of the way in this project, and is complemented with context/instruction from the chat window

# Current Task

## Objective

Refine the existing homepage UX and visual hierarchy based on external feedback while preserving all existing functionality and architecture.

This is a refinement task, not a homepage rebuild.

## Before Implementation

Read:

- CLAUDE.md
- All relevant docs/ files
- playbooks/homepage.prompt.md
- Current homepage implementation
- Existing design system and component library

Before changing code, inspect the current implementation and identify which existing components can be reused.

## Important Safety Rule

Do not break or rewrite working functionality.

Preserve:

- Existing routes
- Navbar and Footer
- Product data flow
- Firestore integration
- Authentication
- Cart functionality
- Product pages
- Department pages
- Checkout and order workflow
- Admin functionality
- Existing reusable components

Only modify files necessary for this homepage refinement.

Do not make unrelated refactors.

## Real Assets

The following assets will be added to `references/` and should be used in the homepage:

Hero background:
`[refernces/homepage/hero-background]`

Store image:
`[refernces/homepage/store-front]`

Do not invent replacement images when these assets are available.

Real product images and additional visual assets will be added during the later visual refinement phase.

## Homepage Changes

### Hero

- Use the provided hero background.
- Maintain strong text/background contrast.
- Use yellow for the main heading.
- Use white for body copy.
- Keep CTA treatments limited to the approved white/yellow palette.
- Preserve the existing functional CTA destinations.

### Shop by Department

- Improve text contrast.
- Keep the existing department icons where appropriate.
- Maintain Electronics and Fashion navigation.
- Ensure the section remains easy to understand and interact with.

### Popular Categories

Replace the current text-heavy category grid with visual category cards.

- Add category images.
- Show the category name prominently.
- Remove the long product breakdown text.
- Make the section horizontally browsable.
- Ensure touch interaction works naturally on mobile.
- Keep category links functional.

Do not invent category imagery that could misrepresent actual products.

### Why Choose Us

Keep the section.

- Maintain the existing content unless improvement is necessary.
- Use dark blue icon treatments on the light background.
- Preserve strong contrast and readability.

### How It Works

Remove this homepage section.

Do not remove or modify the actual checkout/order workflow.

### Visit Our Store

Keep and refine this section.

- Use the provided real store image.
- Preserve accurate store information.
- Keep the section focused on physical-store credibility.

### Our Promise

Replace the current promise section with a useful FAQ section.

Use questions that reflect the actual business workflow, such as:

- When do I pay?
- How is my order verified?
- Do you deliver to Lagos?
- Can I buy directly from the store?
- What happens if a product is unavailable?

Answers must reflect the implemented business rules.

Do not invent policies or guarantees.

### Bottom CTA

Remove the current multi-CTA section.

Avoid competing calls to action at the bottom of the homepage.

## Optional Product Discovery

If the existing data supports it, add one useful product section such as:

- Recently Added
- Featured Products

Do not invent:

- Sales statistics
- Customer favorites
- Testimonials
- Popularity data
- Delivery claims
- Inventory information

Only display information supported by actual application data.

## Responsive UX

Verify the refined homepage on:

- Mobile
- Tablet
- Desktop

Pay particular attention to:

- Horizontal category browsing
- Touch targets
- Text contrast
- Image cropping
- CTA visibility
- Section spacing
- Navigation

## Acceptance Criteria

The homepage should:

- Preserve all existing functionality.
- Use the provided hero and store assets.
- Have clear visual hierarchy.
- Maintain accessible contrast.
- Make category discovery more visual and easier to browse.
- Remove redundant homepage content.
- Avoid excessive CTAs.
- Represent the real business accurately.
- Remain compatible with the existing Firebase and product architecture.

## Review Before Completion

After implementation:

1. Check for broken routes or interactions.
2. Check the browser console for errors.
3. Verify responsive behavior.
4. Verify that existing customer and admin functionality was not affected.
5. Review the diff and remove unrelated changes.
6. Summarize what was changed.

Do not proceed with unrelated improvements.