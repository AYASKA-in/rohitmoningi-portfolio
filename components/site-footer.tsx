import Link from "next/link";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { site } from "@/lib/site";
export function SiteFooter() {
  return <footer className="site-footer wrap"><div className="footer-top"><Link href="/" className="wordmark" aria-label="Rohit Moningi home">ROHIT<span>.</span></Link><p>Software engineering · Bengaluru, India</p><div className="footer-social"><a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub (opens in new tab)"><Github size={19} /></a><a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)"><Linkedin size={19} /></a><Link href="/contact" aria-label="Contact Rohit"><ArrowUpRight size={20} /></Link></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Rohit Moningi</span><span>Bengaluru, India · IST</span><Link href="/projects">Explore the work <ArrowUpRight size={13} /></Link></div></footer>;
}
