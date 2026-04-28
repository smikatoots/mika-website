---
name: hypermessage
description: Use the local Hypermessage CLI to gather recipient research, but only after you have confirmed the sender profile via the user's global USER.md. Use this skill when the user wants help writing direct outreach or intro-request messages.
---

# Hypermessage

Use this skill when the user wants a personalized outreach message, with or without live recipient research.

## Primary Rule

Confirm the sender profile before anything else. Do not start research, CLI preflight, or message drafting until you have a usable sender profile.

## Step 1: Confirm Sender Profile

1. Ask the user: **"Do you have a USER.md file already referenced in your CLAUDE.md?"**
2. If yes — read that file now. Use it as the sender profile for the rest of this session. Do not touch or rewrite it.
3. If no — ask the onboarding questions in `references/question-flow.md` and build the profile from their answers (keep it in memory for this session only; do not write a new file unless the user asks you to save it).
4. Read USER.md fresh every session. Do not rely on a cached or stale version.

## Step 2: Collect Recipient Inputs

After the sender profile is confirmed, gather:

- message type (direct outreach or intro request)
- relationship warmth (cold, warm, mutual connection)
- channel (LinkedIn DM, email, text)
- tone (casual, polished, confident, humble)
- goal or ask
- target name, LinkedIn URL, company hint, any notes
- how the sender found this person (directory, podcast, referral, search, etc.)
- existing draft if the user wants revision instead of a fresh message

## Step 3: Ask About Research

Ask the user: **"Do you want me to research their LinkedIn profile or company before writing? I can skip straight to the message if you prefer."**

- If yes — run the CLI research workflow below.
- If no — skip to Step 5 (Message Drafting) immediately.

## Step 4: CLI Research Workflow (Only If User Wants Research)

1. Always use the launcher inside this skill directory. Resolve commands relative to the directory containing this `SKILL.md` file.
2. The canonical command is `./bin/hypermessage` from the skill directory, or `./skills/hypermessage/bin/hypermessage` from the repo root.
3. Do not assume `hypermessage` is on the shell path.
4. Run `./bin/hypermessage prepare` before research.
5. If `prepare` recommends login, run `./bin/hypermessage auth login` and let the user finish sign-in in the opened browser window.
6. If `prepare` reports a stale or blocked profile, use `./bin/hypermessage auth reset`.
7. After preflight passes, call `./bin/hypermessage run` with a structured JSON payload.
8. If `run` returns a structured blocker, tell the user what needs attention and follow the `recommendedCommand` when present.
9. Treat the CLI output as a research bundle, not a draft. Use it in Step 5.

## Step 5: Message Drafting

Write the outreach message yourself using the sender profile and any research. Apply every principle in the **Writing Guidelines** section below.

Return one message by default. Only return variants when the user explicitly asks.

---

## Writing Guidelines

These principles apply to every message. Internalize them — do not mechanically check them off.

### 1. Establish Credibility

Pull the sender's strongest credibility signals from USER.md. Lead with the most relevant one given the recipient's world. Examples: Forbes 30 Under 30, fintech exit to a $3B acquirer, products scaled to millions of users, team background from LinkedIn / Airbnb / Google / Notion.

Don't dump all credentials. Pick the one or two that would mean the most to *this specific person*.

### 2. Make It Personal

Sound like you chose this person specifically, not like you sent 200 of these. Ways to do this:
- Reference how you actually found them (the Ordinal directory, their podcast, a Google search for real estate agents in Michigan because you have property there, a mutual friend)
- Find a point of commonality from their background or work (if research is available)
- If no research was done, lean into the specificity of *why* you're reaching out to someone in their role or space

### 3. Show Weakness (Genuine Curiosity, Not Fake Humility)

Signal that you're entering a space and genuinely need their expertise. This lowers defensiveness and makes the ask feel real. Something like: "We're exploring X and you're one of the people we most wanted to hear from" or "We're excited but stuck on where exactly to focus."

### 4. Praise Their Expertise

One genuine, specific compliment about what they've built, written, or know. Not generic ("you're amazing!") — something that shows you actually know who they are.

### 5. Keep It Brief

Short paragraphs. No filler. The full message should be readable in under 30 seconds. Cut anything that doesn't earn its place.

### 6. Make The Ask Clear

Always ask for a specific call — "30-minute call" or "20-minute chat." Never "pick your brain." The ask should be in the last line or second-to-last line, easy to find.

### 7. Offer Value

Give them a reason to say yes beyond just helping you. Offer something concrete, e.g.: "Happy to share an audit of how you can incorporate AI into your business — that's our wheelhouse." Match the offer to what would actually be useful given who they are.

---

## Example Of A Strong Cold Outreach

Use this as a calibration reference. Note: personal opening, specific credibility, genuine weakness signal, clear ask.

> Hi Tim!
>
> I found Inkcome & you through the Ordinal directory. Franny's a close friend (going to his wedding this wk!), so I trust the list he curated.
>
> I'm Mika, an exited founder (acquired by a $3B public co, raised ~$5M, f30u30) & exploring new ideas. My team has exp from LinkedIn, Airbnb, Google, Notion, etc.
>
> I'm speaking with agency founders to understand the flow from first meeting → proposal → signature: where it breaks, what's clunky, and whether tools like DocuSign are secretly hated.
>
> Would you be open to a quick 20-min chat? We're excited but stuck on where exactly to focus & your expertise could shape where we go next.
>
> Really appreciate it.

---

## Operational Constraints

1. The CLI owns browser automation, parsing, caching, and normalization.
2. The normal CLI flow returns structured research data, not message recommendations.
3. Do not invent selectors, browser steps, or source evidence.
4. Do not claim facts the research bundle did not return.

## Local References

1. Question order and required fields (if no USER.md): `references/question-flow.md`
2. Response formatting instructions: `references/output-patterns.md`

## Bundled CLI And Setup

1. Always invoke via `./bin/hypermessage` relative to the skill directory.
2. If executing from the repo root, use `./skills/hypermessage/bin/hypermessage`.
3. The launcher prefers the bundled `skills/hypermessage/hypermessage.mjs` when present.
4. Runtime requirements:
   - Node.js
   - a resolvable `playwright` package
   - Chromium installed for Playwright
5. If Playwright is not available: `npm install playwright` then `npx playwright install chromium`.
6. To refresh the bundled CLI after source changes: `npm run build:skill`.
