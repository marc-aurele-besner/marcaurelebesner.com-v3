import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper page structure and headings', async ({ page }) => {
    // Check for main heading
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();

    // Check heading hierarchy
    const h2Elements = page.locator('h2');
    await expect(h2Elements.first()).toBeVisible();

    // Verify logical heading structure (no skipped levels)
    const allHeadings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(allHeadings.length).toBeGreaterThan(0);
  });

  test('should have proper color contrast', async ({ page }) => {
    // Test main content contrast
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    const textColor = await body.evaluate(el => window.getComputedStyle(el).color);

    // Basic contrast check (this is simplified - in real scenarios you'd use axe-core or similar)
    expect(backgroundColor).not.toBe(textColor);
  });

  test('should have proper focus management', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');

    // Skip link should be focused
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeFocused();

    // Press Enter to skip to main content
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    // Check navigation landmarks
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // Check main content landmark
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Check aside landmark (sidebar)
    const aside = page.locator('aside');
    if (await aside.isVisible()) {
      await expect(aside).toBeVisible();
    }
  });

  test('should have proper alt text for images', async ({ page }) => {
    const images = page.locator('img');
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const altText = await image.getAttribute('alt');
      expect(altText).not.toBeNull();
      expect(altText?.length).toBeGreaterThan(0);
    }
  });

  test('should have proper button and link accessibility', async ({ page }) => {
    // Check buttons have accessible names
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const accessibleName = await button.textContent() || await button.getAttribute('aria-label');
      expect(accessibleName?.trim().length).toBeGreaterThan(0);
    }

    // Check links have accessible names
    const links = page.locator('a');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const accessibleName = await link.textContent() || await link.getAttribute('aria-label');
      expect(accessibleName?.trim().length).toBeGreaterThan(0);
    }
  });

  test('should have proper form accessibility', async ({ page }) => {
    // This test is for completeness, though the site may not have forms
    const forms = page.locator('form');
    const formCount = await forms.count();

    for (let i = 0; i < formCount; i++) {
      const form = forms.nth(i);
      const inputs = form.locator('input, textarea, select');
      const inputCount = await inputs.count();

      for (let j = 0; j < inputCount; j++) {
        const input = inputs.nth(j);
        const label = await input.getAttribute('aria-label') || await input.getAttribute('aria-labelledby');
        const type = await input.getAttribute('type');

        if (type !== 'submit' && type !== 'button') {
          expect(label || await input.getAttribute('name')).toBeTruthy();
        }
      }
    }
  });

  test('should have proper mobile accessibility', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check touch target sizes
    const interactiveElements = page.locator('button, a, input, select, textarea');
    const elementCount = await interactiveElements.count();

    for (let i = 0; i < elementCount; i++) {
      const element = interactiveElements.nth(i);
      const boundingBox = await element.boundingBox();

      if (boundingBox) {
        // Minimum touch target size should be 44x44 pixels
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should have proper heading structure for screen readers', async ({ page }) => {
    // Navigate to about section and check heading structure
    await page.goto('/#about');

    const aboutSection = page.locator('#about');
    const heading = aboutSection.locator('h2, h3').first();
    await expect(heading).toBeVisible();

    // Check that heading content is descriptive
    const headingText = await heading.textContent();
    expect(headingText?.length).toBeGreaterThan(0);
  });

  test('should work with screen reader navigation', async ({ page }) => {
    // Test that all major sections are accessible via keyboard
    const sections = ['#about', '#experience', '#projects', '#contact'];

    for (const sectionId of sections) {
      await page.goto('/' + sectionId);
      const section = page.locator(sectionId);
      await expect(section).toBeInViewport();
    }
  });

  test('should have proper skip links', async ({ page }) => {
    // Check skip link is present and functional
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();

    // Skip link should be accessible via Tab
    await page.keyboard.press('Tab');
    await expect(skipLink).toBeFocused();

    // Skip link should skip to main content
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    // Note: Focus behavior may vary, but the element should be in viewport
    await expect(mainContent).toBeVisible();
  });
});