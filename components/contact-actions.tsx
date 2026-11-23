"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { site } from "@/lib/site";
export function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copy() { try { await navigator.clipboard.writeText(site.email); setState("copied"); } catch { setState("error"); } }
  return <div className="email-copy"><div><a href={`mailto:${site.email}`}>{site.email}</a><button className="icon-button" onClick={copy} aria-label="Copy email address">{state === "copied" ? <Check size={18} /> : <Copy size={18} />}</button></div><p role="status">{state === "copied" ? "Email copied. Ready when you are." : state === "error" ? "Copy unavailable. Select the address above or use the email link." : "Prefer email? Write directly."}</p></div>;
}
