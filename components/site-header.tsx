"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { motionTokens as tokens } from "@/lib/motion-tokens";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(e: KeyboardEvent) { if (e.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  const links = [{ href: "/", label: "Home" }, { href: "/projects", label: "Work" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];
  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  return <header className="site-header">
    <div className="header-inner">
      <Link href="/" className="wordmark" aria-label="Rohit Moningi home" onClick={() => setOpen(false)}>ROHIT<span>.</span></Link>
      <MotionConfig reducedMotion="user"><nav className="desktop-nav" aria-label="Main navigation">{links.map(l => <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined}>{l.label}{active(l.href) && <motion.span layoutId="site-nav-highlight" className="nav-active-line" aria-hidden="true" transition={{ duration: tokens.duration.normal, ease: tokens.ease }} />}</Link>)}</nav></MotionConfig>
      <div className="header-actions">
        <Link className="icon-button search-link" href="/projects#search" aria-label="Search projects"><Search size={19} /></Link>
        <a className="resume-link" href="/resume.pdf" target="_blank" rel="noreferrer">Resume <ArrowUpRight size={16} /><span className="sr-only"> (PDF, opens in new tab)</span></a>
        <button ref={toggle} type="button" className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
    </div>
    <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{links.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={active(l.href) ? "page" : undefined}>{l.label}<ArrowUpRight size={16} /></Link>)}</nav>
  </header>;
}
