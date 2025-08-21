# End-to-End Tests

This directory contains end-to-end tests for the portfolio website using Playwright.

## Test Structure

- `navigation.spec.ts` - Tests for navigation, routing, and menu functionality
- `theme.spec.ts` - Tests for theme switching (light/dark/system)
- `responsive.spec.ts` - Tests for responsive design and mobile functionality
- `contact.spec.ts` - Tests for contact section and social media links
- `sections.spec.ts` - Tests for main content sections and animations
- `accessibility.spec.ts` - Tests for accessibility compliance

## Running Tests

### Prerequisites

Make sure you have the development server running:

```bash
npm run dev
```

### Run all tests

```bash
npm run test:e2e
```

### Run tests with UI mode (visual test runner)

```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser actions)

```bash
npm run test:e2e:headed
```

### Debug tests

```bash
npm run test:e2e:debug
```

### View test reports

```bash
npm run test:e2e:report
```

## Test Configuration

The tests are configured in `playwright.config.ts` with the following settings:

- **Browsers**: Chromium, Firefox, WebKit
- **Viewports**: Desktop, Mobile Chrome, Mobile Safari
- **Base URL**: http://localhost:3000
- **Auto-start dev server**: Yes (for CI/CD)

## Test Coverage

The E2E tests cover:

1. **Navigation & Routing**
   - Homepage loading
   - Skip links
   - Desktop sidebar navigation
   - Mobile menu navigation
   - Anchor link scrolling

2. **Theme System**
   - Light/dark/system theme switching
   - Theme persistence
   - Mobile theme controls
   - Keyboard accessibility

3. **Responsive Design**
   - Desktop layout (sidebar visible)
   - Mobile layout (header visible)
   - Tablet breakpoints
   - Orientation changes
   - Touch target sizes

4. **Contact & Social Links**
   - Social media link functionality
   - External link attributes
   - Keyboard navigation
   - Mobile menu contact navigation

5. **Content Sections**
   - About, Experience, Projects sections
   - Smooth scrolling animations
   - Project cards and links
   - Experience timeline
   - SEO meta tags

6. **Accessibility**
   - Keyboard navigation
   - Screen reader support
   - ARIA labels and roles
   - Focus management
   - Color contrast
   - Touch targets
   - Heading structure

## CI/CD Integration

These tests are designed to run in CI/CD environments:

- Tests automatically start the dev server
- No external dependencies required
- Headless mode by default
- Parallel test execution
- Comprehensive reporting

## Debugging

To debug failing tests:

1. Run with headed mode: `npm run test:e2e:headed`
2. Use debug mode: `npm run test:e2e:debug`
3. Check the HTML report: `npm run test:e2e:report`
4. Use Playwright's trace viewer for detailed debugging

## Best Practices

- Tests are isolated and don't depend on each other
- Each test starts with a fresh page navigation
- Tests verify both functionality and accessibility
- Responsive design is tested across multiple viewports
- External links are validated but not followed to avoid external dependencies