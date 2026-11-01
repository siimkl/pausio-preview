import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Pausio.eu — Lock distractions away. Get your time back.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "72px", color: "#202421", background: "#f7f7f2", fontFamily: "sans-serif" }}><div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}><div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 2, marginBottom: 65 }}>Pausio.eu</div><div style={{ fontSize: 76, fontWeight: 750, letterSpacing: -5, lineHeight: .95 }}>Lock distractions away. Get your time back.</div><div style={{ fontSize: 24, color: "#687068", marginTop: 35 }}>One timer lock. Three boxes. No app required.</div></div><div style={{ width: 290, height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 28, background: "#d5d0c2", boxShadow: "0 28px 70px #20242122" }}><div style={{ width: 68, height: 86, display: "flex", alignItems: "center", justifyContent: "center", border: "10px solid #a8aaa5", borderBottom: "0px", borderRadius: "34px 34px 0 0" }} /><div style={{ width: 125, height: 135, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 18, color: "#9cb7a6", background: "#292e2c", fontFamily: "monospace", fontSize: 28 }}>08:00</div></div></div>, size); }
