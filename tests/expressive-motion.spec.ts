import { test, expect } from "@playwright/test";

test("project depth settles, clears for keyboard and preserves click through", async ({ page }) => {
  await page.goto("/projects");
  const link = page.getByRole("link", { name: "Bike Auction Platform — view project" });
  const artwork = link.locator(".project-art");
  await artwork.scrollIntoViewIfNeeded();
  const box = (await artwork.boundingBox())!;
  await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.25);
  await expect(artwork).toHaveAttribute("data-depth-active", "true");
  await expect.poll(() => artwork.evaluate(el => el.style.getPropertyValue("--poster-ry"))).not.toBe("");
  await page.keyboard.press("Tab");
  await expect(artwork).not.toHaveAttribute("data-depth-active");
  await link.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("[data-depth-active]")).toHaveCount(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(link).toBeFocused();
});

test("editorial artwork responds to native scroll and respects reduced motion", async ({ page }) => {
  await page.goto("/");
  const section = page.locator(".research-feature");
  const visual = page.locator(".research-visual");
  await section.scrollIntoViewIfNeeded();
  await expect.poll(() => visual.evaluate(el => el.style.getPropertyValue("--editorial-y"))).not.toBe("");
  const initial = await visual.evaluate(el => el.style.getPropertyValue("--editorial-y"));
  await page.evaluate(() => window.scrollBy({ top: 120, behavior: "instant" }));
  await expect.poll(() => visual.evaluate(el => el.style.getPropertyValue("--editorial-y"))).not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(visual).toHaveCSS("transform", "none");
  await expect.poll(() => visual.evaluate(el => el.style.getPropertyValue("--editorial-y"))).toBe("");
});

test("navigation marker follows pages and remains on Work for a case study", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main navigation" });
  await nav.getByRole("link", { name: "About", exact: true }).click();
  await expect(nav.getByRole("link", { name: "About", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(nav.locator(".nav-active-line")).toHaveCount(1);
  await nav.getByRole("link", { name: "Work", exact: true }).click();
  await expect(nav.getByRole("link", { name: "Work", exact: true })).toHaveAttribute("aria-current", "page");
  await page.goto("/projects/bike-auction");
  await expect(nav.getByRole("link", { name: "Work", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(nav.locator(".nav-active-line")).toBeVisible();
});

test("touch and reduced motion never activate poster tilt", async ({ browser, page }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const phone = await context.newPage();
  await phone.goto(new URL("/projects", process.env.BASE_URL || "http://127.0.0.1:3000").href);
  await phone.locator(".project-art").first().scrollIntoViewIfNeeded();
  await expect(phone.locator("[data-depth-active]")).toHaveCount(0);
  await context.close();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/projects");
  await page.locator(".project-art").first().hover();
  await expect(page.locator("[data-depth-active]")).toHaveCount(0);
  await expect(page.locator(".poster-glint").first()).toHaveCSS("display", "none");
});
