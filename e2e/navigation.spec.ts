import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Marc Aurèle Besner/);
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have working skip link', async ({ page }) => {
    // Focus skip link (it should be visible when focused)
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toBeFocused();
  });

  test('should navigate to sections via menu on desktop', async ({ page }) => {
    // Check if menu is visible on desktop
    const menu = page.locator('aside').first();
    await expect(menu).toBeVisible();

    // Test navigation to About section
    const aboutLink = menu.locator('a[href="#about"]');
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Should scroll to about section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    // Test navigation to Experience section
    const experienceLink = menu.locator('a[href="#experience"]');
    await expect(experienceLink).toBeVisible();
    await experienceLink.click();

    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeInViewport();

    // Test navigation to Projects section
    const projectsLink = menu.locator('a[href="#projects"]');
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();

    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('should have working header navigation on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Header should be visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Test mobile menu toggle if it exists
    const menuToggle = header.locator('button').first();
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      // Mobile menu should open
      const mobileMenu = page.locator('[data-mobile-menu]');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test('should scroll to sections on anchor link click', async ({ page }) => {
    // Test direct anchor links
    await page.goto('/#about');
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeInViewport();

    await page.goto('/#experience');
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeInViewport();

    await page.goto('/#projects');
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });
});