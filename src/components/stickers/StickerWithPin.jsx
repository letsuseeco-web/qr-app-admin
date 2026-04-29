import { QRCodeCanvas } from "qrcode.react";
import { APP_CONFIG } from "@/config/appConfig";

export default function StickerWithPin({ design, qrCode, pin }) {
  return (
    <div
      style={{
        width: "120mm",
        height: "45mm",
        display: "flex",
        background: "#fff",
        overflow: "hidden",
      }}
    >

      {/* LEFT STICKER */}
      <div
        style={{
          width: "90mm",
          height: "45mm",
          display: "flex",
          borderRight: "0.2mm solid #ccc",
        }}
      >

        {/* LEFT BRAND */}
        <div
          style={{
            width: "8mm",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f3f4f6",
          }}
        >
          <span
            style={{
              transform: "rotate(-90deg)",
              fontSize: "8px",
              fontWeight: "bold",
            }}
          >
            {design?.left_brand || "BRAND"}
          </span>
        </div>

        {/* MAIN CONTENT */}
        <div
          style={{
            flex: 1,
            display: "flex",
          }}
        >

          {/* TEXT AREA */}
          <div
            style={{
              width: "60%",
              background: "#facc15",
              padding: "4mm",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "10px", fontWeight: "800" }}>
                {design?.title || "Scan Me"}
              </div>

              <div style={{ fontSize: "7px", marginTop: "2mm" }}>
                {design?.line1}
              </div>

              <div style={{ fontSize: "7px" }}>
                {design?.line2}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "7px", fontWeight: "600" }}>
                {design?.website}
              </div>

              <div style={{ fontSize: "6px" }}>
                {design?.footer}
              </div>
            </div>
          </div>

          {/* QR AREA */}
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QRCodeCanvas value={`${APP_CONFIG.scanBaseUrl}/scan/${qrCode}`} size={70}/>

            <div
              style={{
                fontSize: "6px",
                fontWeight: "bold",
                marginTop: "2mm",
              }}
            >
              {qrCode}
            </div>
          </div>

        </div>

        {/* RIGHT BRAND */}
        <div
          style={{
            width: "8mm",
            background: "#facc15",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              transform: "rotate(90deg)",
              fontSize: "8px",
              fontWeight: "bold",
            }}
          >
            {design?.right_brand || "LOGO"}
          </span>
        </div>

      </div>

      {/* CUT LINE */}
      <div
        style={{
          width: "2mm",
          borderLeft: "0.3mm dashed #999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "5px",
            transform: "rotate(90deg)",
            color: "#999",
          }}
        >
          CUT
        </span>
      </div>

      {/* PIN STRIP */}
      <div
        style={{
          width: "28mm",
          height: "45mm",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f9fafb",
        }}
      >

        <div style={{ fontSize: "6px", color: "#666" }}>
          PIN CODE
        </div>

        <div
          style={{
            fontSize: "12px",
            fontWeight: "800",
            margin: "2mm 0",
          }}
        >
          {pin}
        </div>

        <div style={{ fontSize: "6px" }}>
          ID: {qrCode}
        </div>

        <div
          style={{
            fontSize: "5px",
            marginTop: "2mm",
            color: "#888",
            textAlign: "center",
          }}
        >
          Keep confidential
        </div>

      </div>

    </div>
  );
}