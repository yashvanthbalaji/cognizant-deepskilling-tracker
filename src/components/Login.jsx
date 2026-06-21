import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        errMsg = "Invalid email or password.";
      } else if (err.code === "auth/email-already-in-use") {
        errMsg = "Email is already registered.";
      } else if (err.code === "auth/weak-password") {
        errMsg = "Password should be at least 6 characters.";
      } else if (err.code === "auth/invalid-email") {
        errMsg = "Please enter a valid email address.";
      }
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "radial-gradient(circle at top right, #1E1B4B 0%, #0F172A 70%)",
      fontFamily: "'Inter', system-ui, sans-serif",
      padding: 16
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.15); }
          50% { box-shadow: 0 0 35px rgba(99, 102, 241, 0.3); }
        }
        .login-card {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .form-input {
          transition: all 0.2s ease-in-out;
        }
        .form-input:focus {
          border-color: #6366F1 !important;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2) !important;
          outline: none;
        }
        .btn-submit {
          transition: all 0.2s ease-in-out;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
          background: #4338CA !important;
        }
        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
      `}</style>

      <div className="login-card" style={{
        width: "100%",
        maxWidth: 420,
        background: "rgba(30, 41, 59, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 20,
        padding: "36px 32px",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        color: "#F8FAFC",
        animationName: "pulseGlow",
        animationDuration: "5s",
        animationIterationCount: "infinite"
      }}>
        {/* Logo/Badge */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: 12,
            background: "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)",
            fontSize: 22,
            marginBottom: 12,
            boxShadow: "0 8px 16px rgba(79, 70, 229, 0.3)"
          }}>
            ⚡
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 4px", background: "linear-gradient(to right, #F8FAFC, #94A3B8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            CTSTrack Login
          </h2>
          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
            Cognizant Digital Nurture 5.0 Tracker
          </p>
        </div>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#FCA5A5",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 12.5,
            marginBottom: 20,
            lineHeight: 1.4,
            display: "flex",
            alignItems: "center",
            gap: 8
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#94A3B8", marginBottom: 6 }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="form-input"
              style={{
                width: "100%",
                padding: "11px 14px",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                fontSize: 14,
                color: "#fff",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8" }}>
                PASSWORD
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", color: "#6366F1", fontSize: 11.5, cursor: "pointer", fontWeight: 700, padding: 0 }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input"
              style={{
                width: "100%",
                padding: "11px 14px",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                fontSize: 14,
                color: "#fff",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
            style={{
              background: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 8,
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              <>
                <div style={{ width: 14, height: 14, border: "2.5px solid rgba(255,255,255,0.2)", borderTop: "2.5px solid #fff", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                Authenticating...
              </>
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Toggle Sign In / Sign Up */}
        <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "#94A3B8" }}>
          {isSignUp ? "Already have an account?" : "New to the Study Plan Tracker?"}{" "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#6366F1",
              fontWeight: 700,
              cursor: "pointer",
              padding: 0,
              textDecoration: "underline"
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
