import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    slug: "nexus-ai",
    title: "Nexus AI",
    tagline: "AI-Powered Analytics That Think Ahead",
    description:
      "An intelligent analytics platform that uses machine learning to predict trends, detect anomalies, and surface actionable insights from complex datasets in real-time.",
    category: "AI",
    year: 2024,
    featured: true,
    coverImage: "/projects/nexus-ai/cover.jpg",
    screenshots: [
      "/projects/nexus-ai/screen-1.jpg",
      "/projects/nexus-ai/screen-2.jpg",
      "/projects/nexus-ai/screen-3.jpg",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "TensorFlow",
      "PostgreSQL",
      "Redis",
      "OpenAI",
    ],
    liveUrl: "https://nexus-ai.example.com",
    githubUrl: "https://github.com/example/nexus-ai",
    problem:
      "Businesses drown in data but starve for insight. Traditional dashboards show what happened — they never explain why or predict what's next.",
    solution:
      "We built an AI engine that continuously learns from incoming data streams, detects patterns humans miss, and delivers predictive insights through an intuitive conversational interface.",
    features: [
      "Real-time anomaly detection",
      "Natural language data queries",
      "Predictive trend modeling",
      "Automated report generation",
      "Custom alert pipelines",
    ],
    results: [
      { label: "Prediction Accuracy", value: "94%" },
      { label: "Time Saved Weekly", value: "12hrs" },
      { label: "Data Sources Connected", value: "30+" },
    ],
    accentColor: "#8B5CF6",
  },
  {
    id: "2",
    slug: "cloudsync",
    title: "CloudSync",
    tagline: "Real-Time Collaboration, Zero Friction",
    description:
      "A SaaS platform enabling teams to collaborate on documents, designs, and code in real-time with conflict-free synchronization and end-to-end encryption.",
    category: "SaaS",
    year: 2024,
    featured: true,
    coverImage: "/projects/cloudsync/cover.jpg",
    screenshots: [
      "/projects/cloudsync/screen-1.jpg",
      "/projects/cloudsync/screen-2.jpg",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "WebSocket",
      "CRDTs",
      "AWS",
      "Supabase",
    ],
    liveUrl: "https://cloudsync.example.com",
    problem:
      "Remote teams waste hours resolving version conflicts and switching between disconnected tools. Existing solutions are either too complex or too limited.",
    solution:
      "We designed a unified workspace built on conflict-free replicated data types (CRDTs) that merges edits instantly — no save buttons, no merge conflicts, no lost work.",
    features: [
      "Conflict-free real-time editing",
      "End-to-end encryption",
      "Version history with branching",
      "Integrated voice and video",
      "Custom workspace templates",
    ],
    accentColor: "#22D3EE",
  },
  {
    id: "3",
    slug: "pixel-studio",
    title: "Pixel Studio",
    tagline: "Design Tools That Feel Like Magic",
    description:
      "A browser-based design application with GPU-accelerated rendering, real-time collaboration, and an extensible plugin system for professional creative workflows.",
    category: "Web Apps",
    year: 2023,
    featured: true,
    coverImage: "/projects/pixel-studio/cover.jpg",
    screenshots: [
      "/projects/pixel-studio/screen-1.jpg",
      "/projects/pixel-studio/screen-2.jpg",
      "/projects/pixel-studio/screen-3.jpg",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "WebGL",
      "WebAssembly",
      "Canvas API",
      "Zustand",
    ],
    liveUrl: "https://pixelstudio.example.com",
    githubUrl: "https://github.com/example/pixel-studio",
    problem:
      "Professional design tools are locked behind expensive desktop apps. Web alternatives sacrifice performance for accessibility.",
    solution:
      "We leveraged WebGL and WebAssembly to build a browser-native design tool that matches desktop performance while adding real-time collaboration and cloud-based asset management.",
    features: [
      "GPU-accelerated canvas rendering",
      "Vector and raster editing",
      "Plugin marketplace",
      "Asset library with AI tagging",
      "Export to multiple formats",
    ],
    accentColor: "#F472B6",
  },
  {
    id: "4",
    slug: "datapulse",
    title: "DataPulse",
    tagline: "Your Metrics, Alive",
    description:
      "A real-time metrics dashboard that transforms raw data into beautiful, interactive visualizations with customizable widgets and intelligent alerting.",
    category: "Dashboard",
    year: 2023,
    featured: true,
    coverImage: "/projects/datapulse/cover.jpg",
    screenshots: [
      "/projects/datapulse/screen-1.jpg",
      "/projects/datapulse/screen-2.jpg",
    ],
    technologies: [
      "React",
      "TypeScript",
      "D3.js",
      "GraphQL",
      "InfluxDB",
      "Docker",
    ],
    problem:
      "Engineering teams juggle multiple monitoring tools with inconsistent UIs and delayed alerts. Critical issues get buried in noise.",
    solution:
      "We created a single-pane dashboard that aggregates metrics from any source, renders them as interactive D3 visualizations, and uses smart alerting to surface only what matters.",
    features: [
      "Drag-and-drop widget builder",
      "40+ visualization types",
      "Smart alert routing",
      "Custom metric aggregations",
      "Shareable dashboard links",
    ],
    results: [
      { label: "Avg Response Time", value: "<50ms" },
      { label: "Data Points/Sec", value: "100K" },
    ],
    accentColor: "#FB923C",
  },
  {
    id: "5",
    slug: "swiftcart",
    title: "SwiftCart",
    tagline: "Mobile Commerce, Reimagined",
    description:
      "A cross-platform mobile commerce application with gesture-driven navigation, AR product previews, and a one-tap checkout flow.",
    category: "Mobile",
    year: 2023,
    featured: false,
    coverImage: "/projects/swiftcart/cover.jpg",
    screenshots: [
      "/projects/swiftcart/screen-1.jpg",
      "/projects/swiftcart/screen-2.jpg",
    ],
    technologies: [
      "React Native",
      "TypeScript",
      "Node.js",
      "Stripe",
      "Firebase",
      "ARKit",
    ],
    liveUrl: "https://swiftcart.example.com",
    problem:
      "Mobile shopping apps feel sluggish and generic. High cart abandonment rates plague the industry because checkout flows are frustrating.",
    solution:
      "We built a gesture-first shopping experience with AR previews that let users see products in their space, and a one-tap checkout that reduced abandonment dramatically.",
    features: [
      "AR product preview",
      "Gesture-driven navigation",
      "One-tap checkout",
      "Personalized recommendations",
      "Real-time inventory sync",
    ],
    accentColor: "#A3E635",
  },
  {
    id: "6",
    slug: "autoflow",
    title: "AutoFlow",
    tagline: "Workflows That Run Themselves",
    description:
      "A visual automation engine that lets teams build complex workflows with a drag-and-drop interface, connecting 200+ services without writing code.",
    category: "Automation",
    year: 2024,
    featured: true,
    coverImage: "/projects/autoflow/cover.jpg",
    screenshots: [
      "/projects/autoflow/screen-1.jpg",
      "/projects/autoflow/screen-2.jpg",
      "/projects/autoflow/screen-3.jpg",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Go",
      "Temporal",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    githubUrl: "https://github.com/example/autoflow",
    problem:
      "Teams waste countless hours on repetitive tasks. Existing automation tools are either too simple for real workflows or require engineering resources to configure.",
    solution:
      "We built a visual workflow builder powered by a distributed execution engine that handles complex branching logic, error recovery, and parallel execution — all from a drag-and-drop canvas.",
    features: [
      "Visual workflow builder",
      "200+ service integrations",
      "Conditional branching & loops",
      "Error recovery & retries",
      "Real-time execution monitoring",
    ],
    accentColor: "#22D3EE",
  },
  {
    id: "7",
    slug: "chromatic",
    title: "Chromatic",
    tagline: "Generative Art Meets Code",
    description:
      "An experimental generative art platform where algorithms create unique visual compositions from user-defined rules, randomness, and mathematical beauty.",
    category: "Experiments",
    year: 2022,
    featured: false,
    coverImage: "/projects/chromatic/cover.jpg",
    screenshots: [
      "/projects/chromatic/screen-1.jpg",
      "/projects/chromatic/screen-2.jpg",
    ],
    technologies: [
      "Three.js",
      "GLSL",
      "TypeScript",
      "Canvas API",
      "WebGL",
    ],
    liveUrl: "https://chromatic.example.com",
    githubUrl: "https://github.com/example/chromatic",
    problem:
      "Generative art tools are either too technical for artists or too limited for developers. There's no middle ground.",
    solution:
      "We created an accessible platform where users define visual rules through an intuitive interface, while the underlying GLSL shaders and particle systems handle the computational complexity.",
    features: [
      "Real-time shader editing",
      "Particle system designer",
      "Exportable high-res outputs",
      "Community gallery",
    ],
    accentColor: "#F472B6",
  },
  {
    id: "8",
    slug: "devportal",
    title: "DevPortal",
    tagline: "Documentation That Developers Love",
    description:
      "A modern developer documentation platform with interactive code examples, API playgrounds, and intelligent search that makes complex APIs approachable.",
    category: "Web Apps",
    year: 2024,
    featured: false,
    coverImage: "/projects/devportal/cover.jpg",
    screenshots: [
      "/projects/devportal/screen-1.jpg",
      "/projects/devportal/screen-2.jpg",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "MDX",
      "Algolia",
      "Tailwind CSS",
      "Vercel",
    ],
    liveUrl: "https://devportal.example.com",
    problem:
      "API documentation is usually an afterthought — stale, hard to navigate, and disconnected from the actual API. Developers waste time guessing instead of building.",
    solution:
      "We built a documentation platform that stays in sync with the API schema, provides interactive playgrounds for every endpoint, and uses AI-powered search to surface relevant examples instantly.",
    features: [
      "Interactive API playground",
      "Auto-synced API reference",
      "AI-powered search",
      "Code examples in 8 languages",
      "Version-aware documentation",
    ],
    accentColor: "#8B5CF6",
  },
  {
    id: "9",
    slug: "hyperscale",
    title: "HyperScale",
    tagline: "Autonomous Infrastructure Optimization",
    description:
      "An intelligent cloud cost and compute scaler that automatically redistributes container workloads across global multi-cloud regions with zero downtime.",
    category: "SaaS",
    year: 2024,
    featured: true,
    coverImage: "/projects/hyperscale/cover.jpg",
    screenshots: [
      "/projects/hyperscale/screen-1.jpg",
      "/projects/hyperscale/screen-2.jpg",
    ],
    technologies: [
      "Rust",
      "Kubernetes",
      "Next.js",
      "TypeScript",
      "AWS",
      "GCP",
      "Prometheus",
    ],
    liveUrl: "https://hyperscale.example.com",
    githubUrl: "https://github.com/example/hyperscale",
    problem:
      "Enterprise cloud bills spiral out of control due to over-provisioned clusters and idle nodes across time zones.",
    solution:
      "We engineered an autonomous control plane that dynamically predicts traffic spikes and rebalances container distribution across spot instances.",
    features: [
      "Predictive multi-cloud auto-scaling",
      "Instant spot instance migration",
      "Automated cost anomaly detection",
      "Real-time cluster telemetry",
    ],
    results: [
      { label: "Cloud Cost Reduced", value: "48%" },
      { label: "Failover Latency", value: "<10ms" },
    ],
    accentColor: "#A3E635",
  },
];


