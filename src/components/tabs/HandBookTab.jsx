export default function HandBookTab() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden", height: "80vh", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
      <iframe
        src="/handbook.pdf"
        title="Cognizant Deepskilling HandBook"
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}

