import { CoverSlide, HL } from "@/components/deck/slide-parts";

const ACCENT = "#fd4869";
const INK = "#111111";

const TOTAL = 6;
/** Evenly spaced dot centres across the 900-wide viewBox. */
const XS = [90, 234, 378, 522, 666, 810];

/**
 * The shared "The AI Era Belongs to Women" cover diagram: a horizontal rail of
 * six numbered episode dots. Every episode but the current one is small,
 * outlined and faded; the current episode is large and filled salmon, with a
 * one-line description of that episode set underneath it.
 */
function EpisodeRail({ episode, description }: { episode: number; description: string }) {
  const current = XS[episode - 1];
  const isFinal = episode === TOTAL;

  return (
    <div className="deck-pop flex h-full w-full items-center justify-center p-4">
      <svg
        viewBox="0 0 900 250"
        className="h-auto w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--font-bricolage), system-ui, sans-serif"
        role="img"
        aria-label={`A rail of six episodes, with episode ${episode} highlighted: ${description}`}
      >
        {/* the connector line, drawn behind every dot */}
        <line
          x1={XS[0]}
          y1={110}
          x2={XS[TOTAL - 1]}
          y2={110}
          stroke={INK}
          strokeWidth={3}
          strokeLinecap="round"
        />

        {/* every episode except the current one */}
        {XS.map((x, i) =>
          i + 1 === episode ? null : (
            <g key={i} opacity={0.45}>
              <circle cx={x} cy={110} r={26} fill="#ffffff" stroke={INK} strokeWidth={3} />
              <text
                x={x}
                y={110}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={26}
                fontWeight={700}
                fill={INK}
              >
                {i + 1}
              </text>
            </g>
          ),
        )}

        {/* the current episode */}
        <circle cx={current} cy={110} r={52} fill={ACCENT} />
        <text
          x={current}
          y={110}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={46}
          fontWeight={700}
          fill="#ffffff"
        >
          {episode}
        </text>

        {/* the episode description, anchored under the highlighted dot but kept
            inside the viewBox so long descriptions never clip at either edge */}
        <text
          x={Math.min(Math.max(current, 200), 700)}
          y={215}
          textAnchor="middle"
          fontSize={40}
          fontWeight={700}
          fill={ACCENT}
        >
          {isFinal ? `FINAL — ${description}` : description}
        </text>
      </svg>
    </div>
  );
}

/**
 * The series cover slide, shared by every episode of "The AI Era Belongs to
 * Women". Only the highlighted episode number and its description change.
 */
export function SeriesCoverSlide({
  episode,
  description,
}: {
  episode: number;
  description: string;
}) {
  return (
    <CoverSlide
      title={
        <>
          The AI Era <HL>Belongs to Women</HL>
        </>
      }
      diagram={<EpisodeRail episode={episode} description={description} />}
    />
  );
}
