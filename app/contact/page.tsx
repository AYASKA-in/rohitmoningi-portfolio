import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section-new";
import { site } from "@/lib/site";
import { pageMetadata, seoPages, webPageSchema, personId } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
export const metadata: Metadata = pageMetadata(seoPages.contact);
export default function Contact() { return <div data-motion-route="/contact" className="contact-page"><JsonLd data={{ ...webPageSchema(seoPages.contact, "ContactPage"), mainEntity: { "@id": personId } }} /><div className="wrap contact-breadcrumb"><Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} /></div><ContactSection full /><div className="wrap contact-links"><a href={site.linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn ↗</a><a href={site.github} target="_blank" rel="noreferrer">Explore GitHub ↗</a><a href="/resume.pdf" target="_blank" rel="noreferrer">Read the resume ↗</a></div></div>; }
