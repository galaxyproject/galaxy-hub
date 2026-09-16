import { defineConfig, devices } from '@playwright/test';

const port = process.env.PORT || '4321';
const usePreview = process.env.LINK_CHECK_PREVIEW === '1';
const baseURL = process.env.PLAYWRIGHT_BASE_URL || `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: usePreview ? `npm run preview -- --port ${port}` : 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    // Astro 7 auto-detaches `astro dev` into a background daemon when it detects an AI
    // coding agent. That makes Playwright's webServer look like it exited early and
    // leaves a server Playwright can't manage. Force foreground so Playwright owns it.
    env: { ASTRO_DEV_BACKGROUND: '0' },
  },
});
