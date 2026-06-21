import { useState } from "react";
import { CONSTRUCTS, OFFICIAL_TOTAL } from "../../data/constructs";

function isSubTopicDone(st, linksDone) {
  return st.links && st.links.every(l => linksDone[l.id]);
}

function getModuleProgressStats(m, linksDone) {
  let total = 0;
  let done = 0;
  let quizzesTotal = 0;
  let quizzesDone = 0;

  if (m.subTopics) {
    m.subTopics.forEach(st => {
      if (st.links) {
        st.links.forEach(l => {
          total++;
          if (linksDone[l.id]) done++;
        });
      }
    });
  }

  if (m.quizzes) {
    m.quizzes.forEach(q => {
      total++;
      quizzesTotal++;
      if (linksDone[q.id]) {
        done++;
        quizzesDone++;
      }
    });
  }

  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, pct, quizzesDone, quizzesTotal };
}

export default function OfficialTimetable({ modsDone, toggleModDone, allModuleIds, calDone, calPct, linksDone, toggleLink }) {
  const [openSub, setOpenSub] = useState({});
  const toggleOpenSub = id => setOpenSub(p => ({ ...p, [id]: !p[id] }));

  // Collapsible constructs state (Construct 1 open by default, others closed)
  const [openConstructs, setOpenConstructs] = useState({ C1: true });
  const toggleConstruct = id => setOpenConstructs(p => ({ ...p, [id]: !p[id] }));

  // Collapsible quiz sections state
  const [openQuizzes, setOpenQuizzes] = useState({});
  const toggleOpenQuizzes = id => setOpenQuizzes(p => ({ ...p, [id]: !p[id] }));

  return (
    <div>
      <style>{`
        @keyframes quizFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .quiz-pulse-glow {
          box-shadow: 0 2px 4px rgba(251, 191, 36, 0.15);
          transition: all 0.25s ease-in-out !important;
        }
        .quiz-pulse-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(251, 191, 36, 0.3) !important;
          border-color: #FBBF24 !important;
        }
      `}</style>

      <div style={{ background: "#FEF9C3", border: "1px solid #FDE047", borderRadius: 10, padding: "12px 16px", marginBottom: 14, fontSize: 13, color: "#713F12", lineHeight: 1.5 }}>
        <strong>This is structured exactly as Cognizant's handbook structures it</strong> — 4 "FSE constructs," each with its own stated duration. Nothing reordered, invented, or compressed. <strong>Official total: {OFFICIAL_TOTAL} days (~7 weeks)</strong> — the handbook's own "Total Program Duration." Click a link to learn, then check its box — once every link in a sub-topic is checked, the sub-topic auto-completes; once every sub-topic in a module is done, the module auto-completes.
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 700, textTransform: "uppercase" }}>Cognizant Official Duration</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1E293B" }}>{OFFICIAL_TOTAL} days</div>
          <div style={{ fontSize: 10, color: "#94A3B8" }}>≈ 7 weeks @ 10-12 hrs/wk</div>
        </div>
      </div>

      {CONSTRUCTS.map((c, ci) => {
        const cModsDone = c.modules.filter(m => modsDone[m.id]).length;
        const isConstructOpen = !!openConstructs[c.id];

        return (
          <div key={c.id} style={{ background: "#fff", borderRadius: 14, border: `1.5px solid ${c.color}30`, marginBottom: 16, overflow: "hidden", transition: "all 0.2s ease" }}>
            
            {/* Clickable Construct Header */}
            <div 
              onClick={() => toggleConstruct(c.id)}
              style={{ 
                background: `${c.color}0D`, 
                borderBottom: isConstructOpen ? `1px solid ${c.color}20` : "none", 
                padding: "12px 16px",
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: c.color, textTransform: "uppercase", letterSpacing: 1 }}>FSE Construct {ci + 1} of 4</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A", marginTop: 1 }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: "#6B7280", marginTop: 3, fontStyle: "italic" }}>Handbook: "{c.handbookQuote}"</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{cModsDone}/{c.modules.length}</div>
                  <div style={{ fontSize: 14, color: c.color, fontWeight: 700 }}>{isConstructOpen ? "▲" : "▼"}</div>
                </div>
              </div>
              {isConstructOpen && (
                <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 100, background: "#F1F5F9", color: "#475569" }}>Official: {c.officialDays} days</span>
                </div>
              )}
            </div>

            {/* Collapsible Construct Body */}
            {isConstructOpen && (
              <div style={{ padding: "10px 14px" }}>
                {c.modules.map(m => {
                  const isDone = !!modsDone[m.id];
                  const isSubOpen = !!openSub[m.id];
                  const isQuizOpen = !!openQuizzes[m.id];
                  const stats = getModuleProgressStats(m, linksDone);

                  return (
                    <div key={m.id} style={{ borderBottom: "1px solid #F8FAFC", padding: "12px 6px" }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <input 
                          type="checkbox" 
                          checked={isDone} 
                          onChange={() => toggleModDone(m.id)} 
                          style={{ width: 16, height: 16, marginTop: 2, cursor: "pointer", accentColor: c.color, flexShrink: 0 }} 
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: isDone ? "#16A34A" : "#1E293B", textDecoration: isDone ? "line-through" : "none" }}>
                            {isDone ? "✓ " : ""}{m.name}
                          </div>
                          
                          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginTop: 4 }}>
                            {m.id === "M3" || m.id === "M5" || m.id === "M6" || m.id === "M7" ? (
                              <>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#DBEAFE", color: "#1E40AF" }}>📂 Github-handsOn</span>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#F1F5F9", color: "#475569" }}>📘 HandBook</span>
                                {m.id === "M7" && (
                                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#EDE9FE", color: "#5B21B6" }}>🎓 SkillSpring Course</span>
                                )}
                              </>
                            ) : m.id === "M10" ? (
                              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 100, background: "#EDE9FE", color: "#5B21B6" }}>🎓 SkillSpring Course</span>
                            ) : (
                              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 100, background: "#F1F5F9", color: "#64748B" }}>{m.pdf}</span>
                            )}
                            <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 100, background: "#F8FAFC", color: "#94A3B8" }}>Official: {m.official}</span>
                          </div>

                          {(m.id === "M3" || m.id === "M5" || m.id === "M6" || m.id === "M7") && (
                            <div style={{ fontSize: 10.5, color: "#64748B", marginTop: 4 }}>
                              📄 PDF: <strong>{m.pdf.replace("📂 ", "").replace("📗 ", "").replace("📙 ", "").replace("📕 ", "")}</strong>
                            </div>
                          )}

                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 5 }}>
                            {m.topics.map((t, i) => (
                              <span key={i} style={{ fontSize: 10.5, background: "#F8FAFC", color: "#64748B", padding: "2px 7px", borderRadius: 5 }}>{t}</span>
                            ))}
                          </div>

                          {/* Module progress bar */}
                          <div style={{ marginTop: 8, maxWidth: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                              <span style={{ fontSize: 10, color: "#64748B", fontWeight: 600 }}>Module Progress</span>
                              <span style={{ fontSize: 10, color: stats.pct === 100 ? "#16A34A" : c.color, fontWeight: 700 }}>
                                {stats.pct}% ({stats.done}/{stats.total})
                              </span>
                            </div>
                            <div style={{ height: 4, background: "#E2E8F0", borderRadius: 100, overflow: "hidden" }}>
                              <div 
                                style={{ 
                                  height: "100%", 
                                  background: stats.pct === 100 ? "#16A34A" : c.color, 
                                  width: `${stats.pct}%`, 
                                  transition: "width 0.3s ease" 
                                }} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginLeft: 26, marginTop: 8 }}>
                        <button
                          onClick={() => toggleOpenSub(m.id)}
                          style={{ border: "none", background: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, color: c.color, padding: "2px 0", display: "flex", alignItems: "center", gap: 4 }}
                        >
                          {isSubOpen ? "▲" : "▼"} Sub-Topics ({stats.done - stats.quizzesDone}/{stats.total - stats.quizzesTotal})
                        </button>

                        {isSubOpen && (
                          <div style={{ marginTop: 8 }}>
                            {/* Sub-Topics */}
                            {m.subTopics && m.subTopics.length > 0 && (
                              <div>
                                {m.subTopics.map(st => {
                                  const stDone = isSubTopicDone(st, linksDone);
                                  return (
                                    <div key={st.id} style={{ marginBottom: 8, background: stDone ? "#F0FDF4" : "#F8FAFC", border: `1px solid ${stDone ? "#BBF7D0" : "#E2E8F0"}`, borderRadius: 8, padding: "8px 10px" }}>
                                      <div style={{ fontSize: 11.5, fontWeight: 700, color: stDone ? "#16A34A" : "#334155", marginBottom: 5, display: "flex", alignItems: "center", gap: 5 }}>
                                        {stDone ? "✓ " : ""}{st.heading}
                                      </div>
                                      {st.links.map(l => {
                                        const lDone = !!linksDone[l.id];
                                        return (
                                          <label key={l.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "3px 0", cursor: "pointer" }}>
                                            <input 
                                              type="checkbox" 
                                              checked={lDone} 
                                              onChange={() => toggleLink(l.id)} 
                                              style={{ width: 13, height: 13, marginTop: 2, cursor: "pointer", accentColor: c.color, flexShrink: 0 }} 
                                            />
                                            <a
                                              href={l.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              onClick={e => e.stopPropagation()}
                                              style={{ fontSize: 11.5, color: lDone ? "#94A3B8" : "#2563EB", textDecoration: lDone ? "line-through" : "underline", lineHeight: 1.5 }}
                                            >
                                              {l.label}
                                            </a>
                                          </label>
                                        );
                                      })}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Collapsible Check Your Understanding Section */}
                        {m.quizzes && m.quizzes.length > 0 && (
                          <div style={{ marginTop: 10 }}>
                            <button
                              onClick={() => toggleOpenQuizzes(m.id)}
                              className="quiz-pulse-glow"
                              style={{
                                width: "100%",
                                textAlign: "left",
                                border: "1.5px solid #FCD34D",
                                background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
                                borderRadius: 8,
                                padding: "9px 12px",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontWeight: 800,
                                fontSize: 12,
                                color: "#B45309",
                                outline: "none"
                              }}
                            >
                              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                📝 <span style={{ textTransform: "uppercase", letterSpacing: 0.5 }}>Check Your Understanding</span>
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{ fontSize: 10.5, background: "#FDE68A", padding: "1px 7px", borderRadius: 100 }}>
                                  {stats.quizzesDone}/{stats.quizzesTotal} Quizzes
                                </span>
                                <span>{isQuizOpen ? "▲" : "▼"}</span>
                              </span>
                            </button>

                            {isQuizOpen && (
                              <div 
                                style={{ 
                                  background: "#FFFDF5", 
                                  border: "1px solid #FDE68A", 
                                  borderTop: "none", 
                                  borderRadius: "0 0 8px 8px", 
                                  padding: "10px 14px",
                                  marginTop: "-2px",
                                  animation: "quizFadeIn 0.2s ease-out"
                                }}
                              >
                                {m.quizzes.map(q => {
                                  const qDone = !!linksDone[q.id];
                                  return (
                                    <label key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "5px 0", cursor: "pointer" }}>
                                      <input 
                                        type="checkbox" 
                                        checked={qDone} 
                                        onChange={() => toggleLink(q.id)} 
                                        style={{ width: 13, height: 13, marginTop: 2, cursor: "pointer", accentColor: "#D97706", flexShrink: 0 }} 
                                      />
                                      <a
                                        href={q.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={e => e.stopPropagation()}
                                        style={{ fontSize: 11.5, color: qDone ? "#94A3B8" : "#B45309", textDecoration: qDone ? "line-through" : "underline", lineHeight: 1.5, fontWeight: 500 }}
                                      >
                                        {q.label}
                                      </a>
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div style={{ background: "linear-gradient(135deg, #16A34A 0%, #059669 100%)", color: "#fff", borderRadius: 14, padding: "20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 24, marginBottom: 6 }}>🎓</div>
        <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0.3 }}>Congratulations on successfully completing the 7-week DN 5.0 Deep Skilling learning program!</div>
        <div style={{ fontSize: 12.5, fontWeight: 700, opacity: 0.95, marginTop: 8, background: "rgba(255, 255, 255, 0.2)", display: "inline-block", padding: "5px 14px", borderRadius: 6, letterSpacing: 0.5 }}>
          READY TO ATTEMPT Knowledge-Based Assessment (KBA)
        </div>
      </div>
    </div>
  );
}
