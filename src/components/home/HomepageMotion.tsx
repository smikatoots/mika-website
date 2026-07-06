"use client";

import { useEffect } from "react";

/**
 * Homepage motion layer — a purely additive, progressive-enhancement layer of
 * cursor interaction, physics, and easter eggs. It changes no content or layout:
 * if this never runs, the page looks and behaves exactly as it does statically.
 *
 * Ported from the approved design prototype (design_handoff_homepage_animations).
 * The imperative DOM/animation code lives here rather than in React render, but
 * it is mounted from a client component, gated behind prefers-reduced-motion +
 * pointer:fine, and fully cleaned up on unmount.
 */

const COLORS = ["#E8425A", "#0E8C8C", "#FBD7DC", "#FF3D68", "#6B4DE6", "#FFC53D"];
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#·✦";
const AWARD_EMOJI = ["🏆", "✦", "🌱", "🚀"];

export function HomepageMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip pointer-based effects on touch devices — the static page is the baseline.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const cleanups: Array<() => void> = [];

    // Listener helper that auto-registers its own teardown.
    const on = <K extends keyof DocumentEventMap>(
      target: EventTarget,
      type: K | string,
      handler: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, opts);
      cleanups.push(() => target.removeEventListener(type, handler, opts));
    };

    // A single fixed, non-interactive layer holds every transient particle,
    // the cursor dot, and toasts. Removing it on cleanup removes them all.
    const fx = document.createElement("div");
    fx.style.cssText =
      "position:fixed; inset:0; pointer-events:none; z-index:9999; overflow:hidden;";
    document.body.appendChild(fx);
    cleanups.push(() => fx.remove());

    /* ── 1. Sparkle cursor trail ─────────────────────────────── */
    let lastSparkle = 0;
    on(document, "mousemove", (event) => {
      const e = event as MouseEvent;
      const now = Date.now();
      if (now - lastSparkle < 60) return;
      lastSparkle = now;
      const s = document.createElement("span");
      s.textContent = Math.random() < 0.5 ? "✦" : "✧";
      const size = 8 + Math.random() * 10;
      s.style.cssText =
        "position:fixed; left:" +
        e.clientX +
        "px; top:" +
        e.clientY +
        "px; font-size:" +
        size +
        "px; color:" +
        COLORS[Math.floor(Math.random() * COLORS.length)] +
        "; pointer-events:none; z-index:9999; --dx:" +
        (Math.random() - 0.5) * 60 +
        "px; --dy:" +
        (20 + Math.random() * 50) +
        "px; animation:pp-sparkle 0.9s ease-out forwards;";
      fx.appendChild(s);
      window.setTimeout(() => s.remove(), 950);
    });

    /* ── 3. Confetti (bigger, slower, floatier — do not speed up) ── */
    function confetti(x: number, y: number, rain: boolean) {
      for (let i = 0; i < 90; i++) {
        const p = document.createElement("div");
        const w = 9 + Math.random() * 11;
        const h = 7 + Math.random() * 9;
        const px0 = rain ? Math.random() * window.innerWidth : x;
        const py0 = rain ? -20 : y;
        p.style.cssText =
          "position:fixed; left:" +
          px0 +
          "px; top:" +
          py0 +
          "px; width:" +
          w +
          "px; height:" +
          h +
          "px; background:" +
          COLORS[Math.floor(Math.random() * COLORS.length)] +
          "; pointer-events:none; z-index:9999; border-radius:" +
          (Math.random() < 0.35 ? "50%" : "2px") +
          ";";
        fx.appendChild(p);
        const ang = Math.random() * Math.PI * 2;
        const sp = rain ? 0 : 2.5 + Math.random() * 4.5;
        let vx = Math.cos(ang) * sp;
        let vy = rain ? 1.5 + Math.random() * 2.5 : Math.sin(ang) * sp - 5;
        let pxx = 0;
        let pyy = 0;
        let rot = Math.random() * 360;
        const rv = (Math.random() - 0.5) * 10;
        let life = 0;
        let sway = Math.random() * Math.PI * 2;
        const total = 170;
        const tick = () => {
          vy += 0.16;
          vy = Math.min(vy, 5);
          vx *= 0.99;
          sway += 0.06;
          pxx += vx + Math.sin(sway) * 0.6;
          pyy += vy;
          rot += rv;
          life++;
          p.style.transform =
            "translate(" + pxx + "px," + pyy + "px) rotate(" + rot + "deg)";
          p.style.opacity = String(Math.max(0, 1 - life / total));
          if (life < total && py0 + pyy < window.innerHeight + 40)
            requestAnimationFrame(tick);
          else p.remove();
        };
        requestAnimationFrame(tick);
      }
    }
    on(document, "click", (event) => {
      const target = event.target as Element | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.indexOf("#contact") === 0 || href.indexOf("mailto:") === 0)
        confetti((event as MouseEvent).clientX, (event as MouseEvent).clientY, false);
    });

    /* ── 4. Draggable + spring-home Speaking rows ────────────── */
    const dragZone = document.querySelector<HTMLElement>("[data-drag-zone]");
    if (dragZone) {
      Array.prototype.slice.call(dragZone.children).forEach((row: HTMLElement) => {
        let x = 0;
        let y = 0;
        let vx = 0;
        let vy = 0;
        let dragging = false;
        let lx = 0;
        let ly = 0;
        let raf: number | null = null;
        row.style.position = "relative";
        row.style.zIndex = "5";
        // Reset any mutations this row picks up so unmount leaves it pristine.
        cleanups.push(() => {
          if (raf) cancelAnimationFrame(raf);
          row.style.transform = "";
          row.style.transition = "";
          row.style.position = "";
          row.style.zIndex = "";
        });
        const loop = () => {
          if (!dragging) {
            vx += -x * 0.08;
            vy += -y * 0.08;
            vx *= 0.88;
            vy *= 0.88;
            x += vx;
            y += vy;
            if (
              Math.abs(x) < 0.5 &&
              Math.abs(y) < 0.5 &&
              Math.abs(vx) < 0.5 &&
              Math.abs(vy) < 0.5
            ) {
              x = y = vx = vy = 0;
              row.style.transform = "";
              row.style.transition = "";
              raf = null;
              return;
            }
          }
          row.style.transform =
            "translate(" + x + "px," + y + "px) rotate(" + x * 0.08 + "deg)";
          raf = requestAnimationFrame(loop);
        };
        on(row, "pointerdown", (event) => {
          const e = event as PointerEvent;
          e.preventDefault();
          dragging = true;
          lx = e.clientX;
          ly = e.clientY;
          // Disable CSS hover transition so physics wins.
          row.style.transition = "none";
          row.setPointerCapture(e.pointerId);
          if (!raf) raf = requestAnimationFrame(loop);
        });
        on(row, "pointermove", (event) => {
          if (!dragging) return;
          const e = event as PointerEvent;
          vx = e.clientX - lx;
          vy = e.clientY - ly;
          x += vx;
          y += vy;
          lx = e.clientX;
          ly = e.clientY;
        });
        const release = () => {
          if (!dragging) return;
          dragging = false;
          vx *= 1.6;
          vy *= 1.6;
          if (!raf) raf = requestAnimationFrame(loop);
        };
        on(row, "pointerup", release);
        on(row, "pointercancel", release);
        // Suppress navigation if the row was actually dragged.
        on(row, "click", (event) => {
          if (Math.abs(x) > 4 || Math.abs(y) > 4) event.preventDefault();
        });
      });
    }

    /* ── 2. Custom cursor dot (no ring; native cursor kept) ──── */
    const dot = document.createElement("div");
    dot.style.cssText =
      "position:fixed; width:8px; height:8px; border-radius:50%; background:#E8425A; pointer-events:none; z-index:10001; transform:translate(-50%,-50%); left:-99px; top:-99px;";
    fx.appendChild(dot);
    on(document, "mousemove", (event) => {
      const e = event as MouseEvent;
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    });

    /* ── 5. Magnetic pill buttons ────────────────────────────── */
    function magnetize(el: HTMLElement) {
      on(el, "mousemove", (event) => {
        const e = event as MouseEvent;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + dx * 0.28 + "px," + dy * 0.34 + "px)";
        el.style.transition = "transform 0.08s linear";
      });
      on(el, "mouseleave", () => {
        el.style.transition = "transform 0.45s cubic-bezier(.2,1.6,.3,1)";
        el.style.transform = "translate(0,0)";
      });
      cleanups.push(() => {
        el.style.transform = "";
        el.style.transition = "";
      });
    }

    /* ── 6. 3D tilt on the hero photo ────────────────────────── */
    function tilt(el: HTMLElement) {
      const wrap = el.parentElement;
      if (!wrap) return;
      const prevPerspective = wrap.style.perspective;
      wrap.style.perspective = "700px";
      on(wrap, "mousemove", (event) => {
        const e = event as MouseEvent;
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "rotateY(" + px * 18 + "deg) rotateX(" + -py * 14 + "deg) scale(1.04)";
        el.style.transition = "transform 0.08s linear";
      });
      on(wrap, "mouseleave", () => {
        el.style.transition = "transform 0.6s cubic-bezier(.2,.8,.3,1)";
        el.style.transform = "rotateY(0) rotateX(0) scale(1)";
      });
      cleanups.push(() => {
        wrap.style.perspective = prevPerspective;
        el.style.transform = "";
        el.style.transition = "";
      });
    }

    /* ── 7. Spotlight on dark sections ───────────────────────── */
    function spotlight(sec: HTMLElement) {
      const ov = document.createElement("div");
      ov.style.cssText =
        "position:absolute; inset:0; pointer-events:none; z-index:3; opacity:0; transition:opacity 0.3s; background:radial-gradient(circle 220px at 50% 50%, rgba(255,235,190,0.14), transparent 70%);";
      const prevPosition = sec.style.position;
      sec.style.position = "relative";
      sec.appendChild(ov);
      on(sec, "mousemove", (event) => {
        const e = event as MouseEvent;
        const r = sec.getBoundingClientRect();
        ov.style.opacity = "1";
        ov.style.background =
          "radial-gradient(circle 220px at " +
          (e.clientX - r.left) +
          "px " +
          (e.clientY - r.top) +
          "px, rgba(255,235,190,0.14), transparent 70%)";
      });
      on(sec, "mouseleave", () => {
        ov.style.opacity = "0";
      });
      cleanups.push(() => {
        ov.remove();
        sec.style.position = prevPosition;
      });
    }

    /* ── 8. Hover text scramble (name + nav links) ───────────── */
    function scramble(el: HTMLElement) {
      // Only scramble pure-text nodes so nested markup is never destroyed.
      if (el.children.length > 0) return;
      const orig = el.textContent || "";
      let running = false;
      on(el, "mouseenter", () => {
        if (running) return;
        running = true;
        let frame = 0;
        const total = orig.length * 3 + 10;
        const step = () => {
          let out = "";
          for (let i = 0; i < orig.length; i++) {
            if (i < frame / 3) out += orig[i];
            else if (orig[i] === " ") out += " ";
            else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          el.textContent = out;
          frame++;
          if (frame <= total) requestAnimationFrame(step);
          else {
            el.textContent = orig;
            running = false;
          }
        };
        step();
      });
      cleanups.push(() => {
        el.textContent = orig;
      });
    }

    /* ── 9. Press-logo marquee ("Featured in") ───────────────── */
    const pressRow = document.querySelector<HTMLElement>("[data-press-row]");
    if (pressRow && pressRow.parentElement) {
      const pressParent = pressRow.parentElement;
      const outer = document.createElement("div");
      outer.style.cssText = "overflow:hidden; width:100%;";
      const track = document.createElement("div");
      track.style.cssText =
        "display:flex; align-items:center; width:max-content; animation:ke-marquee 22s linear infinite;";
      const items = Array.prototype.slice.call(pressRow.children) as HTMLElement[];
      // Two identical groups with per-group trailing padding make the -50%
      // wrap seamless. Do not collapse to a single flex+gap — it glitches.
      for (let c = 0; c < 2; c++) {
        const group = document.createElement("div");
        group.style.cssText =
          "display:flex; align-items:center; gap:56px; padding-right:56px; flex-shrink:0;";
        items.forEach((it) => {
          const clone = it.cloneNode(true) as HTMLElement;
          clone.style.flexShrink = "0";
          group.appendChild(clone);
        });
        track.appendChild(group);
      }
      outer.appendChild(track);
      pressParent.replaceChild(outer, pressRow);
      on(outer, "mouseenter", () => {
        track.style.animationPlayState = "paused";
      });
      on(outer, "mouseleave", () => {
        track.style.animationPlayState = "running";
      });
      // Restore the original row on unmount.
      cleanups.push(() => {
        if (outer.parentElement === pressParent) pressParent.replaceChild(pressRow, outer);
      });
    }

    /* ── 10. Press rows stagger-in ───────────────────────────── */
    const gridRows: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("main a").forEach((r) => {
      if (getComputedStyle(r).display === "grid") gridRows.push(r);
    });
    if (gridRows.length) {
      gridRows.forEach((r) => {
        r.style.opacity = "0";
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const idx = gridRows.indexOf(en.target as HTMLElement);
            (en.target as HTMLElement).style.animation =
              "ke-ticker-in 0.6s cubic-bezier(.2,.8,.3,1) " + idx * 0.12 + "s both";
            io.unobserve(en.target);
          });
        },
        { threshold: 0.3 },
      );
      gridRows.forEach((r) => io.observe(r));
      cleanups.push(() => {
        io.disconnect();
        gridRows.forEach((r) => {
          r.style.opacity = "";
          r.style.animation = "";
        });
      });
    }

    /* ── Toast helper (easter-egg feedback) ──────────────────── */
    function toast(msg: string) {
      const t = document.createElement("div");
      t.textContent = msg;
      t.style.cssText =
        "position:fixed; bottom:28px; left:50%; transform:translate(-50%,80px); background:#142A2A; color:#FFFFFF; font-family:var(--mr-font-body,'Hanken Grotesk',sans-serif); font-size:15px; font-weight:600; padding:14px 26px; border-radius:100px; z-index:10002; box-shadow:0 16px 40px -10px rgba(0,0,0,.4); animation:ea-toast 3s cubic-bezier(.2,.8,.3,1) forwards; pointer-events:none;";
      fx.appendChild(t);
      window.setTimeout(() => t.remove(), 3100);
    }

    /* ── 12a. Party mode: triple-click the header logo ───────── */
    const logo = document.querySelector<HTMLImageElement>("header img");
    if (logo) {
      const logoLink = logo.closest("a") || logo.parentElement;
      logo.style.cursor = "pointer";
      let clicks = 0;
      let logoTimer: number | null = null;
      let party = false;
      if (logoLink) {
        on(logoLink, "click", (event) => {
          clicks++;
          if (logoTimer) clearTimeout(logoTimer);
          logoTimer = window.setTimeout(() => {
            clicks = 0;
          }, 600);
          if (clicks >= 3) {
            // Only swallow the navigation on the toggling click, so a normal
            // single click on the logo still works.
            event.preventDefault();
            clicks = 0;
            party = !party;
            if (party) {
              document.body.style.animation = "ea-rainbow 4s linear infinite";
              logo.style.animation = "ea-spin 1s linear infinite";
              confetti(0, 0, true);
              toast("🎉 PARTY MODE ON — triple-click the logo to stop");
            } else {
              document.body.style.animation = "";
              logo.style.animation = "";
              toast("Party over. Back to work 😌");
            }
          }
        });
      }
      cleanups.push(() => {
        if (logoTimer) clearTimeout(logoTimer);
        document.body.style.animation = "";
        logo.style.animation = "";
        logo.style.cursor = "";
      });
    }

    /* ── 12b. Gravity collapse: type "drop" ──────────────────── */
    // Track the elements we mutate so "drop" again restores instead of reloading.
    let fallen = false;
    let fallenEls: HTMLElement[] = [];
    function gravity() {
      if (fallen) {
        fallenEls.forEach((el) => {
          el.style.transition = "";
          el.style.transform = "";
          el.style.opacity = "";
        });
        fallenEls = [];
        fallen = false;
        return;
      }
      fallen = true;
      toast('🕳 Gravity engaged… type "drop" again to restore');
      const els = document.querySelectorAll<HTMLElement>(
        "main h1, main h2, main p, main a, main img, main span",
      );
      fallenEls = Array.prototype.slice
        .call(els)
        .filter((el: HTMLElement) => el.children.length === 0 || el.tagName === "A")
        .slice(0, 80);
      fallenEls.forEach((el) => {
        const d = 400 + Math.random() * 900;
        const r = (Math.random() - 0.5) * 60;
        el.style.transition =
          "transform 1.4s cubic-bezier(.5,0,1,.6) " +
          Math.random() * 0.8 +
          "s, opacity 1.4s ease " +
          Math.random() * 0.8 +
          "s";
        el.style.transform = "translateY(" + d + "px) rotate(" + r + "deg)";
        el.style.opacity = "0.15";
      });
    }
    cleanups.push(() => {
      fallenEls.forEach((el) => {
        el.style.transition = "";
        el.style.transform = "";
        el.style.opacity = "";
      });
    });

    /* ── 12c. Typed secret codes: "drop" + "mika" ────────────── */
    let buf = "";
    on(document, "keypress", (event) => {
      const e = event as KeyboardEvent;
      buf = (buf + e.key).slice(-6);
      if (buf.slice(-4) === "drop") {
        buf = "";
        gravity();
      }
      if (buf.slice(-4) === "mika") {
        buf = "";
        toast("💖 You found the secret!");
        for (let i = 0; i < 40; i++) {
          const h = document.createElement("span");
          h.textContent = ["💖", "💕", "✨", "🌸"][Math.floor(Math.random() * 4)];
          h.style.cssText =
            "position:fixed; left:" +
            Math.random() * window.innerWidth +
            "px; top:-30px; font-size:" +
            (16 + Math.random() * 20) +
            "px; z-index:10001; pointer-events:none;";
          fx.appendChild(h);
          const vy = 1.5 + Math.random() * 3;
          let y = -30;
          let sway = Math.random() * Math.PI * 2;
          const tick = () => {
            y += vy;
            sway += 0.05;
            h.style.transform = "translate(" + Math.sin(sway) * 30 + "px," + y + "px)";
            if (y < window.innerHeight + 40) requestAnimationFrame(tick);
            else h.remove();
          };
          tick();
        }
      }
    });

    /* ── 11. Award chip emoji multiply ───────────────────────── */
    document.querySelectorAll<HTMLElement>("[data-award-emoji]").forEach((s) => {
      const glyph = (s.textContent || "").trim();
      if (AWARD_EMOJI.indexOf(glyph) === -1) return;
      on(s, "click", (event) => {
        const e = event as MouseEvent;
        e.preventDefault();
        e.stopPropagation();
        for (let i = 0; i < 10; i++) {
          const c = document.createElement("span");
          c.textContent = glyph;
          c.style.cssText =
            "position:fixed; left:" +
            e.clientX +
            "px; top:" +
            e.clientY +
            "px; font-size:" +
            (14 + Math.random() * 22) +
            "px; z-index:10001; pointer-events:none;";
          fx.appendChild(c);
          const ang = Math.random() * Math.PI * 2;
          const sp = 4 + Math.random() * 8;
          const vx = Math.cos(ang) * sp;
          let vy = Math.sin(ang) * sp - 6;
          let x = 0;
          let y = 0;
          let life = 0;
          const tick = () => {
            vy += 0.4;
            x += vx;
            y += vy;
            life++;
            c.style.transform = "translate(" + x + "px," + y + "px)";
            c.style.opacity = String(Math.max(0, 1 - life / 60));
            if (life < 60) requestAnimationFrame(tick);
            else c.remove();
          };
          tick();
        }
      });
    });

    /* ── Hover / cursor feature wiring ───────────────────────── */
    document.querySelectorAll<HTMLElement>("a").forEach((a) => {
      if (a.closest("[data-awards]")) return; // award chips have their own physics
      if (getComputedStyle(a).borderRadius === "100px") magnetize(a);
    });
    const heroPhoto = document.querySelector<HTMLElement>("[data-hero-photo]");
    if (heroPhoto) tilt(heroPhoto);
    document.querySelectorAll<HTMLElement>("main section").forEach((sec) => {
      if (getComputedStyle(sec).backgroundColor === "rgb(20, 42, 42)") spotlight(sec);
    });
    const h1 = document.querySelector<HTMLElement>("h1");
    if (h1) scramble(h1);
    document.querySelectorAll<HTMLElement>("nav a").forEach(scramble);

    /* ── 12d. Hint pill (interactive; its own tracked node) ──── */
    const hint = document.createElement("div");
    hint.textContent = "🎮 psst… this page has secrets";
    hint.style.cssText =
      "position:fixed; bottom:20px; right:20px; background:#FFFFFF; border:1.5px solid #E0DBD3; color:#4A4A4A; font-family:var(--mr-font-body,'Hanken Grotesk',sans-serif); font-size:12px; font-weight:600; padding:8px 14px; border-radius:100px; z-index:9999; box-shadow:0 8px 20px -8px rgba(0,0,0,.25); cursor:pointer; animation:ea-wiggle 2.5s ease-in-out infinite;";
    on(hint, "click", () => {
      toast(
        'Try: triple-click the logo · type "mika" · type "drop" · click award emoji · drag the Speaking rows',
      );
    });
    document.body.appendChild(hint);
    cleanups.push(() => hint.remove());

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {
          /* best-effort teardown */
        }
      });
    };
  }, []);

  return null;
}
