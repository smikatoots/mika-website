export type Ga4EventParams = {
  cta_label: string;
  cta_location: string;
  destination_url: string;
  link_type: string;
  page_path?: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}

export function trackGa4Event(eventName: string, params: Ga4EventParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, {
    ...params,
    page_path: params.page_path ?? window.location.pathname,
  });
}
