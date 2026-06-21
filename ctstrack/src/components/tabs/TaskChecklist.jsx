import { WEEKS } from "../../data/weeks";

export default function TaskChecklist({ checked, toggle, openWeeks, toggleWeek, openMods, toggleMod, weekStats }) {
  return (
    <div>
      {/* Quick Start */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 16, marginBottom: 20 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, margin: "0 0 12px", color: "#111" }}>🚀 Where to Start — Follow This Exact Order:</h3>
        {[
          ["1","Wk 1","Module 1 (Design Patterns) → GitHub repo exercises","#4F46E5"],
          ["2","Wk 1","Module 2 (DSA) → GitHub repo exercises","#4F46E5"],
          ["3","Wk 2","Open 📘 DatabaseIntegration_HandsOn.pdf → read Common Scenario → do Hands-On 1 & 2","#2563EB"],
          ["4","Wk 3","Continue 📘 DB PDF → Hands-On 3, 4, 5 (Advanced SQL + MongoDB) + Module 4 Unit Testing","#0891B2"],
          ["5","Wk 4","Finish 📘 DB PDF → Hands-On 6, 7 (ORM + Alembic) + Open 📗 PythonBackendFrameworks_HandsOn.pdf → Hands-On 1, 2","#0D9488"],
          ["6","Wk 5","Continue 📗 Backend PDF → Hands-On 3, 4, 5, 6 (Django REST + Flask + FastAPI)","#16A34A"],
          ["7","Wk 6","Finish 📗 Backend PDF → Hands-On 7-10 (JWT + Microservices) + Open 📙 FrontendDevelopment_HandsOn.pdf → Hands-On 1-4","#D97706"],
          ["8","Wk 7","Finish 📙 Frontend PDF → Hands-On 5-10 (React, Angular, Vue) + Modules 7-10 (QA, Agile, Cloud, GenAI) + KBA Prep","#9333EA"],
        ].map(([n, wk, text, col]) => (
          <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: col, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{n}</div>
            <div>
              <span style={{ fontSize: 10, fontWeight: 700, background: col + "15", color: col, padding: "1px 7px", borderRadius: 100, marginRight: 6 }}>{wk}</span>
              <span style={{ fontSize: 13, color: "#374151" }}>{text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Week Cards */}
      {WEEKS.map(week => {
        const ws = weekStats[week.id] || { done: 0, total: 0, pct: 0 };
        const isOpen = openWeeks[week.id];

        return (
          <div key={week.id} style={{ background: "#fff", borderRadius: 14, border: `1px solid ${week.accentBorder}`, marginBottom: 14, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>

            {/* Week header button */}
            <button onClick={() => toggleWeek(week.id)} style={{ width: "100%", border: "none", background: "none", cursor: "pointer", padding: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", textAlign: "left" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: week.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{week.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 1 }}>Week {week.id} · {week.range}</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>{week.theme}</div>
                  <div style={{ fontSize: 11, color: "#64748B", marginTop: 2, lineHeight: 1.4 }}>{week.subtitle}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: ws.pct === 100 ? "#16A34A" : week.accent }}>{ws.pct}%</div>
                  <div style={{ fontSize: 10, color: "#94A3B8" }}>{ws.done}/{ws.total}</div>
                  <div style={{ fontSize: 14, color: "#CBD5E1", marginTop: 2 }}>{isOpen ? "▲" : "▼"}</div>
                </div>
              </div>
              <div style={{ height: 3, background: "#F1F5F9" }}>
                <div style={{ height: 3, background: ws.pct === 100 ? "#16A34A" : week.accent, width: `${ws.pct}%`, transition: "width 0.4s", borderRadius: "0 3px 3px 0" }} />
              </div>
            </button>

            {/* Week expanded content */}
            {isOpen && (
              <div style={{ padding: "12px 14px 14px" }}>
                {week.modules.map(mod => {
                  const [lvlBg, lvlTx] = mod.lc.split(":");
                  const modDone = mod.tasks.filter(t => checked[t.id]).length;
                  const isModOpen = openMods[mod.id] !== false;
                  const allModDone = modDone === mod.tasks.length;

                  return (
                    <div key={mod.id} style={{ border: "1px solid #E2E8F0", borderRadius: 10, marginBottom: 10, overflow: "hidden" }}>
                      <button onClick={() => toggleMod(mod.id)} style={{ width: "100%", border: "none", background: "#F8FAFC", cursor: "pointer", padding: "10px 14px", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: allModDone ? "#16A34A" : "#0F172A", textDecoration: allModDone ? "line-through" : "none", lineHeight: 1.3 }}>{allModDone ? "✓ " : ""}{mod.name}</div>
                          <div style={{ display: "flex", gap: 5, marginTop: 5, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: lvlBg, color: lvlTx }}>{mod.level}</span>
                            {mod.id.startsWith("M3") || mod.id.startsWith("M5") || mod.id.startsWith("M6") || mod.id === "M7891011" ? (
                              <>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#DBEAFE", color: "#1E40AF" }}>📂 Github-handsOn</span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#F1F5F9", color: "#475569" }}>📘 HandBook</span>
                                {mod.id === "M7891011" && (
                                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#EDE9FE", color: "#5B21B6" }}>🎓 SkillSpring Course</span>
                                )}
                              </>
                            ) : (
                              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 100, background: "#F1F5F9", color: "#475569" }}>{mod.pdfLabel}</span>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: allModDone ? "#16A34A" : "#475569" }}>{modDone}/{mod.tasks.length}</div>
                          <div style={{ fontSize: 13, color: "#CBD5E1" }}>{isModOpen ? "▲" : "▼"}</div>
                        </div>
                      </button>

                      {isModOpen && (
                        <div style={{ padding: "12px 14px" }}>
                          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 7, padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#9A3412" }}>
                            📌 {mod.pdfNote}
                          </div>
                          <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 7, padding: "7px 12px", marginBottom: 10, fontFamily: "'Fira Code', monospace", fontSize: 11, color: "#14532D" }}>
                            🐙 Push to: <strong>{mod.githubFolder}</strong>
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Topics Covered</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                              {mod.topics.map((t, i) => (
                                <span key={i} style={{ fontSize: 11, background: "#F1F5F9", color: "#475569", padding: "3px 8px", borderRadius: 5, lineHeight: 1.4 }}>{t}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Hands-On Tasks</div>
                            {mod.tasks.map(task => (
                              <label key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "6px 0", cursor: "pointer", borderBottom: "1px solid #F8FAFC" }}>
                                <div style={{ position: "relative", flexShrink: 0, marginTop: 1 }}>
                                  <input type="checkbox" checked={!!checked[task.id]} onChange={() => toggle(task.id)} style={{ width: 15, height: 15, cursor: "pointer", accentColor: week.accent }} />
                                </div>
                                <span style={{ fontSize: 12, color: checked[task.id] ? "#94A3B8" : "#334155", textDecoration: checked[task.id] ? "line-through" : "none", lineHeight: 1.5 }}>
                                  {task.text}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div style={{ marginTop: 10, background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8, padding: "9px 13px", fontSize: 13, fontWeight: 600, color: "#1E40AF" }}>
                  📤 Week {week.id} GitHub Push: {week.gitPush}
                </div>
                <div style={{ marginTop: 7, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 8, padding: "9px 13px", fontSize: 12, color: "#92400E" }}>
                  💡 {week.tip}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* KBA Footer */}
      <div style={{ background: "linear-gradient(135deg,#1E3A5F,#7C3AED)", color: "#fff", borderRadius: 14, padding: "20px 20px", textAlign: "center", marginTop: 4 }}>
        <div style={{ fontSize: 26, marginBottom: 6 }}>🎯</div>
        <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 5 }}>After Week 7 — Final KBA Assessment</div>
        <div style={{ fontSize: 12, opacity: 0.8, maxWidth: 500, margin: "0 auto" }}>
          The Knowledge-Based Assessment covers all 10 modules. Use the "Check Your Understanding" quiz links listed in each module of the DN5.0 handbook to prepare. Revisit especially: Django, FastAPI, React, MongoDB, SQLAlchemy, and Selenium.
        </div>
      </div>
    </div>
  );
}
