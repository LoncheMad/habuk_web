"use client";

import { useEffect } from "react";

const APK_URL =
  "https://github.com/LoncheMad/build-artifacts/releases/latest/download/app-release.apk";

export default function GetAndroid() {
  useEffect(() => {
    window.location.href = APK_URL;
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <p>Redirecting to download...</p>
    </div>
  );
}
