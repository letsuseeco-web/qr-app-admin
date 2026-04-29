import { QRCodeCanvas } from "qrcode.react";
import { APP_CONFIG } from "@/config/appConfig";

export default function StickerPreview({ design = {}, qrCode = "DEMO123" }) {
  return (
    <div className="w-[420px] h-[160px] bg-white border rounded-xl flex overflow-hidden shadow">

      {/* LEFT BRAND */}
      <div className="w-10 bg-gray-100 flex items-center justify-center">
        <span className="rotate-[-90deg] text-xs font-semibold">
          {design.left_brand || "BRAND"}
        </span>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex">

        {/* LEFT TEXT */}
        <div className="w-2/3 bg-yellow-400 px-4 py-5 flex flex-col justify-between">

          <div>
            <h2 className="font-extrabold text-xl leading-tight">
              {design.title || "Scan Me"}
            </h2>

            <p className="text-sm mt-2">
              {design.line1}
            </p>

            <p className="text-sm">
              {design.line2}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold">
              {design.website}
            </p>

            <p className="text-xs">
              {design.footer}
            </p>
          </div>

        </div>

        {/* QR SIDE */}
        <div className="w-1/3 bg-white flex flex-col items-center justify-center">

          <QRCodeCanvas
            value={`${APP_CONFIG.scanBaseUrl}/scan/${qrCode}`}
            size={80}
          />

          <div className="text-xs font-bold mt-2">
            ID: {qrCode}
          </div>

        </div>

      </div>

      {/* RIGHT BRAND */}
      <div className="w-10 bg-yellow-400 flex items-center justify-center">
        <span className="rotate-90 text-xs font-semibold">
          {design.right_brand || "LOGO"}
        </span>
      </div>

    </div>
  );
}