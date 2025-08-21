import { test, expect } from '@playwright/test';

test.describe('Theme Switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have theme toggle visible', async ({ page }) => {
    const themeToggle = page.locator('div').filter({ hasText: /Switch to light theme|Switch to dark theme|Use system theme/ });
    await expect(themeToggle).toBeVisible();
  });

  test('should switch to light theme', async ({ page }) => {
    // Click light theme button
    const lightButton = page.locator('button[aria-label="Switch to light theme"]');
    await expect(lightButton).toBeVisible();
    await lightButton.click();

    // Verify theme is applied (check body classes)
    const body = page.locator('body');
    await expect(body).toHaveClass(/bg-white text-slate-800/);
    await expect(body).not.toHaveClass(/dark:bg-darkBlue dark:text-grayTone/);

    // Verify button is active
    await expect(lightButton).toHaveClass(/bg-black\/5 dark:bg-white\/10/);
  });

  test('should switch to dark theme', async ({ page }) => {
    // Click dark theme button
    const darkButton = page.locator('button[aria-label="Switch to dark theme"]');
    await expect(darkButton).toBeVisible();
    await darkButton.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify theme is applied (check body classes)
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark:bg-darkBlue dark:text-grayTone/);

    // Verify button is active
    await expect(darkButton).toHaveClass(/bg-black\/5 dark:bg-white\/10/);
  });

  test('should switch to system theme', async ({ page }) => {
    // Click system theme button
    const systemButton = page.locator('button[aria-label="Use system theme"]');
    await expect(systemButton).toBeVisible();
    await systemButton.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify button is active (theme may be light or dark depending on system)
    await expect(systemButton).toHaveClass(/bg-black\/5 dark:bg-white\/10/);
  });

  test('should persist theme preference', async ({ page, context }) => {
    // Switch to dark theme
    const darkButton = page.locator('button[aria-label="Switch to dark theme"]');
    await darkButton.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Navigate to a new page (simulate page refresh)
    await page.goto('/');

    // Theme should still be dark
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark:bg-darkBlue dark:text-grayTone/);
  });

  test('should work on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Theme toggle should still be visible in mobile header
    const themeToggle = page.locator('div').filter({ hasText: /Switch to light theme|Switch to dark theme|Use system theme/ });
    await expect(themeToggle).toBeVisible();

    // Test theme switching on mobile
    const darkButton = page.locator('button[aria-label="Switch to dark theme"]');
    await darkButton.click();

    // Wait for theme change
    await page.waitForTimeout(100);

    // Verify theme is applied
    const body = page.locator('body');
    await expect(body).toHaveClass(/dark:bg-darkBlue dark:text-grayTone/);
  });

  test('should have proper ARIA labels and accessibility', async ({ page }) => {
    const lightButton = page.locator('button[aria-label="Switch to light theme"]');
    const darkButton = page.locator('button[aria-label="Switch to dark theme"]');
    const systemButton = page.locator('button[aria-label="Use system theme"]');

    await expect(lightButton).toBeVisible();
    await expect(darkButton).toBeVisible();
    await expect(systemButton).toBeVisible();

    // Check that buttons are keyboard accessible
    await lightButton.focus();
    await expect(lightButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(darkButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(systemButton).toBeFocused();
  });
});