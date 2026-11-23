import { test, expect } from "@playwright/test";

test("homepage light trail reacts to the mouse, fades at rest and preserves links", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator(".cursor-light");
  await expect(canvas).toHaveAttribute("aria-hidden", "true");
  await expect(canvas).toHaveCSS("pointer-events", "none");
  await expect(canvas).toHaveAttribute("width", /^[1-9]\d*$/);
  await page.mouse.move(700, 220);
  await page.mouse.move(900, 330, { steps: 12 });
  await expect(canvas).toHaveCSS("opacity", "1");
  expect(await canvas.evaluate(el => {
    const ctx = (el as HTMLCanvasElement).getContext("2d")!;
    return ctx.getImageData(0, 0, (el as HTMLCanvasElement).width, (el as HTMLCanvasElement).height).data.some((value, i) => i % 4 === 3 && value > 0);
  })).toBe(true);
  await expect(canvas).toHaveCSS("opacity", "0", { timeout: 2500 });
  await page.mouse.down();
  await page.mouse.up();
  await expect(canvas).toHaveCSS("opacity", "1");
  expect(await page.locator("body").evaluate(el => getComputedStyle(el).cursor)).not.toBe("none");
  await page.getByRole("link", { name: "Let’s talk", exact: true }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(canvas).toHaveCount(0);
});

test("cursor animation stops for keyboard, reduced motion and project previews", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator(".cursor-light");
  await expect(canvas).toHaveAttribute("width", /^[1-9]\d*$/);
  await page.mouse.move(700, 300);
  await expect(canvas).toHaveCSS("opacity", "1");
  await page.keyboard.press("Tab");
  await expect(canvas).toHaveCSS("opacity", "0");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.mouse.move(850, 350);
  await expect(canvas).toHaveCSS("display", "none");
  await expect(canvas).toHaveAttribute("width", "0");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("link", { name: "Bike Auction Platform — view project" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.mouse.move(800, 300);
  await expect(canvas).toHaveCSS("opacity", "0");
});

test("touch devices do not allocate or display the cursor animation", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(process.env.BASE_URL || "http://127.0.0.1:3000");
  const canvas = page.locator(".cursor-light");
  await expect(canvas).toHaveCSS("display", "none");
  await expect(canvas).toHaveAttribute("width", "0");
  await page.getByRole("button", { name: "Open navigation" }).tap();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await context.close();
});
