import { useState, useEffect } from "react";

const MEETINGS = [
  {
    id: 1,
    week: "Week 1",
    dateStr: "19-Jun-26",
    startTime: new Date(2026, 5, 19, 16, 0, 0),
    endTime: new Date(2026, 5, 19, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "Design Patterns and Principles",
      "Data Structures and Algorithms",
      "Advanced SQL",
      "Unit Testing - PyTest, unittest, Jest & Mocha"
    ]
  },
  {
    id: 2,
    week: "Week 2",
    dateStr: "25-Jun-26",
    startTime: new Date(2026, 5, 25, 16, 0, 0),
    endTime: new Date(2026, 5, 25, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "Unit Testing - PyTest, unittest, Jest & Mocha",
      "Python Backend Frameworks – Django, Flask & FastAPI"
    ]
  },
  {
    id: 3,
    week: "Week 3",
    dateStr: "02-Jul-26",
    startTime: new Date(2026, 6, 2, 16, 0, 0),
    endTime: new Date(2026, 6, 2, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "Frontend Development Basics – React, Angular & Vue.js overview"
    ]
  },
  {
    id: 4,
    week: "Week 4",
    dateStr: "09-Jul-26",
    startTime: new Date(2026, 6, 9, 16, 0, 0),
    endTime: new Date(2026, 6, 9, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "Frontend Development Basics – React, Angular & Vue.js overview"
    ]
  },
  {
    id: 5,
    week: "Week 5",
    dateStr: "16-Jul-26",
    startTime: new Date(2026, 6, 16, 16, 0, 0),
    endTime: new Date(2026, 6, 16, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "QA Concepts & Test Automation – (Selenium Basics)"
    ]
  },
  {
    id: 6,
    week: "Week 6",
    dateStr: "23-Jul-26",
    startTime: new Date(2026, 6, 23, 16, 0, 0),
    endTime: new Date(2026, 6, 23, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "QA Concepts & Test Automation – (Selenium Basics)",
      "GIT",
      "CI/CD",
      "DevOps",
      "Docker"
    ]
  },
  {
    id: 7,
    week: "Week 7",
    dateStr: "28-Jul-26",
    startTime: new Date(2026, 6, 28, 16, 0, 0),
    endTime: new Date(2026, 6, 28, 18, 0, 0),
    group: "Python FSE",
    timings: "4:00 PM to 6:00 PM",
    topics: [
      "Cloud and GenAI fundamentals"
    ]
  }
];

