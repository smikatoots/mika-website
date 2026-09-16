import type { Metadata } from "next";
import { Fragment } from "react";

import { Deck } from "@/components/deck/Deck";
import { Notes, OverlaySlide, TableSlide } from "@/components/deck/reveal-parts";
import { A, HL, ImageSlide } from "@/components/deck/slide-parts";
import { CtaSlide } from "@/components/deck/special-slides";
import type { SlideInput } from "@/components/deck/deck-slide";

export const metadata: Metadata = { title: "Open GTM seats and the catch" };

const LIB = "/decks/_library";

const slides: SlideInput[] = [
  // 1 — Cover: Open GTM seats. Raise date and the catch, on the next slides.
  {
    background: {
      // A real GTM/marketing job board, dimmed enough to take white type.
      image: `${LIB}/marketing-engineer-job-board.png`,
      size: "cover",
      opacity: 0.45,
    },
    content: (
      <Fragment key="cover">
        <OverlaySlide>
          Open GTM seats. And the <HL>catch</HL>.
        </OverlaySlide>
        <Notes>
          Open GTM seats. Raise date and the catch, on the next slides.
        </Notes>
      </Fragment>
    ),
  },

  // 2 — "Founding growth" on a job post is not the same as founding economics.
  //     Here is what is actually open.
  <Fragment key="founding-title">
    <ImageSlide
      src={`${LIB}/prompt-engineering.png`}
      alt="Job board listing: Founding Prompt Engineer, New York, hybrid, $105,000 to $145,000 a year"
      caption={
        <>
          &ldquo;Founding&rdquo; is a title, not <A>economics</A>.
        </>
      }
    />
    <Notes>
      &ldquo;Founding growth&rdquo; on a job post is not the same as founding
      economics. Here is what is actually open.
    </Notes>
  </Fragment>,

  // 3 — Owner.com. PMM, GTM and Launch. $240M on Aug 28 at a $2.3B valuation.
  //     Remote US and Canada. ~$155k–$165k plus pre-IPO equity.
  {
    background: {
      image: `${LIB}/home-productivity.jpg`,
      size: "cover",
      opacity: 0.45,
    },
    content: (
      <Fragment key="owner">
        <OverlaySlide>
          <HL>$240M</HL> raise. Not a founding seat.
        </OverlaySlide>
        <Notes>
          Owner dot com. PMM, GTM and Launch. They raised $240 million on
          August 28 at a $2.3 billion valuation. Remote US and Canada. About
          $155k to $165k plus pre-IPO equity. This is a scaled PMM seat, not
          zero to one. The raise is real. The title is not founding.
        </Notes>
      </Fragment>
    ),
  },

  // 4 — Hera. Founding Growth Marketer. NYC, in person. $150k–$250k plus
  //     equity. $27M Series A in June, Bain and Accel. Medicare-covered care.
  {
    background: {
      image: `${LIB}/doctor-with-patient.jpg`,
      size: "cover",
      opacity: 0.4,
    },
    content: (
      <Fragment key="hera">
        <OverlaySlide>
          Ownership, traded for an <HL>office</HL>.
        </OverlaySlide>
        <Notes>
          Hera. Founding Growth Marketer. NYC, in person. $150k to $250k plus
          equity. $27 million Series A in June, Bain and Accel.
          Medicare-covered care, not &ldquo;10x your personal brand.&rdquo; The
          trade is ownership for an office.
        </Notes>
      </Fragment>
    ),
  },

  // 5 — Pace. Founding Marketing Lead. NYC or London. Sequoia and Thrive, $46M
  //     Series B in May. Insurer AI. A small 5-day NYC team.
  {
    background: {
      image: `${LIB}/men-smoking-break.png`,
      size: "cover",
      opacity: 0.5,
    },
    content: (
      <Fragment key="pace">
        <OverlaySlide>
          High ownership. High <HL>commute</HL>.
        </OverlaySlide>
        <Notes>
          Pace. Founding Marketing Lead. NYC or London. Sequoia and Thrive, $46
          million Series B in May. Insurer AI. Listings still described a small
          5-day NYC team. High ownership. High commute.
        </Notes>
      </Fragment>
    ),
  },

  // 6 — Deepline. Founding Head of Growth. NYC. Closest to actual growth
  //     systems, not prompt theater. $3.3M raised, company-stated.
  {
    background: {
      image: `${LIB}/scattered-sales-tools.webp`,
      size: "cover",
      opacity: 0.4,
    },
    content: (
      <Fragment key="deepline">
        <OverlaySlide>
          Growth systems, not <HL>prompt theater</HL>.
        </OverlaySlide>
        <Notes>
          Deepline. Founding Head of Growth. NYC. Closest to actual growth
          systems, not prompt theater. They state $3.3 million raised. I could
          not independently date that round. Treat the number as
          company-stated.
        </Notes>
      </Fragment>
    ),
  },

  // 7 — If you want the new money and a remote week, Owner is the only one in
  //     this set that raised in the last 30 days and has an open GTM job.
  <Fragment key="compare">
    <TableSlide
      heading={
        <>
          New money, or a <A>founding</A> seat
        </>
      }
      reveal
      columns={["", "Raised", "The catch"]}
      rows={[
        ["Owner", "$240M · Aug 28", "Remote, not founding"],
        ["Hera", "$27M · June", "NYC, in person"],
        ["Pace", "$46M · May", "NYC or London"],
        ["Deepline", "$3.3M · stated", "NYC, date unverified"],
      ]}
    />
    <Notes>
      If you want the new money and a remote week, Owner is the only one in
      this set that raised in the last 30 days and has an open GTM job. If you
      want a founding seat, you are also choosing the office.
    </Notes>
  </Fragment>,

  // 8 — Title-rich, time-poor people lose years in "founding" roles that are
  //     just extra stakeholders.
  {
    background: {
      image: `${LIB}/puppet-strings.jpg`,
      size: "cover",
      opacity: 0.75,
    },
    content: (
      <Fragment key="stakeholders">
        <OverlaySlide>
          Ask what <HL>meetings</HL> you inherit.
        </OverlaySlide>
        <Notes>
          Title-rich, time-poor people lose years in &ldquo;founding&rdquo;
          roles that are just extra stakeholders. Ask what meetings you inherit
          before you ask what equity you get.
        </Notes>
      </Fragment>
    ),
  },

  // 9 — I built and sold a company, then chose a 2-person team on purpose.
  <Fragment key="two-person-team">
    <ImageSlide
      src={`${LIB}/mika-and-nick.jpeg`}
      alt="Mika and Nick, the two-person team behind King's Cross Labs"
      caption={
        <>
          Headcount never bought me a <A>Tuesday</A>
        </>
      }
    />
    <Notes>
      I built and sold a company, then chose a 2-person team on purpose.
      Headcount was never what bought me a Tuesday I actually wanted.
    </Notes>
  </Fragment>,

  // 10 — CTA: comment JOIN for the job links.
  <Fragment key="cta">
    <CtaSlide prompt="Comment" headline="JOIN" sub="for the job links." />
    <Notes>
      Save this one, and comment JOIN and I will send you the job links.
    </Notes>
  </Fragment>,
];

export default function OpenGtmSeatsDeckPage() {
  return <Deck slides={slides} />;
}
