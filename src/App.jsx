import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import StudyPlan from "./components/StudyPlan";
import Login from "./components/Login";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#0F172A",
        color: "#60A5FA",
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 40,
            height: 40,
            border: "4px solid rgba(96, 165, 250, 0.2)",
            borderTop: "4px solid #60A5FA",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 12px"
          }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ fontSize: 14, fontWeight: 600 }}>Loading CTSTrack...</div>
        </div>
      </div>
    );
  }

  return user ? <StudyPlan /> : <Login />;
}
