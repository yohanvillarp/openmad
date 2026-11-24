# SYSTEM CONTEXT & PROJECT SPECIFICATION

## 1. Project Overview & Problem Statement
- **Project Name:** Academic Flow & Administrative Roadmap System (Gamified University Graph).
- **Core Problem:** University administrative procedures (e.g., Bachelor's degree, professional licensing, pre-professional internships, social responsibility validation, language accreditation) are fragmented, bureaucratic, and documented in unindexed static PDFs/scans. Students lack visibility over prerequisites, costs (TUPA fees), and validity windows (e.g., certificates expiring in 30 days). This causes administrative procrastination, missed deadlines, and bottlenecks during final semesters.
- **Solution:** An interactive, graph-based web application that translates dense university regulations into a gamified "Mission Tree / Skill Tree" roadmap. The platform tracks prerequisite dependencies, calculates budget/TUPA costs, offers downloadable templates, rewards progress with gamified points/celebrations, and collects anonymized telemetry on administrative bottlenecks.

---

## 2. Technical Stack
- **Frontend:** React (Next.js / Vite), TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Graph & Flow Visualization:** `@xyflow/react` (React Flow) for interactive DAG (Directed Acyclic Graph) rendering.
- **Backend:** NestJS (Node.js framework), TypeScript, RESTful API architecture.
- **Database & ORM:** PostgreSQL + Prisma ORM / TypeORM.
- **State Management & Data Fetching:** TanStack Query (React Query) / Zustand.

---

## 3. Core Architecture & Data Models

### Graph Representation (DAG Model)
1. **Nodes (`Step` / `Mission`):**
   - Unique identifier (e.g., `req-no-adeudo`, `pago-tupa-bachiller`).
   - Category / Phase (e.g., `RESPONSABILIDAD_SOCIAL`, `BACHILLERATO`, `TITULACION`).
   - Title, detailed description, required documents/inputs.
   - Associated TUPA cost (currency: PEN / S/.).
   - Validity in days (e.g., 30 days before expiration).
   - Template/Format download URL (e.g., Word document model).
   - Points/XP reward value upon completion.
2. **Edges (`StepDependency`):**
   - Prerequisites mapping (`step_id` depends on `depends_on_step_id`).
3. **User Progress State Machine:**
   - Statuses:
     - `LOCKED`: At least one dependency is not `COMPLETED`.
     - `AVAILABLE`: All prerequisites are fulfilled; ready to start.
     - `IN_PROGRESS`: Student has initiated the tramit/procedure.
     - `COMPLETED`: Verified and completed (triggers points + visual celebration).

---

## 4. Key User Experience (UX) & Modules
1. **Interactive Roadmap View (React Flow):**
   - Visual nodes styled dynamically:
     - Locked: Translucent gray with padlock icon.
     - Available: Pulsing/highlighted border.
     - In Progress: Amber/warning indicator.
     - Completed: Green badge with checkmark.
   - Interactive Node Modal: Displays step instructions, required payments, validity warnings, downloadable templates, and status toggles.
2. **Tabular Summary & Budget Tracker:**
   - Summary table totaling TUPA administrative costs.
   - Real-time countdowns for documents with expiration periods.
3. **Gamification & Feedback Loop:**
   - Cumulative XP counter in header.
   - Milestone celebration modal (confetti + badge unlock).
4. **Community & Analytics Telemetry:**
   - Repository of peer-validated document templates.
   - Backend metric collection tracking dwell time per step (`AVAILABLE` to `COMPLETED`) to pinpoint institutional bottlenecks.

---

## 5. Instructions for the AI Assistant
- When generating code, prioritize clean TypeScript types, modular NestJS controllers/services, and responsive React Flow custom node components.
- Keep the domain logic centered around Directed Acyclic Graphs (DAG) for dependency resolution.
- Always provide pragmatic, ready-to-use code snippets with clear explanations and best practices.
- **UI Design Rule:** Do not use the repetitive SaaS style of placing icons inside rounded square boxes above titles. Instead, place icons inline (next to the title) and use elegant underlines or accent lines.