export default function MasterclassTab() {
  const [now, setNow] = useState(new Date());
  
  // Find the first upcoming (or live) meeting dynamically to set as default tab
  const getInitialActiveTab = () => {
    const today = new Date();
    const active = MEETINGS.find(m => today < m.endTime);
    return active ? active.id : MEETINGS[MEETINGS.length - 1].id;
  };

  const [activeTab, setActiveTab] = useState(getInitialActiveTab);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getMeetingStatus = (m) => {
    if (now > m.endTime) return "COMPLETED";
    if (now >= m.startTime && now <= m.endTime) return "LIVE";
    return "UPCOMING";
  };

  const getRemainingTime = (targetDate) => {
    const diff = targetDate.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, total: diff };
  };

  // Find the first upcoming (or live) meeting in the list
  const nextActiveMeeting = MEETINGS.find(m => getMeetingStatus(m) !== "COMPLETED") || MEETINGS[MEETINGS.length - 1];

  const selectedMeeting = MEETINGS.find(m => m.id === activeTab) || MEETINGS[0];
  const selectedStatus = getMeetingStatus(selectedMeeting);
  const selectedTimeLeft = getRemainingTime(selectedMeeting.startTime);

  // Check if this selected meeting is the "first upcoming meeting" among all upcoming meetings
  const isFirstUpcoming = nextActiveMeeting.id === selectedMeeting.id;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @keyframes pulse-red {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.92); }
        }
        .live-pulsate {
          animation: pulse-red 1.5s infinite ease-in-out;
        }
        .tab-btn {
          transition: all 0.2s ease;
        }
        .tab-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .topic-tag {
          transition: all 0.2s;
        }
        .topic-tag:hover {
          background-color: #E2E8F0 !important;
          color: #0F172A !important;
        }
      `}</style>

      {/* ── TOP HERO CARD: Next Active Masterclass countdown (Big Timer) ── */}
      {getMeetingStatus(nextActiveMeeting) !== "COMPLETED" && (
        <div style={{
          background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%)",
          color: "#fff",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 20,
          boxShadow: "0 10px 15px -3px rgba(67, 56, 202, 0.25)",
          border: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
            <div>
              <span style={{
                background: "rgba(255, 255, 255, 0.12)",
                color: "#E0E7FF",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                padding: "4px 10px",
                borderRadius: 100
              }}>
                📢 NEXT UPCOMING MASTERCLASS
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: "6px 0 2px" }}>
                {nextActiveMeeting.week} Session ({nextActiveMeeting.dateStr})
              </h2>
              <p style={{ fontSize: 13, color: "#C7D2FE", margin: 0 }}>
                Group: {nextActiveMeeting.group} | {nextActiveMeeting.timings}
              </p>
            </div>
            {getMeetingStatus(nextActiveMeeting) === "LIVE" ? (
              <span className="live-pulsate" style={{ background: "#EF4444", color: "#fff", padding: "6px 14px", borderRadius: 100, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, background: "#fff", borderRadius: "50%", display: "inline-block" }}></span>
                LIVE NOW
              </span>
            ) : null}
          </div>

          {getMeetingStatus(nextActiveMeeting) === "UPCOMING" && (
            <div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
                {[
                  { label: "DAYS", value: getRemainingTime(nextActiveMeeting.startTime).days },
                  { label: "HOURS", value: getRemainingTime(nextActiveMeeting.startTime).hours },
                  { label: "MINS", value: getRemainingTime(nextActiveMeeting.startTime).minutes },
                  { label: "SECS", value: getRemainingTime(nextActiveMeeting.startTime).seconds }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: 12,
                    minWidth: 80,
                    padding: "12px 8px",
                    textAlign: "center",
                    backdropFilter: "blur(4px)"
                  }}>
                    <div style={{ fontSize: 32, fontWeight: 900, fontFamily: "monospace", color: "#F5F3FF", lineHeight: 1 }}>
                      {String(item.value).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: "#C7D2FE", marginTop: 4, letterSpacing: 0.5 }}>
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── HORIZONTAL WEEKS TABS ── */}
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
        📅 Select Weekly Session
      </h3>
      <div style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        paddingBottom: 8,
        marginBottom: 20,
        scrollbarWidth: "thin"
      }}>
        {MEETINGS.map(m => {
          const status = getMeetingStatus(m);
          const isActive = activeTab === m.id;
          const timeLeft = getRemainingTime(m.startTime);

          let badgeColor;
          let badgeBg;
          let badgeText;

          if (status === "COMPLETED") {
            badgeColor = "#16A34A";
            badgeBg = "#DCFCE7";
            badgeText = "Completed";
          } else if (status === "LIVE") {
            badgeColor = "#EF4444";
            badgeBg = "#FEE2E2";
            badgeText = "LIVE";
          } else if (timeLeft.days === 0) {
            badgeColor = "#C08A3E";
            badgeBg = "#F5EDDC";
            badgeText = `${timeLeft.hours}h left`;
          } else {
            badgeColor = "#2C7A7B";
            badgeBg = "#E0F0F0";
            badgeText = `${timeLeft.days}d left`;
          }

          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(m.id)}
              className="tab-btn"
              style={{
                flex: "0 0 auto",
                background: isActive ? "#fff" : "rgba(255, 255, 255, 0.7)",
                border: isActive ? "2px solid #6366A8" : "1px solid #E2E8F0",
                borderRadius: 12,
                padding: "10px 16px",
                textAlign: "left",
                cursor: "pointer",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minWidth: 110
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, color: isActive ? "#0F172A" : "#334155" }}>
                {m.week}
              </span>
              <span style={{ fontSize: 11, color: "#475569" }}>
                {m.dateStr.split("-").slice(0, 2).join(" ")}
              </span>
              <span style={{
                fontSize: 9,
                fontWeight: 800,
                color: badgeColor,
                background: badgeBg,
                padding: "2px 6px",
                borderRadius: 4,
                width: "fit-content",
                marginTop: 2
              }}>
                {badgeText}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── SESSION DETAILS PANEL ── */}
      <div style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        padding: 24,
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.02)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, borderBottom: "1px solid #F1F5F9", paddingBottom: 16, marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6366A8", textTransform: "uppercase" }}>Masterclass Details</span>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "2px 0 0" }}>
              {selectedMeeting.week} Masterclass Session
            </h2>
          </div>
          <span style={{
            fontSize: 12,
            fontWeight: 800,
            padding: "4px 12px",
            borderRadius: 100,
            background: selectedStatus === "COMPLETED" ? "#DCFCE7" : selectedStatus === "LIVE" ? "#FEE2E2" : "#DBEAFE",
            color: selectedStatus === "COMPLETED" ? "#15803D" : selectedStatus === "LIVE" ? "#B91C1C" : "#1E40AF"
          }}>
            {selectedStatus === "COMPLETED" ? "✓ Meeting Completed" : selectedStatus === "LIVE" ? "🔴 Live Now" : "⏱️ Upcoming"}
          </span>
        </div>

        {/* Info Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 20
        }}>
          <div style={{ background: "#F8FAFC", padding: 12, borderRadius: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Date & Time</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginTop: 4 }}>
              📅 {selectedMeeting.dateStr}
            </div>
            <div style={{ fontSize: 12, color: "#334155", marginTop: 2 }}>
              ⏰ {selectedMeeting.timings}
            </div>
          </div>
          <div style={{ background: "#F8FAFC", padding: 12, borderRadius: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>Target Group</span>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155", marginTop: 4 }}>
              👥 {selectedMeeting.group}
            </div>
            <div style={{ fontSize: 12, color: "#334155", marginTop: 2 }}>
              Cognizant Digital Nurture 5.0
            </div>
          </div>
        </div>

        {/* Topics covered */}
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
            📚 Covered Topics
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {selectedMeeting.topics.map((t, idx) => (
              <span
                key={idx}
                className="topic-tag"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  background: "#F1F5F9",
                  color: "#475569",
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px solid #E2E8F0"
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Countdown Area */}
        <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 20 }}>
          {selectedStatus === "COMPLETED" ? (
            <div style={{
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              color: "#166534",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span>✅</span>
              <span>This meeting has been completed on {selectedMeeting.dateStr}. Please refer to the recorded materials for updates.</span>
            </div>
          ) : selectedStatus === "LIVE" ? (
            <div style={{
              background: "#FEF2F2",
              border: "1px solid #FCA5A5",
              color: "#991B1B",
              borderRadius: 10,
              padding: "12px 16px",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 8
            }}>
              <span className="live-pulsate">🔴</span>
              <span>This meeting is currently LIVE! Join the Cognizant room now. Time slot: {selectedMeeting.timings}</span>
            </div>
          ) : (
            <div>
              {isFirstUpcoming ? (
                // ── BIG TIMER FOR FIRST UPCOMING MEETING ──
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    ⌛ Time Left (Next Meeting Countdown)
                  </h4>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {[
                      { label: "days", value: selectedTimeLeft.days },
                      { label: "hours", value: selectedTimeLeft.hours },
                      { label: "mins", value: selectedTimeLeft.minutes },
                      { label: "secs", value: selectedTimeLeft.seconds }
                    ].map((t, i) => (
                      <div key={i} style={{
                        background: "#EEF2F6",
                        border: "1px solid #E2E8F0",
                        borderRadius: 10,
                        minWidth: 70,
                        padding: "8px 6px",
                        textAlign: "center"
                      }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#6366A8", fontFamily: "monospace" }}>
                          {String(t.value).padStart(2, "0")}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "#475569", textTransform: "uppercase", marginTop: 2 }}>
                          {t.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 12, color: "#64748B", marginTop: 8, fontStyle: "italic" }}>
                    * This is your next upcoming Masterclass Session.
                  </p>
                </div>
              ) : (
                // ── SMALL TIMER FOR SUBSEQUENT MEETINGS ──
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    ⌛ Time Remaining
                  </h4>
                  <div style={{
                    display: "inline-block",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    padding: "8px 14px",
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "#475569"
                  }}>
                    ⏱️ {selectedTimeLeft.days} days {selectedTimeLeft.hours} hours {selectedTimeLeft.minutes} mins {selectedTimeLeft.seconds} secs left
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
