# Defines what Claude should do now
The content here will always change progressively, it contains what you will do at every moment of the way in this project, and is complemented with context/instruction from the chat window

## Objective

Before implementation, read:

- CLAUDE.md
- docs/03_DESIGN_SYSTEM.md
- docs/08_USER_FLOW.md
- docs/11_COMPONENT_LIBRARY.md
- docs/12_CODING_STANDARDS.md
- docs/14_NON_NEGOTIABLES.md
- playbooks/department-page.prompt.md

## Asset Strategy

The current priority is completing the application's structure, functionality, database integration and user flows.

Product images, shop photographs, promotional banners, luxury backgrounds and AI-generated visual assets will be added later inside the `references/` directory.

Until then:

- Use high-quality placeholders where necessary.
- Structure components so real assets can be swapped in easily.
- Do not optimize for final visuals yet.
- Do not hardcode placeholder assets into reusable components.

The final visual refinement phase will include:

- Real product images
- Real shop images
- AI-generated backgrounds
- Premium animations
- Luxury visual polish
- Final typography and spacing refinements

Design the pages with this future enhancement phase in mind.

## Deliverables

Build:

- Electronics Department Page
- Fashion Department Page

Each page should include:

- Department Hero
- Category Filters
- Search Bar (UI only)
- Product Grid
- Product Cards
- Sorting Controls
- Empty State
- Pagination or Load More
- Responsive Layout

## Constraints

Do not implement:

- Product details page
- Cart functionality
- Checkout
- Search logic
- Firebase CRUD

Focus only on the department browsing experience.

## Acceptance Criteria

The pages should be production-ready from an architectural standpoint and visually prepared for future replacement with real assets.

Review the implementation, recommend improvements, and stop for approval.