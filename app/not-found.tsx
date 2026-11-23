import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";
export default function NotFound() { return <div className="not-found wrap"><p className="eyebrow">404 / SCENE NOT FOUND</p><h1>THIS ONE DIDN’T<br />MAKE THE <span>CUT.</span></h1><p>That page isn’t in the collection. There’s still plenty to explore.</p><div className="hero-actions"><Link className="button button-light" href="/projects"><Play size={17} fill="currentColor" /> Browse projects</Link><Link className="button button-quiet" href="/"><ArrowLeft size={17} /> Back home</Link></div></div>; }
