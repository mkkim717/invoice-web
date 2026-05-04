"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <html lang="ko">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          fontFamily: "system-ui, sans-serif",
          margin: 0,
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "28rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️</div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              color: "#111",
            }}
          >
            오류가 발생했습니다
          </h1>
          <p style={{ color: "#555", marginBottom: "1.5rem" }}>
            서비스 이용에 불편을 드려 죄송합니다.
            <br />
            잠시 후 다시 시도하거나 홈으로 돌아가 주세요.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#888",
                fontFamily: "monospace",
                marginBottom: "1.5rem",
              }}
            >
              오류 코드: {error.digest}
            </p>
          )}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                padding: "0.5rem 1.25rem",
                background: "#111",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              다시 시도
            </button>
            <a
              href="/"
              style={{
                padding: "0.5rem 1.25rem",
                background: "white",
                color: "#111",
                border: "1px solid #ddd",
                borderRadius: "0.375rem",
                textDecoration: "none",
                fontSize: "0.875rem",
              }}
            >
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
