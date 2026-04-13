/**
 * Legacy nested URL intentionally removed; 410 signals “gone” to crawlers.
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
