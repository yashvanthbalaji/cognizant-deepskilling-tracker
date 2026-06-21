import { useState } from "react";

export default function HandBookTab() {
  const [pdfUrl, setPdfUrl] = useState(() => {
    return localStorage.getItem("dn5_handbook_pdf_url") || "/handbook.pdf";
  });
  const [localFile, setLocalFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setLocalFile(file);
      setPdfUrl(url);
    }
  };

  const handleUrlSubmit = (url) => {
    if (url) {
      setPdfUrl(url);
      localStorage.setItem("dn5_handbook_pdf_url", url);
      setLocalFile(null);
    }
  };

  const resetToDefault = () => {
    setPdfUrl("/handbook.pdf");
    localStorage.removeItem("dn5_handbook_pdf_url");
    setLocalFile(null);
  };

  return (
    <div>
      {/* Header controls card */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", padding: 16, marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", margin: "0 0 4px" }}>📖 Embedded Deepskilling HandBook</h3>
            <p style={{ fontSize: 12, color: "#64748B", margin: 0 }}>
              {localFile ? `Viewing local file: ${localFile.name}` : pdfUrl === "/handbook.pdf" ? "Default source: /public/handbook.pdf" : `Firebase / External source URL: ${pdfUrl.substring(0, 50)}...`}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <label style={{ fontSize: 12, fontWeight: 700, padding: "7px 14px", background: "#2563EB", color: "#fff", borderRadius: 8, cursor: "pointer", display: "inline-block", transition: "background 0.2s" }}>
              📂 Browse Local PDF
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            {pdfUrl !== "/handbook.pdf" && (
              <button onClick={resetToDefault} style={{ fontSize: 12, fontWeight: 700, padding: "7px 14px", background: "#EF4444", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", transition: "background 0.2s" }}>
                Reset to Default
              </button>
            )}
          </div>
        </div>

        {/* Integration Instructions Accordion */}
        <div style={{ marginTop: 12, padding: "12px 16px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #E2E8F0" }}>
          <details>
            <summary style={{ fontSize: 12, fontWeight: 700, color: "#475569", cursor: "pointer", outline: "none", userSelect: "none" }}>
              ⚙️ Integration Guide: How to host your PDF permanently
            </summary>
            <div style={{ fontSize: 11.5, color: "#475569", marginTop: 10, lineHeight: 1.6 }}>
              <div style={{ marginBottom: 12 }}>
                <strong style={{ color: "#1E293B" }}>Option 1: Project's public folder (Simplest & Fast)</strong>
                <ol style={{ margin: "4px 0", paddingLeft: 20 }}>
                  <li>Copy your handbook PDF file to the project's <code>public/</code> folder.</li>
                  <li>Rename the file to <code>handbook.pdf</code>.</li>
                  <li>When you click this tab, it will automatically load without any configuration!</li>
                </ol>
              </div>
              <div>
                <strong style={{ color: "#1E293B" }}>Option 2: Firebase Storage hosting</strong>
                <ol style={{ margin: "4px 0", paddingLeft: 20 }}>
                  <li>Upload the PDF to your Firebase Storage bucket via the Firebase console.</li>
                  <li>Configure rules so it is publicly accessible, or obtain the public token URL.</li>
                  <li>Paste the Firebase Storage URL below and click save (it will be persisted in local storage):</li>
                </ol>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <input
                    type="text"
                    id="firebase-pdf-url"
                    placeholder="https://firebasestorage.googleapis.com/v0/b/..."
                    defaultValue={pdfUrl.startsWith("http") ? pdfUrl : ""}
                    style={{ flex: 1, padding: "6px 12px", fontSize: 12, border: "1px solid #CBD5E1", borderRadius: 6, outline: "none" }}
                  />
                  <button
                    onClick={() => handleUrlSubmit(document.getElementById("firebase-pdf-url").value)}
                    style={{ padding: "6px 16px", fontSize: 12, background: "#10B981", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700 }}
                  >
                    Save URL
                  </button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* PDF View Container */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden", height: "72vh", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <iframe
          src={pdfUrl}
          title="Cognizant Deepskilling HandBook"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </div>
  );
}
