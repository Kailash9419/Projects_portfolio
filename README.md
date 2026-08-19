# ✦ Interactive Portfolio

> A premium, interactive portfolio platform built to showcase the digital products, applications, and experiences we create.

This isn't just a portfolio with a list of GitHub links.

It's a **visual project showcase** designed to tell the story behind each project through real screenshots, interactive experiences, technologies, live demos, and case studies.

---

## ✨ Features

- 🎨 Premium dark & electric visual design
- 🖼️ Real project screenshots and visual showcases
- 🚀 Interactive project cards and animations
- 🔎 Project search and filtering
- 📂 Dynamic project architecture
- 📖 Dedicated case-study pages
- 🔗 Live Demo & GitHub integration
- 📱 Fully responsive design
- ⚡ Smooth animations and micro-interactions
- ♻️ Easy to add new projects over time
- ♿ Reduced-motion and accessibility considerations

---

## 🛠️ Built With

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**

---

## 🎯 Why This Exists

Traditional developer portfolios often focus on:

> "Here is my GitHub."

We wanted to focus on:

> **"Here is what we actually built."**

The platform puts the products themselves at the center — their interfaces, features, technologies, and the problems they solve.

---

## 📸 Project Showcase

Each project can include:

- Cover image
- Multiple screenshots
- Project description
- Problem & solution
- Key features
- Technology stack
- Live demo
- GitHub repository
- Results / metrics (when available)

---

## 🧩 Project Architecture

Projects are managed through a centralized data structure, making the portfolio easy to scale.

Adding a new project should not require rebuilding the UI.

```text
src/
├── app/
│   ├── page.tsx
│   └── work/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── ProjectFilters.tsx
│   ├── Services.tsx
│   ├── Process.tsx
│   ├── About.tsx
│   └── Contact.tsx
│
└── data/
    └── projects.ts

public/
└── projects/
    ├── project-1/
    │   ├── cover.webp
    │   ├── screen-1.webp
    │   └── screen-2.webp
    │
    └── project-2/
        ├── cover.webp
        └── screen-1.webp
