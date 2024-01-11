import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  timeout: 5 * 60 * 1000,
  testDir: './tests/',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['junit', { outputFile: './reports/xml-base-report.xml' }]],
  use: {
    baseURL: process.env.STAGING === '1' ? process.env.URL : '',
    extraHTTPHeaders: {
      Accept: 'application/json',
      Connection: 'keep-alive',
    },
    headless: true,
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    viewport: null,
    launchOptions: {
      args: ['--start-maximazed'],
    },
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'prod',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
