"use client";

type GaEventParams = Record<string, string | number | boolean | undefined>;

type GtagFunction = (
  command: "event",
  eventName: string,
  params?: GaEventParams,
) => void;

type WindowWithGtag = Window & {
  gtag?: GtagFunction;
};

export function trackGaEvent(
  eventName: string,
  params?: GaEventParams,
): void {
  if (typeof window === "undefined") {
    return;
  }

  const win = window as WindowWithGtag;
  if (!win.gtag) {
    return;
  }

  win.gtag("event", eventName, params);
}
