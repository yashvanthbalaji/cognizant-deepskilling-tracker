import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error(err);
      let errMsg = "Authentication failed. Please try again.";
      if (isSignUp) {
        if (err.code === "auth/email-already-in-use") {
          errMsg = "This email is already registered. Please sign in instead.";
        } else if (err.code === "auth/weak-password") {
          errMsg = "Password should be at least 6 characters.";
        } else if (err.code === "auth/invalid-email") {
          errMsg = "Please enter a valid email address.";
        }
      } else {
        if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
          errMsg = "Invalid email or password.";
        } else if (err.code === "auth/invalid-email") {
          errMsg = "Please enter a valid email address.";
        }
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      width: "100vw",
      fontFamily: "'Inter', system-ui, sans-serif",
      background: "#F7F6F3",
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .login-container {
          display: flex;
          width: 100%;
          min-height: 100vh;
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .left-col {
          flex: 1;
          background: linear-gradient(160deg, #1E2A3A 0%, #16202C 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px;
          color: #F8FAFC;
        }
        .right-col {
          flex: 1.2;
          background: #F7F6F3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 48px;
        }
        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 20px;
        }
        .bullet-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #818CF8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .form-input {
          transition: all 0.2s ease-in-out;
        }
        .form-input:focus {
          border-color: #6366F1 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
          outline: none;
        }
        .btn-submit {
          transition: all 0.2s ease-in-out;
          background: #4F46E5;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 12px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
        }
        .btn-submit:hover:not(:disabled) {
          background: #4338CA;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3);
        }
        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }
          .left-col {
            padding: 36px 24px;
            justify-content: flex-start;
            gap: 28px;
            flex: none;
          }
          .right-col {
            padding: 48px 24px;
            flex: 1;
          }
        }
      `}</style>
      
      <div className="login-container">
        {/* LEFT COLUMN — branding */}
        <div className="left-col">
          {/* Logo */}
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

          {/* Headline & bullets */}
          <div style={{ margin: "40px 0" }}>
            <h1 style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#F8FAFC",
              lineHeight: 1.2,
              marginBottom: 24,
              letterSpacing: "-0.8px"
            }}>
              Track your Digital Nurture 5.0 journey
            </h1>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div className="bullet-item">
                <div className="bullet-icon">✓</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9" }}>Track your Digital Nurture 5.0 journey</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>10 modules across 4 FSE constructs, covering everything from Design Patterns to advanced concepts.</div>
                </div>
              </div>
              
              <div className="bullet-item">
                <div className="bullet-icon">✓</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9" }}>Track every hands-on exercise</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Keep a structured checklist of all your daily tasks and PDF assignments.</div>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon">✓</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9" }}>Cohort-wide progress, synced live</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Automatic, real-time cloud syncing to keep your entire cohort's progress updated seamlessly.</div>
                </div>
              </div>

              <div className="bullet-item">
                <div className="bullet-icon">✓</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9" }}>Masterclass session reminders</div>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>Stay on top of your schedule with integrated alerts so you never miss an upcoming session.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>
            © 2026 CTSTrack · Cognizant Digital Nurture 5.0 Python FSE Cohort
          </div>
        </div>

        {/* RIGHT COLUMN — Sign-in / Sign-up Action */}
        <div className="right-col">
          <div style={{ width: "100%", maxWidth: 360 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: "0 0 6px" }}>
                {isSignUp ? "Register for CTSTrack" : "Sign in to CTSTrack"}
              </h2>
              <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
                {isSignUp ? "Create a new account for Digital Nurture 5.0" : "Cognizant Digital Nurture 5.0 · Python FSE Tracker"}
              </p>
            </div>

            {error && (
              <div style={{
                background: "rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#DC2626",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 12.5,
                marginBottom: 20,
                lineHeight: 1.4,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textAlign: "left",
                width: "100%",
                boxSizing: "border-box"
              }}>
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 700, color: "#475569", marginBottom: 6, letterSpacing: 0.5 }}>
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  autoComplete="username"
                  disabled={loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="form-input"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#fff",
                    border: "1px solid #D1D5DB",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#1E293B",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <label style={{ fontSize: 11.5, fontWeight: 700, color: "#475569", letterSpacing: 0.5 }}>
                    PASSWORD
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: "none", border: "none", color: "#4F46E5", fontSize: 11.5, cursor: "pointer", fontWeight: 700, padding: 0 }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  disabled={loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    background: "#fff",
                    border: "1px solid #D1D5DB",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#1E293B",
                    boxSizing: "border-box"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-submit"
                style={{
                  marginTop: 8,
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.2)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                    {isSignUp ? "Registering..." : "Signing in..."}
                  </>
                ) : (
                  isSignUp ? "Register & Sign Up" : "Sign In"
                )}
              </button>
            </form>

            <div style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "#64748B" }}>
              {isSignUp ? "Already have an account?" : "New to CTSTrack?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4F46E5",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline"
                }}
              >
                {isSignUp ? "Sign In" : "Register / Create Account"}
              </button>
            </div>

            <p style={{ fontSize: 11.5, color: "#64748B", lineHeight: 1.5, marginTop: 24, textAlign: "center" }}>
              Your progress is saved to your account and syncs across devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
