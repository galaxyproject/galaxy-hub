import { defineConfig, devices } from '@playwright/test';

const envBaseUrl = process.env.PLAYWRITH_TEST_BASE_URL || process.env.PLAYWRIGHT_TEST_BASE_URL;
const baseURL = envBaseUrl || 'http://localhost:4321';
const parsedBaseUrl = new URL(baseURL);
const port =
  parsedBaseUrl.port !== ''
    ? Number(parsedBaseUrl.port)
    : parsedBaseUrl.protocol === 'https:'
      ? 443
      : 80;
const devCommand = `npm run dev -- --port ${port}`;

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
    command: devCommand,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
