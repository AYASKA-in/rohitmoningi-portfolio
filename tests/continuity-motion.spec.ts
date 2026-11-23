import { test, expect } from "@playwright/test";

test("rapid collection changes preserve correct results and usable previews", async ({ page }) => {
  await page.goto("/projects");
  const filters = page.getByRole("group", { name: "Filter projects" });
  await filters.getByRole("button", { name: "AI & research", exact: true }).click();
  await filters.getByRole("button", { name: "Business & commerce", exact: true }).click();
  await filters.getByRole("button", { name: "All work", exact: true }).click();
  await page.getByRole("searchbox").fill("ECG");
  await expect(page.locator(".catalogue-grid").getByRole("link")).toHaveCount(1);
  await expect(page.getByRole("status")).toHaveText("1 project found");
  await page.locator(".catalogue-grid").getByRole("link").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("searchbox")).toHaveValue("ECG");
  await expect(page.locator(".catalogue-grid .project-card-link")).toBeFocused();
  await page.getByRole("button", { name: "Clear search" }).click();
  await expect(page.locator(".catalogue-grid .project-card-link")).toHaveCount(13);
});

test("collection motion stops when reduced motion changes during rearrangement", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "AI & research", exact: true }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".catalogue-item").first()).toHaveCSS("transform", "none");
  await expect(page.locator(".filter-selection")).toHaveCSS("transform", "none");
  await page.getByRole("searchbox").fill("no-such-project-999");
  await expect(page.getByRole("heading", { name: "No projects in this collection." })).toBeVisible();
  await page.getByRole("button", { name: "Show all projects", exact: true }).click();
  await expect(page.locator(".catalogue-grid .project-card-link")).toHaveCount(13);
});

test("touch menu handles interrupted opening, Escape and navigation", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page.getByRole("button", { name: "Close navigation" }).tap();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await expect(page.locator("#mobile-nav")).toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Work", exact: true }).tap();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await expect(page.locator("#mobile-nav a").first()).toHaveCSS("animation-name", "none");
  await context.close();
});

test("preview artwork continues into the full story with native navigation", async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener("pagereveal", event => {
      const transition = (event as Event & { viewTransition?: { ready: Promise<void> } }).viewTransition;
      const state = window as Window & { storyTransition?: string };
      state.storyTransition = transition ? "pending" : "none";
      if (transition) void transition.ready.then(() => { state.storyTransition = "ready"; }, () => { state.storyTransition = "skipped"; });
    });
  });
  await page.goto("/");
  const supported = await page.evaluate(() => "onpagereveal" in window && CSS.supports("view-transition-name", "project-test"));
  await page.getByRole("link", { name: "Bike Auction Platform — view project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("link", { name: "Read full story" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bike Auction Platform");
  if (supported) await expect.poll(() => page.evaluate(() => (window as Window & { storyTransition?: string }).storyTransition)).toBe("ready");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".detail-cover-visual")).toHaveCSS("view-transition-name", "none");
});

test("hero scroll depth stays bounded and reduced motion settles it", async ({ page }) => {
  await page.goto("/");
  const supported = await page.evaluate(() => CSS.supports("animation-timeline", "scroll()"));
  if (!supported) return;
  const layer = page.locator(".hero-scroll-layer");
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: "instant" }));
  await expect.poll(() => layer.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42)).toBeGreaterThan(0);
  const depth = await layer.evaluate(el => new DOMMatrixReadOnly(getComputedStyle(el).transform).m42);
  expect(depth).toBeLessThanOrEqual(48);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(layer).toHaveCSS("transform", "none");
});
