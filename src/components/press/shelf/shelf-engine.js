/*
 * Press shelf: a port of ThreeUI's "Complete Shelf" landing page
 * (complete-shelf-v2.html, Three.js r165) as a mountable module.
 *
 * The shelf carousel, hover crack, open/close transitions, drag-to-open cover,
 * flexible page physics, orbit inspection and keyboard model are the source's,
 * kept as authored. What changed, and why:
 *
 * - Books are press volumes (src/lib/press/shelf-volumes.ts) and every spread
 *   is one clipping. Cloth, foil and type use BRAND.md colours and the site's
 *   fonts (Satoshi, Hanken Grotesk), read from the next/font CSS
 *   variables so the canvas draws with the exact faces the page uses. There
 *   is no monospace anywhere: labels use Hanken, as the site's eyebrows do.
 * - The room is transparent (shadow-only planes) so the page's warm linen is
 *   the backdrop, and the walnut shelf is charcoal. No external textures.
 * - Interior pages are built only for the book being read and released when
 *   it goes back on the shelf, with clipping images loaded on demand through
 *   the Next image optimizer.
 * - It lives inside a scrolling page, not a fixed viewport: vertical wheel and
 *   touch scroll the page, horizontal wheel or drag moves the shelf, arrow keys
 *   act only while the shelf is on screen, and rendering pauses off screen.
 */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

const ROOM = {
  ink: "#000000",
  charcoal: "#2F2C29",
  muted: "#6E655C",
  line: "#D9CFC2",
  linen: "#F1E8DE",
  paper: "#FBF8F5",
};

