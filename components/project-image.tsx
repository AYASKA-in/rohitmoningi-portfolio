"use client";
import Image from "next/image";
import { useState } from "react";
export function ProjectImage({ src, alt = "", priority = false, className = "", sizes = "(max-width: 600px) 85vw, (max-width: 1000px) 45vw, 30vw" }: { src: string; alt?: string; priority?: boolean; className?: string; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="image-fallback" role={alt ? "img" : undefined} aria-label={alt ? `${alt}. Image unavailable.` : undefined}><span>RM<span className="red">.</span></span></span>;
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={className} onError={() => setFailed(true)} />;
}
