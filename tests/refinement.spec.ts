import { test, expect } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const resumeHash = "6adea7a22f50be8c29af934b37e256e6655633fbdbbd1f05d33b3344c3063646";

test("requested decorative arrow and duplicate controls are removed", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-scroll, .hero-side-note, .card-open, .audience-strip")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Explore my work", exact: true })).toHaveAttribute("href", "#projects");
  await expect(page.getByRole("heading", { name: "Selected work." })).toBeVisible();
});

test("both contact cards activate from the title, description and keyboard", async ({ page }) => {
  const cards = [
    { title: "Hiring an engineer?", description: "Let’s talk about your team and the work ahead.", subject: "Engineering opportunity" },
    { title: "Building something?", description: "Tell me about the problem you want to solve.", subject: "Let's build a product" },
  ];
  for (const route of ["/", "/about", "/contact"]) {
    await page.goto(route);
    // Observe real activation without launching an external mail client or sending mail.
    await page.evaluate(() => {
      document.documentElement.dataset.mailActivations = "0";
      document.addEventListener("click", event => {
        const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="mailto:"]');
        if (anchor) { event.preventDefault(); document.documentElement.dataset.mailHref = anchor.href; document.documentElement.dataset.mailActivations = String(Number(document.documentElement.dataset.mailActivations) + 1); }
      }, true);
    });
    for (const card of cards) {
      const link = page.locator(".contact-options a").filter({ has: page.getByRole("heading", { name: card.title, exact: true }) });
      const href = await link.getAttribute("href");
      const url = new URL(href!);
      expect(url.protocol).toBe("mailto:");
      expect(url.pathname).toBe("rohitmoningi125@gmail.com");
      expect(url.searchParams.get("subject")).toBe(card.subject);
      await link.getByRole("heading").click();
      await expect(page.locator("html")).toHaveAttribute("data-mail-href", href!);
      await link.getByText(card.description, { exact: true }).click();
      await link.focus(); await link.press("Enter");
    }
    await expect(page.locator("html")).toHaveAttribute("data-mail-activations", "6");
  }
});

test("latest supplied resume is served byte-for-byte and downloads", async ({ page, request }) => {
  const response = await request.get("/resume.pdf");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect(createHash("sha256").update(await response.body()).digest("hex")).toBe(resumeHash);
  await page.goto("/about");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("link", { name: "Download resume", exact: true }).click()]);
  expect(download.suggestedFilename()).toBe("Rohit-Moningi-Resume.pdf");
  expect(createHash("sha256").update(await readFile((await download.path())!)).digest("hex")).toBe(resumeHash);
});

test("hero depth responds to a fine pointer and resets for reduced motion", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion-ready", "true");
  const scene = page.locator(".hero-scene");
  await page.mouse.move(1100, 250, { steps: 10 });
  await expect.poll(() => scene.evaluate(element => element.style.getPropertyValue("--scene-x"))).not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveCSS("transform", "none");
  await expect.poll(() => scene.evaluate(element => element.style.getPropertyValue("--scene-x"))).toBe("");
});
