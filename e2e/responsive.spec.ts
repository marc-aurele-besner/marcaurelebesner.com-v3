import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display desktop layout correctly', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Sidebar should be visible on desktop
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Main content should have left margin for sidebar
    const main = page.locator('main');
    await expect(main).toHaveClass(/md:ml-72/);

    // Header should be hidden on desktop
    const header = page.locator('header');
    await expect(header).toBeHidden();
  });

  test('should display mobile layout correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Sidebar should be hidden on mobile
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeHidden();

    // Header should be visible on mobile
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Main content should not have left margin on mobile
    const main = page.locator('main');
    await expect(main).not.toHaveClass(/md:ml-72/);
  });

  test('should have working mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Mobile menu should be closed initially
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeHidden();

    // Click menu button to open
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Menu should be open
    await expect(mobileMenu).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Test navigation from mobile menu
    const aboutLink = mobileMenu.locator('a[href="#about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Menu should close after clicking link
    await expect(mobileMenu).toBeHidden();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Should have scrolled to about section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();
  });

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });

    // Sidebar should be hidden on tablet (md breakpoint)
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeHidden();

    // Header should be visible on tablet
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Main content should not have left margin
    const main = page.locator('main');
    await expect(main).not.toHaveClass(/md:ml-72/);
  });

  test('should handle orientation changes', async ({ page }) => {
    // Start with portrait mobile
    await page.setViewportSize({ width: 375, height: 667 });

    // Header should be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Change to landscape
    await page.setViewportSize({ width: 667, height: 375 });

    // Layout should still work
    await expect(header).toBeVisible();

    // Change to desktop size
    await page.setViewportSize({ width: 1280, height: 720 });

    // Sidebar should now be visible
    const sidebar = page.locator('aside');
    await expect(sidebar).toBeVisible();

    // Header should be hidden
    await expect(header).toBeHidden();
  });

  test('should have proper touch targets on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Test menu button size
    const menuButton = page.locator('button[aria-label="Open menu"]');
    const menuButtonBox = await menuButton.boundingBox();
    expect(menuButtonBox?.width).toBeGreaterThanOrEqual(44);
    expect(menuButtonBox?.height).toBeGreaterThanOrEqual(44);

    // Test theme toggle buttons
    const themeButtons = page.locator('button[aria-label*="theme"]');
    const buttonCount = await themeButtons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = themeButtons.nth(i);
      const buttonBox = await button.boundingBox();
      expect(buttonBox?.width).toBeGreaterThanOrEqual(32);
      expect(buttonBox?.height).toBeGreaterThanOrEqual(32);
    }
  });

  test('should work with different device presets', async ({ browser }) => {
    // Test with iPhone preset
    const iphoneContext = await browser.newContext({
      ...devices['iPhone 12']
    });
    const iphonePage = await iphoneContext.newPage();
    await iphonePage.goto('/');

    // Should show mobile layout
    const iphoneHeader = iphonePage.locator('header');
    await expect(iphoneHeader).toBeVisible();

    await iphoneContext.close();

    // Test with Pixel 5 preset
    const pixelContext = await browser.newContext({
      ...devices['Pixel 5']
    });
    const pixelPage = await pixelContext.newPage();
    await pixelPage.goto('/');

    // Should show mobile layout
    const pixelHeader = pixelPage.locator('header');
    await expect(pixelHeader).toBeVisible();

    await pixelContext.close();
  });
});