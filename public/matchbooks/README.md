# Matchbook Data Conventions

## Image Conventions

- **Naming**: `{number}A.jpeg` (front/primary) and `{number}B.jpeg` (back/secondary)
- **Paths**: Use `/matchbooks/{number}A.jpeg` and `/matchbooks/{number}B.jpeg` in seed data
- **Primary vs Secondary**: A-side is typically the main business side; B-side is the reverse

## Field Guidelines

### Required Fields
- **`id`**: URL-friendly slug (e.g., `"rio-bamba"`)
- **`title`**: Business/product name
- **`description`**: Main non-title text or slogan (empty string if none)
- **`date`**: Date entry was added (YYYY-MM-DD format)
- **`primaryImage`**: `/matchbooks/{number}A.jpeg`
- **`secondaryImage`**: `/matchbooks/{number}B.jpeg`

### Optional Fields
- **`city`**: Include if clearly visible
- **`state`**: Include if city/address implies state (e.g., "NY" for New York City)
- **`country`**: Include if visible or can be inferred (default: "USA")
- **`street`**: Full street address if available
- **`established`**: Year business was established (if visible)

## Extraction Rules

1. **Description**: Extract main slogan or non-title text. Ignore safety warnings like "CLOSE COVER BEFORE STRIKING".
2. **Location**: Ignore matchbook manufacturer addresses. Only include business location.
3. **Date**: Use `date: "YYYY-MM-DD"` (date added, not matchbook date)
4. **Established**: Only include if explicitly shown on matchbook
