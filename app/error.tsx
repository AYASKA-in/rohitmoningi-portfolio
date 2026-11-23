"use client";
import Link from "next/link";
export default function ErrorPage({ reset }: { reset: () => void }) { return <div className="not-found wrap"><p className="eyebrow">A SHORT INTERRUPTION</p><h1>LET’S TRY<br />THAT <span>AGAIN.</span></h1><p>This page couldn’t load. You can retry or head back to the collection.</p><div className="hero-actions"><button className="button button-light" onClick={reset}>Try again</button><Link className="button button-quiet" href="/projects">Browse projects</Link></div></div>; }
