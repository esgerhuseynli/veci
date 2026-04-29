import { ImageResponse } from "next/og";

export const alt = "Veci Beauty House — kirpik, makiyaj və dəriyə qulluq";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #F5EFE6 0%, #E8C9BB 45%, #C9897A 100%)",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#3D2B2B",
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "0.12em" }}>
            Veci
          </div>
          <div
            style={{
              fontSize: 56,
              fontStyle: "italic",
              color: "#C9897A",
              marginTop: 4,
            }}
          >
            Beauty House
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 22,
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            Kirpik · Makiyaj · Dəriyə qulluq
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
