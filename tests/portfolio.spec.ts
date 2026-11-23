import { test, expect } from "@playwright/test";
import { projects } from "../lib/content";

test("homepage renders without browser errors or broken media", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("ROHIT");
  for (const section of await page.locator("main section").all()) await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  expect(await page.locator("img").evaluateAll(images => images.filter(image => !(image as HTMLImageElement).complete || !(image as HTMLImageElement).naturalWidth).map(image => image.getAttribute("src")))).toEqual([]);
  expect(errors).toEqual([]);
});

test("project preview supports focus, Escape, history and direct pages", async ({ page }) => {
  await page.goto("/");
  const card = page.getByRole("link", { name: "Bike Auction Platform — view project" });
  await card.focus();
  await card.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(page).toHaveURL(/\/projects\/bike-auction$/);
  await expect(dialog.getByRole("heading", { level: 1 })).toBeFocused();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => !!document.activeElement?.closest("dialog"))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(card).toBeFocused();
  await page.goForward();
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Read full story" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "The problem behind the project." })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { name: "The problem behind the project." })).toBeVisible();
});

test("preview close button returns to catalogue without losing filters", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("searchbox").fill("ECG");
  await page.getByRole("link", { name: "Explainable AI-Based ECG Heartbeat Classification — view project", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close project preview" }).click();
  await expect(page.getByRole("searchbox")).toHaveValue("ECG");
  await expect(page.locator(".catalogue-grid .project-card")).toHaveCount(1);
});

test("catalogue handles filters, empty results and recovery", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator(".catalogue-grid .project-card")).toHaveCount(13);
  await page.getByRole("button", { name: "AI & research", exact: true }).click();
  await expect(page.locator(".catalogue-grid .project-card")).toHaveCount(projects.filter(p => p.collection === "research").length);
  await page.getByRole("searchbox").fill("no-project-matches-123");
  await expect(page.getByRole("heading", { name: "No projects in this collection." })).toBeVisible();
  await page.getByRole("button", { name: "Show all projects" }).click();
  await expect(page.locator(".catalogue-grid .project-card")).toHaveCount(13);
});

test("mobile navigation works by keyboard and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeFocused();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
});

test("email copy provides success and permission-denied fallback", async ({ page }) => {
  await page.goto("/contact");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (text: string) => { document.documentElement.dataset.copiedEmail = text; } } }));
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Email copied");
  expect(await page.evaluate(() => document.documentElement.dataset.copiedEmail)).toBe("rohitmoningi125@gmail.com");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Permission denied"); } } }));
  await page.getByRole("button", { name: "Copy email address" }).click();
  await expect(page.getByRole("status")).toContainText("Copy unavailable");
  await expect(page.getByRole("link", { name: "rohitmoningi125@gmail.com", exact: true })).toHaveAttribute("href", "mailto:rohitmoningi125@gmail.com");
});

test("failed artwork retains a usable project card", async ({ page }) => {
  await page.route("**/_next/image*", route => route.abort());
  await page.goto("/projects");
  await expect(page.locator(".image-fallback").first()).toBeVisible();
  await page.locator(".project-card-link").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("link", { name: "Read full story" })).toBeVisible();
});

test("all case studies, resume, metadata and social images resolve", async ({ request }) => {
  for (const project of projects) {
    const response = await request.get(`/projects/${project.slug}`);
    expect(response.status(), project.slug).toBe(200);
    expect(await response.text()).toContain(`https://www.rohitmoningi.in/projects/${project.slug}`);
  }
  for (const path of ["/resume.pdf", "/sitemap.xml", "/robots.txt", "/opengraph-image", "/projects/bike-auction/opengraph-image"]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const project of projects) expect(sitemap).toContain(`/projects/${project.slug}`);
  expect((await request.get("/this-project-does-not-exist")).status()).toBe(404);
});

test("404 and partial project remain navigable", async ({ page }) => {
  await page.goto("/this-project-does-not-exist");
  await expect(page.locator("main a").first()).toBeVisible();
  await page.goto("/projects/iloveinvoice");
  await expect(page.getByRole("heading", { name: "The problem behind the project." })).toBeVisible();
  await expect(page.locator(".detail-actions a")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Let’s build something" })).toBeVisible();
});

test("responsive pages fit at phone, tablet and desktop widths", async ({ page }) => {
  for (const width of [360, 390, 720, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/projects", "/about", "/contact", "/projects/explainable-ecg-heartbeat-classification"]) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${path} at ${width}px`).toBe(true);
    }
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  expect(await page.locator(".button").first().evaluate(el => getComputedStyle(el).transitionDuration)).toBe("0s");
});

test("slow media preserves readable content and stable card dimensions", async ({ page }) => {
  // Isolate image layout stability from the intentional card entrance movement.
  await page.emulateMedia({ reducedMotion: "reduce" });
  let release!: () => void;
  const waiting = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/_next/image*", async route => { await waiting; await route.continue(); });
  await page.goto("/projects", { waitUntil: "domcontentloaded" });
  const card = page.locator(".project-art").first();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".card-description").first()).toBeVisible();
  const before = await card.boundingBox();
  release();
  await expect.poll(() => card.locator("img").evaluate(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
  expect(await card.boundingBox()).toEqual(before);
});

test("mobile preview closes and desktop collection arrows reveal more work", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/projects");
  await page.getByRole("searchbox").fill("Bike");
  await page.getByRole("link", { name: "Bike Auction Platform — view project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(await page.getByRole("dialog").evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  await page.getByRole("button", { name: "Close project preview" }).click();
  await expect(page.getByRole("searchbox")).toHaveValue("Bike");
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const shelf = page.locator("#business");
  const next = shelf.getByRole("button").last();
  await expect(next).toBeEnabled();
  await next.click();
  await expect.poll(() => shelf.locator(".shelf-track").evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
});

test("content reflows at 200 percent zoom", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of ["/", "/projects", "/about", "/contact", "/projects/bike-auction"]) {
    await page.goto(route);
    await page.evaluate(() => { document.documentElement.style.zoom = "2"; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), route).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});
