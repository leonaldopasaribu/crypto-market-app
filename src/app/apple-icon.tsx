import { ImageResponse } from "@vercel/og";

export const runtime = "edge";
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        }}
      >
        <div
          style={{
            fontSize: 80,
            display: "flex",
          }}
        >
          📊
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
