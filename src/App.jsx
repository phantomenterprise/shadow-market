import React from "react";
import ArtifactEmbed from "./components/ArtifactEmbed";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "#f8fafc",
        padding: "32px",
      }}
    >
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <header>
          <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>Shadow Market</h1>
          <p style={{ color: "#cbd5f5", margin: 0 }}>
            Preview the embedded Claude artifact below.
          </p>
        </header>
        <section
          style={{
            backgroundColor: "#1e293b",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <ArtifactEmbed />
        </section>
      </main>
    </div>
  );
}
