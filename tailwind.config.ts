import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        brand: {
          bg: "hsl(var(--brand-bg))",
          fg: "hsl(var(--brand-fg))",
          ring: "hsl(var(--brand-ring))"
        },
        tech: { DEFAULT: "hsl(var(--tech))" },
        hospitality: { DEFAULT: "hsl(var(--hospitality))" },
        leadership: { DEFAULT: "hsl(var(--leadership))" },
        spirituality: { DEFAULT: "hsl(var(--spirituality))" }
      },
      fontFamily: {
        sans: ["Inter", "var(--font-sans)", "system-ui"],
        serif: ["EB Garamond", "var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "hsl(var(--foreground))",
            a: {
              color: "hsl(var(--accent))",
              "&:hover": {
                color: "hsl(var(--accent))"
              }
            },
            // rehype-autolink-headings wraps h1-h6 text in an <a href="#slug"> for
            // deep-linking. Without this, that anchor inherits the rule above and every
            // heading looks like a clickable inline link. Keep headings reading as
            // headings; the underline only appears on hover as a "you can link here" cue.
            "h1 a, h2 a, h3 a, h4 a, h5 a, h6 a": {
              color: "inherit",
              fontWeight: "inherit",
              textDecoration: "none",
              "&:hover": {
                color: "inherit",
                textDecoration: "underline",
                textDecorationColor: "hsl(var(--accent))"
              }
            }
          }
        }
      }
    }
  },
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    })
  ]
} satisfies Config;
