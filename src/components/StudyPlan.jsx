import { useState, useMemo, useEffect, useRef } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CONSTRUCTS, OFFICIAL_TOTAL } from "../data/constructs";
import OfficialTimetable from "./tabs/OfficialTimetable";
import PdfGuide from "./tabs/PdfGuide";
import HandBookTab from "./tabs/HandBookTab";
import MasterclassTab from "./tabs/MasterclassTab";

export default function StudyPlan() {
  const [tab, setTab] = useState(() => { try { return localStorage.getItem("dn5_tab") || "calendar"; } catch { return "calendar"; } });
  const [modsDone, setModsDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_modsDone")) || {}; } catch { return {}; } });
  const [linksDone, setLinksDone] = useState(() => { try { return JSON.parse(localStorage.getItem("dn5_linksDone")) || {}; } catch { return {}; } });
  const [loadingDb, setLoadingDb] = useState(true);
  const [syncStatus, setSyncStatus] = useState("synced"); // "synced", "syncing", "error"

  const [showCalendar, setShowCalendar] = useState(false);
  const [calMonth, setCalMonth] = useState(new Date().getMonth());
  const [calYear, setCalYear] = useState(new Date().getFullYear());
  const calendarRef = useRef(null);

  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const [focusTimeLeft, setFocusTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [focusActive, setFocusActive] = useState(false);
  const [focusDuration, setFocusDuration] = useState(25 * 60); // Store selected duration
  const focusRef = useRef(null);
  const focusIntervalRef = useRef(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (changed) setModsDone(newModsDone);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linksDone]);

  // Pleasant focus timer double-chime arpeggio
  const playAlarm = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playChime = (time, freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
        osc.start(time);
        osc.stop(time + 0.6);
      };
      const now = audioCtx.currentTime;
      playChime(now, 523.25); // C5
      playChime(now + 0.15, 659.25); // E5
      playChime(now + 0.3, 783.99); // G5
      playChime(now + 0.45, 1046.50); // C6
    } catch (e) {
      console.error(e);
    }
  };

  // Focus timer ticking logic
  useEffect(() => {
    if (focusActive) {
      focusIntervalRef.current = setInterval(() => {
        setFocusTimeLeft((prev) => {
          if (prev <= 1) {
            setFocusActive(false);
            clearInterval(focusIntervalRef.current);
            playAlarm();
            alert("🧘 Focus session completed! Take a break.");
            return focusDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (focusIntervalRef.current) {
        clearInterval(focusIntervalRef.current);
      }
    }
    return () => {
      if (focusIntervalRef.current) {
        clearInterval(focusIntervalRef.current);
      }
    };
  }, [focusActive, focusDuration]);

  const formatFocusTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(remainingSecs).padStart(2, "0")}`;
  };

  // Close calendar or focus popover on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (focusRef.current && !focusRef.current.contains(event.target)) {
        setShowFocusTimer(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCalendarDays = () => {
    const firstDayIndex = new Date(calYear, calMonth, 1).getDay();
    const totalDays = new Date(calYear, calMonth + 1, 0).getDate();
    const today = new Date();
    const todayReset = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const cells = [];

    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(<div key={`empty-${i}`} />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(calYear, calMonth, day);
      const isToday = cellDate.getTime() === todayReset.getTime();
      const isPast = cellDate < todayReset;

      let cellStyle = {
        fontSize: 11,
        fontWeight: 700,
        height: 28,
        width: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        cursor: "default",
        margin: "0 auto",
        userSelect: "none"
      };

      if (isToday) {
        cellStyle = {
          ...cellStyle,
          background: "#4F46E5",
          color: "#fff",
          fontWeight: 800
        };
      } else if (isPast) {
        cellStyle = {
          ...cellStyle,
          color: "#94A3B8",
          textDecoration: "line-through",
          opacity: 0.6
        };
      } else {
        cellStyle = {
          ...cellStyle,
          color: "#334155"
        };
      }

      cells.push(
        <div key={day} style={cellStyle}>
          {day}
        </div>
      );
    }

    return cells;
  };

  // ── Auto-save progress to localStorage ──────────────────────
  useEffect(() => { localStorage.setItem("dn5_modsDone", JSON.stringify(modsDone)); }, [modsDone]);
  useEffect(() => { localStorage.setItem("dn5_linksDone", JSON.stringify(linksDone)); }, [linksDone]);
  useEffect(() => { localStorage.setItem("dn5_tab", tab); }, [tab]);

  const userInitials = auth.currentUser?.email
    ? auth.currentUser.email.slice(0, 2).toUpperCase()
    : "??";

  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  useEffect(() => {
    const handleOut = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleOut);
    return () => document.removeEventListener("mousedown", handleOut);
  }, []);

  const syncDot = syncStatus === "syncing"
    ? { bg: "#F59E0B", title: "Syncing…" }
    : syncStatus === "error"
      ? { bg: "#EF4444", title: "Sync error" }
      : { bg: "#22C55E", title: "All changes saved" };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F7F6F3", minHeight: "100vh" }}>
      <style>{`
        .sp-tab-btn { transition: color 0.15s, border-color 0.15s; }
        .sp-tab-btn:hover { color: #fff !important; }
        .sp-toolbar-btn { transition: background 0.15s, opacity 0.15s; }
        .sp-toolbar-btn:hover { opacity: 0.85; }
        .sp-avatar-btn { transition: box-shadow 0.15s; }
        .sp-avatar-btn:hover { box-shadow: 0 0 0 3px rgba(255,255,255,0.35); }
      `}</style>

      {/* ══════════════════════════════════════════════════════
           TOP BAR  — slim, ~56px
         ══════════════════════════════════════════════════════ */}
      <div style={{
        background: "#0F172A",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 20px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* LEFT — wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#F8FAFC",
            letterSpacing: "-0.4px",
          }}>CTSTrack</span>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: "#6366F1",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 4,
            padding: "2px 5px",
            textTransform: "uppercase",
          }}>DN 5.0</span>
        </div>

        {/* RIGHT — avatar user menu */}
        <div ref={userMenuRef} style={{ position: "relative" }}>
          <button
            className="sp-avatar-btn"
            onClick={() => setShowUserMenu(v => !v)}
            style={{
              width: 34, height: 34,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#4F46E5,#7C3AED)",
              border: "2px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              outline: "none",
            }}
          >
            {userInitials}
            {/* Sync status dot */}
            <span style={{
              position: "absolute",
              bottom: 0, right: 0,
              width: 9, height: 9,
              borderRadius: "50%",
              background: syncDot.bg,
              border: "1.5px solid #0F172A",
              title: syncDot.title,
            }} />
          </button>

          {showUserMenu && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: 0,
              background: "#1E293B",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              padding: "12px 14px",
              minWidth: 200,
              zIndex: 2000,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
            }}>
              <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6, fontWeight: 500 }}>Signed in as</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#F1F5F9", marginBottom: 12, wordBreak: "break-all" }}>
                {auth.currentUser?.email}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, fontSize: 11, color: "#64748B" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: syncDot.bg, display: "inline-block", flexShrink: 0 }} />
                {syncDot.title}
              </div>
              <button
                onClick={() => signOut(auth)}
                style={{
                  width: "100%",
                  padding: "7px 0",
                  fontSize: 12,
                  fontWeight: 700,
                  background: "rgba(239,68,68,0.12)",
                  color: "#F87171",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 7,
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
           SECOND SECTION — app title + control strip + progress
         ══════════════════════════════════════════════════════ */}
      <div style={{
        background: "linear-gradient(160deg,#1E2A3A 0%,#16202C 100%)",
        padding: "20px 20px 0",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          {/* ── TITLE ROW: heading left, date+focus right — single flex row ── */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            marginBottom: 18,
            flexWrap: "wrap",
          }}>
            {/* Left: app title */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.4, color: "rgba(255,255,255,0.70)", textTransform: "uppercase", marginBottom: 5 }}>
                Cognizant Digital Nurture 5.0
              </div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: "#F8FAFC", margin: 0, lineHeight: 1.2, letterSpacing: "-0.3px" }}>
                Python Full Stack Engineer
              </h1>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.78)", marginTop: 3, fontWeight: 400 }}>
                10 Modules · 4 FSE Constructs · {OFFICIAL_TOTAL} official days
              </div>
            </div>

            {/* Right: control strip */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "6px 10px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: 9,
              border: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}>

              {/* Calendar */}
              <div ref={calendarRef} style={{ position: "relative" }}>
                <button
                  className="sp-toolbar-btn"
                  onClick={() => {
                    const today = new Date();
                    setCalMonth(today.getMonth());
                    setCalYear(today.getFullYear());
                    setShowCalendar(!showCalendar);
                    setShowFocusTimer(false);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "4px 9px",
                    borderRadius: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    outline: "none",
                  }}
                >
                  📅 {new Date().toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
                </button>

                {showCalendar && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    background: "#fff",
                    color: "#1E293B",
                    borderRadius: 12,
                    boxShadow: "0 12px 28px -4px rgba(0,0,0,0.18)",
                    border: "1px solid #E2E8F0",
                    padding: 16,
                    width: 256,
                    zIndex: 1000,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <button onClick={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); } else { setCalMonth(calMonth - 1); } }}
                        style={{ border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#64748B", padding: "2px 6px" }}>◀</button>
                      <span style={{ fontSize: 12, fontWeight: 800, color: "#0F172A" }}>
                        {new Date(calYear, calMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                      </span>
                      <button onClick={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); } else { setCalMonth(calMonth + 1); } }}
                        style={{ border: "none", background: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#64748B", padding: "2px 6px" }}>▶</button>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center", marginBottom: 6 }}>
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                        <span key={d} style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8" }}>{d}</span>
                      ))}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, textAlign: "center" }}>
                      {renderCalendarDays()}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <span style={{ width: 1, height: 18, background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />

              {/* Focus Mode */}
              <div ref={focusRef} style={{ position: "relative" }}>
                <button
                  className="sp-toolbar-btn"
                  onClick={() => { setShowFocusTimer(!showFocusTimer); setShowCalendar(false); }}
                  style={{
                    background: focusActive ? "rgba(16,185,129,0.15)" : "transparent",
                    border: focusActive ? "1px solid rgba(16,185,129,0.35)" : "none",
                    color: focusActive ? "#6EE7B7" : "rgba(255,255,255,0.75)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    padding: "4px 9px",
                    borderRadius: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    outline: "none",
                  }}
                >
                  🧘 {focusActive ? `${formatFocusTime(focusTimeLeft)}` : "Focus Mode"}
                </button>

                {showFocusTimer && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: 0,
                    background: "#fff",
                    color: "#1E293B",
                    borderRadius: 12,
                    boxShadow: "0 12px 28px -4px rgba(0,0,0,0.18)",
                    border: "1px solid #E2E8F0",
                    padding: "16px 18px",
                    width: 230,
                    zIndex: 1000,
                    textAlign: "center",
                  }}>
                    <h4 style={{ fontSize: 12, fontWeight: 700, margin: "0 0 10px", color: "#334155", textTransform: "uppercase", letterSpacing: 0.8 }}>
                      Focus Timer
                    </h4>
                    <div style={{ fontSize: 38, fontWeight: 900, fontFamily: "monospace", color: focusActive ? "#4F46E5" : "#334155", margin: "8px 0 14px", letterSpacing: 2 }}>
                      {formatFocusTime(focusTimeLeft)}
                    </div>
                    {!focusActive && (
                      <>
                        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 10 }}>
                          {[15, 25, 50].map(mins => (
                            <button key={mins} onClick={() => { setFocusDuration(mins * 60); setFocusTimeLeft(mins * 60); }}
                              style={{
                                fontSize: 11, fontWeight: 700, padding: "3px 9px",
                                border: "1px solid #E2E8F0",
                                background: focusDuration === mins * 60 ? "#EEF2FF" : "#fff",
                                borderRadius: 6, cursor: "pointer",
                                color: focusDuration === mins * 60 ? "#4F46E5" : "#64748B",
                              }}>
                              {mins}m
                            </button>
                          ))}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 12 }}>
                          <span style={{ fontSize: 11, color: "#94A3B8" }}>Custom:</span>
                          <input type="number" min="1" max="180"
                            defaultValue={Math.floor(focusDuration / 60)}
                            onChange={(e) => { const v = parseInt(e.target.value); if (v > 0) { setFocusDuration(v * 60); setFocusTimeLeft(v * 60); } }}
                            style={{ width: 44, padding: "3px 5px", fontSize: 11, border: "1px solid #E2E8F0", borderRadius: 5, textAlign: "center", outline: "none" }} />
                          <span style={{ fontSize: 11, color: "#94A3B8" }}>min</span>
                        </div>
                      </>
                    )}
                    <div style={{ display: "flex", gap: 7 }}>
                      <button onClick={() => setFocusActive(!focusActive)}
                        style={{ flex: 1, fontSize: 12, fontWeight: 700, padding: "7px 0", background: focusActive ? "#F59E0B" : "#4F46E5", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>
                        {focusActive ? "Pause" : "Start"}
                      </button>
                      <button onClick={() => { setFocusActive(false); setFocusTimeLeft(focusDuration); }}
                        style={{ fontSize: 12, fontWeight: 700, padding: "7px 12px", background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0", borderRadius: 7, cursor: "pointer" }}>
                        ↺
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>{/* ── end TITLE ROW ── */}

          {/* ── PROGRESS BAR SECTION ── */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 7 }}>
              <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.80)", fontWeight: 500 }}>
                {calDone} of {allModuleIds.length} modules complete
              </span>
              <span style={{ fontSize: 13, fontWeight: 800, color: calPct === 100 ? "#10B981" : "#2DD4BF" }}>
                {calPct}%
              </span>
            </div>
            <div style={{ background: "#0B1220", borderRadius: 100, height: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{
                height: "100%",
                borderRadius: 100,
                background: calPct === 100 ? "#10B981" : "linear-gradient(90deg, #6366F1 0%, #2DD4BF 55%, #10B981 100%)",
                width: `${calPct}%`,
                transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: calPct === 100 ? "0 0 10px rgba(16, 185, 129, 0.5)" : "0 0 10px rgba(45, 212, 191, 0.5)",
              }} />
            </div>
          </div>

          {/* ── TAB BAR — underline style ── */}
          <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 0 }}>
            {[
              ["calendar", "📅 Tracker"],
              ["pdfmap", "📘 PDF Guide"],
              ["handbook", "📘 HandBook"],
              ["masterclass", "🎓 Masterclass"],
            ].map(([id, label]) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  className="sp-tab-btn"
                  onClick={() => setTab(id)}
                  style={{
                    padding: "11px 18px",
                    border: "none",
                    borderBottom: active ? "2px solid #818CF8" : "2px solid transparent",
                    background: "none",
                    cursor: "pointer",
                    fontSize: 12.5,
                    fontWeight: active ? 700 : 500,
                    color: active ? "#C7D2FE" : "rgba(255,255,255,0.65)",
                    letterSpacing: "0.1px",
                    outline: "none",
                    marginBottom: "-1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 20px 48px" }}>

        {tab === "calendar" && (
          <OfficialTimetable
            modsDone={modsDone}
            toggleModDone={toggleModDone}
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
