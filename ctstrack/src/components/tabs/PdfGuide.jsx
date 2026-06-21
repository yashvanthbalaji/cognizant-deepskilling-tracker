export default function PdfGuide() {
  return (
    <div>
      <div style={{ background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#713F12" }}>
        <strong>4 of your 10 modules have a dedicated Hands-On PDF.</strong> The other 6 are GitHub-repo-only or SkillSpring-only (Cognizant's handbook points you to their public repo + SkillSpring courses instead of a PDF for those). The table below tells you exactly which is which — check this BEFORE you start a module so you're not hunting for a PDF that doesn't exist.
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden", marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 10, padding: "9px 14px", background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase" }}>
          <span></span><span>Module</span><span>Source to Use</span>
        </div>
        {[
          ["1","Design Patterns & Principles","github","—"],
          ["2","Data Structures & Algorithms","github","—"],
          ["3","Database Integration","pdf","DatabaseIntegration_HandsOn.pdf"],
          ["4","Unit Testing (PyTest/unittest)","github","—"],
          ["5","Python Backend Frameworks","pdf","PythonBackendFrameworks_HandsOn.pdf"],
          ["6","Frontend Development","pdf","FrontendDevelopment_HandsOn.pdf"],
          ["7","QA & Test Automation (Selenium)","pdf","SeleniumBasics_HandsOn.pdf (+ SkillSpring Selenium Interactive Course)"],
          ["8","Agile, GIT","github","—"],
          ["9","Cloud Deployment","github","—"],
          ["10","Gen AI Fundamentals","skillspring","SkillSpring: GenAI / Prompt Engineering / Copilot courses"],
        ].map(([num, name, type, src], i) => {
          const tag = type === "pdf"
            ? { bg: "#DBEAFE", tx: "#1E40AF", label: "📘 Github-handsOn" }
            : type === "skillspring"
            ? { bg: "#EDE9FE", tx: "#5B21B6", label: "🎓 SkillSpring Course" }
            : { bg: "#F1F5F9", tx: "#475569", label: "📂 HandBook" };
          return (
            <div key={num} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 10, alignItems: "center", padding: "9px 14px", borderBottom: i < 9 ? "1px solid #F3F4F6" : "none" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#EEF2FF", color: "#4F46E5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{num}</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E293B" }}>Module {num} — {name}</div>
                {src !== "—" && <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 1 }}>{src}</div>}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: tag.bg, color: tag.tx, whiteSpace: "nowrap" }}>{tag.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 10 }}>📘 Deep Dive — The 4 Modules With a Hands-On PDF</div>
      <div style={{ background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#713F12" }}>
        <strong>You have 4 Hands-On PDFs.</strong> Each maps to exactly one module. The table below shows each PDF's hands-on exercises.
      </div>
      {[
        { pdf: "DatabaseIntegration_HandsOn.pdf", module: "Module 3 — Database Integration", accent: "#2563EB", dates: "Official: 2 days (handbook) / PDF itself: 4 days", items: [
          ["Hands-On 1","Schema Design & DDL","Beginner"],
          ["Hands-On 2","SQL Queries, JOINs & Aggregations","Beginner"],
          ["Hands-On 3","Advanced SQL — Subqueries, Views, Transactions","Intermediate"],
          ["Hands-On 4","Query Optimisation — Indexes, EXPLAIN, N+1","Intermediate"],
          ["Hands-On 5","MongoDB — CRUD & Aggregation Pipeline","Intermediate"],
          ["Hands-On 6","ORM Integration — SQLAlchemy","Advanced"],
          ["Hands-On 7","Migrations & Versioning — Alembic","Advanced"],
        ]},
        { pdf: "PythonBackendFrameworks_HandsOn.pdf", module: "Module 5 — Python Backend Frameworks", accent: "#16A34A", dates: "Official: 4 days", items: [
          ["Hands-On 1","Django: Project Setup & Request-Response","Beginner"],
          ["Hands-On 2","Django: Models, ORM & Admin","Beginner"],
          ["Hands-On 3","Django REST Framework — ViewSets & Routers","Beginner"],
          ["Hands-On 4","Flask — Structure, Routing, Blueprints","Intermediate"],
          ["Hands-On 5","Flask with SQLAlchemy & Migrations","Intermediate"],
          ["Hands-On 6","FastAPI — Pydantic & Async Endpoints","Intermediate"],
          ["Hands-On 7","FastAPI — DI, CRUD, Background Tasks","Intermediate"],
          ["Hands-On 8","RESTful API Best Practices & Versioning","Advanced"],
          ["Hands-On 9","JWT Authentication & CORS Security","Advanced"],
          ["Hands-On 10","Microservices Architecture","Advanced"],
        ]},
        { pdf: "FrontendDevelopment_HandsOn.pdf", module: "Module 6 — Frontend Development", accent: "#9333EA", dates: "Official: 9 days", items: [
          ["Hands-On 1","HTML5 Semantic Structure & CSS3 Foundations","Beginner"],
          ["Hands-On 2","CSS Flexbox, Grid & Responsive Design","Beginner"],
          ["Hands-On 3","JavaScript ES6+ & DOM Manipulation","Beginner"],
          ["Hands-On 4","Async JS, Fetch API & Axios","Intermediate"],
          ["Hands-On 5","React — Components, State & Hooks","Intermediate"],
          ["Hands-On 6","React Routing & State Management (Redux)","Intermediate"],
          ["Hands-On 7","Angular — Services, DI & Reactive Forms","Advanced"],
          ["Hands-On 8","Vue.js — Composition API, Router & Pinia","Advanced"],
          ["Hands-On 9","Web Accessibility (WCAG 2.1) & A11y","Advanced"],
          ["Hands-On 10","Advanced API Integration & State Management","Advanced"],
        ]},
        { pdf: "SeleniumBasics_HandsOn.pdf", module: "Module 7 — QA Concepts & Test Automation (Selenium)", accent: "#DC2626", dates: "Official: 6 days (+ SkillSpring 'Selenium Interactive Course')", items: [
          ["Hands-On 1","QA Concepts, Functional Testing & Defect Lifecycle (Written .md)","Beginner"],
          ["Hands-On 2","SDLC vs TDLC — V-Model & Agile QA Integration (Written .md)","Beginner"],
          ["Hands-On 3","Test Automation Process, Lifecycle & Framework Types (Written .md)","Intermediate"],
          ["Hands-On 4","Selenium WebDriver Setup, Browser Drivers & Basic Commands (Python)","Intermediate"],
          ["Hands-On 5","Locators — ID, Name, XPath, CSS Selectors & Explicit Waits (Python)","Intermediate"],
          ["Hands-On 6","Running Selenium Tests with pytest — Fixtures, Assertions & Reporting (Python)","Advanced"],
          ["Hands-On 7","Page Object Model (POM) — Design Pattern for Maintainable Tests (Python)","Advanced"],
        ]},
      ].map(item => (
        <div key={item.pdf} style={{ background: "#fff", borderRadius: 12, border: `1.5px solid ${item.accent}30`, marginBottom: 20, overflow: "hidden" }}>
          <div style={{ background: `${item.accent}0D`, borderBottom: `1px solid ${item.accent}20`, padding: "12px 16px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: item.accent, textTransform: "uppercase", letterSpacing: 1 }}>{item.module}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 2 }}>📘 {item.pdf}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Use during: <strong>{item.dates}</strong> · {item.items.length} exercises</div>
          </div>
          {item.items.map((ex, i) => {
            const lvlBg = ex[2] === "Beginner" ? "#D1FAE5" : ex[2] === "Intermediate" ? "#FEF3C7" : "#FEE2E2";
            const lvlTx = ex[2] === "Beginner" ? "#065F46" : ex[2] === "Intermediate" ? "#92400E" : "#991B1B";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderBottom: i < item.items.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: `${item.accent}15`, color: item.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{ex[0]}: {ex[1]}</div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: lvlBg, color: lvlTx, whiteSpace: "nowrap" }}>{ex[2]}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
