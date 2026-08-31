/**
 * Middle dots are U+00B7. The trailing separator keeps the seam invisible.
 * Speed is set by `--sf-marquee-duration` in sparkform.css — it depends on this
 * string's length, so retune it if the wording changes.
 */
const PHRASE = "AMBITION · AI FOR LEVERAGE · TIME-RICH · TIME FREEDOM · ";

/** Four copies, so the track's `-50%` translate lands on an identical frame. */
const COPIES = 4;

export function SparkformMarquee() {
  return (
    <div className="w-full overflow-hidden bg-white py-6 md:py-8">
      <div className="sparkform-marquee-track" aria-hidden>
        {Array.from({ length: COPIES }, (_, index) => (
          <span
            key={index}
            className="shrink-0 select-none uppercase"
            style={{
              fontFamily: "var(--mr-font-display)",
              fontWeight: 800,
              color: "var(--sf-coral)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1,
              paddingRight: "0.25em",
            }}
          >
            {PHRASE}
          </span>
        ))}
      </div>
    </div>
  );
}
