import { test, expect } from '@playwright/test';

test.describe('Contact Section', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display contact section', async ({ page }) => {
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Check heading
    await expect(contactSection.locator('text=Get in touch')).toBeVisible();
    await expect(contactSection.locator('text=Contact')).toBeVisible();

    // Check description text
    await expect(contactSection.locator('text=I\'m open to collaborating')).toBeVisible();
  });

  test('should have working social media links', async ({ page }) => {
    const contactSection = page.locator('#contact');

    // LinkedIn link
    const linkedInLink = contactSection.locator('a[href*="linkedin.com"]');
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute('target', '_blank');
    await expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(linkedInLink.locator('text=LinkedIn')).toBeVisible();

    // Twitter link
    const twitterLink = contactSection.locator('a[href*="x.com"]');
    await expect(twitterLink).toBeVisible();
    await expect(twitterLink).toHaveAttribute('target', '_blank');
    await expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(twitterLink.locator('text=Twitter')).toBeVisible();

    // GitHub link
    const githubLink = contactSection.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(githubLink.locator('text=GitHub')).toBeVisible();
  });

  test('should navigate to contact section via menu', async ({ page }) => {
    // Test desktop menu
    const desktopMenu = page.locator('aside');
    if (await desktopMenu.isVisible()) {
      const contactLink = desktopMenu.locator('a[href="#contact"]');
      await expect(contactLink).toBeVisible();
      await contactLink.click();

      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeInViewport();
    }
  });

  test('should navigate to contact section via mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Open mobile menu
    const menuButton = page.locator('button[aria-label="Open menu"]');
    await menuButton.click();

    // Click contact link
    const mobileMenu = page.locator('#mobile-menu');
    const contactLink = mobileMenu.locator('a[href="#contact"]');
    await expect(contactLink).toBeVisible();
    await contactLink.click();

    // Should scroll to contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();

    // Menu should close
    await expect(mobileMenu).toBeHidden();
  });

  test('should navigate to contact via anchor link', async ({ page }) => {
    await page.goto('/#contact');

    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const contactSection = page.locator('#contact');

    // Check section has proper heading association
    await expect(contactSection).toHaveAttribute('aria-labelledby', 'contact-title');

    // Check social links have proper accessibility
    const socialLinks = contactSection.locator('a[target="_blank"]');
    const linkCount = await socialLinks.count();

    for (let i = 0; i < linkCount; i++) {
      const link = socialLinks.nth(i);
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  test('should work with keyboard navigation', async ({ page }) => {
    const contactSection = page.locator('#contact');

    // Navigate to contact section first
    await page.goto('/#contact');

    // Tab through social links
    const firstLink = contactSection.locator('a').first();
    await firstLink.focus();
    await expect(firstLink).toBeFocused();

    // Tab to next link
    await page.keyboard.press('Tab');
    const secondLink = contactSection.locator('a').nth(1);
    await expect(secondLink).toBeFocused();

    // Tab to third link
    await page.keyboard.press('Tab');
    const thirdLink = contactSection.locator('a').nth(2);
    await expect(thirdLink).toBeFocused();
  });
});