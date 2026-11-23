import { test, expect } from "@playwright/test";

test("career update is upcoming, dated and present in server HTML", async ({ page, request }) => {
  for (const route of ["/", "/about"]) {
    const response = await request.get(route);
    const html = await response.text();
    expect(html).toContain("2027-01-05");
    expect(html).toContain("Software Engineer");
    await page.goto(route);
    const role = page.locator('[data-career-status="upcoming"]');
    await expect(role).toContainText("Software Engineer");
    await expect(role).toContainText("Upcoming");
    await expect(role.locator("time")).toHaveAttribute("datetime", "2027-01-05");
    await expect(role).not.toContainText("Present");
  }
  const about = await (await request.get("/about")).text();
  expect(about).not.toContain("Rohit Moningi_OL.pdf");
  expect(about).not.toMatch(/annual CTC|Compensation details|Mandatory joining requirements/i);
});

test("scroll entrances finish, preserve readable content, and run once", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion-ready", "true");
  const role = page.locator('[data-career-status="upcoming"]');
  await role.scrollIntoViewIfNeeded();
  await expect(role).toHaveCSS("opacity", "1");
  const box = await role.boundingBox();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await role.scrollIntoViewIfNeeded();
  await expect(role).toHaveCSS("opacity", "1");
  expect(await role.evaluate(el => el.getAnimations().filter(animation => animation.playState === "running").length)).toBe(0);
  expect((await role.boundingBox())?.width).toBe(box?.width);
});

test("reduced motion cancels entrances and preview exits still restore focus", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion-ready", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.evaluate(() => document.getAnimations().filter(animation => animation.playState === "running").length)).toBe(0);
  const card = page.getByRole("link", { name: "Bike Auction Platform — view project" });
  await card.focus();
  await card.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect.poll(() => page.getByRole("dialog").evaluate(el => el.getAnimations().filter(animation => animation.playState === "running").length)).toBe(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(card).toBeFocused();
});

test("page transitions retain ordinary navigation and one main heading", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page.locator('[data-motion-route="/about"]')).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Contact" }).click();
  await expect(page.locator('[data-motion-route="/contact"]')).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await page.goBack();
  await expect(page.locator('[data-career-status="upcoming"]')).toBeVisible();
});

test("career and project content remain usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/about");
  await expect(page.locator('[data-career-status="upcoming"]')).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.goto("http://127.0.0.1:3000/projects");
  await page.getByRole("link", { name: "Bike Auction Platform — view project" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Bike Auction Platform");
  await context.close();
});
