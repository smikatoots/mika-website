"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
  "Brand partnerships",
  "Press",
  "Speaking",
  "AI Workshop",
] as const;

type InquiryType = (typeof INQUIRY_TYPES)[number];

const fieldLabel: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-eyebrow)",
  fontWeight: "var(--mr-weight-display)",
  color: "var(--mr-coral)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  marginBottom: "8px",
};

const fieldInput: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: "var(--mr-radius-input)",
  padding: "14px 16px",
  fontFamily: "var(--mr-font-body)",
  fontSize: "var(--mr-text-sm)",
  color: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

export function HomeContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState<InquiryType>("Brand partnerships");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `[mikareyes.com] ${inquiry} inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nInquiry Type: ${inquiry}\n\nMessage:\n${message}`;
    window.location.href = `mailto:mika@kingscrosslabs.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "var(--mr-radius-panel)",
          padding: "48px 40px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--mr-font-display)",
            fontSize: "var(--mr-text-h3)",
            fontWeight: "var(--mr-weight-display)",
            color: "#fff",
            marginBottom: "12px",
          }}
        >
          Opening your email client…
        </p>
        <p
          style={{
            fontFamily: "var(--mr-font-body)",
            fontSize: "var(--mr-text-sm)",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "28px",
          }}
        >
          Your message is pre-filled. Just hit send.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            fontFamily: "var(--mr-font-body)",
            fontSize: "var(--mr-text-sm)",
            fontWeight: "var(--mr-weight-semi)",
            color: "var(--mr-coral)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "var(--mr-radius-panel)",
        padding: "clamp(28px, 5vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" style={fieldLabel}>Name</label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={fieldInput}
          />
        </div>
        <div>
          <label htmlFor="contact-email" style={fieldLabel}>Email</label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={fieldInput}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-inquiry" style={fieldLabel}>Inquiry Type</label>
        <select
          id="contact-inquiry"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value as InquiryType)}
          style={{ ...fieldInput, cursor: "pointer" }}
        >
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t} style={{ background: "#1a0d14", color: "#fff" }}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" style={fieldLabel}>Message</label>
        <textarea
          id="contact-message"
          required
          rows={4}
          placeholder="A few sentences on what you have in mind, timing, and budget if relevant."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ ...fieldInput, resize: "vertical", minHeight: "100px" }}
        />
      </div>

      <button
        type="submit"
        className="mr-pressable"
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "var(--mr-coral)",
          color: "#fff",
          fontFamily: "var(--mr-font-body)",
          fontSize: "var(--mr-text-sm)",
          fontWeight: "var(--mr-weight-display)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "14px 28px",
          borderRadius: "var(--mr-radius-pill)",
          border: "none",
          cursor: "pointer",
          boxShadow: "var(--mr-shadow-cta)",
        }}
      >
        Send →
      </button>
    </form>
  );
}
