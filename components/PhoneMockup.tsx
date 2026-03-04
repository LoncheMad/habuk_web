"use client";

interface PhoneMockupProps {
  label: string;
  screenshotSrc?: string;
  className?: string;
  dark?: boolean;
}

export default function PhoneMockup({
  label,
  screenshotSrc,
  className = "",
  dark = true,
}: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto select-none ${className}`}
      style={{ width: 240, height: 490 }}
    >
      {/* Outer frame */}
      <div
        className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl"
        style={{
          border: dark ? "6px solid #0a2e30" : "6px solid #01191a",
          background: "#01191a",
        }}
      >
        {/* Status bar — only for placeholder */}
        {!screenshotSrc && (
          <div
            className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-5 z-10"
            style={{ background: "#01191a" }}
          >
            <span style={{ color: "#ffffff60", fontSize: 11, fontWeight: 500 }}>9:41</span>
            <div className="flex gap-1 items-center">
              <div style={{ width: 14, height: 7, borderRadius: 2, background: "#ffffff50" }} />
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ffffff50" }} />
              <div style={{ width: 12, height: 7, borderRadius: 2, background: "#ffffff50" }} />
            </div>
          </div>
        )}

        {/* Dynamic island — always shown */}
        <div
          className="absolute z-20"
          style={{
            top: 6, left: "50%", transform: "translateX(-50%)",
            width: 90, height: 22, background: "#000", borderRadius: 20,
          }}
        />

        {/* Screen */}
        {screenshotSrc ? (
          <img
            src={screenshotSrc}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center pt-10">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                border: "1.5px solid #f4002440",
                background: "#f4002415",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: "#f40024aa",
                }}
              />
            </div>
            <p
              style={{
                color: "#ffffff60",
                fontSize: 11,
                lineHeight: 1.5,
                maxWidth: 160,
              }}
            >
              {label}
            </p>
            {/* Fake content lines */}
            <div className="absolute bottom-12 left-6 right-6 flex flex-col gap-2">
              <div
                style={{
                  height: 7,
                  borderRadius: 4,
                  background: "#ffffff0d",
                }}
              />
              <div
                style={{
                  height: 7,
                  borderRadius: 4,
                  background: "#ffffff0d",
                  width: "75%",
                }}
              />
              <div
                style={{
                  height: 7,
                  borderRadius: 4,
                  background: "#ffffff0d",
                  width: "55%",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Physical buttons */}
      <div
        className="absolute"
        style={{
          right: -7,
          top: 110,
          width: 4,
          height: 44,
          borderRadius: 3,
          background: "#01191a",
        }}
      />
      <div
        className="absolute"
        style={{
          left: -7,
          top: 96,
          width: 4,
          height: 30,
          borderRadius: 3,
          background: "#01191a",
        }}
      />
      <div
        className="absolute"
        style={{
          left: -7,
          top: 140,
          width: 4,
          height: 40,
          borderRadius: 3,
          background: "#01191a",
        }}
      />
    </div>
  );
}
