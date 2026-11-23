import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";
import { CopyEmail } from "./contact-actions";
export function ContactSection({ full = false }: { full?: boolean }) {
  const Heading = full ? "h1" : "h2"; return <section className={`contact-section ${full ? "contact-full" : ""}`} id="contact"><div className="wrap"><p className="eyebrow"><span className="red-dash" /> GET IN TOUCH</p><div className="contact-heading"><Heading>LET’S BUILD<br /><span>SOMETHING USEFUL.</span></Heading><p>A role worth exploring.<br />A product worth building.<br />Let’s talk about it.</p></div><div className="contact-options"><a href={`mailto:${site.email}?subject=Engineering%20opportunity`}><div><h3>Hiring an engineer?</h3><p>Let’s talk about your team and the work ahead.</p></div><ArrowUpRight size={20} aria-hidden="true" /></a><a href={`mailto:${site.email}?subject=Let%27s%20build%20a%20product`}><div><h3>Building something?</h3><p>Tell me about the problem you want to solve.</p></div><ArrowUpRight size={20} aria-hidden="true" /></a></div><div className="contact-bottom"><CopyEmail /><Link href="/about" className="text-link">A little more about me <ArrowUpRight size={16} /></Link></div></div></section>;
}
