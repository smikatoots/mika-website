/**
 * Legacy URL intentionally removed; 410 signals “gone” to crawlers (vs 404 unknown).
 */
function gone() {
  return new Response(null, { status: 410, statusText: "Gone" });
}

export function GET() {
  return gone();
}

export function HEAD() {
  return gone();
}
