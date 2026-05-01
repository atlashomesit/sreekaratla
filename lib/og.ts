import { ImageResponse } from "next/og";
import { createElement } from "react";

export const runtime = "edge";

const wrapperStyle: Record<string, string | number> = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  width: "100%",
  justifyContent: "space-between",
  background:
    "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #312E81 100%)",
  color: "#F8FAFC",
  padding: "72px 88px",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial'
};

const eyebrowStyle: Record<string, string | number> = {
  display: "flex",
  fontSize: 22,
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  color: "#A5B4FC",
  fontWeight: 600
};

const titleStyle: Record<string, string | number> = {
  display: "flex",
  fontSize: 64,
  fontWeight: 700,
  lineHeight: 1.12,
  marginTop: 24,
  letterSpacing: "-0.02em",
  color: "#F8FAFC",
  maxWidth: 1024
};

const footerStyle: Record<string, string | number> = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  fontSize: 26,
  color: "#CBD5E1"
};

const bylineStyle: Record<string, string | number> = {
  display: "flex",
  fontWeight: 600,
  color: "#F8FAFC"
};

const taglineStyle: Record<string, string | number> = {
  display: "flex",
  fontSize: 20,
  color: "#94A3B8"
};

export function ogImage(params?: {
  title?: string;
  eyebrow?: string;
  byline?: string;
}) {
  const rawTitle = params?.title?.trim() || "Sreekar Atla";
  const title =
    rawTitle.length > 130 ? `${rawTitle.slice(0, 127)}…` : rawTitle;
  const eyebrow = params?.eyebrow?.trim() || "sreekaratla.com";
  const byline =
    params?.byline?.trim() ||
    "Director — Enterprise Architect · Atlas founder";

  return new ImageResponse(
    createElement(
      "div",
      { style: wrapperStyle },
      createElement(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        createElement("div", { style: eyebrowStyle }, eyebrow),
        createElement("div", { style: titleStyle }, title)
      ),
      createElement(
        "div",
        { style: footerStyle },
        createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: 6 } },
          createElement("div", { style: bylineStyle }, "Sreekar Atla"),
          createElement("div", { style: taglineStyle }, byline)
        ),
        createElement(
          "div",
          { style: taglineStyle },
          "Tech · Hospitality · Leadership · Spirituality"
        )
      )
    ),
    { width: 1200, height: 630 }
  );
}
