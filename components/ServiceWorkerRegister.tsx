"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    let refreshing = false;

    // When a new service worker takes control of this tab, the JS already
    // running in memory is still the OLD build. Reload once, automatically,
    // so the tab picks up the new bundle instead of silently staying stale
    // (this is what was causing the hamburger menu — and any other recent
    // change — to appear "missing" after a full navigation like OAuth login).
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Proactively ask the browser to check for a new sw.js whenever
        // the tab regains focus/visibility, instead of waiting for the
        // browser's own (much slower) periodic check.
        const checkForUpdate = () => registration.update().catch(() => {});

        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") checkForUpdate();
        });
        window.addEventListener("focus", checkForUpdate);

        // Also check once right away in case a new version shipped while
        // this tab was closed.
        checkForUpdate();
      })
      .catch(() => {
        // Fail silently — SW registration is non-critical
      });
  }, []);

  return null;
}
