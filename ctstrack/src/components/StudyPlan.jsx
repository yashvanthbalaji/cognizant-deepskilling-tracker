import { useState, useMemo, useEffect } from "react";
import { WEEKS } from "../data/weeks";
import { CONSTRUCTS, OFFICIAL_TOTAL } from "../data/constructs";
import OfficialTimetable from "./tabs/OfficialTimetable";
import TaskChecklist from "./tabs/TaskChecklist";
import PdfGuide from "./tabs/PdfGuide";
import GithubTab from "./tabs/GithubTab";

export default function StudyPlan() {
  const [checked, setChecked] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_checked")) || {}; } catch(e) { return {}; } });
  const [openWeeks, setOpenWeeks] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_openWeeks")) || { 1: true }; } catch(e) { return { 1: true }; } });
  const [openMods, setOpenMods] = useState({});
  const [tab, setTab] = useState(() => { try { return localStorage.getItem("dn5_tab") || "calendar"; } catch(e) { return "calendar"; } });
  const [modsDone, setModsDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_modsDone")) || {}; } catch(e) { return {}; } });
  const [subItemsDone, setSubItemsDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_subItemsDone")) || {}; } catch(e) { return {}; } });
  const [linksDone, setLinksDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_linksDone")) || {}; } catch(e) { return {}; } });
  const toggleSubItem = id => setSubItemsDone(p => ({ ...p, [id]: !p[id] }));
  const toggleLink = id => setLinksDone(p => ({ ...p, [id]: !p[id] }));

  const allModuleIds = useMemo(() => CONSTRUCTS.flatMap(c => c.modules.map(m => m.id)), []);
  const toggleModDone = id => setModsDone(p => ({ ...p, [id]: !p[id] }));
  const calDone = allModuleIds.filter(id => modsDone[id]).length;
  const calPct = Math.round((calDone / allModuleIds.length) * 100);

  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const toggleWeek = id => setOpenWeeks(p => ({ ...p, [id]: !p[id] }));
  const toggleMod = id => setOpenMods(p => ({ ...p, [id]: !p[id] }));

  const allTaskIds = useMemo(() => WEEKS.flatMap(w => w.modules.flatMap(m => m.tasks.map(t => t.id))), []);
  const done = allTaskIds.filter(id => checked[id]).length;
  const pct = Math.round((done / allTaskIds.length) * 100);

  const weekStats = useMemo(() => WEEKS.reduce((acc, w) => {
    const ids = w.modules.flatMap(m => m.tasks.map(t => t.id));
    const d = ids.filter(id => checked[id]).length;
    acc[w.id] = { done: d, total: ids.length, pct: ids.length ? Math.round((d / ids.length) * 100) : 0 };
    return acc;
  }, {}), [checked]);

  // ── Cascading auto-complete: every link in every sub-topic of a module checked → module auto-marked done.
  // Only applies to modules using the new subTopics (heading+links) shape.
  useEffect(() => {
    const newModsDone = { ...modsDone };
    let changed = false;
    CONSTRUCTS.forEach(c => {
      c.modules.forEach(m => {
        if (m.subTopics && m.subTopics.length > 0) {
          const allTopicsDone = m.subTopics.every(st => st.links.every(l => linksDone[l.id]));
          const allQuizzesDone = m.quizzes ? m.quizzes.every(q => linksDone[q.id]) : true;
          const allDone = allTopicsDone && allQuizzesDone;
          if (allDone !== !!newModsDone[m.id]) {
            newModsDone[m.id] = allDone;
            changed = true;
          }
        }
      });
    });
    if (changed) setModsDone(newModsDone);
  }, [linksDone]);

  // ── Auto-save progress to localStorage ──────────────────────
  useEffect(() => { localStorage.setItem("dn5_checked",    JSON.stringify(checked));   }, [checked]);
  useEffect(() => { localStorage.setItem("dn5_modsDone",   JSON.stringify(modsDone));  }, [modsDone]);
  useEffect(() => { localStorage.setItem("dn5_subItemsDone", JSON.stringify(subItemsDone)); }, [subItemsDone]);
  useEffect(() => { localStorage.setItem("dn5_linksDone", JSON.stringify(linksDone)); }, [linksDone]);
  useEffect(() => { localStorage.setItem("dn5_tab",        tab);                       }, [tab]);
  useEffect(() => { localStorage.setItem("dn5_openWeeks",  JSON.stringify(openWeeks)); }, [openWeeks]);

  const tabStyle = active => ({
    padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
    fontSize: 13, fontWeight: 600, borderBottom: active ? "2px solid #fff" : "2px solid transparent",
    color: active ? "#fff" : "rgba(255,255,255,0.55)", transition: "all 0.15s",
  });

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F1F5F9", minHeight: "100vh" }}>

      {/* ── HEADER ── */}
      <div style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#1a56db 55%,#7C3AED 100%)", color: "#fff", padding: "22px 16px 0" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, opacity: 0.65, textTransform: "uppercase", marginBottom: 4 }}>COGNIZANT DIGITAL NURTURE 5.0 · OFFICIAL MODULE-WISE TIMETABLE</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 2px", lineHeight: 1.2 }}>Python Full Stack Engineer — 10 Modules, 4 FSE Constructs</h1>
          <p style={{ fontSize: 12, opacity: 0.7, margin: "0 0 16px" }}>Per Handbook: {OFFICIAL_TOTAL} days (~7 weeks) — official Cognizant durations only</p>

          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 8, height: 8, marginBottom: 6 }}>
            <div style={{ background: calPct === 100 ? "#34D399" : "#60A5FA", height: 8, borderRadius: 8, width: `${calPct}%`, transition: "width 0.4s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 12 }}>
            <span style={{ opacity: 0.7 }}>{calDone} / {allModuleIds.length} modules complete</span>
            <span style={{ fontWeight: 700 }}>{calPct}%</span>
          </div>

          {/* tabs */}
          <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {[["calendar","📅 Official Timetable"],["plan","📋 Task Checklist"],["pdfmap","📘 PDF Guide"],["github","🐙 GitHub"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={tabStyle(tab === id)}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 14px 40px" }}>

        {tab === "calendar" && (
          <OfficialTimetable
            modsDone={modsDone}
            toggleModDone={toggleModDone}
            allModuleIds={allModuleIds}
            calDone={calDone}
            calPct={calPct}
            subItemsDone={subItemsDone}
            toggleSubItem={toggleSubItem}
            linksDone={linksDone}
            toggleLink={toggleLink}
          />
        )}

        {tab === "pdfmap" && (
          <PdfGuide />
        )}

        {tab === "github" && (
          <GithubTab />
        )}

        {tab === "plan" && (
          <TaskChecklist
            checked={checked}
            toggle={toggle}
            openWeeks={openWeeks}
            toggleWeek={toggleWeek}
            openMods={openMods}
            toggleMod={toggleMod}
            weekStats={weekStats}
          />
        )}
      </div>
    </div>
  );
}
