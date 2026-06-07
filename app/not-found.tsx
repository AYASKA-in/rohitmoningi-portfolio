import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[linear-gradient(180deg,#faf7f0_0%,#f4efe5_100%)] px-6">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-xs font-medium uppercase tracking-[0.26em] text-stone-500">404</p>
        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.04em] text-stone-950 sm:text-6xl">
          Page not found
        </h1>
        <p className="mt-5 text-balance text-lg leading-8 text-stone-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-stone-950 px-5 text-base text-stone-50 hover:bg-stone-800"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[15%] h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />
      </div>
    </main>
  );
}
