import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius: "30px",
            boxShadow: "0 20px 60px rgba(99, 102, 241, 0.4)",
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            📊 Crypto Market
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#e2e8f0",
              textAlign: "center",
              maxWidth: "800px",
              lineHeight: 1.4,
            }}
          >
            Track live cryptocurrency prices, market cap, and 24h changes
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            color: "#94a3b8",
            fontSize: 24,
          }}
        >
          <span style={{ marginRight: "20px" }}>🚀 Real-time Data</span>
          <span style={{ marginRight: "20px" }}>•</span>
          <span style={{ marginRight: "20px" }}>💰 100+ Coins</span>
          <span style={{ marginRight: "20px" }}>•</span>
          <span>📈 Live Updates</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
