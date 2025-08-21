import { test, expect } from '@playwright/test';

test.describe('Sections and Content', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all main sections', async ({ page }) => {
    // Check About section
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection.locator('text=About')).toBeVisible();

    // Check Experience section
    const experienceSection = page.locator('#experience');
    await expect(experienceSection).toBeVisible();
    await expect(experienceSection.locator('text=Experience')).toBeVisible();

    // Check Projects section
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
    await expect(projectsSection.locator('text=Projects')).toBeVisible();

    // Check Contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    await expect(contactSection.locator('text=Get in touch')).toBeVisible();
  });

  test('should have smooth scrolling animations', async ({ page }) => {
    // Test scrolling to each section
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await expect(aboutSection).toBeInViewport();

    const experienceSection = page.locator('#experience');
    await experienceSection.scrollIntoViewIfNeeded();
    await expect(experienceSection).toBeInViewport();

    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeInViewport();

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeInViewport();
  });

  test('should have proper section headings', async ({ page }) => {
    const sections = [
      { id: '#about', title: 'About' },
      { id: '#experience', title: 'Experience' },
      { id: '#projects', title: 'Projects' },
      { id: '#contact', title: 'Contact' },
    ];

    for (const section of sections) {
      const sectionElement = page.locator(section.id);
      await expect(sectionElement.locator('text=' + section.title)).toBeVisible();
    }
  });

  test('should load projects correctly', async ({ page }) => {
    const projectsSection = page.locator('#projects');

    // Check if projects are loaded
    await expect(projectsSection.locator('[data-testid="project"]')).toHaveCount(6);

    // Check project structure
    const firstProject = projectsSection.locator('[data-testid="project"]').first();
    await expect(firstProject.locator('img')).toBeVisible();
    await expect(firstProject.locator('h3')).toBeVisible();
    await expect(firstProject.locator('p')).toBeVisible();
  });

  test('should have working project links', async ({ page }) => {
    const projectsSection = page.locator('#projects');
    const projectLinks = projectsSection.locator('a[target="_blank"]');

    // Should have at least one project link
    await expect(projectLinks.first()).toBeVisible();

    // Check that project links open in new tab
    const firstLink = projectLinks.first();
    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should display experience entries', async ({ page }) => {
    const experienceSection = page.locator('#experience');

    // Check for experience entries
    const experienceCards = experienceSection.locator('[data-testid="experience-card"]');
    await expect(experienceCards.first()).toBeVisible();

    // Check experience card structure
    const firstCard = experienceCards.first();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('[data-testid="company"]')).toBeVisible();
    await expect(firstCard.locator('[data-testid="duration"]')).toBeVisible();
  });

  test('should have proper loading states and animations', async ({ page }) => {
    // Check that sections have proper animation classes
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toHaveAttribute('class', /scroll-mt-28/);

    // Test that sections animate in when scrolled into view
    const experienceSection = page.locator('#experience');
    await experienceSection.scrollIntoViewIfNeeded();

    // Wait for potential animations to complete
    await page.waitForTimeout(500);

    // Section should be fully visible and animated
    await expect(experienceSection).toBeInViewport();
  });

  test('should work with different screen sizes', async ({ page }) => {
    // Test on mobile
    await page.setViewportSize({ width: 375, height: 667 });

    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();

    const experienceSection = page.locator('#experience');
    await experienceSection.scrollIntoViewIfNeeded();
    await expect(experienceSection).toBeVisible();

    // Test on tablet
    await page.setViewportSize({ width: 768, height: 1024 });

    const projectsSection = page.locator('#projects');
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeVisible();

    // Test on desktop
    await page.setViewportSize({ width: 1280, height: 720 });

    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });

  test('should have proper SEO and meta elements', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Marc Aurèle Besner/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /.+/);

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /.+/);
  });
});