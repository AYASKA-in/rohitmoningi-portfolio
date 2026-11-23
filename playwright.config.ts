import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";

const localChrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "http://127.0.0.1:3000",
    viewport: { width: 1440, height: 900 },
    launchOptions: { executablePath: process.env.CHROME_PATH || (existsSync(localChrome) ? localChrome : undefined) },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
