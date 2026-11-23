export type Collection = "business" | "systems" | "research";
export type Project = {
 slug: string; title: string; shortTitle: string; strap: string; description: string;
 category: string; tags: string[]; collection: Collection; status: string; role: string;
 image: string; screenshot?: string; coverKind: string; summary: string;
 overview: string[]; highlights: string[]; results?: string[]; stack: string[];
 notes?: string; externalUrl?: string | null; externalLabel?: string; code?: string;
};

export const projects: Project[] = [
  {
    "slug": "sri-lalitha-signature-noodles",
    "title": "Sri Lalitha Signature Noodles",
    "description": "A storefront that connects retail checkout, B2B orders, and the work behind every sale.",
    "category": "E-commerce",
    "tags": [
      "Next.js",
      "React 19",
      "Supabase"
    ],
    "image": "/images/sri-lalitha-hero.webp",
    "externalUrl": "https://www.srilalithasignaturenoodles.online/",
    "externalLabel": "Visit Live Site",
    "summary": "A premium production storefront with cinematic scroll-driven storytelling, secure payments, admin tooling, and B2B lead workflows.",
    "overview": [
      "Built the platform from scratch as a production-grade Next.js commerce and corporate website.",
      "Designed the homepage around a 192-frame canvas scrollytelling sequence tuned for smooth first-time onboarding.",
      "Extended the build beyond storefront basics with admin analytics, CMS editing, order management, leads, coupons, and newsletter tooling."
    ],
    "highlights": [
      "Solved blank-first-visit canvas failures by adding a loading gate, first-frame preload, and immutable caching.",
      "Fixed Google OAuth cookie corruption in Server Components with edge-side cookie sanitization.",
      "Protected payments with server-side HMAC-SHA256 verification before persisting orders."
    ],
    "results": [
      "Retail, cash-on-delivery and B2B checkout workflows.",
      "Server-side payment signature verification and role-based administration.",
      "Order management, analytics and Cypress end-to-end tests."
    ],
    "stack": [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Supabase",
      "Razorpay",
      "Cypress",
      "Vercel"
    ],
    "shortTitle": "SRI LALITHA",
    "strap": "Commerce, end to end.",
    "collection": "business",
    "status": "Live website",
    "role": "Full-stack development",
    "screenshot": "/images/sri-lalitha-hero.webp",
    "coverKind": "Product website"
  },
  {
    "slug": "bike-auction",
    "title": "Bike Auction Platform",
    "shortTitle": "GOING. GOING.",
    "strap": "Real time. Real engineering.",
    "description": "Live motorcycle auctions with proxy bidding, reliable state, and recovery when connections drop.",
    "category": "Real-time platform",
    "tags": [
      "React",
      "Cloudflare",
      "WebSockets"
    ],
    "collection": "systems",
    "status": "Public deployment",
    "role": "Full-stack project",
    "image": "/images/projects/auction-cover.webp",
    "screenshot": "/images/projects/auction.webp",
    "coverKind": "Concept artwork",
    "summary": "A real-time auction system designed around a single authoritative state for each auction.",
    "overview": [
      "Buyers browse vehicles, place bids and receive live updates.",
      "The system combines a React interface with Cloudflare Workers, Durable Objects and D1.",
      "Each auction has its own authority for bidding, deadlines and final results."
    ],
    "highlights": [
      "Durable idempotency keys prevent retries from creating duplicate bids.",
      "WebSocket recovery and an outbox pattern keep clients and read models aligned.",
      "Proxy bidding and server-side closing make the auction rules explicit."
    ],
    "results": [
      "Public source includes architecture decisions, test suites and deployment documentation.",
      "Documented demo screens include connection recovery and offline states."
    ],
    "stack": [
      "TypeScript",
      "React",
      "Hono",
      "Cloudflare Workers",
      "Durable Objects",
      "D1",
      "WebSockets"
    ],
    "externalUrl": "https://bike-auction.skiranbot.workers.dev/",
    "externalLabel": "Open website",
    "code": "https://github.com/AYASKA-in/bike-auction",
    "notes": "Screenshots show fictional demo listings from the public repository."
  },
  {
    "slug": "billing-software-for-cafe",
    "title": "Cafe POS & Bookkeeping",
    "description": "Offline-first desktop software for billing, inventory, recipes, P&L, backups, and audit logging.",
    "category": "Operations Software",
    "tags": [
      "Python",
      "PySide6",
      "SQLite"
    ],
    "image": "/images/projects/cafe-cover.webp",
    "externalUrl": null,
    "externalLabel": "View on GitHub",
    "summary": "A Windows desktop system designed for real cafe pressure: fast billing, stock deduction, profit tracking, and dependable offline use.",
    "overview": [
      "Built as one offline-first desktop system instead of a patchwork of separate billing, stock, and bookkeeping tools.",
      "Designed for the pace of a live cafe environment, where speed and clarity matter more than dashboard theatrics.",
      "Connected recipe-linked inventory, billing, profit tracking, audit trails, backups, and restore flows in one product."
    ],
    "highlights": [
      "Automated recipe-based stock deduction whenever an item was sold.",
      "Surfaced live P&L from sales through net profit on a single screen.",
      "Added scheduled backups, one-click restore, and full audit logging for operational safety."
    ],
    "results": [
      "Offline-first — zero dependency on internet for daily operations",
      "Recipe-linked inventory auto-deducts stock on each sale",
      "Live P&L with scheduled backups, restore, and full audit trail"
    ],
    "stack": [
      "Python 3.14",
      "PySide6",
      "SQLite",
      "PyInstaller",
      "Inno Setup"
    ],
    "shortTitle": "CAFE POS",
    "strap": "Built for the daily rush.",
    "collection": "business",
    "status": "Open source",
    "role": "Desktop application development",
    "screenshot": "/images/projects/cafe.webp",
    "coverKind": "Concept artwork",
    "code": "https://github.com/AYASKA-in/Billing-Software-for-Cafe"
  },
  {
    "slug": "cleartrail",
    "title": "ClearTrail",
    "shortTitle": "CLEARTRAIL",
    "strap": "Trust, with a paper trail.",
    "description": "Open-source evidence collection, review workflows, and portable audit packages.",
    "category": "Open-source systems",
    "tags": [
      "Python",
      "PostgreSQL",
      "OIDC"
    ],
    "collection": "systems",
    "status": "Controlled staging",
    "role": "Open-source project",
    "image": "/images/projects/cleartrail.webp",
    "screenshot": "/images/projects/cleartrail.webp",
    "coverKind": "Synthetic demo screenshot",
    "summary": "A self-hosted system for collecting security settings and organizing evidence for human review.",
    "overview": [
      "Collects selected settings from GitHub, Google Workspace and AWS.",
      "Supports a local workflow and a hosted edition with organization workspaces and independent reviewers.",
      "Exports portable evidence packages that can be verified offline."
    ],
    "highlights": [
      "Missing or incomplete collection remains unknown rather than being presented as a passing control.",
      "The hosted workflow includes OIDC, scoped roles and immutable evidence versions.",
      "Offline verification preserves a connection between reviewed files and exported reports."
    ],
    "results": [
      "Public code and documented deployment gates.",
      "Synthetic demo data allows inspection without connecting real provider accounts."
    ],
    "stack": [
      "Python",
      "PostgreSQL",
      "SQLite",
      "OIDC",
      "Docker"
    ],
    "code": "https://github.com/AYASKA-in/cleartrail-evidence",
    "notes": "Version 0.6.0 is controlled staging. It prepares evidence for review; it does not certify compliance."
  },
  {
    "slug": "indoharvest-exports",
    "title": "IndoHarvest",
    "description": "A secure B2B platform for catalogs, quotations, admin workflows, and business-facing performance.",
    "category": "Business Platform",
    "tags": [
      "Next.js",
      "Prisma",
      "Supabase"
    ],
    "image": "/images/projects/indoharvest.webp",
    "externalUrl": "https://indoharvestexports.vercel.app/",
    "externalLabel": "Visit Live Site",
    "summary": "A high-performance export platform built to support real business flows from product browsing to automated quote delivery.",
    "overview": [
      "Built the platform with Next.js App Router, Server Actions, Prisma, Supabase, and secure admin authentication.",
      "Focused on both polished presentation and durable business architecture under the hood.",
      "Shaped the product around catalog browsing, quote requests, admin visibility, and reliable email workflows."
    ],
    "highlights": [
      "Integrated branded quote-confirmation email workflows using secure SMTP delivery.",
      "Created a protected admin dashboard for enquiries, products, and exportable operational data.",
      "Improved performance with optimized image loading, SSR, and stricter environment and role-based protections."
    ],
    "results": [
      "Live production site serving B2B export catalogue and quote workflows",
      "Admin dashboard with enquiry management, product CRUD, and data export",
      "Secure auth with role-based protections and environment-gated access"
    ],
    "stack": [
      "Next.js 15",
      "Server Actions",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "NextAuth.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel"
    ],
    "shortTitle": "INDOHARVEST",
    "strap": "Built for business beyond borders.",
    "collection": "business",
    "status": "Live website",
    "role": "Full-stack development",
    "screenshot": "/images/projects/indoharvest.webp",
    "coverKind": "Product website"
  },
  {
    "slug": "tryfactor-product-strategy",
    "title": "TryFactor / FACTOR",
    "description": "Founding-stage product work focused on interfaces, workflows, implementation quality, and positioning.",
    "category": "Product Strategy",
    "tags": [
      "Founding Team",
      "Product Systems",
      "Full-stack"
    ],
    "image": "/images/projects/tryfactor.webp",
    "externalUrl": "https://tryfactor.in",
    "externalLabel": "Open Product Site",
    "summary": "Founding web engineering work for a residential design intelligence platform shaped around clarity, trust, and fast decision-making.",
    "overview": [
      "Developed and contributed to the public-facing product experience for FACTOR / TryFactor.",
      "Worked across frontend, backend, deployment, debugging, and system improvement as part of a founding-stage product effort.",
      "Helped the product feel more intuitive and credible for architects and developers navigating early planning decisions."
    ],
    "highlights": [
      "Built responsive experiences for design and planning workflows.",
      "Connected implementation decisions with product and user needs."
    ],
    "results": [
      "Contributed interfaces and full-stack product workflows.",
      "Worked across development, deployment, debugging and product iteration."
    ],
    "stack": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Full-stack Development",
      "Deployment"
    ],
    "shortTitle": "FACTOR",
    "strap": "From idea to product.",
    "collection": "business",
    "status": "Live website",
    "role": "Founding web engineer",
    "screenshot": "/images/projects/tryfactor.webp",
    "coverKind": "Product website"
  },
  {
    "slug": "explainable-ecg-heartbeat-classification",
    "title": "Explainable AI-Based ECG Heartbeat Classification",
    "description": "ECG heartbeat classification with deep learning, SHAP, and LIME.",
    "category": "Research",
    "tags": [
      "Explainable AI",
      "ECG",
      "SHAP"
    ],
    "image": "/images/projects/ecg-cover.webp",
    "externalUrl": "https://ieeexplore.ieee.org/document/10870845",
    "externalLabel": "Read paper",
    "summary": "An IEEE-published research project addressing the interpretability gap in AI-driven ECG classification.",
    "overview": [
      "Explored explainable classification of ECG heartbeats using a CNN-LSTM-Attention architecture.",
      "Used the MIT-BIH dataset to study model performance and interpretation.",
      "Presented this work at IEEE AISP 2024."
    ],
    "highlights": [
      "Combined convolutional, recurrent and attention mechanisms.",
      "Used SHAP and LIME to explore how signals influenced model predictions."
    ],
    "results": [
      "Reported 98.25% classification accuracy on the project benchmark.",
      "Research code is publicly available for inspection."
    ],
    "stack": [
      "Python",
      "CNN-LSTM-Attention",
      "MIT-BIH Arrhythmia Database",
      "SHAP",
      "LIME",
      "Explainable AI"
    ],
    "shortTitle": "BEYOND THE BEAT",
    "strap": "Making model decisions visible.",
    "collection": "research",
    "status": "Published research",
    "role": "Research author",
    "coverKind": "Concept artwork",
    "notes": "A research benchmark, not a clinically validated diagnostic tool. Evaluation depends on the dataset and experimental split.",
    "code": "https://github.com/AYASKA-in/Explainable-AI-based-ECG-Heartbeat-Classification-Using-Deep-Learning-Models"
  },
  {
    "slug": "clinic-management-system",
    "title": "Clinic Management System",
    "description": "A full-stack clinic platform for appointments, records, reminders, auditability, and role-based administration.",
    "category": "Operations Software",
    "tags": [
      "Next.js",
      "Prisma",
      "Role-based Access"
    ],
    "image": "/images/projects/clinic.webp",
    "externalUrl": "https://acupunctureclinic.vercel.app/",
    "externalLabel": "Open Live App",
    "summary": "A digitized clinic workflow system spanning patient records, treatment flows, follow-ups, and secure administration.",
    "overview": [
      "Built a full-stack system to replace fragmented clinic processes with one operational surface.",
      "Covered patient records, appointment scheduling, follow-ups, reminders, administration, and audit tracking.",
      "Designed the system around reliability, permissions, and day-to-day usability for clinic staff."
    ],
    "highlights": [
      "Digitized patient and treatment workflows with secure role-based access control.",
      "Added email reminders and follow-up tooling to reduce operational gaps.",
      "Used audit tracking to improve accountability across sensitive clinic actions."
    ],
    "results": [
      "Connected appointments, records and follow-up workflows.",
      "Role-based administration and audit tracking."
    ],
    "stack": [
      "Next.js",
      "TypeScript",
      "Prisma ORM",
      "SQLite",
      "PostgreSQL",
      "Tailwind CSS"
    ],
    "shortTitle": "CLINIC OS",
    "strap": "Care, with less paperwork.",
    "collection": "business",
    "status": "Login required",
    "role": "Full-stack development",
    "screenshot": "/images/projects/clinic.webp",
    "coverKind": "Public sign-in screen",
    "notes": "The public application requires sign-in. Patient and staff records are not shown in this portfolio."
  },
  {
    "slug": "casting-surface-defect-detection",
    "title": "Casting Surface Defect Detection with Grad-CAM",
    "description": "Industrial surface inspection with EfficientNet-B0 and Grad-CAM visual explanations.",
    "category": "Machine Learning",
    "tags": [
      "Computer Vision",
      "Grad-CAM",
      "CNN"
    ],
    "image": "/images/projects/casting-cover.svg",
    "externalUrl": null,
    "externalLabel": "View GitHub Profile",
    "summary": "A defect-detection project centered on model visibility, not just classification output.",
    "overview": [
      "Focused on surface defect detection in a computer-vision setting.",
      "Used Grad-CAM to make model attention easier to inspect and communicate.",
      "Treated interpretability as part of the product value of the system, not just a research extra."
    ],
    "highlights": [
      "Applied Grad-CAM to surface model reasoning more clearly.",
      "Worked on vision classification in an industrial inspection context.",
      "Balanced technical modeling with explainability needs."
    ],
    "results": [
      "Fine-tuned an image classifier for casting-surface defects.",
      "Generated Grad-CAM heatmaps to inspect model attention."
    ],
    "stack": [
      "Python",
      "PyTorch",
      "EfficientNet-B0",
      "Grad-CAM"
    ],
    "shortTitle": "BENEATH THE SURFACE",
    "strap": "Inspect. Explain. Improve.",
    "collection": "research",
    "status": "Research project",
    "role": "Machine learning development",
    "coverKind": "Concept artwork",
    "notes": "Model metrics require dataset and evaluation-split context. A dedicated public repository is not currently linked."
  },
  {
    "slug": "shoplifting-detection-system",
    "title": "Shoplifting Detection System",
    "description": "A real-time behavior analysis pipeline for retail scenes using detection, tracking, pose cues, and rule-based risk scoring.",
    "category": "Computer Vision",
    "tags": [
      "YOLOv8",
      "DeepSORT",
      "MediaPipe"
    ],
    "image": "/images/projects/vision-cover.svg",
    "summary": "A computer-vision pipeline for shoplifting detection that combines person detection, tracking, pose extraction, and live risk scoring.",
    "overview": [
      "Built from scratch around YOLOv8 for detection, DeepSORT for tracking, MediaPipe for pose, and a custom behavior engine.",
      "Supports RTSP streams, webcams, and video files, with annotated output and automatic alert snapshots.",
      "The real challenge was reducing false alerts in retail-like behavior rather than simply wiring models together."
    ],
    "highlights": [
      "Generated annotated video with pose overlays, risk labels, and saved alert snapshots.",
      "Focused heavily on behavior thresholds to separate normal shelf interaction from suspicious motion.",
      "Outlined next steps toward better retail fine-tuning and transformer-based behavior modeling."
    ],
    "results": [
      "Detection, tracking and pose information combined in one pipeline.",
      "Annotated video and alert snapshots for inspection."
    ],
    "stack": [
      "YOLOv8",
      "DeepSORT",
      "MediaPipe",
      "FastAPI",
      "RTSP",
      "Action Recognition"
    ],
    "notes": "A prototype behaviour-analysis pipeline. Risk signals are not proof of wrongdoing; deployment requires context-specific evaluation and human review.",
    "shortTitle": "IN PLAIN SIGHT",
    "strap": "Computer vision in motion.",
    "collection": "research",
    "status": "Prototype",
    "role": "Computer vision development",
    "coverKind": "Concept artwork"
  },
  {
    "slug": "focusflow",
    "title": "FocusFlow",
    "description": "A calmer productivity app built around emotional UX, offline-first behavior, and realistic planning.",
    "category": "Mobile Product",
    "tags": [
      "Kotlin",
      "Jetpack Compose",
      "Gemini AI"
    ],
    "image": "/images/projects/focusflow-cover.svg",
    "externalUrl": null,
    "externalLabel": "Download APK",
    "summary": "An Android productivity app designed to reduce pressure instead of amplifying it.",
    "overview": [
      "Built from scratch to make focus and planning feel calmer rather than more stressful.",
      "Centered the product around deep focus, habit tracking, AI planning, weekly insights, and offline-first use.",
      "Spent serious time on spacing, rhythm, and the emotional feel of opening the app."
    ],
    "highlights": [
      "Combined productivity features with a calmer emotional UX direction.",
      "Added personalized coaching powered by Gemini AI.",
      "Delivered as a shareable APK despite not publishing to the Play Store yet."
    ],
    "results": [
      "Fully functional Android APK — offline-first with Room DB",
      "Gemini AI-powered personalized coaching and weekly insights",
      "Material Design 3 UI with deliberate calmer UX rhythm"
    ],
    "stack": [
      "Kotlin",
      "Jetpack Compose",
      "Material Design 3",
      "Room DB",
      "Gemini AI"
    ],
    "shortTitle": "FOCUSFLOW",
    "strap": "Make room for focus.",
    "collection": "systems",
    "status": "Prototype",
    "role": "Android application development",
    "coverKind": "Concept artwork",
    "code": "https://github.com/AYASKA-in/FocusFlow",
    "notes": "An Android prototype. The repository includes setup instructions; no app-store release is claimed."
  },
  {
    "slug": "aws-serverless-chatbot",
    "title": "AWS Serverless Chatbot",
    "description": "A serverless chatbot build using managed AWS services for lean deployment and conversational workflows.",
    "category": "Cloud",
    "tags": [
      "AWS",
      "Amazon Lex",
      "Lambda"
    ],
    "image": "/images/projects/cloud-cover.svg",
    "externalUrl": null,
    "externalLabel": "View on GitHub",
    "summary": "A cloud-native chatbot setup designed around managed services and simpler deployment overhead.",
    "overview": [
      "Built with AWS serverless primitives instead of provisioning heavier infrastructure.",
      "Focused on keeping conversational integrations easier to deploy and maintain.",
      "Showed practical comfort with event-driven cloud patterns and AWS tooling."
    ],
    "highlights": [
      "Used Amazon Lex and Lambda for managed conversational workflows.",
      "Kept the architecture lean through serverless design choices.",
      "Positioned the build around operational simplicity and deployment speed."
    ],
    "results": [
      "Fully serverless — no EC2 or infrastructure to manage",
      "Amazon Lex conversational flows routed through Lambda handlers",
      "Lean architecture designed for minimal deployment overhead"
    ],
    "stack": [
      "AWS",
      "Amazon Lex",
      "Lambda",
      "Serverless Architecture"
    ],
    "shortTitle": "SERVERLESS",
    "strap": "A conversation in the cloud.",
    "collection": "systems",
    "status": "Open source",
    "role": "Cloud development",
    "coverKind": "Concept artwork",
    "code": "https://github.com/AYASKA-in/AWS-chatbot-using-lex-and-lambda-"
  },
  {
    "slug": "iloveinvoice",
    "title": "iLoveInvoice — Invoice Manager",
    "description": "A streamlined billing tool designed for fast invoice creation and cleaner day-to-day invoice management.",
    "category": "Business Tooling",
    "tags": [
      "Billing",
      "Productivity",
      "Web App"
    ],
    "image": "/images/projects/invoice-cover.svg",
    "externalUrl": null,
    "externalLabel": "Open App",
    "summary": "A focused invoice workflow tool built around speed, simplicity, and professional output.",
    "overview": [
      "Built as a streamlined web application for fast invoice creation and billing management.",
      "Prioritized clarity and reduced friction instead of burying the user under unnecessary workflow steps.",
      "Positioned as a practical business utility rather than a heavy dashboard product."
    ],
    "highlights": [
      "Simplified invoice generation into a cleaner, faster product flow.",
      "Focused on professional output and reduced billing friction.",
      "Kept the user experience lightweight and task-oriented."
    ],
    "results": [
      "Designed a focused invoice-creation workflow.",
      "Prioritized clear billing inputs and professional output."
    ],
    "stack": [
      "Web Application",
      "Billing Workflow",
      "UI/UX"
    ],
    "shortTitle": "iLOVEINVOICE",
    "strap": "Less admin. More doing.",
    "collection": "business",
    "status": "Project archive",
    "role": "Web application development",
    "coverKind": "Concept artwork",
    "notes": "The public demo is currently unavailable. This case study preserves the project overview."
  }
];
export const projectMap = new Map(projects.map(p => [p.slug, p]));
export const featured = projects.slice(0, 3);
