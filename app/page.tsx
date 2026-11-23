import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { featured, projects } from "@/lib/content";
import { ExperienceList } from "@/components/experience-list";
import { ProjectShelf } from "@/components/project-shelf";
import { ContactSection } from "@/components/contact-section-new";
import { EditorialDepth } from "@/components/editorial-depth";
import { SceneDepth } from "@/components/scene-depth";
import { CursorLight } from "@/components/cursor-light";
import { pageMetadata, seoPages, webPageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
export const metadata = pageMetadata(seoPages.home);
export default function Home() {
 return <><JsonLd data={webPageSchema(seoPages.home)} /><CursorLight /><EditorialDepth />
 <section data-motion-route="/" className="hero" aria-labelledby="hero-title">
   <SceneDepth /><div className="hero-scene"><Image src="/images/hero.webp" alt="" fill priority sizes="100vw" className="hero-image" /></div><div className="hero-vignette" />
   <div className="hero-content wrap"><p className="hero-role">SOFTWARE ENGINEER <span>·</span> BENGALURU, INDIA</p>
     <h1 id="hero-title"><span className="hero-name-line"><span data-hero-word>ROHIT</span></span>{" "}<span className="hero-name-line"><span data-hero-word>MONINGI<span className="hero-period">.</span></span></span></h1>
     <p className="hero-specialty">DevOps. Cloud. Full stack.</p>
     <p className="hero-description">I build the systems behind the experience.<br className="desktop-break" /> Web platforms, cloud deployments, and software<br className="desktop-break" /> that makes everyday work easier.</p>
     <div className="hero-actions"><a href="#projects" className="button button-light"><Play size={17} fill="currentColor" /> Explore my work</a><Link href="/contact" className="button button-glass">Let’s talk</Link></div>
     <p className="hero-footnote"><Link href="/about#experience" className="hero-career-link"><span className="career-status-dot" /> Next: Software Engineer at Bosch · <time dateTime="2027-01-05">5 Jan 2027</time></Link></p>
   </div>
 </section>
 <div className="home-collections"><ProjectShelf id="projects" title="Selected work" subtitle="WEB · SOFTWARE · SYSTEMS" projects={featured} ranked />

 <ProjectShelf id="business" title="Built for the real world" subtitle="PRODUCTS & BUSINESS SYSTEMS" projects={projects.filter(p => ["indoharvest-exports", "tryfactor-product-strategy", "clinic-management-system", "cleartrail"].includes(p.slug))} />
 <section className="research-feature wrap"><div className="research-art"><div className="research-visual"><Image src="/images/projects/ecg-cover.webp" alt="Concept illustration of an ECG signal on paper" fill sizes="(max-width: 768px) 100vw, 50vw" /></div></div><div className="research-copy"><p className="eyebrow"><span className="red-dash" /> A CLOSER LOOK</p><p className="research-label">IEEE AISP 2024 · EXPLAINABLE AI</p><h2>BEYOND<br />THE BLACK BOX.</h2><p>Accuracy is one part of the story. Understanding a model’s decisions is another. My ECG research explores both.</p><Link prefetch={false} href="/projects/explainable-ecg-heartbeat-classification" className="button button-light">Explore the research <ArrowRight size={17} /></Link></div></section>
 <ProjectShelf id="experiments" title="Research & experiments" subtitle="AI · CLOUD · MOBILE" projects={projects.filter(p => ["casting-surface-defect-detection", "shoplifting-detection-system", "focusflow", "aws-serverless-chatbot"].includes(p.slug))} /></div>
 <section className="experience-section wrap" id="experience"><div className="section-heading"><div><p className="eyebrow">THE STORY SO FAR</p><h2>Behind the work<span className="red">.</span></h2></div><Link href="/about" className="text-link">Full story <ArrowRight size={16} /></Link></div><ExperienceList /><div id="skills" className="capability-line"><span>CORE TECHNOLOGIES</span><p>React · Next.js · TypeScript · Python · PostgreSQL · AWS</p></div></section>
 <ContactSection /></>;
}