export function mountPressShelf(root, BOOKS) {
  const el = (name) => root.querySelector(`[data-shelf-el="${name}"]`);
  const experience = root;
  const canvas = el("canvas");
  const loading = el("loading");
  const fallbackStatus = el("fallback-status");
  const browseUi = el("browse");
  const detailPanel = el("detail");
  const selectionTitle = el("selection-title");
  const selectionNote = el("selection-note");
  const counter = el("counter");
  const markerButtons = [...root.querySelectorAll("[data-shelf-marker]")];
  const previousButton = el("previous");
  const nextButton = el("next");
  const inspectButton = el("inspect");
  const closeButton = el("close");
  const openBookButton = el("open-book");
  const pageReading = el("page-reading");
  const previousPageButton = el("previous-page");
  const nextPageButton = el("next-page");
  const pageLabel = el("page-label");
  const pageCounter = el("page-counter");
  const itemLink = el("item-link");
  const detailEyebrow = el("detail-eyebrow");
  const detailTitle = el("detail-title");
  const detailDeck = el("detail-deck");
  const detailPieces = el("detail-pieces");
  const detailFormats = el("detail-formats");
  const detailOutlets = el("detail-outlets");
  const liveRegion = el("live");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const rootStyle = getComputedStyle(document.documentElement);
  const fontStack = (variable, fallback) => {
    const family = rootStyle.getPropertyValue(variable).trim();
    return family ? `${family}, ${fallback}` : fallback;
  };
  const DISPLAY = fontStack("--font-satoshi", "ui-sans-serif, system-ui, sans-serif");
  const BODY = fontStack("--font-hanken", "ui-sans-serif, system-ui, sans-serif");

  const clamp = THREE.MathUtils.clamp;
  const damp = THREE.MathUtils.damp;
  const lerp = THREE.MathUtils.lerp;
  const smoothstep = (value) => value * value * (3 - 2 * value);
  const smootherstep = (value) => (
    value * value * value * (value * (value * 6 - 15) + 10)
  );
  const mod = (value, length) => ((value % length) + length) % length;
  const pad = (value) => String(value).padStart(2, "0");

  let reducedMotion = reducedMotionQuery.matches;
  let renderer;
  let scene;
  let camera;
  let controls;
  let environmentTarget;
  let shelfStage;
  let bookRigs = [];
  let hitTargets = [];
  let rafId = 0;
  let lastTime = performance.now();
  let mode = "hero";
  let transitionTime = 0;
  let position = 0;
  let targetPosition = 0;
  let selectedIndex = 0;
  let hoveredIndex = -1;
  let wheelIdle = 0;
  let focusReturnTarget = inspectButton;
  let activeBook = null;
  let readingOpen = false;
  let detailBookHovered = false;
  let currentSpread = 0;
  let pointerDirty = false;
  let disposed = false;
  let pageHidden = document.hidden;
  let onScreen = true;
  let inViewport = true;
  let suspended = pageHidden;
  let viewWidth = root.clientWidth || window.innerWidth;
  let viewHeight = root.clientHeight || window.innerHeight;
  let detailViewOffsetX = 0;
  let currentViewOffsetX = 0;
  let detailViewOffsetY = 0;
  let currentViewOffsetY = 0;
  let detailSafeWidth = viewWidth * 0.6;
  let themeInitialized = false;
  let themeMoving = false;
  let resizeObserver = null;
  let intersectionObserver = null;

  const roomMaterials = {
    shelf: null,
    shelfDark: null,
    shadow: null
  };
  const roomLights = {
    hemisphere: null,
    key: null,
    softKey: null,
    fill: null,
    rim: null,
    backFill: null,
    spineRake: null,
    pageRake: null
  };
  const themeTargets = {
    shelf: new THREE.Color(ROOM.charcoal),
    shelfDark: new THREE.Color(ROOM.charcoal),
    shadow: new THREE.Color(ROOM.charcoal),
    fog: new THREE.Color(ROOM.linen),
    hemisphere: new THREE.Color(ROOM.paper),
    hemisphereGround: new THREE.Color(ROOM.muted),
    key: new THREE.Color(0xffffff),
    fill: new THREE.Color(0xf4f6f7),
    rim: new THREE.Color(ROOM.line)
  };

  const pointer = {
    ndc: new THREE.Vector2(3, 3),
    clientX: 0,
    clientY: 0
  };
  const pageDrag = {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    progress: 0,
    peakProgress: 0,
    committed: false,
    progressVelocity: 0,
    verticalBias: 0,
    lastProgress: 0,
    lastTime: 0,
    direction: 0,
    kind: null
  };
  const detailPress = {
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    moved: false,
    allowClick: false
  };
  // Shelf drag (pointer and touch) replaces the source's full-window wheel
  // capture, which would trap page scroll here.
  const shelfDrag = {
    active: false,
    dragging: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startPosition: 0,
    suppressClick: false
  };

  const raycaster = new THREE.Raycaster();
  const shelfCameraPosition = new THREE.Vector3();
  const shelfCameraTarget = new THREE.Vector3();
  const inspectPosition = new THREE.Vector3();
  const inspectCameraPosition = new THREE.Vector3();
  const inspectCameraTarget = new THREE.Vector3();
  const transitionCameraTarget = new THREE.Vector3();
  const openingBookPosition = new THREE.Vector3();
  const openingBookQuaternion = new THREE.Quaternion();
  const openingBookScale = new THREE.Vector3();
  const openingMotionPosition = new THREE.Vector3();
  const openingMotionQuaternion = new THREE.Quaternion();
  const restingMotionPosition = new THREE.Vector3();
  const restingMotionQuaternion = new THREE.Quaternion();
  const openingCameraPosition = new THREE.Vector3();
  const openingCameraTarget = new THREE.Vector3();
  const openingShelfPosition = new THREE.Vector3();
  const inspectShelfPosition = new THREE.Vector3(0, -4.2, -3);
  // The source tilts the open book (0.055, -0.14) for drama; press pages are
  // for reading, so the book faces the viewer square on.
  const inspectBookQuaternion = new THREE.Quaternion();
  const inspectBookScale = new THREE.Vector3();
  const closingBookPosition = new THREE.Vector3();
  const closingBookStartPosition = new THREE.Vector3();
  const closingBookStartQuaternion = new THREE.Quaternion();
  const closingBookStartScale = new THREE.Vector3();
  const closingBookQuaternion = new THREE.Quaternion();
  const closingBookScale = new THREE.Vector3(1.09, 1.09, 1.09);
  const closingMotionPosition = new THREE.Vector3();
  const closingMotionQuaternion = new THREE.Quaternion();
  const closingCameraPosition = new THREE.Vector3();
  const closingCameraTarget = new THREE.Vector3();
  const closingShelfPosition = new THREE.Vector3();
  const shelfRestPosition = new THREE.Vector3();
  const shelfBoardTop = 0.47;
  const spacing = 1.5;
  const FLEXIBLE_PAGE_SEGMENTS = 18;
  const FLEXIBLE_PAGE_VERTICAL_SEGMENTS = 8;
  const PAGE_TURN_COMMIT_PROGRESS = 0.18;
  const COVER_OPEN_COMMIT_PROGRESS = 0.16;
  const COVER_CLOSE_COMMIT_PROGRESS = 0.2;
  const DETAIL_TRANSITION_DURATION = 0.92;
  const SHELF_EXPOSURE = 0.7;
  const READING_EXPOSURE = 0.64;
  const SHELF_TRANSITION_DURATION = 0.92;
  let openingViewOffsetX = 0;
  let closingViewOffsetX = 0;

  // The source fixes four turnable leaves per book. Here a volume has one
  // spread per clipping plus its title page, so the count varies by book.
  const spreadCount = (rig) => rig.data.items.length + 1;

  const shared = {
    box: new THREE.BoxGeometry(1, 1, 1),
    plane: new THREE.PlaneGeometry(1, 1),
    page: new THREE.MeshPhysicalMaterial({
      color: 0xe7dfcf,
      roughness: 0.95,
      metalness: 0,
      sheen: 0.025,
      sheenRoughness: 1
    }),
    pageSheet: new THREE.MeshPhysicalMaterial({
      color: 0xf4eee4,
      roughness: 0.955,
      metalness: 0,
      sheen: 0.02,
      sheenRoughness: 1,
      side: THREE.DoubleSide
    }),
    headband: new THREE.MeshPhysicalMaterial({
      color: 0xd9cfc2,
      roughness: 0.58,
      metalness: 0.16,
      sheen: 0.14,
      sheenRoughness: 0.76
    }),
    walnut: new THREE.MeshStandardMaterial({
      color: ROOM.charcoal,
      roughness: 0.62,
      metalness: 0
    }),
    walnutDark: new THREE.MeshStandardMaterial({
      color: ROOM.charcoal,
      roughness: 0.78,
      metalness: 0
    })
  };

  function createFadeMaterial(baseMaterial) {
    const material = baseMaterial.clone();
    material.transparent = true;
    material.opacity = 1;
    return material;
  }

  function hashSeed(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value += 0x6d2b79f5;
      let result = value;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function isDarkColor(hex) {
    const color = new THREE.Color(hex);
    return color.r * 0.299 + color.g * 0.587 + color.b * 0.114 < 0.45;
  }

  /* Cut-paper motifs from the site's confetti layer, one per volume, in place
     of the source's tool glyphs. */
  function drawMotif(ctx, book, width, height, color = book.foil) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = Math.max(4, width * 0.008);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = 0.9;
    const centerX = width * 0.5;
    const centerY = height * 0.38;
    const size = Math.min(width, height) * 0.22;

    if (book.motif === "sparkle") {
      const star = (x, y, r) => {
        ctx.beginPath();
        ctx.moveTo(x, y - r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.quadraticCurveTo(x, y, x, y + r);
        ctx.quadraticCurveTo(x, y, x - r, y);
        ctx.quadraticCurveTo(x, y, x, y - r);
        ctx.fill();
      };
      star(centerX, centerY, size);
      ctx.globalAlpha = 0.6;
      star(centerX + size * 0.95, centerY - size * 0.75, size * 0.32);
      star(centerX - size * 0.85, centerY + size * 0.8, size * 0.22);
    } else if (book.motif === "burst") {
      const spokes = 12;
      for (let spoke = 0; spoke < spokes; spoke += 1) {
        const angle = (spoke / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(centerX + Math.cos(angle) * size * 0.32, centerY + Math.sin(angle) * size * 0.32);
        ctx.lineTo(centerX + Math.cos(angle) * size, centerY + Math.sin(angle) * size);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.16, 0, Math.PI * 2);
      ctx.fill();
    } else if (book.motif === "arc") {
      for (let ring = 0; ring < 3; ring += 1) {
        ctx.globalAlpha = 0.9 - ring * 0.22;
        ctx.beginPath();
        ctx.arc(centerX, centerY + size * 0.5, size * (1 - ring * 0.28), Math.PI, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(centerX + size * 0.62, centerY - size * 0.28, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
    } else if (book.motif === "rings") {
      for (let ring = 0; ring < 4; ring += 1) {
        ctx.globalAlpha = 0.95 - ring * 0.2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, size * (0.25 + ring * 0.25), 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.95;
      ctx.beginPath();
      ctx.arc(centerX, centerY, size * 0.09, 0, Math.PI * 2);
      ctx.fill();
    } else if (book.motif === "triangle") {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size * 0.9);
      ctx.lineTo(centerX + size * 0.95, centerY + size * 0.7);
      ctx.lineTo(centerX - size * 0.95, centerY + size * 0.7);
      ctx.closePath();
      ctx.stroke();
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - size * 0.35);
      ctx.lineTo(centerX + size * 0.45, centerY + size * 0.4);
      ctx.lineTo(centerX - size * 0.45, centerY + size * 0.4);
      ctx.closePath();
      ctx.fill();
    } else {
      for (let row = 0; row < 3; row += 1) {
        ctx.globalAlpha = 0.9 - row * 0.2;
        const y = centerY - size * 0.5 + row * size * 0.5;
        ctx.beginPath();
        for (let step = 0; step <= 6; step += 1) {
          const x = centerX - size + (step / 6) * size * 2;
          const peak = step % 2 ? -size * 0.18 : size * 0.18;
          if (step === 0) ctx.moveTo(x, y + peak);
          else ctx.lineTo(x, y + peak);
        }
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  function fitFont(ctx, text, weight, family, size, maxWidth, minSize = size * 0.5) {
    let current = size;
    ctx.font = `${weight} ${current}px ${family}`;
    while (current > minSize && ctx.measureText(text).width > maxWidth) {
      current -= 2;
      ctx.font = `${weight} ${current}px ${family}`;
    }
    return current;
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let line = "";
    for (let index = 0; index < words.length; index += 1) {
      const candidate = line ? `${line} ${words[index]}` : words[index];
      if (ctx.measureText(candidate).width > maxWidth && line) {
        lines.push(line);
        line = words[index];
        if (lines.length === maxLines) {
          line = "";
          const last = lines[maxLines - 1];
          let trimmed = last;
          while (trimmed && ctx.measureText(`${trimmed}…`).width > maxWidth) {
            trimmed = trimmed.slice(0, -1);
          }
          lines[maxLines - 1] = `${trimmed.trimEnd()}…`;
          break;
        }
      } else {
        line = candidate;
      }
    }
    if (line && lines.length < maxLines) lines.push(line);
    lines.forEach((value, index) => ctx.fillText(value, x, y + index * lineHeight));
    return lines.length;
  }

  let sharedPaperFaceTexture = null;
  let sharedPageEdgeTextures = null;
  let sharedContactShadowTexture = null;
  let sharedPaperCanvas = null;

  function configureCanvasTexture(texture, {
    color = true,
    anisotropy = 16
  } = {}) {
    if (color) texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(
      anisotropy,
      renderer.capabilities.getMaxAnisotropy()
    );
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.needsUpdate = true;
    return texture;
  }

  function makeCoverTexture(book) {
    const canvasTexture = document.createElement("canvas");
    canvasTexture.width = 768;
    canvasTexture.height = 1152;
    const ctx = canvasTexture.getContext("2d");
    const random = seededRandom(hashSeed(book.id) + book.seed);

    ctx.fillStyle = book.color;
    ctx.fillRect(0, 0, canvasTexture.width, canvasTexture.height);

    const edge = ctx.createLinearGradient(0, 0, canvasTexture.width, 0);
    edge.addColorStop(0, "rgba(0,0,0,0.24)");
    edge.addColorStop(0.075, "rgba(255,255,255,0.035)");
    edge.addColorStop(0.5, "rgba(255,255,255,0.01)");
    edge.addColorStop(0.94, "rgba(0,0,0,0.06)");
    edge.addColorStop(1, "rgba(0,0,0,0.19)");
    ctx.fillStyle = edge;
    ctx.fillRect(0, 0, canvasTexture.width, canvasTexture.height);

    for (let line = 0; line < 1250; line += 1) {
      const x = random() * canvasTexture.width;
      const y = random() * canvasTexture.height;
      const length = 4 + random() * 22;
      ctx.strokeStyle = random() > 0.5 ? "rgba(255,255,255,0.024)" : "rgba(0,0,0,0.025)";
      ctx.lineWidth = 0.6 + random() * 0.8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y + (random() - 0.5) * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = book.foil;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 2;
    ctx.strokeRect(42, 42, canvasTexture.width - 84, canvasTexture.height - 84);
    ctx.globalAlpha = 1;

    drawMotif(ctx, book, canvasTexture.width, canvasTexture.height);

    return configureCanvasTexture(new THREE.CanvasTexture(canvasTexture));
  }

  function makeFoilTexture(book) {
    const foilCanvas = document.createElement("canvas");
    foilCanvas.width = 768;
    foilCanvas.height = 1152;
    const ctx = foilCanvas.getContext("2d");
    const index = BOOKS.indexOf(book) + 1;

    ctx.clearRect(0, 0, foilCanvas.width, foilCanvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = `600 15px ${BODY}`;
    ctx.letterSpacing = "2.8px";
    ctx.fillText(`MIKA REYES · PRESS  /  ${pad(index)}`, 70, 96);
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(70, 114);
    ctx.lineTo(176, 114);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Long volume names wrap onto two lines rather than shrinking to nothing.
    ctx.letterSpacing = "-2px";
    const titleWidth = foilCanvas.width - 140;
    ctx.font = `700 92px ${DISPLAY}`;
    if (ctx.measureText(book.title).width <= titleWidth) {
      ctx.fillText(book.title, 66, 1000);
    } else {
      ctx.font = `700 70px ${DISPLAY}`;
      const words = book.title.split(/\s+/);
      let split = words.length - 1;
      // Break as late as the second line allows, so the first line is longest.
      while (split > 1 && ctx.measureText(words.slice(split - 1).join(" ")).width <= titleWidth) {
        split -= 1;
      }
      const lines = [words.slice(0, split).join(" "), words.slice(split).join(" ")];
      lines.forEach((value, index) => {
        fitFont(ctx, value, 700, DISPLAY, 70, titleWidth, 40);
        ctx.fillText(value, 66, 1000 - (lines.length - 1 - index) * 72);
      });
    }
    ctx.font = `600 14px ${BODY}`;
    ctx.letterSpacing = "2.4px";
    ctx.fillText(book.discipline.toUpperCase(), 70, 1050);

    return configureCanvasTexture(new THREE.CanvasTexture(foilCanvas));
  }

  function makeClothBumpTexture(book) {
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 256;
    bumpCanvas.height = 256;
    const ctx = bumpCanvas.getContext("2d");
    const random = seededRandom(hashSeed(`${book.id}-cloth`) + book.seed);

    ctx.fillStyle = "#7f7f7f";
    ctx.fillRect(0, 0, bumpCanvas.width, bumpCanvas.height);

    for (let line = 0; line < 256; line += 2) {
      const value = Math.round(98 + random() * 70);
      ctx.strokeStyle = `rgb(${value},${value},${value})`;
      ctx.globalAlpha = 0.34 + random() * 0.18;
      ctx.lineWidth = 0.65 + random() * 0.45;
      ctx.beginPath();
      ctx.moveTo(0, line + (random() - 0.5));
      ctx.lineTo(256, line + (random() - 0.5));
      ctx.stroke();
    }

    for (let line = 1; line < 256; line += 3) {
      const value = Math.round(105 + random() * 58);
      ctx.strokeStyle = `rgb(${value},${value},${value})`;
      ctx.globalAlpha = 0.25 + random() * 0.14;
      ctx.lineWidth = 0.55 + random() * 0.35;
      ctx.beginPath();
      ctx.moveTo(line + (random() - 0.5), 0);
      ctx.lineTo(line + (random() - 0.5), 256);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    const texture = new THREE.CanvasTexture(bumpCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 8);
    return configureCanvasTexture(texture, {
      color: false,
      anisotropy: 12
    });
  }

  function makeClothSurfaceMaps(book) {
    const size = 256;
    const heightField = new Float32Array(size * size);
    const normalCanvas = document.createElement("canvas");
    const roughnessCanvas = document.createElement("canvas");
    normalCanvas.width = roughnessCanvas.width = size;
    normalCanvas.height = roughnessCanvas.height = size;
    const normalContext = normalCanvas.getContext("2d");
    const roughnessContext = roughnessCanvas.getContext("2d");
    const normalImage = normalContext.createImageData(size, size);
    const roughnessImage = roughnessContext.createImageData(size, size);
    const phase = (book.seed % 19) * 0.23;

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const warp = Math.sin((x + phase) * Math.PI * 0.52);
        const weft = Math.sin((y - phase) * Math.PI * 0.41);
        const cross = Math.sin((x + y + phase) * Math.PI * 0.19);
        heightField[y * size + x] = 0.5 + warp * 0.18 + weft * 0.15 + cross * 0.045;
      }
    }

    const sampleHeight = (x, y) => {
      const wrappedX = (x + size) % size;
      const wrappedY = (y + size) % size;
      return heightField[wrappedY * size + wrappedX];
    };

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const index = y * size + x;
        const pixel = index * 4;
        const dx = (sampleHeight(x + 1, y) - sampleHeight(x - 1, y)) * 1.5;
        const dy = (sampleHeight(x, y + 1) - sampleHeight(x, y - 1)) * 1.5;
        const length = Math.hypot(dx, dy, 1);
        normalImage.data[pixel] = Math.round(((-dx / length) * 0.5 + 0.5) * 255);
        normalImage.data[pixel + 1] = Math.round(((-dy / length) * 0.5 + 0.5) * 255);
        normalImage.data[pixel + 2] = Math.round(((1 / length) * 0.5 + 0.5) * 255);
        normalImage.data[pixel + 3] = 255;

        const roughness = Math.round(188 + heightField[index] * 56);
        roughnessImage.data[pixel] = roughness;
        roughnessImage.data[pixel + 1] = roughness;
        roughnessImage.data[pixel + 2] = roughness;
        roughnessImage.data[pixel + 3] = 255;
      }
    }

    normalContext.putImageData(normalImage, 0, 0);
    roughnessContext.putImageData(roughnessImage, 0, 0);

    const configureWeaveMap = (weaveCanvas, suffix) => {
      const texture = new THREE.CanvasTexture(weaveCanvas);
      texture.name = `${book.id}-${suffix}`;
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(5, 8);
      return configureCanvasTexture(texture, {
        color: false,
        anisotropy: 12
      });
    };

    return {
      normal: configureWeaveMap(normalCanvas, "cloth-normal"),
      roughness: configureWeaveMap(roughnessCanvas, "cloth-roughness")
    };
  }

  function makeEmbossMap(sourceTexture, name) {
    const texture = new THREE.CanvasTexture(sourceTexture.image);
    texture.name = name;
    texture.wrapS = sourceTexture.wrapS;
    texture.wrapT = sourceTexture.wrapT;
    texture.repeat.copy(sourceTexture.repeat);
    texture.offset.copy(sourceTexture.offset);
    texture.center.copy(sourceTexture.center);
    texture.rotation = sourceTexture.rotation;
    return configureCanvasTexture(texture, {
      color: false,
      anisotropy: 16
    });
  }

  function drawPaperSurface(ctx, width, height, random) {
    ctx.fillStyle = "#FBF8F5";
    ctx.fillRect(0, 0, width, height);

    const paperWash = ctx.createLinearGradient(0, 0, width, height);
    paperWash.addColorStop(0, "rgba(255,255,255,0.22)");
    paperWash.addColorStop(0.42, "rgba(255,255,255,0.035)");
    paperWash.addColorStop(1, "rgba(103,87,64,0.06)");
    ctx.fillStyle = paperWash;
    ctx.fillRect(0, 0, width, height);

    for (let fiber = 0; fiber < 2400; fiber += 1) {
      const x = random() * width;
      const y = random() * height;
      const length = 5 + random() * 34;
      const lightFiber = random() > 0.44;
      ctx.strokeStyle = lightFiber
        ? `rgba(255,255,255,${0.025 + random() * 0.045})`
        : `rgba(92,76,55,${0.014 + random() * 0.03})`;
      ctx.lineWidth = 0.45 + random() * 0.65;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        Math.min(width, x + length),
        y + (random() - 0.5) * 2.2
      );
      ctx.stroke();
    }

    for (let fleck = 0; fleck < 1200; fleck += 1) {
      const tone = Math.round(112 + random() * 94);
      ctx.fillStyle = `rgba(${tone},${tone - 5},${tone - 13},${0.014 + random() * 0.022})`;
      const size = 0.5 + random() * 1.1;
      ctx.fillRect(random() * width, random() * height, size, size);
    }
  }

  function makePaperFaceTexture() {
    if (sharedPaperFaceTexture) return sharedPaperFaceTexture;

    const paperCanvas = document.createElement("canvas");
    paperCanvas.width = 768;
    paperCanvas.height = 1152;
    const ctx = paperCanvas.getContext("2d");
    drawPaperSurface(ctx, paperCanvas.width, paperCanvas.height, seededRandom(hashSeed("press-paper-stock")));
    sharedPaperFaceTexture = configureCanvasTexture(new THREE.CanvasTexture(paperCanvas));
    return sharedPaperFaceTexture;
  }

  /* Interior pages draw the fibre texture once and stamp it, rather than
     re-running it per page, because a volume has up to twenty pages and they
     are built at the moment a reader opens it. */
  function paperCanvas() {
    if (sharedPaperCanvas) return sharedPaperCanvas;
    sharedPaperCanvas = document.createElement("canvas");
    sharedPaperCanvas.width = 512;
    sharedPaperCanvas.height = 768;
    drawPaperSurface(
      sharedPaperCanvas.getContext("2d"),
      512,
      768,
      seededRandom(hashSeed("press-interior-stock"))
    );
    return sharedPaperCanvas;
  }

  function makeEndpaperTexture(book) {
    const endpaper = document.createElement("canvas");
    endpaper.width = 512;
    endpaper.height = 768;
    const ctx = endpaper.getContext("2d");
    const random = seededRandom(hashSeed(`${book.id}-endpaper`) + book.seed);
    drawPaperSurface(ctx, endpaper.width, endpaper.height, random);

    ctx.save();
    // Paper with a wash of the cloth colour, not a solid field of it: a full
    // accent-coloured inside cover glared next to the pages when reading.
    ctx.fillStyle = book.color;
    ctx.globalAlpha = 0.14;
    ctx.fillRect(0, 0, endpaper.width, endpaper.height);
    ctx.globalAlpha = 0.22;
    ctx.strokeStyle = book.color;
    ctx.lineWidth = 1;
    for (let x = 28; x < endpaper.width; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, endpaper.height);
      ctx.stroke();
    }
    for (let y = 24; y < endpaper.height; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(endpaper.width, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 0.2;
    drawMotif(ctx, book, endpaper.width, endpaper.height, ROOM.charcoal);
    ctx.restore();

    const texture = configureCanvasTexture(new THREE.CanvasTexture(endpaper), {
      anisotropy: 16
    });
    texture.name = `${book.id}-patterned-endpaper`;
    return texture;
  }

  const imageCache = new Map();

  function clippingImageUrl(cover) {
    return `/_next/image?url=${encodeURIComponent(cover)}&w=640&q=75`;
  }

  function loadClippingImages(rig) {
    rig.data.items.forEach((item, itemIndex) => {
      if (!item.cover || imageCache.has(item.slug)) return;
      const image = new Image();
      image.decoding = "async";
      const entry = { image, ready: false };
      imageCache.set(item.slug, entry);
      image.onload = () => {
        if (disposed) return;
        entry.ready = true;
        if (rig.interior) {
          drawClippingPage(rig, itemIndex);
          requestFrame();
        }
      };
      image.onerror = () => {
        // The optimizer is unavailable in some previews; fall back to the file.
        if (image.src.includes("/_next/image")) image.src = item.cover;
      };
      image.src = clippingImageUrl(item.cover);
    });
  }

  function pageCanvas() {
    const page = document.createElement("canvas");
    page.width = 512;
    page.height = 768;
    return page;
  }

  function drawPageFrame(ctx, book, folio) {
    ctx.drawImage(paperCanvas(), 0, 0);
    ctx.fillStyle = ROOM.charcoal;
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.globalAlpha = 0.62;
    ctx.font = `600 10px ${BODY}`;
    ctx.letterSpacing = "1.8px";
    ctx.fillText(`MIKA REYES · PRESS  /  ${book.roman}`, 48, 48);
    ctx.textAlign = "right";
    ctx.fillText(pad(folio), 512 - 48, 48);
    ctx.textAlign = "left";
    ctx.fillRect(48, 64, 512 - 96, 1);
    ctx.fillRect(48, 768 - 48, 512 - 96, 1);
    ctx.globalAlpha = 1;
  }

  function drawTitlePage(ctx, book) {
    drawPageFrame(ctx, book, 1);
    ctx.fillStyle = book.color;
    ctx.fillRect(54, 132, 18, 18);
    ctx.fillStyle = ROOM.ink;
    ctx.font = `600 12px ${BODY}`;
    ctx.letterSpacing = "2.2px";
    ctx.fillText(book.discipline.toUpperCase(), 84, 146);
    ctx.letterSpacing = "-1.6px";
    ctx.font = `700 56px ${DISPLAY}`;
    const titleLines = wrapText(ctx, book.title, 52, 230, 410, 56, 2);
    ctx.letterSpacing = "-0.4px";
    ctx.globalAlpha = 0.78;
    ctx.font = `400 21px ${BODY}`;
    const noteY = 230 + titleLines * 56 + 10;
    wrapText(ctx, book.note, 54, noteY, 400, 29, 3);
    ctx.globalAlpha = 1;

    const listTop = 452;
    ctx.font = `600 11px ${BODY}`;
    ctx.letterSpacing = "2px";
    ctx.fillText("CONTENTS", 54, listTop);
    ctx.globalAlpha = 0.3;
    ctx.fillRect(54, listTop + 14, 404, 1);
    ctx.globalAlpha = 1;
    const rowHeight = Math.min(26, 220 / Math.max(book.items.length, 1));
    book.items.forEach((item, index) => {
      const y = listTop + 42 + index * rowHeight;
      ctx.font = `600 11px ${BODY}`;
      ctx.letterSpacing = "1px";
      ctx.globalAlpha = 0.55;
      ctx.fillText(pad(index + 1), 54, y);
      ctx.globalAlpha = 0.9;
      ctx.font = `400 15px ${BODY}`;
      ctx.letterSpacing = "-0.2px";
      wrapText(ctx, `${item.outlet}: ${item.title}`, 90, y, 368, rowHeight, 1);
    });
    ctx.globalAlpha = 1;
  }

  function drawClippingImagePage(ctx, book, item, itemIndex) {
    drawPageFrame(ctx, book, itemIndex * 2 + 2);
    ctx.fillStyle = book.color;
    ctx.fillRect(54, 102, 14, 14);
    ctx.fillStyle = ROOM.ink;
    ctx.font = `600 11px ${BODY}`;
    ctx.letterSpacing = "2px";
    ctx.fillText(`NO. ${pad(itemIndex + 1)}  ·  ${item.format.toUpperCase()}`, 80, 114);

    const box = { x: 54, y: 142, width: 404, height: 470 };
    const entry = imageCache.get(item.slug);
    if (entry?.ready && entry.image.naturalWidth) {
      const { naturalWidth, naturalHeight } = entry.image;
      const scale = Math.min(box.width / naturalWidth, box.height / naturalHeight);
      const width = naturalWidth * scale;
      const height = naturalHeight * scale;
      const x = box.x + (box.width - width) / 2;
      const y = box.y + (box.height - height) / 2;
      ctx.drawImage(entry.image, x, y, width, height);
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 1;
      ctx.strokeStyle = ROOM.ink;
      ctx.strokeRect(x + 0.5, y + 0.5, width - 1, height - 1);
      ctx.globalAlpha = 1;
    } else {
      ctx.globalAlpha = 0.08;
      ctx.fillRect(box.x, box.y, box.width, box.height);
      ctx.globalAlpha = 0.5;
      ctx.textAlign = "center";
      ctx.font = `600 10px ${BODY}`;
      ctx.letterSpacing = "1.8px";
      ctx.fillText(item.cover ? "PASTING IN THE CLIPPING" : item.outlet.toUpperCase(), 256, box.y + box.height / 2);
      ctx.textAlign = "left";
      ctx.globalAlpha = 1;
    }

    ctx.globalAlpha = 0.66;
    ctx.font = `600 10px ${BODY}`;
    ctx.letterSpacing = "1.6px";
    wrapText(ctx, item.outlet.toUpperCase(), 54, 664, 404, 16, 1);
    ctx.globalAlpha = 1;
  }

  function drawClippingTextPage(ctx, book, item, itemIndex) {
    drawPageFrame(ctx, book, itemIndex * 2 + 3);
    ctx.fillStyle = ROOM.ink;
    ctx.font = `600 12px ${BODY}`;
    ctx.letterSpacing = "2.2px";
    wrapText(ctx, item.outlet.toUpperCase(), 54, 140, 404, 18, 1);
    ctx.letterSpacing = "-1px";
    ctx.font = `700 38px ${DISPLAY}`;
    const headlineLines = wrapText(ctx, item.title, 52, 206, 410, 42, 5);
    ctx.letterSpacing = "-0.3px";
    ctx.globalAlpha = 0.76;
    ctx.font = `400 18px ${BODY}`;
    wrapText(ctx, item.description, 54, 206 + headlineLines * 42 + 30, 404, 27, 9);
    ctx.globalAlpha = 0.7;
    ctx.font = `600 10px ${BODY}`;
    ctx.letterSpacing = "1.6px";
    ctx.fillText("READ IT AT MIKAREYES.COM/PRESS", 54, 694);
    ctx.globalAlpha = 1;
  }

  function drawColophonPage(ctx, book) {
    drawPageFrame(ctx, book, book.items.length * 2 + 2);
    ctx.fillStyle = ROOM.ink;
    ctx.font = `600 11px ${BODY}`;
    ctx.letterSpacing = "2px";
    ctx.fillText("COLOPHON", 54, 164);
    ctx.globalAlpha = 0.7;
    ctx.font = `400 18px ${BODY}`;
    ctx.letterSpacing = "-0.2px";
    wrapText(ctx, `${book.title}. ${book.items.length} clippings, bound for mikareyes.com/press.`, 54, 210, 404, 28, 4);
    ctx.globalAlpha = 1;
  }

  function drawClippingPage(rig, itemIndex) {
    const interior = rig.interior;
    if (!interior) return;
    const pageIndex = itemIndex * 2 + 1;
    const ctx = interior.canvases[pageIndex].getContext("2d");
    drawClippingImagePage(ctx, rig.data, rig.data.items[itemIndex], itemIndex);
    interior.textures[pageIndex].needsUpdate = true;
  }

  /* Page textures in reading order: 0 is the title page (right of the first
     spread), then each clipping takes a left page (image) and a right page
     (headline), and the last back face is a colophon. */
  function makeInteriorPageTextures(book) {
    const pageCount = book.items.length * 2 + 2;
    const canvases = [];
    const textures = [];
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
      const page = pageCanvas();
      const ctx = page.getContext("2d");
      if (pageIndex === 0) {
        drawTitlePage(ctx, book);
      } else if (pageIndex === pageCount - 1) {
        drawColophonPage(ctx, book);
      } else {
        const itemIndex = Math.floor((pageIndex - 1) / 2);
        if (pageIndex % 2 === 1) {
          drawClippingImagePage(ctx, book, book.items[itemIndex], itemIndex);
        } else {
          drawClippingTextPage(ctx, book, book.items[itemIndex], itemIndex);
        }
      }
      const texture = configureCanvasTexture(new THREE.CanvasTexture(page), {
        anisotropy: 16
      });
      texture.name = `${book.id}-interior-page-${pageIndex + 1}`;
      canvases.push(page);
      textures.push(texture);
    }
    return { canvases, textures };
  }

  function ensureInterior(rig) {
    if (rig.interior) return;
    const { canvases, textures } = makeInteriorPageTextures(rig.data);
    // Printed pages are unlit and skip tone mapping, so the paper, type and
    // pasted clipping photos show at their true colours. Lit paper picked up
    // the scene's light colour and read peach and oversaturated.
    const materials = textures.map((texture) => new THREE.MeshBasicMaterial({
      map: texture,
      toneMapped: false,
      transparent: true,
      side: THREE.FrontSide
    }));
    rig.interior = { canvases, textures, materials };
    rig.leaves.forEach((leaf) => {
      leaf.front.material = materials[leaf.leafOrder * 2] || rig.blankPageMaterial;
      leaf.back.material = materials[leaf.leafOrder * 2 + 1] || rig.blankPageMaterial;
    });
  }

  function releaseInterior(rig) {
    if (!rig.interior) return;
    rig.leaves.forEach((leaf) => {
      leaf.front.material = rig.blankPageMaterial;
      leaf.back.material = rig.blankPageMaterial;
    });
    rig.interior.textures.forEach((texture) => texture.dispose());
    rig.interior.materials.forEach((material) => material.dispose());
    rig.interior = null;
  }

  function makeContactShadowTexture() {
    if (sharedContactShadowTexture) return sharedContactShadowTexture;
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 512;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext("2d");
    const gradient = ctx.createRadialGradient(256, 64, 10, 256, 64, 254);
    gradient.addColorStop(0, "rgba(255,255,255,0.95)");
    gradient.addColorStop(0.38, "rgba(255,255,255,0.62)");
    gradient.addColorStop(0.72, "rgba(255,255,255,0.18)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, shadowCanvas.width, shadowCanvas.height);
    sharedContactShadowTexture = configureCanvasTexture(
      new THREE.CanvasTexture(shadowCanvas),
      { color: false, anisotropy: 8 }
    );
    sharedContactShadowTexture.name = "soft-contact-shadow";
    return sharedContactShadowTexture;
  }

  function makePageEdgeTextures(book) {
    if (sharedPageEdgeTextures) return sharedPageEdgeTextures;

    const makeEdgeTexture = (width, height, suffix) => {
      const edgeCanvas = document.createElement("canvas");
      edgeCanvas.width = width;
      edgeCanvas.height = height;
      const ctx = edgeCanvas.getContext("2d");
      const random = seededRandom(
        hashSeed(`${book.id}-${suffix}`) + book.seed
      );

      ctx.fillStyle = "#e6dfd2";
      ctx.fillRect(0, 0, width, height);

      const pageStep = suffix === "fore-edge" ? 2 : 1.35;
      for (let y = 0; y < height; y += pageStep) {
        const shade = Math.round(106 + random() * 74);
        const signature = random() > 0.965;
        ctx.strokeStyle = `rgba(${shade},${shade - 3},${shade - 9},${signature ? 0.34 : 0.13 + random() * 0.13})`;
        ctx.lineWidth = signature ? 1.05 : 0.42 + random() * 0.42;
        ctx.beginPath();
        ctx.moveTo(0, y + (random() - 0.5) * 0.5);
        ctx.bezierCurveTo(
          width * 0.3,
          y + (random() - 0.5) * 0.9,
          width * 0.72,
          y + (random() - 0.5) * 0.9,
          width,
          y + (random() - 0.5) * 0.5
        );
        ctx.stroke();
      }

      const edgeShade = ctx.createLinearGradient(0, 0, width, 0);
      edgeShade.addColorStop(0, "rgba(58,48,35,0.18)");
      edgeShade.addColorStop(0.035, "rgba(255,255,255,0.04)");
      edgeShade.addColorStop(0.86, "rgba(255,255,255,0)");
      edgeShade.addColorStop(1, "rgba(58,48,35,0.12)");
      ctx.fillStyle = edgeShade;
      ctx.fillRect(0, 0, width, height);

      return configureCanvasTexture(new THREE.CanvasTexture(edgeCanvas));
    };

    sharedPageEdgeTextures = {
      fore: makeEdgeTexture(512, 2048, "fore-edge"),
      headTail: makeEdgeTexture(2048, 384, "head-tail-edge")
    };
    return sharedPageEdgeTextures;
  }

  function createRoundedPlaneGeometry(width, height, radius) {
    const halfWidth = width * 0.5;
    const halfHeight = height * 0.5;
    const corner = Math.min(radius, halfWidth, halfHeight);
    const shape = new THREE.Shape();

    shape.moveTo(-halfWidth + corner, -halfHeight);
    shape.lineTo(halfWidth - corner, -halfHeight);
    shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + corner);
    shape.lineTo(halfWidth, halfHeight - corner);
    shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - corner, halfHeight);
    shape.lineTo(-halfWidth + corner, halfHeight);
    shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - corner);
    shape.lineTo(-halfWidth, -halfHeight + corner);
    shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + corner, -halfHeight);

    const geometry = new THREE.ShapeGeometry(shape, 8);
    const positionAttribute = geometry.getAttribute("position");
    const uv = new Float32Array(positionAttribute.count * 2);
    for (let index = 0; index < positionAttribute.count; index += 1) {
      uv[index * 2] = (positionAttribute.getX(index) + halfWidth) / width;
      uv[index * 2 + 1] = (positionAttribute.getY(index) + halfHeight) / height;
    }
    geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geometry.computeVertexNormals();
    return geometry;
  }

  function createPageBlockGeometry(width, height, depth, radius) {
    const geometry = new RoundedBoxGeometry(width, height, depth, 4, radius);
    const positionAttribute = geometry.getAttribute("position");
    const halfWidth = width * 0.5;

    for (let index = 0; index < positionAttribute.count; index += 1) {
      const x = positionAttribute.getX(index);
      const z = positionAttribute.getZ(index);
      const normalizedX = clamp((x + halfWidth) / width, 0, 1);
      const gutterProgress = clamp(normalizedX / 0.16, 0, 1);
      const gutterEase = gutterProgress * gutterProgress * (3 - 2 * gutterProgress);
      const gutterCompression = (1 - gutterEase) * 0.012;
      const foreEdgeCharacter = Math.pow(normalizedX, 8) * Math.sin(positionAttribute.getY(index) * 31) * 0.00055;
      const adjustedZ = Math.sign(z || 1) * Math.max(
        0,
        Math.abs(z) - gutterCompression + foreEdgeCharacter
      );
      positionAttribute.setZ(index, adjustedZ);
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    return geometry;
  }

  function makeSpineTexture(book) {
    const spineCanvas = document.createElement("canvas");
    spineCanvas.width = 384;
    spineCanvas.height = 1536;
    const ctx = spineCanvas.getContext("2d");
    const random = seededRandom(hashSeed(`${book.id}-spine-cloth`) + book.seed);
    ctx.fillStyle = book.color;
    ctx.fillRect(0, 0, spineCanvas.width, spineCanvas.height);

    const shade = ctx.createLinearGradient(0, 0, spineCanvas.width, 0);
    shade.addColorStop(0, "rgba(0,0,0,0.2)");
    shade.addColorStop(0.14, "rgba(255,255,255,0.055)");
    shade.addColorStop(0.62, "rgba(255,255,255,0.012)");
    shade.addColorStop(1, "rgba(0,0,0,0.16)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, spineCanvas.width, spineCanvas.height);

    for (let thread = 0; thread < 1900; thread += 1) {
      const x = random() * spineCanvas.width;
      const y = random() * spineCanvas.height;
      const vertical = random() > 0.42;
      ctx.strokeStyle = random() > 0.5
        ? `rgba(255,255,255,${0.018 + random() * 0.038})`
        : `rgba(0,0,0,${0.018 + random() * 0.032})`;
      ctx.lineWidth = 0.45 + random() * 0.7;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(
        vertical ? x + (random() - 0.5) * 1.2 : x + 8 + random() * 28,
        vertical ? y + 8 + random() * 34 : y + (random() - 0.5) * 1.2
      );
      ctx.stroke();
    }

    const bottomShade = ctx.createLinearGradient(
      0,
      spineCanvas.height * 0.82,
      0,
      spineCanvas.height
    );
    bottomShade.addColorStop(0, "rgba(0,0,0,0)");
    bottomShade.addColorStop(1, "rgba(0,0,0,0.12)");
    ctx.fillStyle = bottomShade;
    ctx.fillRect(0, 0, spineCanvas.width, spineCanvas.height);

    return configureCanvasTexture(
      new THREE.CanvasTexture(spineCanvas),
      { anisotropy: 16 }
    );
  }

  function makeSpineFoilTexture(book) {
    const foilCanvas = document.createElement("canvas");
    foilCanvas.width = 384;
    foilCanvas.height = 1536;
    const ctx = foilCanvas.getContext("2d");

    ctx.clearRect(0, 0, foilCanvas.width, foilCanvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.4;
    ctx.strokeRect(34, 38, foilCanvas.width - 68, foilCanvas.height - 76);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 24px ${BODY}`;
    ctx.letterSpacing = "5px";
    ctx.fillText(book.roman, foilCanvas.width * 0.5, 118);

    ctx.save();
    ctx.translate(foilCanvas.width * 0.5, foilCanvas.height * 0.5);
    ctx.rotate(Math.PI / 2);
    ctx.letterSpacing = "-1px";
    fitFont(ctx, book.title, 700, DISPLAY, 76, foilCanvas.height - 420, 30);
    ctx.fillText(book.title, 0, 0);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(foilCanvas.width * 0.5, foilCanvas.height - 120, 24, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(foilCanvas.width * 0.5 - 24, foilCanvas.height - 120);
    ctx.lineTo(foilCanvas.width * 0.5 + 24, foilCanvas.height - 120);
    ctx.stroke();

    return configureCanvasTexture(new THREE.CanvasTexture(foilCanvas));
  }

  function makeBackCoverTexture(book) {
    const backCanvas = document.createElement("canvas");
    backCanvas.width = 768;
    backCanvas.height = 1152;
    const ctx = backCanvas.getContext("2d");
    const random = seededRandom(hashSeed(`${book.id}-back-cloth`) + book.seed);

    ctx.fillStyle = book.color;
    ctx.fillRect(0, 0, backCanvas.width, backCanvas.height);

    const edgeShade = ctx.createLinearGradient(0, 0, backCanvas.width, 0);
    edgeShade.addColorStop(0, "rgba(0,0,0,0.15)");
    edgeShade.addColorStop(0.05, "rgba(255,255,255,0.028)");
    edgeShade.addColorStop(0.84, "rgba(255,255,255,0)");
    edgeShade.addColorStop(1, "rgba(0,0,0,0.11)");
    ctx.fillStyle = edgeShade;
    ctx.fillRect(0, 0, backCanvas.width, backCanvas.height);

    for (let thread = 0; thread < 2600; thread += 1) {
      const x = random() * backCanvas.width;
      const y = random() * backCanvas.height;
      const length = 5 + random() * 30;
      ctx.strokeStyle = random() > 0.5
        ? `rgba(255,255,255,${0.018 + random() * 0.03})`
        : `rgba(0,0,0,${0.016 + random() * 0.028})`;
      ctx.lineWidth = 0.45 + random() * 0.65;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + length, y + (random() - 0.5) * 1.5);
      ctx.stroke();
    }

    return configureCanvasTexture(new THREE.CanvasTexture(backCanvas));
  }

  function makeBackFoilTexture(book) {
    const foilCanvas = document.createElement("canvas");
    foilCanvas.width = 768;
    foilCanvas.height = 1152;
    const ctx = foilCanvas.getContext("2d");

    ctx.clearRect(0, 0, foilCanvas.width, foilCanvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";

    ctx.font = `600 16px ${BODY}`;
    ctx.letterSpacing = "3px";
    ctx.fillText(`MIKA REYES · PRESS  /  ${book.roman}`, 68, 82);
    ctx.globalAlpha = 0.72;
    ctx.fillRect(68, 108, 176, 2);
    ctx.globalAlpha = 1;

    ctx.lineWidth = 1.5;
    for (let ring = 0; ring < 5; ring += 1) {
      ctx.globalAlpha = 0.24 - ring * 0.032;
      ctx.beginPath();
      ctx.arc(548, 374, 74 + ring * 38, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.letterSpacing = "-1.5px";
    fitFont(ctx, book.title, 700, DISPLAY, 66, 632, 28);
    ctx.fillText(book.title, 68, 956);
    ctx.font = `600 15px ${BODY}`;
    ctx.letterSpacing = "2.6px";
    ctx.fillText(`${book.items.length} CLIPPINGS`, 70, 1004);
    ctx.globalAlpha = 0.68;
    ctx.fillRect(68, 1040, 632, 1.5);
    ctx.globalAlpha = 1;
    ctx.textAlign = "right";
    ctx.fillText("MIKAREYES.COM/PRESS", 700, 1080);

    return configureCanvasTexture(new THREE.CanvasTexture(foilCanvas));
  }

  function createMesh(geometry, material, name, cast = true, receive = true) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.castShadow = cast;
    mesh.receiveShadow = receive;
    return mesh;
  }

  function addTurnIns(pivot, book, side, width, height, insideZ, material) {
    const stripDepth = 0.002;
    const border = 0.018;
    const longWidth = width - border * 0.7;
    const longHeight = height - border * 2.2;
    const definitions = [
      ["head", width * 0.5, height * 0.5 - border * 0.56, longWidth, border, stripDepth],
      ["tail", width * 0.5, -height * 0.5 + border * 0.56, longWidth, border, stripDepth],
      ["spine", border * 0.56, 0, border, longHeight, stripDepth],
      ["fore", width - border * 0.56, 0, border, longHeight, stripDepth]
    ];

    definitions.forEach(([edge, x, y, stripWidth, stripHeight, depth]) => {
      const strip = createMesh(
        shared.box,
        material,
        `${book.id}-${side}-turn-in-${edge}`,
        false,
        true
      );
      strip.scale.set(stripWidth, stripHeight, depth);
      strip.position.set(x, y, insideZ);
      pivot.add(strip);
    });
  }

  function createBookRig(book, index) {
    const root3d = new THREE.Group();
    root3d.name = `book-${book.id}`;
    root3d.userData.index = index;

    const motion = new THREE.Group();
    motion.name = `${book.id}-motion`;
    root3d.add(motion);

    const width = book.width;
    const height = book.height;
    const depth = book.depth;
    const board = 0.032;
    const coverRadius = 0.0045;
    const pageRadius = 0.0025;
    const spineRadius = 0.0015;
    const spineBoardThickness = 0.014;
    const spineWidth = 0.082;
    const pageWidth = width - 0.074;
    const pageHeight = height - 0.068;
    const pageDepth = depth - 0.026;
    const darkFoil = isDarkColor(book.foil);

    const coverTexture = makeCoverTexture(book);
    const foilTexture = makeFoilTexture(book);
    const clothBumpTexture = makeClothBumpTexture(book);
    const clothSurfaceMaps = makeClothSurfaceMaps(book);
    const paperFaceTexture = makePaperFaceTexture();
    const endpaperTexture = makeEndpaperTexture(book);
    const pageEdgeTextures = makePageEdgeTextures(book);
    const spineTexture = makeSpineTexture(book);
    const spineFoilTexture = makeSpineFoilTexture(book);
    const backCoverTexture = makeBackCoverTexture(book);
    const backFoilTexture = makeBackFoilTexture(book);
    const foilEmbossTexture = makeEmbossMap(foilTexture, `${book.id}-front-foil-emboss`);
    const spineEmbossTexture = makeEmbossMap(spineFoilTexture, `${book.id}-spine-foil-emboss`);
    const backEmbossTexture = makeEmbossMap(backFoilTexture, `${book.id}-back-foil-emboss`);
    // Ink foil reads as a printed black stamp rather than chrome, the way the
    // source treats its one black-foil volume. White foil keeps a sheen but
    // less metalness than the source's brass, which mirrored the pale room
    // and washed the title out against dark cloth.
    const foilFinish = darkFoil
      ? { roughness: 0.32, metalness: 0.22 }
      : { roughness: 0.3, metalness: 0.45 };
    const cloth = new THREE.MeshPhysicalMaterial({
      color: book.color,
      normalMap: clothSurfaceMaps.normal,
      normalScale: new THREE.Vector2(0.34, 0.34),
      roughnessMap: clothSurfaceMaps.roughness,
      roughness: 0.98,
      metalness: 0.02,
      bumpMap: clothBumpTexture,
      bumpScale: 0.0045,
      sheen: 0.34,
      sheenRoughness: 0.76,
      sheenColor: new THREE.Color(darkFoil ? ROOM.paper : book.foil),
      transparent: true
    });
    const coverArt = new THREE.MeshPhysicalMaterial({
      map: coverTexture,
      normalMap: clothSurfaceMaps.normal,
      normalScale: new THREE.Vector2(0.28, 0.28),
      roughnessMap: clothSurfaceMaps.roughness,
      bumpMap: clothBumpTexture,
      bumpScale: 0.0035,
      roughness: 0.92,
      metalness: 0.035,
      clearcoat: 0.06,
      clearcoatRoughness: 0.72,
      sheen: 0.26,
      sheenRoughness: 0.78,
      transparent: true
    });
    const foilArt = new THREE.MeshPhysicalMaterial({
      color: book.foil,
      map: foilTexture,
      alphaMap: foilTexture,
      bumpMap: foilEmbossTexture,
      bumpScale: 0.016,
      ...foilFinish,
      clearcoat: 0.18,
      clearcoatRoughness: 0.12,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2
    });
    const spineArt = new THREE.MeshPhysicalMaterial({
      map: spineTexture,
      normalMap: clothSurfaceMaps.normal,
      normalScale: new THREE.Vector2(0.3, 0.3),
      roughnessMap: clothSurfaceMaps.roughness,
      bumpMap: clothBumpTexture,
      bumpScale: 0.004,
      roughness: 0.95,
      metalness: 0.025,
      sheen: 0.27,
      sheenRoughness: 0.78,
      transparent: true,
      side: THREE.DoubleSide
    });
    const spineFoilArt = new THREE.MeshPhysicalMaterial({
      color: book.foil,
      map: spineFoilTexture,
      alphaMap: spineFoilTexture,
      bumpMap: spineEmbossTexture,
      bumpScale: 0.017,
      ...foilFinish,
      clearcoat: 0.16,
      clearcoatRoughness: 0.13,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      side: THREE.DoubleSide
    });
    const backArt = new THREE.MeshPhysicalMaterial({
      map: backCoverTexture,
      normalMap: clothSurfaceMaps.normal,
      normalScale: new THREE.Vector2(0.28, 0.28),
      roughnessMap: clothSurfaceMaps.roughness,
      bumpMap: clothBumpTexture,
      bumpScale: 0.0035,
      roughness: 0.96,
      metalness: 0.025,
      sheen: 0.25,
      sheenRoughness: 0.8,
      transparent: true,
      side: THREE.DoubleSide
    });
    const backFoilArt = new THREE.MeshPhysicalMaterial({
      color: book.foil,
      map: backFoilTexture,
      alphaMap: backFoilTexture,
      bumpMap: backEmbossTexture,
      bumpScale: 0.016,
      ...foilFinish,
      clearcoat: 0.14,
      clearcoatRoughness: 0.14,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      side: THREE.DoubleSide
    });
    const endpaperMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: endpaperTexture,
      bumpMap: paperFaceTexture,
      bumpScale: 0.0018,
      roughness: 0.94,
      metalness: 0,
      sheen: 0.025,
      sheenRoughness: 1,
      side: THREE.DoubleSide,
      transparent: true
    });
    const foreEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: pageEdgeTextures.fore,
      bumpMap: pageEdgeTextures.fore,
      bumpScale: 0.0022,
      roughness: 0.93,
      metalness: 0,
      sheen: 0.018,
      sheenRoughness: 1,
      side: THREE.DoubleSide,
      transparent: true
    });
    const headTailEdgeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: pageEdgeTextures.headTail,
      bumpMap: pageEdgeTextures.headTail,
      bumpScale: 0.0015,
      roughness: 0.94,
      metalness: 0,
      sheen: 0.014,
      sheenRoughness: 1,
      side: THREE.DoubleSide,
      transparent: true
    });
    const grooveMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(book.color).multiplyScalar(0.42),
      roughness: 0.9,
      metalness: 0,
      bumpMap: clothBumpTexture,
      bumpScale: 0.006,
      side: THREE.DoubleSide,
      transparent: true
    });
    const pageMaterial = createFadeMaterial(shared.page);
    const headbandMaterial = createFadeMaterial(shared.headband);
    const blankPageMaterial = createFadeMaterial(shared.pageSheet);
    blankPageMaterial.map = paperFaceTexture;
    blankPageMaterial.bumpMap = paperFaceTexture;
    blankPageMaterial.bumpScale = 0.0012;
    blankPageMaterial.roughness = 0.96;
    blankPageMaterial.side = THREE.FrontSide;
    blankPageMaterial.needsUpdate = true;
    const signatureMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x8d816f).lerp(new THREE.Color(ROOM.paper), 0.34),
      roughness: 0.98,
      metalness: 0,
      transparent: true
    });
    const ribbonMaterial = new THREE.MeshPhysicalMaterial({
      color: darkFoil ? ROOM.charcoal : book.foil,
      roughness: 0.62,
      metalness: 0.08,
      sheen: 0.36,
      sheenRoughness: 0.68,
      side: THREE.DoubleSide,
      transparent: true
    });

    pageMaterial.map = paperFaceTexture;
    pageMaterial.bumpMap = paperFaceTexture;
    pageMaterial.bumpScale = 0.0014;
    pageMaterial.roughness = 0.95;
    pageMaterial.needsUpdate = true;

    const coverGeometry = new RoundedBoxGeometry(
      width,
      height,
      board,
      2,
      coverRadius
    );
    const pageGeometry = createPageBlockGeometry(
      pageWidth,
      pageHeight,
      pageDepth,
      pageRadius
    );
    const coverSurfaceGeometry = createRoundedPlaneGeometry(
      width - 0.007,
      height - 0.007,
      0.0035
    );
    const endpaperGeometry = createRoundedPlaneGeometry(
      width - 0.045,
      height - 0.045,
      0.003
    );

    const pageBlock = createMesh(pageGeometry, pageMaterial, `${book.id}-page-block`);
    pageBlock.position.x = 0.018;
    motion.add(pageBlock);

    const backPivot = new THREE.Group();
    backPivot.name = `${book.id}-back-cover-pivot`;
    backPivot.position.set(-width * 0.5, 0, -depth * 0.5 - board * 0.5);
    const backCover = createMesh(coverGeometry, cloth, `${book.id}-back-cover`);
    backCover.position.x = width * 0.5;
    backPivot.add(backCover);

    const backPlane = createMesh(
      coverSurfaceGeometry,
      backArt,
      `${book.id}-back-cover-art`,
      false,
      false
    );
    backPlane.position.set(width * 0.5, 0, -board * 0.55);
    backPlane.rotation.y = Math.PI;
    backPivot.add(backPlane);

    const backFoilPlane = createMesh(
      coverSurfaceGeometry,
      backFoilArt,
      `${book.id}-back-foil-art`,
      false,
      false
    );
    backFoilPlane.position.set(width * 0.5, 0, -board * 0.605);
    backFoilPlane.rotation.y = Math.PI;
    backPivot.add(backFoilPlane);

    const backEndpaper = createMesh(
      endpaperGeometry,
      endpaperMaterial,
      `${book.id}-back-endpaper`,
      false,
      true
    );
    backEndpaper.position.set(width * 0.5, 0, board * 0.515);
    backPivot.add(backEndpaper);
    addTurnIns(
      backPivot,
      book,
      "back",
      width,
      height,
      board * 0.53,
      cloth
    );

    const backGroove = createMesh(
      shared.plane,
      grooveMaterial,
      `${book.id}-back-hinge-groove`,
      false,
      false
    );
    backGroove.scale.set(0.012, height * 0.94, 1);
    backGroove.position.set(0.038, 0, -board * 0.535);
    backGroove.rotation.y = Math.PI;
    backPivot.add(backGroove);
    motion.add(backPivot);

    const frontPivot = new THREE.Group();
    frontPivot.name = `${book.id}-front-cover-pivot`;
    frontPivot.position.set(-width * 0.5, 0, depth * 0.5 + board * 0.5);
    const frontCover = createMesh(coverGeometry, cloth, `${book.id}-front-cover`);
    frontCover.position.x = width * 0.5;
    frontPivot.add(frontCover);

    const coverPlane = createMesh(
      coverSurfaceGeometry,
      coverArt,
      `${book.id}-cover-art`,
      false,
      false
    );
    coverPlane.position.set(width * 0.5, 0, board * 0.55);
    frontPivot.add(coverPlane);

    const foilPlane = createMesh(
      coverSurfaceGeometry,
      foilArt,
      `${book.id}-foil-art`,
      false,
      false
    );
    foilPlane.position.set(width * 0.5, 0, board * 0.605);
    frontPivot.add(foilPlane);

    const frontEndpaper = createMesh(
      endpaperGeometry,
      endpaperMaterial,
      `${book.id}-front-endpaper`,
      false,
      true
    );
    frontEndpaper.position.set(width * 0.5, 0, -board * 0.515);
    frontEndpaper.rotation.y = Math.PI;
    frontPivot.add(frontEndpaper);
    addTurnIns(
      frontPivot,
      book,
      "front",
      width,
      height,
      -board * 0.53,
      cloth
    );

    const frontGroove = createMesh(
      shared.plane,
      grooveMaterial,
      `${book.id}-front-hinge-groove`,
      false,
      false
    );
    frontGroove.scale.set(0.012, height * 0.94, 1);
    frontGroove.position.set(0.038, 0, board * 0.655);
    frontPivot.add(frontGroove);
    motion.add(frontPivot);

    // One turnable leaf per clipping, plus the resting leaf that carries the
    // last right-hand page and one blank beneath it.
    const leafCount = book.items.length + 2;
    const pagePivots = [];
    const pageSurfaces = [];
    const leaves = [];
    for (let pageIndex = 0; pageIndex < leafCount; pageIndex += 1) {
      const leafOrder = leafCount - 1 - pageIndex;
      const pagePivot = new THREE.Group();
      pagePivot.name = `${book.id}-page-${pageIndex}`;
      pagePivot.position.set(
        -width * 0.5 + spineWidth * 0.65,
        0,
        pageDepth * 0.5 + 0.0015 + pageIndex * 0.0015
      );
      pagePivot.userData.restZ = pagePivot.position.z;
      pagePivot.userData.turnedZ = depth * 0.5 + board + 0.004 + leafOrder * 0.0015;
      const frontPageGeometry = new THREE.PlaneGeometry(
        1,
        1,
        FLEXIBLE_PAGE_SEGMENTS,
        FLEXIBLE_PAGE_VERTICAL_SEGMENTS
      );
      const backPageGeometry = new THREE.PlaneGeometry(
        1,
        1,
        FLEXIBLE_PAGE_SEGMENTS,
        FLEXIBLE_PAGE_VERTICAL_SEGMENTS
      );
      const visiblePageWidth = pageWidth - spineWidth * 0.42;
      const frontPage = createMesh(
        frontPageGeometry,
        blankPageMaterial,
        `${book.id}-page-sheet-${pageIndex}-front`,
        false,
        true
      );
      frontPage.scale.set(visiblePageWidth, pageHeight - 0.014, 1);
      frontPage.position.set(visiblePageWidth * 0.5, 0, 0.00022);
      pagePivot.add(frontPage);
      pageSurfaces.push(frontPage);

      const backPage = createMesh(
        backPageGeometry,
        blankPageMaterial,
        `${book.id}-page-sheet-${pageIndex}-back`,
        false,
        true
      );
      backPage.scale.set(visiblePageWidth, pageHeight - 0.014, 1);
      backPage.position.set(visiblePageWidth * 0.5, 0, -0.00022);
      backPage.rotation.y = Math.PI;
      pagePivot.add(backPage);
      pageSurfaces.push(backPage);
      leaves.push({ leafOrder, front: frontPage, back: backPage });
      pagePivot.userData.flex = {
        curve: 0,
        curveVelocity: 0,
        twist: 0,
        twistVelocity: 0,
        surfaces: [
          {
            geometry: frontPageGeometry,
            position: frontPageGeometry.attributes.position,
            base: Float32Array.from(frontPageGeometry.attributes.position.array),
            direction: 1
          },
          {
            geometry: backPageGeometry,
            position: backPageGeometry.attributes.position,
            base: Float32Array.from(backPageGeometry.attributes.position.array),
            direction: -1
          }
        ]
      };
      motion.add(pagePivot);
      pagePivots.push(pagePivot);
    }

    const spineGeometry = new RoundedBoxGeometry(
      spineBoardThickness,
      height - 0.012,
      depth + board * 1.88,
      1,
      spineRadius
    );
    const spine = createMesh(spineGeometry, spineArt, `${book.id}-flat-spine`);
    spine.position.x = -width * 0.5 - spineBoardThickness * 0.35;
    motion.add(spine);

    const spineFoil = createMesh(
      shared.plane,
      spineFoilArt,
      `${book.id}-spine-foil`,
      false,
      false
    );
    spineFoil.scale.set(depth + board * 1.82, height - 0.018, 1);
    spineFoil.rotation.y = -Math.PI * 0.5;
    spineFoil.position.set(
      spine.position.x - spineBoardThickness * 0.505,
      0,
      0
    );
    motion.add(spineFoil);

    const spineLining = createMesh(
      new RoundedBoxGeometry(
        spineWidth * 0.68,
        height - 0.056,
        Math.max(0.045, pageDepth - 0.008),
        1,
        0.0015
      ),
      endpaperMaterial,
      `${book.id}-spine-lining`
    );
    spineLining.position.set(-width * 0.5 + spineWidth * 0.38, 0, 0);
    motion.add(spineLining);

    [-1, 1].forEach((direction) => {
      const headbandGeometry = new THREE.CylinderGeometry(
        0.012,
        0.012,
        pageDepth * 0.88,
        12,
        1,
        false
      );
      const headband = createMesh(
        headbandGeometry,
        headbandMaterial,
        `${book.id}-headband-${direction}`
      );
      headband.rotation.x = Math.PI * 0.5;
      headband.position.set(
        -pageWidth * 0.5 + 0.046,
        direction * (pageHeight * 0.5 - 0.004),
        0
      );
      motion.add(headband);
    });

    const ribbonGeometry = createRoundedPlaneGeometry(
      0.034,
      pageHeight * 0.76,
      0.002
    );
    const ribbon = createMesh(
      ribbonGeometry,
      ribbonMaterial,
      `${book.id}-ribbon-bookmark`,
      false,
      true
    );
    ribbon.position.set(
      -pageWidth * 0.5 + 0.09 + (book.seed % 3) * 0.018,
      -pageHeight * 0.17,
      pageDepth * 0.5 + 0.003
    );
    ribbon.rotation.z = (book.seed % 2 ? -1 : 1) * 0.014;
    motion.add(ribbon);

    for (let signatureIndex = 0; signatureIndex < 6; signatureIndex += 1) {
      const signature = createMesh(
        shared.box,
        signatureMaterial,
        `${book.id}-page-signature-${signatureIndex + 1}`,
        false,
        true
      );
      signature.scale.set(0.0035, 0.00135, pageDepth * 0.91);
      signature.position.set(
        0.018 + pageWidth * 0.5 + 0.001,
        -pageHeight * 0.5 + ((signatureIndex + 1) / 7) * pageHeight,
        0
      );
      motion.add(signature);
    }

    const foreEdge = createMesh(
      shared.plane,
      foreEdgeMaterial,
      `${book.id}-fore-edge`,
      false,
      true
    );
    foreEdge.scale.set(pageDepth * 0.94, pageHeight - 0.028, 1);
    foreEdge.rotation.y = Math.PI * 0.5;
    foreEdge.position.set(0.018 + pageWidth * 0.5 + 0.002, 0, 0);
    motion.add(foreEdge);

    [-1, 1].forEach((direction) => {
      const edge = createMesh(
        shared.plane,
        headTailEdgeMaterial,
        `${book.id}-${direction > 0 ? "head" : "tail"}-edge`,
        false,
        true
      );
      edge.scale.set(pageWidth - 0.035, pageDepth * 0.94, 1);
      edge.rotation.x = direction > 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
      edge.position.set(
        0.018,
        direction * (pageHeight * 0.5 + 0.002),
        0
      );
      motion.add(edge);
    });

    const hitMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      depthWrite: false
    });
    const hit = createMesh(shared.box, hitMaterial, `${book.id}-hit-target`, false, false);
    hit.scale.set(width * 1.34, height * 1.2, Math.max(depth * 4, 1));
    hit.position.set(-spineWidth * 0.18, 0, 0.12);
    hit.userData.index = index;
    motion.add(hit);
    hitTargets.push(hit);

    const contactShadowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(ROOM.charcoal),
      alphaMap: makeContactShadowTexture(),
      transparent: true,
      opacity: 0.24,
      depthWrite: false,
      side: THREE.DoubleSide
    });
    const contactShadow = createMesh(
      shared.plane,
      contactShadowMaterial,
      `${book.id}-contact-shadow`,
      false,
      false
    );
    contactShadow.scale.set(width * 1.22, depth * 2.05, 1);
    contactShadow.rotation.x = -Math.PI * 0.5;
    contactShadow.position.set(0, -height * 0.5 - 0.022, 0.025);
    root3d.add(contactShadow);

    return {
      data: book,
      root: root3d,
      motion,
      frontPivot,
      frontCover,
      pageBlock,
      pagePivots,
      pageSurfaces,
      pageGestureSurfaces: [...pageSurfaces, pageBlock],
      leaves,
      leafCount,
      blankPageMaterial,
      paperFaceTexture,
      interior: null,
      hit,
      contactShadow,
      opacity: 1,
      lastOffset: null,
      fadeMaterials: [
        cloth,
        coverArt,
        foilArt,
        spineArt,
        spineFoilArt,
        backArt,
        backFoilArt,
        endpaperMaterial,
        foreEdgeMaterial,
        headTailEdgeMaterial,
        grooveMaterial,
        pageMaterial,
        blankPageMaterial,
        headbandMaterial,
        signatureMaterial,
        ribbonMaterial
      ],
      base: {
        width,
        height,
        depth
      }
    };
  }

  function configureResponsiveTargets() {
    const narrow = viewWidth < 820;
    shelfCameraPosition.set(0, narrow ? 2.02 : 1.92, narrow ? 8.7 : 8.1);
    shelfCameraTarget.set(0, narrow ? 1.57 : 1.55, 0);
    inspectPosition.set(narrow ? 0 : -2.25, narrow ? 2.3 : 1.56, narrow ? 0.15 : 0);
    // Camera square on to the book; the view offset places it on screen.
    inspectCameraPosition.set(
      inspectPosition.x,
      inspectPosition.y,
      inspectPosition.z + (narrow ? 5.55 : 5.5)
    );
    inspectCameraTarget.copy(inspectPosition);
    // On phones the detail panel is a bottom sheet, so lift the book into the
    // space above it.
    detailViewOffsetY = narrow ? viewHeight * 0.17 : 0;

    if (narrow) {
      detailViewOffsetX = 0;
      detailSafeWidth = viewWidth;
      return;
    }

    const panelBounds = detailPanel.getBoundingClientRect();
    const rootBounds = root.getBoundingClientRect();
    const panelLeft = panelBounds.width > 0
      ? panelBounds.left - rootBounds.left
      : viewWidth * 0.64;
    // Book and panel read as one centred group: the panel's gap on the right
    // is mirrored on the left, and the book centres in the space between.
    // (The source pinned the book toward the left edge.)
    const panelRightGap = panelBounds.width > 0
      ? rootBounds.right - panelBounds.right
      : clamp(viewWidth * 0.05, 34, 78);
    const gutter = clamp(viewWidth * 0.025, 24, 44);
    detailSafeWidth = Math.max(viewWidth * 0.36, panelLeft - gutter - panelRightGap);
    const desiredBookCenter = panelRightGap + detailSafeWidth * 0.5;
    detailViewOffsetX = viewWidth * 0.5 - desiredBookCenter;
  }

  function getInspectScale() {
    if (!activeBook) return 0.82;
    if (viewWidth < 820) return viewWidth < 560 ? 0.72 : 0.82;
    const distance = Math.abs(inspectCameraPosition.z - inspectPosition.z);
    const worldHeight = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
    const pixelsPerWorld = viewHeight / Math.max(worldHeight, 0.001);
    // Size for the open spread (two covers wide), not the closed book, so a
    // centred spread never runs under the panel.
    const spreadWidth = activeBook.base.width * pixelsPerWorld * 2.1;
    const scaleForSafeWidth = (detailSafeWidth * 0.98) / Math.max(spreadWidth, 1);
    // Also cap by height so a tall spread never runs off the section.
    const scaleForHeight = (viewHeight * 0.8) / Math.max(activeBook.base.height * pixelsPerWorld, 1);
    return clamp(Math.min(scaleForSafeWidth, scaleForHeight), 0.72, 1.7);
  }

  function applyDetailViewOffset() {
    if (Math.abs(currentViewOffsetX) < 0.5 && Math.abs(currentViewOffsetY) < 0.5) {
      camera.clearViewOffset();
      return;
    }
    camera.setViewOffset(
      viewWidth,
      viewHeight,
      currentViewOffsetX,
      currentViewOffsetY,
      viewWidth,
      viewHeight
    );
  }

  function addRoom() {
    // Shadow-only planes: the page's linen is the room, the scene adds depth.
    const floor = createMesh(shared.plane, new THREE.ShadowMaterial({
      color: ROOM.charcoal,
      opacity: 0.06
    }), "paper-floor", false, true);
    floor.scale.set(30, 20, 1);
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = -0.02;
    scene.add(floor);

    const back = createMesh(shared.plane, new THREE.ShadowMaterial({
      color: ROOM.charcoal,
      opacity: 0.1
    }), "paper-backdrop", false, true);
    back.scale.set(28, 14, 1);
    back.position.set(0, 5.5, -3.3);
    scene.add(back);

    const shelf = createMesh(shared.box, shared.walnut, "charcoal-shelf");
    shelf.scale.set(17, 0.28, 1.08);
    shelf.position.set(0, 0.33, -0.03);
    shelfStage.add(shelf);

    const shelfLip = createMesh(shared.box, shared.walnutDark, "charcoal-shelf-lip");
    shelfLip.scale.set(17.05, 0.075, 1.14);
    shelfLip.position.set(0, 0.205, 0.02);
    shelfStage.add(shelfLip);

    const backRail = createMesh(shared.box, shared.walnut, "charcoal-back-rail");
    backRail.scale.set(17, 0.17, 0.2);
    backRail.position.set(0, 0.68, -0.52);
    shelfStage.add(backRail);

    [-7.65, 7.65].forEach((x, index) => {
      const upright = createMesh(shared.box, shared.walnutDark, `shelf-upright-${index}`);
      upright.scale.set(0.2, 3.8, 0.72);
      upright.position.set(x, 2.05, -0.28);
      shelfStage.add(upright);
    });

    const shadowStrip = createMesh(shared.plane, new THREE.MeshBasicMaterial({
      color: ROOM.charcoal,
      alphaMap: makeContactShadowTexture(),
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    }), "shelf-contact-shadow", false, false);
    shadowStrip.scale.set(16, 0.85, 1);
    shadowStrip.rotation.x = -Math.PI * 0.5;
    shadowStrip.position.set(0, 0.49, 0.06);
    shelfStage.add(shadowStrip);

    roomMaterials.shelf = shared.walnut;
    roomMaterials.shelfDark = shared.walnutDark;
    roomMaterials.shadow = shadowStrip.material;
  }

  function addLights() {
    roomLights.hemisphere = new THREE.HemisphereLight(ROOM.paper, ROOM.muted, 0.56);
    scene.add(roomLights.hemisphere);

    const key = new THREE.DirectionalLight(0xffffff, 1.42);
    key.name = "shadow-key";
    key.position.set(-4.6, 7.4, 5.8);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -1.5;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 18;
    key.shadow.bias = -0.00018;
    key.shadow.normalBias = 0.018;
    key.shadow.radius = 3.5;
    scene.add(key);
    roomLights.key = key;

    const softKey = new THREE.RectAreaLight(0xffffff, 5.4, 4.8, 5.6);
    softKey.name = "cloth-softbox";
    softKey.position.set(-3.2, 5.5, 4.6);
    softKey.lookAt(0, 1.45, 0);
    scene.add(softKey);
    roomLights.softKey = softKey;

    const fill = new THREE.DirectionalLight(0xf4f6f7, 0.3);
    fill.name = "cool-fill";
    fill.position.set(5.5, 3.6, 4.2);
    scene.add(fill);
    roomLights.fill = fill;

    const rim = new THREE.RectAreaLight(ROOM.line, 3.45, 1.6, 4.8);
    rim.name = "foil-rake";
    rim.position.set(3.8, 3.6, -2.1);
    rim.lookAt(-0.2, 1.5, 0);
    scene.add(rim);
    roomLights.rim = rim;

    const backFill = new THREE.RectAreaLight(0xf4f6f7, 2.7, 3.8, 4.8);
    backFill.name = "back-cover-softbox";
    backFill.position.set(-1.8, 2.9, -4.5);
    backFill.lookAt(-0.1, 1.45, 0);
    scene.add(backFill);
    roomLights.backFill = backFill;

    const spineRake = new THREE.RectAreaLight(0xffffff, 1.9, 0.9, 4.6);
    spineRake.name = "spine-rake";
    spineRake.position.set(-4.6, 3.2, 1.1);
    spineRake.lookAt(-0.55, 1.5, 0);
    scene.add(spineRake);
    roomLights.spineRake = spineRake;

    const pageRake = new THREE.RectAreaLight(0xffffff, 2.15, 1.15, 3.8);
    pageRake.name = "page-edge-rake";
    pageRake.position.set(4.2, 4.8, 3.1);
    pageRake.lookAt(0.65, 1.55, 0);
    scene.add(pageRake);
    roomLights.pageRake = pageRake;
  }

  function addDust() {
    const dustCount = 110;
    const positions = new Float32Array(dustCount * 3);
    const random = seededRandom(20260728);
    for (let index = 0; index < dustCount; index += 1) {
      positions[index * 3] = (random() - 0.5) * 14;
      positions[index * 3 + 1] = 0.7 + random() * 4.7;
      positions[index * 3 + 2] = -1.7 + random() * 4;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: ROOM.muted,
      size: 0.014,
      transparent: true,
      opacity: 0.26,
      depthWrite: false
    });
    const dust = new THREE.Points(geometry, material);
    dust.name = "paper-dust";
    scene.add(dust);
  }

  function setThemeColorsImmediately() {
    roomMaterials.shelf?.color.copy(themeTargets.shelf);
    roomMaterials.shelfDark?.color.copy(themeTargets.shelfDark);
    roomMaterials.shadow?.color.copy(themeTargets.shadow);
    scene?.fog?.color.copy(themeTargets.fog);
    roomLights.hemisphere?.color.copy(themeTargets.hemisphere);
    roomLights.hemisphere?.groundColor.copy(themeTargets.hemisphereGround);
    roomLights.key?.color.copy(themeTargets.key);
    roomLights.softKey?.color.copy(themeTargets.key);
    roomLights.fill?.color.copy(themeTargets.fill);
    roomLights.rim?.color.copy(themeTargets.rim);
    roomLights.backFill?.color.copy(themeTargets.fill);
    roomLights.spineRake?.color.copy(themeTargets.key);
    roomLights.pageRake?.color.copy(themeTargets.hemisphere);
    themeMoving = false;
  }

  /* The source repaints the whole page in each volume's palette. Here the page
     stays warm linen (BRAND.md: linen is the page) and only the rake light and
     the active marker pick up the volume's cloth. */
  function applyBookTheme(book) {
    root.style.setProperty("--shelf-accent", book.color);
    themeTargets.rim.set(book.color);

    if (!themeInitialized || reducedMotion) {
      themeInitialized = true;
      setThemeColorsImmediately();
    } else {
      themeMoving = true;
      requestFrame();
    }
  }

  function updateTheme(delta) {
    if (!themeMoving) return false;
    const amount = 1 - Math.exp(-delta * 5.5);
    let largestGap = 0;
    const easeColor = (current, target) => {
      if (!current) return;
      const redGap = current.r - target.r;
      const greenGap = current.g - target.g;
      const blueGap = current.b - target.b;
      largestGap = Math.max(
        largestGap,
        redGap * redGap + greenGap * greenGap + blueGap * blueGap
      );
      current.lerp(target, amount);
    };

    easeColor(roomLights.rim?.color, themeTargets.rim);

    if (largestGap < 0.0000025) {
      setThemeColorsImmediately();
    }
    return themeMoving;
  }

  function updateSelection(index, announce = false) {
    const nextIndex = mod(index, BOOKS.length);
    if (nextIndex === selectedIndex && !announce) return;
    selectedIndex = nextIndex;
    const book = BOOKS[selectedIndex];
    selectionTitle.textContent = book.title;
    selectionNote.textContent = book.note;
    counter.textContent = `${pad(selectedIndex + 1)} / ${pad(BOOKS.length)}`;
    inspectButton.setAttribute("aria-label", `Open ${book.title}`);
    applyBookTheme(book);
    if (bookRigs[selectedIndex]) loadClippingImages(bookRigs[selectedIndex]);

    markerButtons.forEach((marker, markerIndex) => {
      const current = markerIndex === selectedIndex;
      marker.setAttribute("aria-current", current ? "true" : "false");
      marker.setAttribute("aria-selected", current ? "true" : "false");
      marker.tabIndex = current ? 0 : -1;
    });

    if (announce) {
      liveRegion.textContent = `Selected volume ${selectedIndex + 1} of ${BOOKS.length}: ${book.title}. ${book.note}`;
    }
  }

  let outletButtons = [];

  function populateDetail(book) {
    detailEyebrow.textContent = `Volume ${book.roman} · ${book.discipline}`;
    detailTitle.textContent = book.title;
    detailDeck.textContent = book.deck;
    detailPieces.textContent = `${book.items.length} ${book.items.length === 1 ? "clipping" : "clippings"}`;
    detailFormats.textContent = book.formats;
    // One chip per outlet, in book order; each opens to that outlet's first
    // clipping.
    const seen = new Set();
    detailOutlets.replaceChildren();
    outletButtons = [];
    book.items.forEach((item, index) => {
      if (seen.has(item.outlet)) return;
      seen.add(item.outlet);
      const button = document.createElement("button");
      button.type = "button";
      button.className = "press-shelf__outlet";
      button.textContent = item.outlet;
      button.dataset.spread = String(index + 1);
      button.setAttribute("aria-label", `${item.outlet}: open to ${item.title}`);
      button.addEventListener("click", () => goToSpread(index + 1));
      detailOutlets.append(button);
      outletButtons.push(button);
    });
  }

  function getSpreadLabels(book) {
    return ["Title page", ...book.items.map((item) => item.title)];
  }

  const ACTION_BY_FORMAT = {
    Video: "Watch the video",
    Podcast: "Listen to the podcast",
    Post: "Read the post",
    Article: "Read the article"
  };

  function updatePageControls(announce = false) {
    const rig = activeBook || bookRigs[selectedIndex];
    const book = rig.data;
    const labels = getSpreadLabels(book);
    const total = spreadCount(rig);
    const interactionLocked = mode !== "detail" || !readingOpen;
    const previousDisabled = interactionLocked || currentSpread === 0;
    const nextDisabled = interactionLocked || currentSpread === total - 1;
    const item = readingOpen && currentSpread > 0 ? book.items[currentSpread - 1] : null;
    const action = item ? ACTION_BY_FORMAT[item.format] || "Read it" : "";

    previousPageButton.disabled = previousDisabled;
    nextPageButton.disabled = nextDisabled;
    openBookButton.hidden = readingOpen;
    pageReading.hidden = !readingOpen;
    if (readingOpen) {
      pageLabel.textContent = labels[currentSpread];
      pageCounter.textContent = `${pad(currentSpread + 1)} / ${pad(total)}`;
    }
    if (item) {
      itemLink.hidden = false;
      itemLink.href = item.href;
      itemLink.textContent = `${action} →`;
      itemLink.setAttribute("aria-label", `${action}: ${item.title} (${item.outlet})`);
    } else {
      itemLink.hidden = true;
    }
    outletButtons.forEach((button) => {
      button.setAttribute(
        "aria-current",
        String(readingOpen && Number(button.dataset.spread) === currentSpread)
      );
    });
    previousPageButton.setAttribute(
      "aria-label",
      previousDisabled
        ? "Previous page"
        : `Previous page: ${labels[currentSpread - 1]}`
    );
    nextPageButton.setAttribute(
      "aria-label",
      nextDisabled
        ? "Next page"
        : `Next page: ${labels[currentSpread + 1]}`
    );

    if (announce && activeBook && readingOpen) {
      liveRegion.textContent = `Page ${currentSpread + 1} of ${total}: ${labels[currentSpread]}.`;
    }
  }

  /* Opens the active book (if closed) straight to a spread. Used by the
     outlet chips; spread 0 is the title page. */
  function goToSpread(spread) {
    if (mode !== "detail" || !activeBook) return;
    const nextSpread = clamp(spread, 0, spreadCount(activeBook) - 1);
    if (!readingOpen) setReadingOpen(true, false);
    currentSpread = nextSpread;
    updatePageControls(true);
    requestFrame();
  }

  function setReadingOpen(open, announce = true) {
    if (mode !== "detail" || readingOpen === open) return;
    cancelPageDrag();
    readingOpen = open;
    if (!readingOpen) currentSpread = 0;
    canvas.classList.remove("has-page-hover", "has-closed-book-hover");
    updatePageControls(false);
    pointerDirty = true;

    if (announce && activeBook) {
      liveRegion.textContent = readingOpen
        ? `${activeBook.data.title} opened to its title page. Drag a page horizontally or use the arrow controls to read.`
        : `${activeBook.data.title} closed. Drag the cover, click the book, or use Open book to begin reading.`;
    }
    requestFrame();
  }

  function turnPage(direction) {
    if (mode !== "detail" || !readingOpen) return;
    const nextSpread = clamp(
      currentSpread + direction,
      0,
      spreadCount(activeBook) - 1
    );
    if (nextSpread === currentSpread) return;
    currentSpread = nextSpread;
    updatePageControls(true);
    requestFrame();
  }

  function updateFlexiblePage(
    pagePivot,
    targetCurve,
    delta,
    immediate = false,
    targetTwist = 0
  ) {
    const flex = pagePivot.userData.flex;
    if (!flex) return;
    const settleImmediately = immediate || reducedMotion;
    const step = Math.min(delta, 0.033);
    let nextCurve = targetCurve;
    let nextTwist = targetTwist;

    if (settleImmediately) {
      flex.curveVelocity = 0;
      flex.twistVelocity = 0;
    } else {
      const curveAcceleration = (
        (targetCurve - flex.curve) * 178
        - flex.curveVelocity * 19
      );
      const twistAcceleration = (
        (targetTwist - flex.twist) * 210
        - flex.twistVelocity * 21
      );
      flex.curveVelocity = clamp(
        flex.curveVelocity + curveAcceleration * step,
        -1.8,
        1.8
      );
      flex.twistVelocity = clamp(
        flex.twistVelocity + twistAcceleration * step,
        -1.6,
        1.6
      );
      nextCurve = clamp(
        flex.curve + flex.curveVelocity * step,
        -0.025,
        0.19
      );
      nextTwist = clamp(
        flex.twist + flex.twistVelocity * step,
        -0.12,
        0.12
      );

      if (
        Math.abs(targetCurve - nextCurve) < 0.00002
        && Math.abs(flex.curveVelocity) < 0.0008
      ) {
        nextCurve = targetCurve;
        flex.curveVelocity = 0;
      }
      if (
        Math.abs(targetTwist - nextTwist) < 0.00002
        && Math.abs(flex.twistVelocity) < 0.0008
      ) {
        nextTwist = targetTwist;
        flex.twistVelocity = 0;
      }
    }

    if (
      !settleImmediately
      && Math.abs(nextCurve - flex.curve) < 0.00001
      && Math.abs(targetCurve - nextCurve) < 0.00001
      && Math.abs(nextTwist - flex.twist) < 0.00001
      && Math.abs(targetTwist - nextTwist) < 0.00001
    ) return;

    flex.curve = nextCurve;
    flex.twist = nextTwist;
    flex.surfaces.forEach((surface) => {
      const { position: positionAttribute, base, direction, geometry } = surface;
      for (let vertex = 0; vertex < positionAttribute.count; vertex += 1) {
        const offset = vertex * 3;
        const x = base[offset];
        const y = base[offset + 1];
        const u = x + 0.5;
        const mappedU = direction > 0 ? u : 1 - u;
        const arch = Math.sin(Math.PI * mappedU);
        const freeEdgeLift = mappedU * mappedU * 0.16;
        const shape = arch * 0.84 + freeEdgeLift;
        const diagonalTwist = (
          nextTwist
          * y
          * Math.pow(mappedU, 1.35)
        );
        const softRipple = (
          nextTwist
          * Math.sin(mappedU * Math.PI * 2)
          * (1 - Math.min(1, Math.abs(y) * 1.65))
          * 0.09
        );
        const z = (
          nextCurve * shape * (1 + y * 0.14)
          + diagonalTwist
          + softRipple
        ) * direction;
        positionAttribute.setXYZ(vertex, x, y, z);
      }
      positionAttribute.needsUpdate = true;
      geometry.computeVertexNormals();
    });
  }

  function updatePaginatedBook(rig, delta, openAmount = 1) {
    const amount = clamp(openAmount, 0, 1);
    const speed = reducedMotion ? 1000 : 10.5;
    const paginatedLeaves = rig.data.items.length;
    const hoverCrack = (
      mode === "detail"
      && !readingOpen
      && detailBookHovered
      && !reducedMotion
    ) ? -0.16 : 0;
    const coverTarget = amount > 0
      ? (-Math.PI + 0.055) * amount
      : hoverCrack;

    rig.frontPivot.rotation.y = damp(
      rig.frontPivot.rotation.y,
      coverTarget,
      speed,
      delta
    );

    rig.pagePivots.forEach((pagePivot, pageIndex) => {
      const leafOrder = rig.pagePivots.length - 1 - pageIndex;
      let pageTarget = 0;
      let positionTarget = pagePivot.userData.restZ;
      let pageTwistTarget = 0;
      let dragCurveBoost = 0;
      let flexTwistTarget = 0;

      if (leafOrder < paginatedLeaves) {
        const isTurned = leafOrder < currentSpread;
        const unturnedTarget = -0.038 + leafOrder * 0.008 / Math.max(1, paginatedLeaves / 4);
        const turnedTarget = -Math.PI + 0.085 + leafOrder * 0.014 / Math.max(1, paginatedLeaves / 4);
        pageTarget = isTurned ? turnedTarget : unturnedTarget;
        positionTarget = isTurned
          ? pagePivot.userData.turnedZ
          : pagePivot.userData.restZ;

        if (pageDrag.active && pageDrag.direction !== 0) {
          const dragLeafOrder = pageDrag.direction > 0
            ? currentSpread
            : currentSpread - 1;
          if (leafOrder === dragLeafOrder) {
            const dragProgress = smoothstep(pageDrag.progress);
            const dragEnvelope = Math.sin(Math.PI * dragProgress);
            const speedResponse = clamp(
              Math.abs(pageDrag.progressVelocity) / 5.5,
              0,
              1
            );
            const signedSpeed = clamp(
              pageDrag.progressVelocity / 5.5,
              -1,
              1
            );
            pageTarget = pageDrag.direction > 0
              ? lerp(unturnedTarget, turnedTarget, dragProgress)
              : lerp(turnedTarget, unturnedTarget, dragProgress);
            positionTarget = pageDrag.direction > 0
              ? lerp(pagePivot.userData.restZ, pagePivot.userData.turnedZ, dragProgress)
              : lerp(pagePivot.userData.turnedZ, pagePivot.userData.restZ, dragProgress);
            pageTwistTarget = pageDrag.direction
              * dragEnvelope
              * (0.014 + pageDrag.verticalBias * 0.026);
            dragCurveBoost = dragEnvelope * (
              0.032
              + speedResponse * 0.064
            );
            flexTwistTarget = dragEnvelope * (
              pageDrag.verticalBias * 0.08
              + signedSpeed * pageDrag.direction * 0.03
            );
          }
        }

        pagePivot.position.z = damp(
          pagePivot.position.z,
          pagePivot.userData.restZ
            + (positionTarget - pagePivot.userData.restZ) * amount,
          speed,
          delta
        );
      } else {
        pageTarget = -0.006 + (leafOrder - paginatedLeaves) * 0.003;
        pagePivot.position.z = damp(
          pagePivot.position.z,
          pagePivot.userData.restZ,
          speed,
          delta
        );
      }

      pagePivot.rotation.y = damp(
        pagePivot.rotation.y,
        pageTarget * amount,
        speed,
        delta
      );
      pagePivot.rotation.z = damp(
        pagePivot.rotation.z,
        pageTwistTarget * amount,
        speed,
        delta
      );
      const turnProgress = clamp(
        Math.abs(pagePivot.rotation.y) / Math.PI,
        0,
        1
      );
      const curveTarget = amount > 0
        ? amount * (
            0.004
            + Math.sin(Math.PI * turnProgress) * 0.082
            + dragCurveBoost
          )
        : 0;
      updateFlexiblePage(
        pagePivot,
        curveTarget,
        delta,
        false,
        flexTwistTarget * amount
      );
    });
  }

  function selectMarker(index, origin) {
    if (mode !== "hero") return;
    const rounded = Math.round(targetPosition);
    const current = mod(rounded, BOOKS.length);
    let delta = index - current;
    if (delta > BOOKS.length / 2) delta -= BOOKS.length;
    if (delta < -BOOKS.length / 2) delta += BOOKS.length;
    targetPosition = rounded + delta;
    focusReturnTarget = origin;
    updateSelection(index, true);
    requestFrame();
  }

  function navigate(direction, origin) {
    if (mode !== "hero") return;
    targetPosition = Math.round(targetPosition) + direction;
    focusReturnTarget = origin;
    updateSelection(mod(Math.round(targetPosition), BOOKS.length), true);
    requestFrame();
  }

  function alignShelfToSelection() {
    const rounded = Math.round(targetPosition);
    const current = mod(rounded, BOOKS.length);
    let delta = selectedIndex - current;
    if (delta > BOOKS.length / 2) delta -= BOOKS.length;
    if (delta < -BOOKS.length / 2) delta += BOOKS.length;
    targetPosition = rounded + delta;
    position = targetPosition;
  }

  function snapRigToShelfSlot(rig, index) {
    let offset = index - position;
    offset -= Math.round(offset / BOOKS.length) * BOOKS.length;
    const distance = Math.abs(offset);
    const focus = 1 - clamp(distance, 0, 1);
    const fadeProgress = clamp((distance - 2.55) / 0.7, 0, 1);
    const opacity = 1 - smoothstep(fadeProgress);

    rig.root.position.set(
      offset * spacing,
      shelfBoardTop + rig.base.height * 0.5 + focus * 0.15,
      0.13 + focus * 0.24 - Math.min(distance, 2.8) * 0.07
    );
    rig.root.rotation.set(0, -offset * 0.105, -offset * 0.018);
    rig.root.scale.setScalar(1 + focus * 0.09);
    rig.motion.position.y = 0;
    rig.motion.rotation.set(0, 0, 0);
    rig.frontPivot.rotation.y = 0;
    rig.pagePivots.forEach((pagePivot) => {
      pagePivot.rotation.y = 0;
      pagePivot.rotation.z = 0;
      pagePivot.position.z = pagePivot.userData.restZ;
      updateFlexiblePage(pagePivot, 0, 0, true);
    });
    rig.opacity = opacity;
    rig.fadeMaterials.forEach((material) => {
      material.opacity = opacity;
    });
    rig.contactShadow.visible = true;
    rig.contactShadow.material.opacity = opacity * 0.24;
    rig.hit.visible = opacity > 0.12;
    rig.lastOffset = offset;
  }

  function setPointerFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.clientX = event.clientX;
    pointer.clientY = event.clientY;
    pointer.ndc.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.ndc.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    pointerDirty = true;
  }

  function updateHover() {
    pointerDirty = false;
    if (mode === "detail" && activeBook) {
      setHovered(-1);
      if (readingOpen) {
        detailBookHovered = false;
        canvas.classList.remove("has-closed-book-hover");
        canvas.classList.toggle(
          "has-page-hover",
          pageDrag.active
            || Boolean(pageSurfaceAtPointer())
            || Boolean(coverSurfaceAtPointer())
        );
      } else {
        detailBookHovered = Boolean(coverSurfaceAtPointer());
        canvas.classList.remove("has-page-hover");
        canvas.classList.toggle(
          "has-closed-book-hover",
          detailBookHovered
        );
      }
      return;
    }
    detailBookHovered = false;
    canvas.classList.remove("has-page-hover", "has-closed-book-hover");
    if (mode !== "hero" || shelfDrag.dragging) {
      setHovered(-1);
      return;
    }
    setHovered(bookIndexAtPointer());
  }

  function bookIndexAtPointer() {
    raycaster.setFromCamera(pointer.ndc, camera);
    const hits = raycaster.intersectObjects(hitTargets, false);
    return hits.length ? hits[0].object.userData.index : -1;
  }

  function activeBookAtPointer() {
    if (mode !== "detail" || !activeBook) return false;
    activeBook.root.updateWorldMatrix(true, true);
    raycaster.setFromCamera(pointer.ndc, camera);
    return raycaster.intersectObject(activeBook.hit, false).length > 0;
  }

  function pageSurfaceAtPointer() {
    if (mode !== "detail" || !activeBook || !readingOpen) return null;
    activeBook.root.updateWorldMatrix(true, true);
    raycaster.setFromCamera(pointer.ndc, camera);
    const hits = raycaster.intersectObjects(
      activeBook.pageGestureSurfaces,
      false
    );
    return hits.length ? hits[0].object : null;
  }

  function coverSurfaceAtPointer() {
    if (
      mode !== "detail"
      || !activeBook
      || currentSpread !== 0
    ) return null;
    activeBook.root.updateWorldMatrix(true, true);
    raycaster.setFromCamera(pointer.ndc, camera);
    const hits = raycaster.intersectObject(activeBook.frontCover, false);
    return hits.length ? hits[0].object : null;
  }

  function resetPageDrag() {
    const capturedPointerId = pageDrag.pointerId;
    pageDrag.active = false;
    pageDrag.pointerId = null;
    pageDrag.progress = 0;
    pageDrag.peakProgress = 0;
    pageDrag.committed = false;
    pageDrag.progressVelocity = 0;
    pageDrag.verticalBias = 0;
    pageDrag.lastProgress = 0;
    pageDrag.lastTime = 0;
    pageDrag.direction = 0;
    pageDrag.kind = null;
    canvas.classList.remove("is-page-dragging");
    if (controls) controls.enabled = mode === "detail";
    if (
      capturedPointerId !== null
      && canvas.hasPointerCapture?.(capturedPointerId)
    ) {
      canvas.releasePointerCapture(capturedPointerId);
    }
  }

  function applyPageReleaseImpulse(turnDirection) {
    if (!activeBook || turnDirection === 0) return;
    const leafOrder = turnDirection > 0
      ? currentSpread
      : currentSpread - 1;
    const pageIndex = activeBook.pagePivots.length - 1 - leafOrder;
    const pagePivot = activeBook.pagePivots[pageIndex];
    const flex = pagePivot?.userData.flex;
    if (!flex) return;

    const speedResponse = clamp(
      Math.abs(pageDrag.progressVelocity) / 5.5,
      0.12,
      1
    );
    flex.curveVelocity = clamp(
      flex.curveVelocity + speedResponse * 0.46,
      -1.8,
      1.8
    );
    flex.twistVelocity = clamp(
      flex.twistVelocity
        + pageDrag.verticalBias * 0.38
        + clamp(
            pageDrag.progressVelocity / 5.5,
            -1,
            1
          ) * turnDirection * 0.14,
      -1.6,
      1.6
    );
  }

  function settlePageDrag(commitLatchedGesture = false) {
    if (!pageDrag.active) return false;
    const turnDirection = pageDrag.direction;
    const shouldCloseCover = commitLatchedGesture
      && pageDrag.kind === "cover-close"
      && pageDrag.committed;
    const shouldOpenCover = commitLatchedGesture
      && pageDrag.kind === "cover-open"
      && pageDrag.committed;
    const shouldTurnPage = commitLatchedGesture
      && pageDrag.kind === "page"
      && pageDrag.committed
      && turnDirection !== 0;
    if (shouldTurnPage) {
      applyPageReleaseImpulse(turnDirection);
    }
    resetPageDrag();
    if (shouldCloseCover) {
      setReadingOpen(false);
    } else if (shouldOpenCover) {
      setReadingOpen(true);
    } else if (shouldTurnPage) {
      turnPage(turnDirection);
    } else {
      requestFrame();
    }
    return shouldCloseCover || shouldOpenCover || shouldTurnPage;
  }

  function cancelPageDrag() {
    settlePageDrag(false);
  }

  function resetDetailPress() {
    detailPress.active = false;
    detailPress.pointerId = null;
    detailPress.moved = false;
    detailPress.allowClick = false;
  }

  function onDetailBookPointerDown(event) {
    if (
      mode !== "detail"
      || readingOpen
      || event.button !== 0
      || event.isPrimary === false
    ) return;

    setPointerFromEvent(event);
    detailPress.allowClick = false;
    if (!activeBookAtPointer()) return;
    detailPress.active = true;
    detailPress.pointerId = event.pointerId;
    detailPress.startX = event.clientX;
    detailPress.startY = event.clientY;
    detailPress.moved = false;
  }

  function onDetailBookPointerMove(event) {
    if (!detailPress.active || event.pointerId !== detailPress.pointerId) return;
    if (
      Math.hypot(
        event.clientX - detailPress.startX,
        event.clientY - detailPress.startY
      ) > 16
    ) {
      detailPress.moved = true;
    }
  }

  function onDetailBookPointerEnd(event) {
    if (!detailPress.active || event.pointerId !== detailPress.pointerId) return;
    detailPress.allowClick = event.type === "pointerup" && !detailPress.moved;
    detailPress.active = false;
    detailPress.pointerId = null;
  }

  function onPagePointerDown(event) {
    if (
      mode !== "detail"
      || !activeBook
      || event.button !== 0
      || event.isPrimary === false
    ) return;

    setPointerFromEvent(event);
    const coverSurface = coverSurfaceAtPointer();
    const pageSurface = readingOpen ? pageSurfaceAtPointer() : null;
    if (!coverSurface && !pageSurface) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    pageDrag.active = true;
    pageDrag.pointerId = event.pointerId;
    pageDrag.startX = event.clientX;
    pageDrag.startY = event.clientY;
    pageDrag.progress = 0;
    pageDrag.peakProgress = 0;
    pageDrag.committed = false;
    pageDrag.progressVelocity = 0;
    pageDrag.verticalBias = 0;
    pageDrag.lastProgress = 0;
    pageDrag.lastTime = event.timeStamp || performance.now();
    pageDrag.direction = 0;
    pageDrag.kind = coverSurface
      ? readingOpen
        ? "cover-close"
        : "cover-open"
      : "page";
    controls.enabled = false;
    canvas.classList.add("has-page-hover", "is-page-dragging");
    canvas.setPointerCapture?.(event.pointerId);
    requestFrame();
  }

  function updatePageDragMotion(event, deltaY) {
    const eventTime = event.timeStamp || performance.now();
    const elapsed = clamp(
      (eventTime - pageDrag.lastTime) / 1000,
      0.008,
      0.08
    );
    const instantVelocity = clamp(
      (pageDrag.progress - pageDrag.lastProgress) / elapsed,
      -8,
      8
    );
    pageDrag.progressVelocity = lerp(
      pageDrag.progressVelocity,
      instantVelocity,
      0.42
    );
    pageDrag.verticalBias = lerp(
      pageDrag.verticalBias,
      clamp(deltaY / 180, -1, 1),
      0.36
    );
    pageDrag.lastProgress = pageDrag.progress;
    pageDrag.lastTime = eventTime;
  }

  function updatePageDragFromEvent(event) {
    setPointerFromEvent(event);

    const deltaX = event.clientX - pageDrag.startX;
    const deltaY = event.clientY - pageDrag.startY;
    const horizontalDistance = Math.abs(deltaX);

    if (
      pageDrag.kind === "cover-open"
      || pageDrag.kind === "cover-close"
    ) {
      const openingCover = pageDrag.kind === "cover-open";
      const signedDistance = openingCover ? -deltaX : deltaX;
      const commitProgress = openingCover
        ? COVER_OPEN_COMMIT_PROGRESS
        : COVER_CLOSE_COMMIT_PROGRESS;
      pageDrag.direction = 0;
      pageDrag.progress = (
        horizontalDistance >= 3
        && horizontalDistance >= Math.abs(deltaY) * 0.72
      )
        ? clamp(Math.max(0, signedDistance) / 140, 0, 1)
        : 0;
      pageDrag.peakProgress = Math.max(
        pageDrag.peakProgress,
        pageDrag.progress
      );
      if (pageDrag.peakProgress >= commitProgress) {
        pageDrag.committed = true;
      }
      updatePageDragMotion(event, deltaY);
      return;
    }

    if (
      horizontalDistance < 3
      || horizontalDistance < Math.abs(deltaY) * 0.72
    ) {
      pageDrag.progress = 0;
    } else {
      if (pageDrag.direction === 0 && horizontalDistance >= 6) {
        const direction = deltaX < 0 ? 1 : -1;
        const directionAvailable = direction > 0
          ? currentSpread < spreadCount(activeBook) - 1
          : currentSpread > 0;
        pageDrag.direction = directionAvailable ? direction : 0;
      }

      const signedDistance = pageDrag.direction > 0 ? -deltaX : deltaX;
      pageDrag.progress = pageDrag.direction !== 0
        ? clamp(Math.max(0, signedDistance) / 150, 0, 1)
        : 0;
      pageDrag.peakProgress = Math.max(
        pageDrag.peakProgress,
        pageDrag.progress
      );
      if (pageDrag.peakProgress >= PAGE_TURN_COMMIT_PROGRESS) {
        pageDrag.committed = true;
      }
    }
    updatePageDragMotion(event, deltaY);
  }

  function onPagePointerMove(event) {
    if (!pageDrag.active || event.pointerId !== pageDrag.pointerId) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    updatePageDragFromEvent(event);

    requestFrame();
  }

  function onPagePointerEnd(event) {
    if (!pageDrag.active || event.pointerId !== pageDrag.pointerId) return;
    if (event.cancelable) event.preventDefault();
    event.stopImmediatePropagation();
    if (event.type === "pointerup") updatePageDragFromEvent(event);
    const dragKind = pageDrag.kind;
    const releaseDistance = Math.hypot(
      event.clientX - pageDrag.startX,
      event.clientY - pageDrag.startY
    );
    const shouldClickOpen = event.type === "pointerup"
      && dragKind === "cover-open"
      && !pageDrag.committed
      && releaseDistance <= 12;
    if (pageDrag.committed) {
      settlePageDrag(true);
    } else if (shouldClickOpen) {
      resetPageDrag();
      detailPress.allowClick = false;
      setReadingOpen(true);
    } else {
      if (dragKind === "cover-open") {
        detailPress.allowClick = false;
      }
      cancelPageDrag();
    }
  }

  function onWindowPagePointerEnd(event) {
    if (!pageDrag.active || event.pointerId !== pageDrag.pointerId) return;
    if (event.type === "pointerup") updatePageDragFromEvent(event);
    settlePageDrag(true);
  }

  function shelfSlotPixels() {
    const distance = Math.max(1, shelfCameraPosition.z - 0.37);
    const worldHeight = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov * 0.5));
    return (spacing * viewHeight) / worldHeight;
  }

  function onShelfPointerDown(event) {
    if (mode !== "hero" || event.button !== 0 || event.isPrimary === false) return;
    shelfDrag.active = true;
    shelfDrag.dragging = false;
    shelfDrag.pointerId = event.pointerId;
    shelfDrag.startX = event.clientX;
    shelfDrag.startY = event.clientY;
    shelfDrag.startPosition = targetPosition;
  }

  function onShelfPointerMove(event) {
    if (!shelfDrag.active || event.pointerId !== shelfDrag.pointerId) return;
    const deltaX = event.clientX - shelfDrag.startX;
    const deltaY = event.clientY - shelfDrag.startY;
    if (!shelfDrag.dragging) {
      if (Math.abs(deltaX) < 8 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      shelfDrag.dragging = true;
      canvas.classList.add("is-shelf-dragging");
      canvas.setPointerCapture?.(event.pointerId);
      setHovered(-1);
    }
    targetPosition = shelfDrag.startPosition - deltaX / shelfSlotPixels();
    requestFrame();
  }

  function onShelfPointerEnd(event) {
    if (!shelfDrag.active || event.pointerId !== shelfDrag.pointerId) return;
    if (shelfDrag.dragging) {
      targetPosition = Math.round(targetPosition);
      shelfDrag.suppressClick = event.type === "pointerup";
      canvas.classList.remove("is-shelf-dragging");
      if (canvas.hasPointerCapture?.(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      updateSelection(mod(Math.round(targetPosition), BOOKS.length), true);
      requestFrame();
    }
    shelfDrag.active = false;
    shelfDrag.dragging = false;
    shelfDrag.pointerId = null;
  }

  function setHovered(index) {
    if (hoveredIndex === index) return;
    hoveredIndex = index;
    canvas.classList.toggle("has-book-hover", index >= 0);
    requestFrame();
  }

  function onPointerMove(event) {
    setPointerFromEvent(event);
    requestFrame();
  }

  function onPointerLeave() {
    pointer.ndc.set(3, 3);
    pointerDirty = false;
    detailBookHovered = false;
    setHovered(-1);
    if (!pageDrag.active) {
      canvas.classList.remove("has-page-hover", "has-closed-book-hover");
    }
  }

  function onCanvasClick(event) {
    if (shelfDrag.suppressClick) {
      shelfDrag.suppressClick = false;
      return;
    }
    if (mode === "detail" && !readingOpen && event.button === 0) {
      if (!detailPress.allowClick) return;
      detailPress.allowClick = false;
      setPointerFromEvent(event);
      if (!activeBookAtPointer()) return;
      event.preventDefault();
      setReadingOpen(true);
      return;
    }
    if (mode !== "hero" || event.button !== 0) return;
    setPointerFromEvent(event);
    const clickedBookIndex = bookIndexAtPointer();
    if (clickedBookIndex < 0) return;
    event.preventDefault();
    selectMarker(clickedBookIndex, canvas);
    openDetail(canvas);
  }

  /* Horizontal wheel (trackpad swipe, shift-scroll) moves the shelf; vertical
     wheel is left to the page. In detail mode a plain wheel scrolls the page
     too, and only pinch (ctrl-wheel) reaches OrbitControls to zoom. */
  function onWheel(event) {
    if (mode === "detail") {
      if (!event.ctrlKey && event.target === canvas) event.stopPropagation();
      return;
    }
    if (mode !== "hero") return;
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.shiftKey ? event.deltaY : 0;
    if (!horizontal) return;
    event.preventDefault();
    targetPosition += clamp(horizontal * 0.0022, -0.72, 0.72);
    wheelIdle = 0.14;
    requestFrame();
  }

  let pendingOpen = null;
  let openAfterTransition = false;

  /* Archive headings open their volume: scroll the shelf into view, bring the
     book forward and open it to its title page. */
  function openVolume(index, origin) {
    if (index < 0) return;
    const scrollMargin = parseFloat(getComputedStyle(root).scrollMarginTop) || 0;
    const needsScroll = Math.abs(root.getBoundingClientRect().top - scrollMargin) > 8;
    // Always bring the shelf back first: rendering pauses off screen, so a
    // book put back while out of view would never finish its transition.
    if (needsScroll) {
      root.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
    if (mode === "detail" || mode === "opening") {
      if (activeBook === bookRigs[index]) {
        if (mode === "detail") goToSpread(0);
        else openAfterTransition = true;
        return;
      }
      pendingOpen = { index, origin };
      if (mode === "detail") closeDetail();
      return;
    }
    if (mode === "closing") {
      pendingOpen = { index, origin };
      return;
    }
    window.setTimeout(() => {
      if (disposed || mode !== "hero") return;
      selectMarker(index, origin);
      position = targetPosition;
      bookRigs.forEach((rig, rigIndex) => snapRigToShelfSlot(rig, rigIndex));
      openAfterTransition = true;
      openDetail(origin);
    }, needsScroll && !reducedMotion ? 550 : 0);
  }

  function onDocumentClick(event) {
    const link = event.target instanceof Element
      ? event.target.closest("[data-shelf-open]")
      : null;
    if (!link || !renderer || root.classList.contains("shelf-fallback")) return;
    const index = BOOKS.findIndex((book) => book.id === link.getAttribute("data-shelf-open"));
    if (index < 0) return;
    event.preventDefault();
    openVolume(index, link);
  }

  function openDetail(origin = inspectButton) {
    if (mode !== "hero") return;
    mode = "opening";
    transitionTime = 0;
    readingOpen = false;
    detailBookHovered = false;
    currentSpread = 0;
    resetDetailPress();
    focusReturnTarget = origin === canvas
      ? markerButtons[selectedIndex] || inspectButton
      : origin instanceof HTMLElement
        ? origin
        : inspectButton;
    activeBook = bookRigs[selectedIndex];
    activeBook.contactShadow.visible = false;
    activeBook.fadeMaterials.forEach((material) => {
      material.opacity = 1;
    });
    ensureInterior(activeBook);
    loadClippingImages(activeBook);
    populateDetail(activeBook.data);
    updatePageControls(false);
    detailPanel.inert = false;
    detailPanel.setAttribute("aria-hidden", "false");
    browseUi.inert = true;
    experience.classList.add("mode-detail", "is-opening");
    setHovered(-1);
    configureResponsiveTargets();

    activeBook.root.updateWorldMatrix(true, true);
    activeBook.root.matrixWorld.decompose(
      openingBookPosition,
      openingBookQuaternion,
      openingBookScale
    );
    openingCameraPosition.copy(camera.position);
    openingCameraTarget.copy(transitionCameraTarget);
    openingShelfPosition.copy(shelfStage.position);
    openingMotionPosition.copy(activeBook.motion.position);
    openingMotionQuaternion.copy(activeBook.motion.quaternion);
    openingViewOffsetX = currentViewOffsetX;
    scene.add(activeBook.root);
    activeBook.root.position.copy(openingBookPosition);
    activeBook.root.quaternion.copy(openingBookQuaternion);
    activeBook.root.scale.copy(openingBookScale);
    applyDetailViewOffset();
    controls.enabled = false;
    liveRegion.textContent = `Opening ${activeBook.data.title}. Drag the cover, click the book, or use Open book to begin reading.`;

    const rect = root.getBoundingClientRect();
    if (rect.top < -8 || rect.bottom > window.innerHeight + 8) {
      root.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
    }

    if (reducedMotion) {
      finishOpening();
    }
    requestFrame();
  }

  function applyOpeningPose(progress) {
    const eased = smootherstep(clamp(progress, 0, 1));
    const shelfClearEased = smootherstep(clamp(progress / 0.68, 0, 1));
    inspectBookScale.setScalar(getInspectScale());
    shelfStage.position.lerpVectors(
      openingShelfPosition,
      inspectShelfPosition,
      shelfClearEased
    );
    activeBook.root.position.lerpVectors(
      openingBookPosition,
      inspectPosition,
      eased
    );
    activeBook.root.quaternion.slerpQuaternions(
      openingBookQuaternion,
      inspectBookQuaternion,
      eased
    );
    activeBook.root.scale.lerpVectors(
      openingBookScale,
      inspectBookScale,
      eased
    );
    activeBook.motion.position.lerpVectors(
      openingMotionPosition,
      restingMotionPosition,
      eased
    );
    activeBook.motion.quaternion.slerpQuaternions(
      openingMotionQuaternion,
      restingMotionQuaternion,
      eased
    );
    camera.position.lerpVectors(
      openingCameraPosition,
      inspectCameraPosition,
      eased
    );
    transitionCameraTarget.lerpVectors(
      openingCameraTarget,
      inspectCameraTarget,
      eased
    );
    currentViewOffsetX = lerp(openingViewOffsetX, detailViewOffsetX, eased);
    currentViewOffsetY = lerp(0, detailViewOffsetY, eased);
    applyDetailViewOffset();
    camera.lookAt(transitionCameraTarget);
  }

  function finishOpening() {
    if (!activeBook) return;
    applyOpeningPose(1);
    mode = "detail";
    transitionTime = 1;
    controls.target.copy(inspectCameraTarget);
    controls.enabled = true;
    controls.enableDamping = !reducedMotion;
    controls.update();
    updatePageControls(false);
    experience.classList.remove("is-opening");
    closeButton.focus({ preventScroll: true });
    if (openAfterTransition) {
      openAfterTransition = false;
      setReadingOpen(true);
    }
  }

  function closeDetail() {
    if (mode !== "detail") return;
    cancelPageDrag();
    resetDetailPress();
    mode = "closing";
    transitionTime = 0;
    readingOpen = false;
    detailBookHovered = false;
    currentSpread = 0;
    canvas.classList.remove("has-page-hover", "has-closed-book-hover");
    updatePageControls(false);
    controls.enabled = false;
    closingBookStartPosition.copy(activeBook.root.position);
    closingBookStartQuaternion.copy(activeBook.root.quaternion);
    closingBookStartScale.copy(activeBook.root.scale);
    closingMotionPosition.copy(activeBook.motion.position);
    closingMotionQuaternion.copy(activeBook.motion.quaternion);
    closingCameraPosition.copy(camera.position);
    closingCameraTarget.copy(controls.target);
    closingShelfPosition.copy(shelfStage.position);
    closingViewOffsetX = currentViewOffsetX;
    transitionCameraTarget.copy(closingCameraTarget);
    experience.classList.remove("is-opening");
    alignShelfToSelection();
    closingBookPosition.set(
      0,
      shelfBoardTop + activeBook.base.height * 0.5 + 0.15,
      0.37
    );
    bookRigs.forEach((rig, index) => {
      if (rig !== activeBook && rig.root.parent === shelfStage) {
        snapRigToShelfSlot(rig, index);
      }
    });
    experience.classList.remove("mode-detail");
    detailPanel.setAttribute("aria-hidden", "true");
    detailPanel.inert = true;
    liveRegion.textContent = `Returning ${activeBook.data.title} to the shelf.`;
    if (reducedMotion) {
      finishClosing();
    }
    requestFrame();
  }

  function applyClosingPose(progress) {
    const eased = smootherstep(clamp(progress, 0, 1));
    const shelfReturnEased = smootherstep(
      clamp((progress - 0.24) / 0.76, 0, 1)
    );
    shelfStage.position.lerpVectors(
      closingShelfPosition,
      shelfRestPosition,
      shelfReturnEased
    );
    activeBook.root.position.lerpVectors(
      closingBookStartPosition,
      closingBookPosition,
      eased
    );
    activeBook.root.quaternion.slerpQuaternions(
      closingBookStartQuaternion,
      closingBookQuaternion,
      eased
    );
    activeBook.root.scale.lerpVectors(
      closingBookStartScale,
      closingBookScale,
      eased
    );
    activeBook.motion.position.lerpVectors(
      closingMotionPosition,
      restingMotionPosition,
      eased
    );
    activeBook.motion.quaternion.slerpQuaternions(
      closingMotionQuaternion,
      restingMotionQuaternion,
      eased
    );
    camera.position.lerpVectors(
      closingCameraPosition,
      shelfCameraPosition,
      eased
    );
    transitionCameraTarget.lerpVectors(
      closingCameraTarget,
      shelfCameraTarget,
      eased
    );
    currentViewOffsetX = lerp(closingViewOffsetX, 0, eased);
    currentViewOffsetY = lerp(detailViewOffsetY, 0, eased);
    applyDetailViewOffset();
    camera.lookAt(transitionCameraTarget);
  }

  function finishClosing() {
    if (!activeBook) return;
    applyClosingPose(1);
    shelfStage.attach(activeBook.root);
    snapRigToShelfSlot(activeBook, selectedIndex);
    activeBook.contactShadow.visible = true;
    releaseInterior(activeBook);
    controls.target.copy(shelfCameraTarget);
    browseUi.inert = false;
    mode = "hero";
    transitionTime = 0;
    activeBook = null;
    liveRegion.textContent = `${BOOKS[selectedIndex].title} returned to the shelf.`;
    if (pendingOpen) {
      const next = pendingOpen;
      pendingOpen = null;
      openVolume(next.index, next.origin);
      return;
    }
    requestAnimationFrame(() => focusReturnTarget?.focus?.({ preventScroll: true }));
  }

  function resetInspectionView() {
    if (mode !== "detail") return;
    camera.position.copy(inspectCameraPosition);
    controls.target.copy(inspectCameraTarget);
    controls.update();
    liveRegion.textContent = `Inspection view reset for ${BOOKS[selectedIndex].title}.`;
    requestFrame();
  }

  function updateShelfLayout(delta, elapsed) {
    if (mode === "hero") {
      position = reducedMotion
        ? targetPosition
        : damp(position, targetPosition, 9.5, delta);
      if (Math.abs(position - targetPosition) < 0.0005) position = targetPosition;

      if (wheelIdle > 0) {
        wheelIdle -= delta;
        if (wheelIdle <= 0) targetPosition = Math.round(targetPosition);
      }

      const nearest = mod(Math.round(position), BOOKS.length);
      if (nearest !== selectedIndex) updateSelection(nearest, false);
    }

    bookRigs.forEach((rig, index) => {
      if (rig.root.parent !== shelfStage) return;

      let offset = index - position;
      offset -= Math.round(offset / BOOKS.length) * BOOKS.length;
      const distance = Math.abs(offset);
      const wrappedAcrossSeam = rig.lastOffset !== null
        && Math.abs(offset - rig.lastOffset) > BOOKS.length * 0.5;
      const focus = 1 - clamp(distance, 0, 1);
      const targetX = offset * spacing;
      const targetY = shelfBoardTop + rig.base.height * 0.5 + focus * 0.15;
      const targetZ = 0.13 + focus * 0.24 - Math.min(distance, 2.8) * 0.07;
      const targetRotationY = -offset * 0.105;
      const targetRotationZ = -offset * 0.018;
      const targetScale = 1 + focus * 0.09;
      const speed = reducedMotion ? 1000 : 12;

      if (wrappedAcrossSeam) {
        rig.root.position.x = targetX;
        rig.opacity = 0;
      }
      rig.lastOffset = offset;

      rig.root.position.x = damp(rig.root.position.x, targetX, speed, delta);
      rig.root.position.y = damp(rig.root.position.y, targetY, speed, delta);
      rig.root.position.z = damp(rig.root.position.z, targetZ, speed, delta);
      rig.root.rotation.y = damp(rig.root.rotation.y, targetRotationY, speed, delta);
      rig.root.rotation.z = damp(rig.root.rotation.z, targetRotationZ, speed, delta);
      const nextScale = damp(rig.root.scale.x, targetScale, speed, delta);
      rig.root.scale.setScalar(nextScale);

      const fadeProgress = clamp((distance - 2.55) / 0.7, 0, 1);
      const targetOpacity = 1 - smoothstep(fadeProgress);
      rig.opacity = reducedMotion
        ? targetOpacity
        : damp(rig.opacity, targetOpacity, 18, delta);
      rig.fadeMaterials.forEach((material) => {
        material.opacity = rig.opacity;
      });
      rig.contactShadow.visible = true;
      rig.contactShadow.material.opacity = rig.opacity * 0.24;
      rig.hit.visible = rig.opacity > 0.12;

      const isHovered = hoveredIndex === index && mode === "hero";
      const hoverPreview = isHovered && !reducedMotion;
      const hoverAngle = hoverPreview ? -0.085 : 0;
      rig.frontPivot.rotation.y = damp(
        rig.frontPivot.rotation.y,
        hoverAngle,
        reducedMotion ? 1000 : 13,
        delta
      );
      rig.pagePivots.forEach((pagePivot) => {
        pagePivot.rotation.y = damp(
          pagePivot.rotation.y,
          0,
          reducedMotion ? 1000 : 13,
          delta
        );
        pagePivot.rotation.z = damp(
          pagePivot.rotation.z,
          0,
          reducedMotion ? 1000 : 13,
          delta
        );
        updateFlexiblePage(pagePivot, 0, delta);
      });

      const idle = reducedMotion ? 0 : Math.sin(elapsed * 0.72 + index * 0.8) * 0.012 * focus;
      rig.motion.position.y = damp(rig.motion.position.y, idle + (hoverPreview ? 0.035 : 0), 9, delta);
      rig.motion.rotation.x = damp(
        rig.motion.rotation.x,
        hoverPreview ? pointer.ndc.y * 0.035 : 0,
        10,
        delta
      );
      rig.motion.rotation.y = damp(
        rig.motion.rotation.y,
        hoverPreview ? -pointer.ndc.x * 0.035 : 0,
        10,
        delta
      );
    });
  }

  function updateTransition(delta) {
    if (mode === "opening") {
      transitionTime = Math.min(
        1,
        transitionTime + delta / DETAIL_TRANSITION_DURATION
      );
      applyOpeningPose(transitionTime);
      updatePaginatedBook(activeBook, delta, 0);
      if (transitionTime >= 1) finishOpening();
    } else if (mode === "closing") {
      transitionTime = Math.min(
        1,
        transitionTime + delta / SHELF_TRANSITION_DURATION
      );
      applyClosingPose(transitionTime);
      updatePaginatedBook(activeBook, delta, 0);
      if (transitionTime >= 1) finishClosing();
    } else if (mode === "hero") {
      shelfStage.position.y = damp(shelfStage.position.y, 0, 10, delta);
      shelfStage.position.z = damp(shelfStage.position.z, 0, 10, delta);
      camera.position.x = damp(camera.position.x, shelfCameraPosition.x, 8, delta);
      camera.position.y = damp(camera.position.y, shelfCameraPosition.y, 8, delta);
      camera.position.z = damp(camera.position.z, shelfCameraPosition.z, 8, delta);
      transitionCameraTarget.copy(shelfCameraTarget);
      currentViewOffsetX = 0;
      currentViewOffsetY = 0;
      applyDetailViewOffset();
      camera.lookAt(shelfCameraTarget);
    }
  }

  function updateDust(elapsed) {
    if (reducedMotion) return;
    const dust = scene.getObjectByName("paper-dust");
    if (dust) {
      dust.rotation.y = elapsed * 0.012;
      dust.position.y = Math.sin(elapsed * 0.17) * 0.025;
    }
  }

  function requestFrame() {
    if (!rafId && !suspended && renderer) {
      rafId = requestAnimationFrame(frame);
    }
  }

  function getDetailOpenAmount() {
    if (pageDrag.active && pageDrag.kind === "cover-open") {
      return smoothstep(pageDrag.progress);
    }
    if (!readingOpen) return 0;
    if (pageDrag.active && pageDrag.kind === "cover-close") {
      return 1 - smoothstep(pageDrag.progress);
    }
    return 1;
  }

  function frame(time) {
    rafId = 0;
    const delta = Math.min((time - lastTime) / 1000, 0.05);
    const elapsed = time / 1000;
    lastTime = time;

    if (pointerDirty) updateHover();
    updateShelfLayout(delta, elapsed);
    updateTransition(delta);
    updateDust(elapsed);
    const themeIsMoving = updateTheme(delta);

    if (mode === "detail") {
      if (pageDrag.active) {
        pageDrag.progressVelocity = damp(
          pageDrag.progressVelocity,
          0,
          9,
          delta
        );
      }
      controls.update();
      const openAmount = getDetailOpenAmount();
      // An open spread is twice as wide as the closed book and grows to the
      // left, so slide right by half a cover to keep both pages framed.
      const spreadShift = activeBook.base.width * activeBook.root.scale.x * 0.5 * openAmount;
      activeBook.root.position.x = reducedMotion
        ? inspectPosition.x + spreadShift
        : damp(activeBook.root.position.x, inspectPosition.x + spreadShift, 8, delta);
      updatePaginatedBook(activeBook, delta, openAmount);
    }

    const targetExposure = mode === "hero" || mode === "closing" ? SHELF_EXPOSURE : READING_EXPOSURE;
    renderer.toneMappingExposure = reducedMotion
      ? targetExposure
      : damp(renderer.toneMappingExposure, targetExposure, 4, delta);
    const exposureMoving = Math.abs(renderer.toneMappingExposure - targetExposure) > 0.002;

    renderer.render(scene, camera);

    const shelfMoving = Math.abs(position - targetPosition) > 0.0005 || wheelIdle > 0;
    const shouldContinue = !reducedMotion
      || mode === "opening"
      || mode === "closing"
      || shelfMoving
      || exposureMoving
      || themeIsMoving;
    if (shouldContinue && !suspended) requestFrame();
  }

  function resize() {
    viewWidth = Math.max(1, root.clientWidth);
    viewHeight = Math.max(1, root.clientHeight);
    configureResponsiveTargets();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, viewWidth < 820 ? 1.5 : 2));
    renderer.setSize(viewWidth, viewHeight, false);
    camera.aspect = viewWidth / viewHeight;
    camera.updateProjectionMatrix();

    if (mode === "hero") {
      camera.position.copy(shelfCameraPosition);
      transitionCameraTarget.copy(shelfCameraTarget);
      currentViewOffsetX = 0;
      currentViewOffsetY = 0;
      applyDetailViewOffset();
      camera.lookAt(shelfCameraTarget);
    } else if (mode === "detail" && activeBook) {
      activeBook.root.position.copy(inspectPosition);
      activeBook.root.scale.setScalar(getInspectScale());
      transitionCameraTarget.copy(inspectCameraTarget);
      currentViewOffsetX = detailViewOffsetX;
      currentViewOffsetY = detailViewOffsetY;
      applyDetailViewOffset();
      resetInspectionView();
    }
    requestFrame();
  }

  function keyboardOwnsShelf(event) {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable='true']")) {
      return false;
    }
    return root.contains(document.activeElement) || onScreen;
  }

  function onKeyDown(event) {
    if (event.key === "Escape" && mode === "detail") {
      event.preventDefault();
      closeDetail();
      return;
    }

    if (!keyboardOwnsShelf(event)) return;

    if (
      mode === "detail"
      && !event.metaKey
      && !event.ctrlKey
      && !event.altKey
      && (event.key === "ArrowLeft" || event.key === "ArrowRight")
    ) {
      event.preventDefault();
      turnPage(event.key === "ArrowLeft" ? -1 : 1);
      return;
    }

    if (mode === "detail" && event.key === "Tab") {
      const focusables = [
        closeButton,
        ...outletButtons,
        openBookButton,
        previousPageButton,
        nextPageButton,
        itemLink
      ].filter((element) => !element.disabled && !element.hidden);
      const current = focusables.indexOf(document.activeElement);
      const next = event.shiftKey
        ? (current <= 0 ? focusables.length - 1 : current - 1)
        : (current >= focusables.length - 1 ? 0 : current + 1);
      event.preventDefault();
      focusables[next].focus();
      return;
    }

    if (mode !== "hero" || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1, document.activeElement);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1, document.activeElement);
    }
  }

  function syncSuspended() {
    const wasSuspended = suspended;
    suspended = pageHidden || !inViewport;
    if (suspended && rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (wasSuspended && !suspended) {
      lastTime = performance.now();
      requestFrame();
    }
  }

  function onVisibilityChange() {
    pageHidden = document.hidden;
    if (pageHidden) {
      settlePageDrag(true);
      resetDetailPress();
    }
    syncSuspended();
  }

  function onWindowBlur() {
    settlePageDrag(true);
    resetDetailPress();
  }

  function onReducedMotionChange(event) {
    cancelPageDrag();
    resetDetailPress();
    reducedMotion = event.matches;
    if (controls) controls.enableDamping = !reducedMotion;
    if (reducedMotion) {
      position = targetPosition;
    }
    requestFrame();
  }

  function showFallback(message) {
    loading.hidden = true;
    experience.classList.remove("webgl-ready");
    experience.classList.add("shelf-fallback");
    fallbackStatus.textContent = message;
  }

  function handleContextLost(event) {
    event.preventDefault();
    cancelPageDrag();
    resetDetailPress();
    suspended = true;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    showFallback("The 3D shelf paused after losing its graphics context. Every clipping is listed below; reload to bring the shelf back.");
  }

  const onPrevious = () => navigate(-1, previousButton);
  const onNext = () => navigate(1, nextButton);
  const onInspect = () => openDetail(inspectButton);
  const onOpenBook = () => setReadingOpen(true);
  const onPreviousPage = () => turnPage(-1);
  const onNextPage = () => turnPage(1);
  const markerHandlers = markerButtons.map((button, index) => () => selectMarker(index, button));

  function disposeExperience() {
    disposed = true;
    suspended = true;
    if (controls) {
      cancelPageDrag();
    }
    resetDetailPress();
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;

    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerleave", onPointerLeave);
    canvas.removeEventListener("click", onCanvasClick);
    canvas.removeEventListener("pointerdown", onShelfPointerDown);
    canvas.removeEventListener("pointermove", onShelfPointerMove);
    canvas.removeEventListener("pointerup", onShelfPointerEnd);
    canvas.removeEventListener("pointercancel", onShelfPointerEnd);
    canvas.removeEventListener("pointerdown", onDetailBookPointerDown, true);
    canvas.removeEventListener("pointermove", onDetailBookPointerMove, true);
    canvas.removeEventListener("pointerup", onDetailBookPointerEnd, true);
    canvas.removeEventListener("pointercancel", onDetailBookPointerEnd, true);
    canvas.removeEventListener("lostpointercapture", onDetailBookPointerEnd, true);
    canvas.removeEventListener("pointerdown", onPagePointerDown, true);
    canvas.removeEventListener("pointermove", onPagePointerMove, true);
    canvas.removeEventListener("pointerup", onPagePointerEnd, true);
    canvas.removeEventListener("pointercancel", onPagePointerEnd, true);
    canvas.removeEventListener("lostpointercapture", onPagePointerEnd, true);
    window.removeEventListener("pointerup", onWindowPagePointerEnd);
    window.removeEventListener("pointercancel", onWindowPagePointerEnd);
    root.removeEventListener("wheel", onWheel, true);
    canvas.removeEventListener("webglcontextlost", handleContextLost);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("blur", onWindowBlur);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    previousButton.removeEventListener("click", onPrevious);
    nextButton.removeEventListener("click", onNext);
    inspectButton.removeEventListener("click", onInspect);
    closeButton.removeEventListener("click", closeDetail);
    openBookButton.removeEventListener("click", onOpenBook);
    document.removeEventListener("click", onDocumentClick);
    previousPageButton.removeEventListener("click", onPreviousPage);
    nextPageButton.removeEventListener("click", onNextPage);
    markerButtons.forEach((button, index) => button.removeEventListener("click", markerHandlers[index]));
    imageCache.forEach(({ image }) => {
      image.onload = null;
      image.onerror = null;
    });

    bookRigs.forEach(releaseInterior);
    controls?.dispose();
    scene?.traverse((object) => {
      object.geometry?.dispose();
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.filter(Boolean).forEach((material) => {
        Object.values(material).forEach((value) => {
          if (value?.isTexture) value.dispose();
        });
        material.dispose();
      });
    });
    environmentTarget?.dispose();
    renderer?.dispose();
    renderer?.forceContextLoss();
  }

  async function initialize() {
    try {
      await Promise.all([
        document.fonts.load(`700 64px ${DISPLAY}`),
        document.fonts.load(`400 18px ${BODY}`),
        document.fonts.load(`600 12px ${BODY}`)
      ]);
    } catch {
      // System fallbacks keep the covers legible if a face fails to load.
    }
    if (disposed) return;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch {
      showFallback("This browser can't draw the 3D shelf. Every clipping is listed below.");
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Neutral rather than the source's ACES Filmic: ACES pushes saturated
    // cloth and pasted photos hot, which made the open pages hard to read.
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = SHELF_EXPOSURE;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(ROOM.linen, 0.027);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    environmentTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = environmentTarget.texture;
    scene.environmentIntensity = 0.72;
    pmremGenerator.dispose();

    camera = new THREE.PerspectiveCamera(32, 1, 0.1, 60);
    shelfStage = new THREE.Group();
    shelfStage.name = "continuous-shelf-stage";
    scene.add(shelfStage);

    configureResponsiveTargets();
    camera.position.copy(shelfCameraPosition);
    camera.lookAt(shelfCameraTarget);

    controls = new OrbitControls(camera, canvas);
    controls.enabled = false;
    controls.enableDamping = !reducedMotion;
    controls.dampingFactor = 0.075;
    controls.enablePan = true;
    controls.screenSpacePanning = true;
    controls.minDistance = 2.8;
    controls.maxDistance = 7.2;
    controls.minPolarAngle = Math.PI * 0.24;
    controls.maxPolarAngle = Math.PI * 0.76;
    controls.target.copy(shelfCameraTarget);
    controls.addEventListener("change", requestFrame);
    // OrbitControls sets an inline touch-action: none, which blocked page
    // scroll over the shelf on phones. The stylesheet owns touch-action:
    // pan-y on the shelf, none only while a book is open.
    canvas.style.touchAction = "";

    RectAreaLightUniformsLib.init();
    addRoom();
    addLights();
    addDust();

    bookRigs = BOOKS.map((book, index) => {
      const rig = createBookRig(book, index);
      shelfStage.add(rig.root);
      return rig;
    });

    updateSelection(0, false);
    resize();
    // Seat every book in its slot before the first frame, so the canvas fades
    // in on a finished shelf instead of books rising through the board.
    bookRigs.forEach((rig, index) => snapRigToShelfSlot(rig, index));

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("pointerdown", onShelfPointerDown);
    canvas.addEventListener("pointermove", onShelfPointerMove);
    canvas.addEventListener("pointerup", onShelfPointerEnd);
    canvas.addEventListener("pointercancel", onShelfPointerEnd);
    canvas.addEventListener("pointerdown", onDetailBookPointerDown, { capture: true });
    canvas.addEventListener("pointermove", onDetailBookPointerMove, { capture: true });
    canvas.addEventListener("pointerup", onDetailBookPointerEnd, { capture: true });
    canvas.addEventListener("pointercancel", onDetailBookPointerEnd, { capture: true });
    canvas.addEventListener("lostpointercapture", onDetailBookPointerEnd, { capture: true });
    canvas.addEventListener("pointerdown", onPagePointerDown, { capture: true });
    canvas.addEventListener("pointermove", onPagePointerMove, { capture: true });
    canvas.addEventListener("pointerup", onPagePointerEnd, { capture: true });
    canvas.addEventListener("pointercancel", onPagePointerEnd, { capture: true });
    canvas.addEventListener("lostpointercapture", onPagePointerEnd, { capture: true });
    window.addEventListener("pointerup", onWindowPagePointerEnd);
    window.addEventListener("pointercancel", onWindowPagePointerEnd);
    root.addEventListener("wheel", onWheel, { capture: true, passive: false });
    canvas.addEventListener("webglcontextlost", handleContextLost);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onWindowBlur);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(root);
    intersectionObserver = new IntersectionObserver(([entry]) => {
      // Arrow keys belong to the shelf while most of it is on screen; rendering
      // pauses only once it has scrolled fully out of view.
      onScreen = entry.isIntersecting && entry.intersectionRatio > 0.35;
      inViewport = entry.isIntersecting;
      syncSuspended();
    }, { threshold: [0, 0.35] });
    intersectionObserver.observe(root);

    previousButton.addEventListener("click", onPrevious);
    nextButton.addEventListener("click", onNext);
    inspectButton.addEventListener("click", onInspect);
    closeButton.addEventListener("click", closeDetail);
    openBookButton.addEventListener("click", onOpenBook);
    document.addEventListener("click", onDocumentClick);
    previousPageButton.addEventListener("click", onPreviousPage);
    nextPageButton.addEventListener("click", onNextPage);
    markerButtons.forEach((button, index) => button.addEventListener("click", markerHandlers[index]));

    renderer.render(scene, camera);
    loading.hidden = true;
    experience.classList.add("webgl-ready");
    requestFrame();
  }

  initialize().catch(() => {
    if (!disposed) {
      showFallback("The 3D shelf couldn't be prepared. Every clipping is listed below.");
    }
  });

  return disposeExperience;
}
