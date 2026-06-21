import { useState, useMemo, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CONSTRUCTS, OFFICIAL_TOTAL } from "../data/constructs";
import OfficialTimetable from "./tabs/OfficialTimetable";
import PdfGuide from "./tabs/PdfGuide";
import HandBookTab from "./tabs/HandBookTab";
import MasterclassTab from "./tabs/MasterclassTab";

export default function StudyPlan() {
  const [tab, setTab] = useState(() => { try { return localStorage.getItem("dn5_tab") || "calendar"; } catch(e) { return "calendar"; } });
  const [modsDone, setModsDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_modsDone")) || {}; } catch(e) { return {}; } });
  const [linksDone, setLinksDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_linksDone")) || {}; } catch(e) { return {}; } });
  const [loadingDb, setLoadingDb] = useState(true);
  const [syncStatus, setSyncStatus] = useState("synced"); // "synced", "syncing", "error"
  const toggleLink = id => setLinksDone(p => ({ ...p, [id]: !p[id] }));

  const allModuleIds = useMemo(() => CONSTRUCTS.flatMap(c => c.modules.map(m => m.id)), []);
  const toggleModDone = id => setModsDone(p => ({ ...p, [id]: !p[id] }));
  const calDone = allModuleIds.filter(id => modsDone[id]).length;
  const calPct = Math.round((calDone / allModuleIds.length) * 100);

  // ── Sync with Cloud Firestore ───────────────────────────────
  // 1. Fetch user's progress from Firestore on mount
  useEffect(() => {
    let active = true;
    const fetchDbProgress = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoadingDb(false);
        return;
      }
      try {
        const docRef = doc(db, "progress", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && active) {
          const data = docSnap.data();
          setModsDone(data.modsDone || {});
          setLinksDone(data.linksDone || {});
        } else if (active) {
          // If no progress document exists in Firestore, upload the local localStorage progress as initial value.
          await setDoc(docRef, {
            modsDone,
            linksDone,
            updatedAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.error("Firestore progress fetch failed:", err);
      } finally {
        if (active) setLoadingDb(false);
      }
    };
    fetchDbProgress();
    return () => { active = false; };
  }, []);

  // 2. Save progress to Firestore when local states change
  useEffect(() => {
    if (loadingDb) return; // Skip saving until the initial database load is complete
    const saveDbProgress = async () => {
      const user = auth.currentUser;
      if (!user) return;
      setSyncStatus("syncing");
      try {
        const docRef = doc(db, "progress", user.uid);
        await setDoc(docRef, {
          modsDone,
          linksDone,
          updatedAt: new Date().toISOString()
        });
        setSyncStatus("synced");
      } catch (err) {
        console.error("Firestore progress save failed:", err);
        setSyncStatus("error");
      }
    };
    saveDbProgress();
  }, [modsDone, linksDone, loadingDb]);

  // ── Cascading auto-complete: every link in every sub-topic of a module checked → module auto-marked done.
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
  useEffect(() => { localStorage.setItem("dn5_modsDone",   JSON.stringify(modsDone));  }, [modsDone]);
  useEffect(() => { localStorage.setItem("dn5_linksDone",  JSON.stringify(linksDone)); }, [linksDone]);
  useEffect(() => { localStorage.setItem("dn5_tab",        tab);                       }, [tab]);

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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, opacity: 0.65, textTransform: "uppercase", marginBottom: 4 }}>COGNIZANT DIGITAL NURTURE 5.0 · OFFICIAL MODULE-WISE TIMETABLE</div>
              <h1 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 2px", lineHeight: 1.2 }}>Python Full Stack Engineer — 10 Modules, 4 FSE Constructs</h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {syncStatus === "syncing" && (
                  <span style={{ fontSize: 10, background: "rgba(245, 158, 11, 0.25)", color: "#FBBF24", padding: "3px 8px", borderRadius: 100, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, background: "#FBBF24", borderRadius: "50%", display: "inline-block" }}></span>
                    Syncing...
                  </span>
                )}
                {syncStatus === "synced" && (
                  <span style={{ fontSize: 10, background: "rgba(52, 211, 153, 0.2)", color: "#A7F3D0", padding: "3px 8px", borderRadius: 100, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <span>☁️</span> Saved
                  </span>
                )}
                {syncStatus === "error" && (
                  <span style={{ fontSize: 10, background: "rgba(239, 68, 68, 0.25)", color: "#FCA5A5", padding: "3px 8px", borderRadius: 100, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                    <span>⚠️</span> Sync Error
                  </span>
                )}
                <span style={{ fontSize: 11, background: "rgba(255, 255, 255, 0.15)", padding: "4px 10px", borderRadius: 100, fontWeight: 600 }}>👤 {auth.currentUser?.email}</span>
              </div>
              <button 
                onClick={() => signOut(auth)} 
                style={{ fontSize: 11, background: "#EF4444", color: "#fff", border: "none", padding: "5px 12px", borderRadius: 6, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}
              >
                Sign Out
              </button>
            </div>
          </div>
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
            {[
              ["calendar", "📅 Tracker"],
              ["pdfmap", "📘 PDF Guide"],
              ["handbook", "📘 HandBook"],
              ["masterclass", "🎓 Masterclass Session"]
            ].map(([id, label]) => (
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
            linksDone={linksDone}
            toggleLink={toggleLink}
          />
        )}

        {tab === "pdfmap" && (
          <PdfGuide />
        )}

        {tab === "handbook" && (
          <HandBookTab />
        )}

        {tab === "masterclass" && (
          <MasterclassTab />
        )}
      </div>
    </div>
  );
}
