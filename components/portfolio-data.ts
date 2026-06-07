export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  size?: "lg" | "md";
  tone?: "warm" | "green" | "blue" | "amber" | "slate" | "violet";
  externalUrl?: string;
  externalLabel?: string;
  summary: string;
  overview: string[];
  highlights: string[];
  stack: string[];
  notes?: string;
  results?: string[];
  date: string;
};

export const projects: Project[] = [
  {
    slug: "sri-lalitha-signature-noodles",
    title: "Sri Lalitha Signature Noodles",
    description:
      "A luxury corporate and e-commerce experience built for retail, B2B, and OEM buyers.",
    category: "E-commerce",
    tags: ["Next.js", "React 19", "Supabase", "Razorpay"],
    image: "/images/sri-lalitha-hero.webp",
    featured: true,
    size: "lg",
    tone: "warm",
    date: "2025-11",
    externalUrl: "https://www.srilalithasignaturenoodles.online/",
    externalLabel: "Visit Live Site",
    summary:
      "A premium production storefront with cinematic scroll-driven storytelling, secure payments, admin tooling, and B2B lead workflows.",
    overview: [
      "Built the platform from scratch as a production-grade Next.js commerce and corporate website.",
      "Designed the homepage around a 192-frame canvas scrollytelling sequence tuned for smooth first-time onboarding.",
      "Extended the build beyond storefront basics with admin analytics, CMS editing, order management, leads, coupons, and newsletter tooling.",
    ],
    highlights: [
      "Solved blank-first-visit canvas failures by adding a loading gate, first-frame preload, and immutable caching.",
      "Fixed Google OAuth cookie corruption in Server Components with edge-side cookie sanitization.",
      "Protected payments with server-side HMAC-SHA256 verification before persisting orders.",
    ],
    results: [
      "Delivered within 6 weeks from kickoff to production",
      "Integrated COD, online payments, and B2B quoting in a single checkout pipeline",
      "0 payment-related production incidents since launch",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Framer Motion",
      "Supabase",
      "Razorpay",
      "Cypress",
      "Vercel",
    ],
  },
  {
    slug: "explainable-ecg-heartbeat-classification",
    title: "Explainable AI-Based ECG Heartbeat Classification",
    description:
      "Published IEEE research combining deep learning accuracy with clinically useful interpretability.",
    category: "Research",
    tags: ["Explainable AI", "ECG", "SHAP", "LIME"],
    image:
      "https://iad.microlink.io/G_pbQ1OA3MMiMmXPY-TLtIezvVZzB7mkNWTUsGs1RD78gkT_9C1X-DDwHESFg8JKGnjE-wSPsU3FMjQUl6jxgA.png",
    externalUrl: "https://ieeexplore.ieee.org/document/10870845/keywords",
    externalLabel: "Read Publication",
    size: "md",
    tone: "blue",
    date: "2024-08",
    summary:
      "An IEEE-published research project addressing the interpretability gap in AI-driven ECG classification.",
    overview: [
      "Co-authored a paper on explainable ECG heartbeat classification for IEEE AISP 2024.",
      "Framed the work around the clinical trust problem in black-box deep learning systems.",
      "Combined performance with interpretability using a CNN-LSTM-Attention ensemble on MIT-BIH data.",
    ],
    highlights: [
      "Reached 98.25% accuracy while preserving interpretable decision support.",
      "Integrated SHAP and LIME for transparent prediction analysis.",
      "Focused on making AI-driven ECG classification more clinically applicable.",
    ],
    results: [
      "98.25% classification accuracy on MIT-BIH arrhythmia benchmark",
      "Published and indexed in IEEE Xplore (AISP 2024)",
      "3 interpretability methods integrated — SHAP, LIME, Grad-CAM",
    ],
    stack: [
      "Python",
      "CNN-LSTM-Attention",
      "MIT-BIH Arrhythmia Database",
      "SHAP",
      "LIME",
      "Explainable AI",
    ],
  },
  {
    slug: "tryfactor-product-strategy",
    title: "TryFactor / FACTOR Product Strategy Work",
    description:
      "Founding-stage product work focused on interfaces, workflows, implementation quality, and positioning.",
    category: "Product Strategy",
    tags: ["Founding Team", "Product Systems", "Full-stack"],
    image:
      "https://iad.microlink.io/XNERMceE4FNMWBCbBIi6mhaAspa5orgrT5BuyH2W14aw5EREUpaRSCY1ZFM4OUlJ-m1qFSqfJD7o3NAANQPIZw.png",
    externalUrl: "https://tryfactor.in",
    externalLabel: "Open Product Site",
    size: "lg",
    tone: "violet",
    date: "2025-12",
    summary:
      "Founding web engineering work for a residential design intelligence platform shaped around clarity, trust, and fast decision-making.",
    overview: [
      "Developed and contributed to the public-facing product experience for FACTOR / TryFactor.",
      "Worked across frontend, backend, deployment, debugging, and system improvement as part of a founding-stage product effort.",
      "Helped the product feel more intuitive and credible for architects and developers navigating early planning decisions.",
    ],
    highlights: [
      "Built responsive interfaces and full-stack product flows for a design-tech platform.",
      "Improved performance, usability, and implementation quality across the product surface.",
      "Contributed to product direction through execution rather than isolated feature shipping.",
    ],
    results: [
      "20+ features shipped from ideation through production as founding engineer",
      "Reduced key user flow interaction steps by ~30%",
      "Public-facing product site serving architects and developers",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Full-stack Development", "Deployment"],
  },
  {
    slug: "indoharvest-exports",
    title: "IndoHarvest",
    description:
      "A secure B2B platform for catalogs, quotations, admin workflows, and business-facing performance.",
    category: "Business Platform",
    tags: ["Next.js", "Prisma", "Supabase", "NextAuth.js"],
    image:
      "https://iad.microlink.io/-8OrnoBxw1J7zxSfiiT1YgJv3rCLzQDPW8NAFxV8HdB8LYUAhEVZq70zqd2LZBOVqF8JcxfydK3YtaUwRRke1w.png",
    externalUrl: "https://indoharvestexports.vercel.app/",
    externalLabel: "Visit Live Site",
    size: "md",
    tone: "green",
    date: "2025-06",
    summary:
      "A high-performance export platform built to support real business flows from product browsing to automated quote delivery.",
    overview: [
      "Built the platform with Next.js App Router, Server Actions, Prisma, Supabase, and secure admin authentication.",
      "Focused on both polished presentation and durable business architecture under the hood.",
      "Shaped the product around catalog browsing, quote requests, admin visibility, and reliable email workflows.",
    ],
    highlights: [
      "Integrated branded quote-confirmation email workflows using secure SMTP delivery.",
      "Created a protected admin dashboard for enquiries, products, and exportable operational data.",
      "Improved performance with optimized image loading, SSR, and stricter environment and role-based protections.",
    ],
    results: [
      "Live production site serving B2B export catalogue and quote workflows",
      "Admin dashboard with enquiry management, product CRUD, and data export",
      "Secure auth with role-based protections and environment-gated access",
    ],
    stack: [
      "Next.js 15",
      "Server Actions",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "NextAuth.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
  },
  {
    slug: "clinic-management-system",
    title: "Clinic Management System",
    description:
      "A full-stack clinic platform for appointments, records, reminders, auditability, and role-based administration.",
    category: "Operations Software",
    tags: ["Next.js", "Prisma", "Role-based Access", "Healthcare"],
    image:
      "https://iad.microlink.io/vQq0QdHgYU8vHkX2XZIGsMsODC97IsrxoyGUD7S_-20788iRdvpVJxQP3BnzsEG9FkA1UsGfHYM3b8E24XDzkw.png",
    externalUrl: "https://acupunctureclinic.vercel.app/",
    externalLabel: "Open Live App",
    size: "md",
    tone: "blue",
    date: "2024-10",
    summary:
      "A digitized clinic workflow system spanning patient records, treatment flows, follow-ups, and secure administration.",
    overview: [
      "Built a full-stack system to replace fragmented clinic processes with one operational surface.",
      "Covered patient records, appointment scheduling, follow-ups, reminders, administration, and audit tracking.",
      "Designed the system around reliability, permissions, and day-to-day usability for clinic staff.",
    ],
    highlights: [
      "Digitized patient and treatment workflows with secure role-based access control.",
      "Added email reminders and follow-up tooling to reduce operational gaps.",
      "Used audit tracking to improve accountability across sensitive clinic actions.",
    ],
    results: [
      "Replaced fragmented paper processes with a single digitized operations platform",
      "Role-based access for admin, practitioners, and front-desk staff",
      "Automated reminders and follow-ups to reduce missed appointments",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Prisma ORM",
      "SQLite",
      "PostgreSQL",
      "Tailwind CSS",
    ],
  },
  {
    slug: "iloveinvoice",
    title: "iLoveInvoice — Invoice Manager",
    description:
      "A streamlined billing tool designed for fast invoice creation and cleaner day-to-day invoice management.",
    category: "Business Tooling",
    tags: ["Billing", "Productivity", "Web App"],
    image:
      "https://iad.microlink.io/j7g_W3pUHu9UYdeBCN94u36my1MvVK51LHdTefc0ENm7S5xF40xQNsGcqyzYszUDSHNs0OmGf46mnKBpYfIg-Q.png",
    externalUrl: "https://iloveinvoice.lovable.app/",
    externalLabel: "Open App",
    size: "md",
    tone: "amber",
    date: "2025-03",
    summary:
      "A focused invoice workflow tool built around speed, simplicity, and professional output.",
    overview: [
      "Built as a streamlined web application for fast invoice creation and billing management.",
      "Prioritized clarity and reduced friction instead of burying the user under unnecessary workflow steps.",
      "Positioned as a practical business utility rather than a heavy dashboard product.",
    ],
    highlights: [
      "Simplified invoice generation into a cleaner, faster product flow.",
      "Focused on professional output and reduced billing friction.",
      "Kept the user experience lightweight and task-oriented.",
    ],
    results: [
      "Live web app for fast invoice creation and management",
      "Streamlined to essential flows — no feature bloat",
      "Professional invoice output designed for small businesses",
    ],
    stack: ["Web Application", "Billing Workflow", "UI/UX"],
  },
  {
    slug: "billing-software-for-cafe",
    title: "Billing Software for Cafe",
    description:
      "Offline-first desktop software for billing, inventory, recipes, P&L, backups, and audit logging.",
    category: "Operations Software",
    tags: ["Python", "PySide6", "SQLite", "Desktop"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    externalUrl: "https://github.com/AYASKA-in/Billing-Software-for-Cafe",
    externalLabel: "View on GitHub",
    size: "md",
    tone: "amber",
    date: "2024-06",
    summary:
      "A Windows desktop system designed for real cafe pressure: fast billing, stock deduction, profit tracking, and dependable offline use.",
    overview: [
      "Built as one offline-first desktop system instead of a patchwork of separate billing, stock, and bookkeeping tools.",
      "Designed for the pace of a live cafe environment, where speed and clarity matter more than dashboard theatrics.",
      "Connected recipe-linked inventory, billing, profit tracking, audit trails, backups, and restore flows in one product.",
    ],
    highlights: [
      "Automated recipe-based stock deduction whenever an item was sold.",
      "Surfaced live P&L from sales through net profit on a single screen.",
      "Added scheduled backups, one-click restore, and full audit logging for operational safety.",
    ],
    results: [
      "Offline-first — zero dependency on internet for daily operations",
      "Recipe-linked inventory auto-deducts stock on each sale",
      "Live P&L with scheduled backups, restore, and full audit trail",
    ],
    stack: ["Python 3.14", "PySide6", "SQLite", "PyInstaller", "Inno Setup"],
  },
  {
    slug: "shoplifting-detection-system",
    title: "Shoplifting Detection System",
    description:
      "A real-time behavior analysis pipeline for retail scenes using detection, tracking, pose cues, and rule-based risk scoring.",
    category: "Computer Vision",
    tags: ["YOLOv8", "DeepSORT", "MediaPipe", "FastAPI"],
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=80",
    size: "md",
    tone: "slate",
    date: "2024-09",
    summary:
      "A computer-vision pipeline for shoplifting detection that combines person detection, tracking, pose extraction, and live risk scoring.",
    overview: [
      "Built from scratch around YOLOv8 for detection, DeepSORT for tracking, MediaPipe for pose, and a custom behavior engine.",
      "Supports RTSP streams, webcams, and video files, with annotated output and automatic alert snapshots.",
      "The real challenge was reducing false alerts in retail-like behavior rather than simply wiring models together.",
    ],
    highlights: [
      "Generated annotated video with pose overlays, risk labels, and saved alert snapshots.",
      "Focused heavily on behavior thresholds to separate normal shelf interaction from suspicious motion.",
      "Outlined next steps toward better retail fine-tuning and transformer-based behavior modeling.",
    ],
    results: [
      "End-to-end pipeline from RTSP / webcam / video input to annotated alert output",
      "Custom behaviour-risk scoring engine reducing false positives vs naive detection",
      "Automatic alert snapshot capture on high-risk events",
    ],
    stack: ["YOLOv8", "DeepSORT", "MediaPipe", "FastAPI", "RTSP", "Action Recognition"],
    notes: "Contains proprietary implementation details — case study available under NDA.",
  },
  {
    slug: "casting-surface-defect-detection",
    title: "Casting Surface Defect Detection with Grad-CAM",
    description:
      "Applied computer vision work for defect classification with interpretable visual reasoning.",
    category: "Machine Learning",
    tags: ["Computer Vision", "Grad-CAM", "CNN"],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80",
    externalUrl: "https://github.com/AYASKA-in/",
    externalLabel: "View GitHub Profile",
    size: "md",
    tone: "slate",
    date: "2024-04",
    summary:
      "A defect-detection project centered on model visibility, not just classification output.",
    overview: [
      "Focused on surface defect detection in a computer-vision setting.",
      "Used Grad-CAM to make model attention easier to inspect and communicate.",
      "Treated interpretability as part of the product value of the system, not just a research extra.",
    ],
    highlights: [
      "Applied Grad-CAM to surface model reasoning more clearly.",
      "Worked on vision classification in an industrial inspection context.",
      "Balanced technical modeling with explainability needs.",
    ],
    results: [
      "Defect classifier with Grad-CAM heatmaps for visual interpretability",
      "Trained on industrial casting surface dataset",
      "Heatmap overlays make model decisions inspectable by non-ML stakeholders",
    ],
    stack: ["Python", "CNN", "Grad-CAM", "Computer Vision"],
  },
  {
    slug: "aws-serverless-chatbot",
    title: "AWS Serverless Chatbot",
    description:
      "A serverless chatbot build using managed AWS services for lean deployment and conversational workflows.",
    category: "Cloud",
    tags: ["AWS", "Amazon Lex", "Lambda"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80",
    externalUrl: "https://github.com/AYASKA-in/AWS-chatbot-using-lex-and-lambda-",
    externalLabel: "View on GitHub",
    size: "md",
    tone: "blue",
    date: "2024-02",
    summary:
      "A cloud-native chatbot setup designed around managed services and simpler deployment overhead.",
    overview: [
      "Built with AWS serverless primitives instead of provisioning heavier infrastructure.",
      "Focused on keeping conversational integrations easier to deploy and maintain.",
      "Showed practical comfort with event-driven cloud patterns and AWS tooling.",
    ],
    highlights: [
      "Used Amazon Lex and Lambda for managed conversational workflows.",
      "Kept the architecture lean through serverless design choices.",
      "Positioned the build around operational simplicity and deployment speed.",
    ],
    results: [
      "Fully serverless — no EC2 or infrastructure to manage",
      "Amazon Lex conversational flows routed through Lambda handlers",
      "Lean architecture designed for minimal deployment overhead",
    ],
    stack: ["AWS", "Amazon Lex", "Lambda", "Serverless Architecture"],
  },
  {
    slug: "focusflow",
    title: "FocusFlow",
    description:
      "A calmer productivity app built around emotional UX, offline-first behavior, and realistic planning.",
    category: "Mobile Product",
    tags: ["Kotlin", "Jetpack Compose", "Gemini AI", "Offline-first"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    externalUrl:
      "https://drive.google.com/file/d/1u2zwc__8Xv1g0r2qq4Jq8U_oT-qjc1hV/view?usp=drivesdk",
    externalLabel: "Download APK",
    size: "md",
    tone: "violet",
    date: "2025-05",
    summary:
      "An Android productivity app designed to reduce pressure instead of amplifying it.",
    overview: [
      "Built from scratch to make focus and planning feel calmer rather than more stressful.",
      "Centered the product around deep focus, habit tracking, AI planning, weekly insights, and offline-first use.",
      "Spent serious time on spacing, rhythm, and the emotional feel of opening the app.",
    ],
    highlights: [
      "Combined productivity features with a calmer emotional UX direction.",
      "Added personalized coaching powered by Gemini AI.",
      "Delivered as a shareable APK despite not publishing to the Play Store yet.",
    ],
    results: [
      "Fully functional Android APK — offline-first with Room DB",
      "Gemini AI-powered personalized coaching and weekly insights",
      "Material Design 3 UI with deliberate calmer UX rhythm",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Material Design 3", "Room DB", "Gemini AI"],
  },
];

export const projectMap = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<
  string,
  Project
>;

export type ExperienceEntry = {
  role: string;
  company: string;
  period: string;
  status: "currently" | "past";
  domain: "Product" | "Engineering" | "Research" | "Leadership";
  featured?: boolean;
  highlights: [string, string, string];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "Cyber Security Intern",
    company: "Prospient SentinelAI",
    period: "June 2026 - Present",
    status: "currently",
    domain: "Engineering",
    featured: true,
    highlights: [
      "Contributed to 15+ security architecture assessments across SOC 2, ISO 27001, and NIST frameworks.",
      "Assisted with AI-driven threat monitoring and security governance workflows within the Cyber Governance team.",
      "Supported predictive risk intelligence processes and automated security reporting initiatives.",
    ],
  },
  {
    role: "Founding Web Engineer",
    company: "FCTR / TryFactor",
    period: "Dec 2025 - Present",
    status: "currently",
    domain: "Product",
    highlights: [
      "Shipped 20+ product features across the residential design intelligence platform, from ideation to deployment.",
      "Built interfaces, workflows, and system improvements that reduced key user flows by 30% in interaction steps.",
      "Contributed to product strategy and implementation quality across the full stack.",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Self-Employed",
    period: "2023 - 2025",
    status: "past",
    domain: "Engineering",
    highlights: [
      "Delivered 5 production client projects across e-commerce, clinic management, and POS software.",
      "Built the complete Sri Lalitha Signature Noodles and IndoHarvest platforms from scratch.",
      "Managed end-to-end delivery — frontend, backend, deployment, and post-launch support.",
    ],
  },
  {
    role: "Head of Events -> Advisory Board",
    company: "F.E.P.S.I - VIT Vellore",
    period: "Jan 2024 - May 2026",
    status: "past",
    domain: "Leadership",
    highlights: [
      "Led a 20+ member committee across 10+ events and workshops reaching 2,000+ attendees.",
      "Drove community initiatives focused on youth development and social impact.",
      "Received a Certificate of Appreciation from the VIT Office of Students' Welfare.",
    ],
  },
  {
    role: "IEEE Research Author",
    company: "VIT Vellore - IEEE AISP 2024",
    period: "2023 - 2024",
    status: "past",
    domain: "Research",
    highlights: [
      "Co-authored explainable ECG heartbeat classification research with 98.7% classification accuracy.",
      "Built preprocessing pipeline with filtering, R-peak detection, and segmentation.",
      "Integrated Grad-CAM, SHAP, and LIME for model interpretability.",
    ],
  },
];

export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  title: string;
  subtitle: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend & UI",
    subtitle: "Product-facing craft",
    skills: [
      { name: "React", level: 91 },
      { name: "Next.js", level: 88 },
      { name: "TypeScript", level: 86 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 80 },
      { name: "Figma", level: 72 },
    ],
  },
  {
    title: "Backend & Cloud",
    subtitle: "Systems and delivery",
    skills: [
      { name: "Supabase", level: 78 },
      { name: "PostgreSQL", level: 74 },
      { name: "Node.js", level: 76 },
      { name: "Prisma ORM", level: 72 },
      { name: "NextAuth.js", level: 68 },
      { name: "AWS", level: 61 },
    ],
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Applied research depth",
    skills: [
      { name: "Python", level: 80 },
      { name: "TensorFlow / Keras", level: 72 },
      { name: "PyTorch", level: 64 },
      { name: "SHAP / LIME / Grad-CAM", level: 77 },
      { name: "scikit-learn", level: 73 },
      { name: "CNN / LSTM", level: 70 },
    ],
  },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/AYASKA-in" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/moningi-rohit" },
  { label: "Instagram", href: "https://www.instagram.com/mrohit_88/" },
  { label: "LeetCode", href: "https://leetcode.com/u/codeforlife125/" },
];
