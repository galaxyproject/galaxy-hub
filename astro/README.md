# Galaxy Community Hub - Astro Migration

This is the Astro-based implementation of the Galaxy Community Hub, migrating from the existing Gridsome setup.

## Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:4321)
npm run dev

# Full dev with preprocessing and search index
npm run dev:fresh
```

## Building

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Code Quality

```bash
# Run ESLint
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix

# Check formatting
npm run format:check

# Fix formatting
npm run format
```

## Testing

```bash
# Run Playwright tests
npm run test

# Run tests with UI
npm run test:ui

# Run unit tests
npm run test:unit
```

## Project Structure

```
astro/
├── src/
│   ├── components/     # Vue and Astro components
│   ├── layouts/        # Page layouts (Article, Home, Platform, etc.)
│   ├── pages/          # File-based routing
│   ├── styles/         # Global CSS
│   └── content.config.ts
├── public/             # Static assets
└── content/            # Symlinked from parent (news, events, etc.)
```

## Notes

- This is a parallel development effort - the existing Gridsome site remains unchanged
- Content is shared with the parent directory via symlinks
- Uses Tailwind CSS with Galaxy brand colors
- Vue 3 components for interactive elements
