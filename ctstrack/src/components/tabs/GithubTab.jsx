export default function GithubTab() {
  return (
    <div>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>🐙 GitHub Repository Structure</h2>
      <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Create ONE public repo. Push each module into the correct folder below. Share the URL with your POC on demand.</p>
      <div style={{ background: "#0F172A", color: "#E2E8F0", borderRadius: 12, padding: 20, fontFamily: "'Fira Code', 'Consolas', monospace", fontSize: 12, lineHeight: 2, overflowX: "auto", marginBottom: 20 }}>
        <div style={{ color: "#34D399" }}>📁 Digital-Nurture-PythonFSE/  <span style={{ color: "#64748B" }}>(Public GitHub Repo)</span></div>
        <div style={{ paddingLeft: 16 }}>
          <div style={{ color: "#93C5FD" }}>├── Module1_DesignPatterns/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── solid_principles.py</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── design_patterns.py</div>
          <div style={{ color: "#93C5FD" }}>├── Module2_DSA/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── sorting.py</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── searching.py</div>
          <div style={{ color: "#93C5FD" }}>├── Module3_DatabaseIntegration/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── hands_on_1.sql</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── hands_on_2.sql</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── hands_on_3.sql</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── hands_on_4.sql</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── hands_on_4.py       <span style={{ color: "#64748B" }}># N+1 fix</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── hands_on_5/         <span style={{ color: "#64748B" }}># MongoDB queries</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── orm/                <span style={{ color: "#64748B" }}># SQLAlchemy + Alembic</span></div>
          <div style={{ paddingLeft: 32, color: "#94A3B8" }}>│       ├── models.py</div>
          <div style={{ paddingLeft: 32, color: "#94A3B8" }}>│       ├── crud.py</div>
          <div style={{ paddingLeft: 32, color: "#94A3B8" }}>│       └── migrations/</div>
          <div style={{ color: "#93C5FD" }}>├── Module4_UnitTesting/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── test_*.py</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── requirements.txt</div>
          <div style={{ color: "#93C5FD" }}>├── PythonBackendFrameworks/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_01/  <span style={{ color: "#64748B" }}># Django setup</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_02/  <span style={{ color: "#64748B" }}># Django models+admin</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_03/  <span style={{ color: "#64748B" }}># Django REST + DRF</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_04/  <span style={{ color: "#64748B" }}># Flask routing</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_05/  <span style={{ color: "#64748B" }}># Flask+SQLAlchemy</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_06/  <span style={{ color: "#64748B" }}># FastAPI + Pydantic</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_07/  <span style={{ color: "#64748B" }}># FastAPI advanced</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_08/  <span style={{ color: "#64748B" }}># REST best practices</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_09/  <span style={{ color: "#64748B" }}># JWT auth</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── handson_10/  <span style={{ color: "#64748B" }}># Microservices</span></div>
          <div style={{ color: "#93C5FD" }}>├── Module2_FrontendDev/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/  <span style={{ color: "#64748B" }}># Note: PDF calls it Module 2</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_01/  <span style={{ color: "#64748B" }}># HTML5 + CSS3</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_02/  <span style={{ color: "#64748B" }}># Flexbox + Grid</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_03/  <span style={{ color: "#64748B" }}># JavaScript ES6+</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_04/  <span style={{ color: "#64748B" }}># Async + Axios</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_05/  <span style={{ color: "#64748B" }}># React (Vite app)</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_06/  <span style={{ color: "#64748B" }}># React Router + Redux</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_07/  <span style={{ color: "#64748B" }}># Angular (ng project)</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_08/  <span style={{ color: "#64748B" }}># Vue.js (Vite app)</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── handson_09/  <span style={{ color: "#64748B" }}># Accessibility fixes</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── handson_10/  <span style={{ color: "#64748B" }}># State management</span></div>
          <div style={{ color: "#93C5FD" }}>├── SeleniumBasics/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   ├── written_exercises/  <span style={{ color: "#64748B" }}># HO1-3 as .md files</span></div>
          <div style={{ paddingLeft: 16, color: "#94A3B8" }}>│   └── automation_scripts/ <span style={{ color: "#64748B" }}># HO4-7 as .py files</span></div>
          <div style={{ color: "#93C5FD" }}>├── Module8_Agile/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
          <div style={{ color: "#93C5FD" }}>└── Module9_Cloud/<span style={{ color: "#F472B6" }}>&lt;YourName&gt;</span>/</div>
        </div>
      </div>
      <div style={{ background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 10, padding: 14, fontSize: 13, color: "#92400E" }}>
        <strong>⚠️ Key Rules from DN5.0 Handbook:</strong>
        <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
          {["SQL exercises → save as .sql files (e.g. hands_on_1.sql)", "Python exercises → save as .py files in subfolders", "Include requirements.txt in each subfolder listing pip packages", "Framework projects (React/Angular/Vue) → include full project folder MINUS node_modules/", "Create a PUBLIC repo — share URL with your POC on demand", "Organise solutions week-wise inside the folder structure"].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0 }}>→</span><span>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
