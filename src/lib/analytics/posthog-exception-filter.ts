import type { CaptureResult } from "posthog-js";

const WEBKIT_MESSAGE_HANDLERS_ERROR = "window.webkit.messageHandlers";

function referencesMissingWebKitBridge(value: unknown): boolean {
  return (
    typeof value === "string" && value.includes(WEBKIT_MESSAGE_HANDLERS_ERROR)
  );
}

/**
 * Drops known browser-environment noise produced when WKWebView-specific code
 * runs without an available bridge. This site does not use that bridge, but
 * global exception capture attributes the error to whichever page is open.
 */
export function filterPostHogEvent(
  event: CaptureResult | null,
): CaptureResult | null {
  if (event?.event !== "$exception") {
    return event;
  }

  if (referencesMissingWebKitBridge(event.properties.$exception_message)) {
    return null;
  }

  const exceptionList = event.properties.$exception_list;
  if (
    Array.isArray(exceptionList) &&
    exceptionList.some(
      (exception) =>
        typeof exception === "object" &&
        exception !== null &&
        "value" in exception &&
        referencesMissingWebKitBridge(exception.value),
    )
  ) {
    return null;
  }

  return event;
}
