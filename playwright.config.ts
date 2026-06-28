import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  fullyParallel: true,

  
  reporter: [['html'], ['list']],

  use: {
    baseURL: 'https://practicesoftwaretesting.com',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testDir: './',
      testMatch: '**/auth.setup.ts',
    },
    {
      name: 'chromium', testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});