import React from "react";

const iframeStyles = {
  border: 0,
  width: "100%",
  height: "600px",
  display: "block",
};

export default function ArtifactEmbed() {
  return (
    <div style={{ width: "100%" }}>
      <iframe
        src="https://claude.site/public/artifacts/a5c62219-0083-4d5b-a503-bec663dccb5f/embed"
        title="Claude Artifact"
        width="100%"
        height="600"
        frameBorder="0"
        allow="clipboard-write"
        allowFullScreen
        style={iframeStyles}
      />
    </div>
  );
}
