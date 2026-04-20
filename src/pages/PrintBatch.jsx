import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Button from "../components/ui/Button";
import { getBatchDetails } from "../services/api";
import { getQRDesign } from "../logic/qrdesign.api";
import StickerPreview from "../components/StickerPreview";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PrintBatch() {
  const { batchId } = useParams();

  const [qrs, setQrs] = useState([]);
  const [design, setDesign] = useState({});
  const [copies, setCopies] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getBatchDetails(batchId);
    const allQrs = res?.qrs || [];

    const unused = allQrs.filter(
      (q) => (q.ownership_status || "").toLowerCase() === "unused"
    );

    setQrs(unused);

    const d = await getQRDesign("sticker");
    setDesign(d || {});
  };

  // ✅ COPIES + PIN LOGIC
  const stickers = [];
  qrs.forEach((q) => {
    for (let i = 0; i < copies; i++) {
      stickers.push({
        qr: q.qr_code,
        pin: i === 0 ? q.pin : null,
      });
    }
  });

  // ✅ PAGINATION (A4 height based)
  const STICKER_HEIGHT = 180;
  const PAGE_HEIGHT = 1123;

  const perPage = Math.floor(PAGE_HEIGHT / STICKER_HEIGHT);

  const pages = [];
  for (let i = 0; i < stickers.length; i += perPage) {
    pages.push(stickers.slice(i, i + perPage));
  }

  // 🔥 DOWNLOAD SAME PREVIEW AS PDF
  const downloadPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    for (let p = 0; p < pages.length; p++) {
      setCurrentPage(p);

      await new Promise((r) => setTimeout(r, 300));

      const element = document.getElementById("preview-page");

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const img = canvas.toDataURL("image/png");

      if (p > 0) pdf.addPage();

      pdf.addImage(img, "PNG", 0, 0, 210, 297);
    }

    pdf.save(`stickers_${batchId}.pdf`);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">
              Printing Preview: {batchId}
            </h1>
            <p className="text-sm text-gray-500">
              Unused QRs: {qrs.length}
            </p>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-3">
            <span>Copies:</span>

            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) =>
                setCopies(Number(e.target.value) || 1)
              }
              className="border px-2 py-1 w-16"
            />

            <Button onClick={downloadPDF}>
              Download PDF
            </Button>
          </div>
        </div>

        {/* PAGINATION */}
        {pages.length > 0 && (
          <div className="flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm font-medium">
              Page {currentPage + 1} / {pages.length}
            </span>

            <button
              disabled={currentPage === pages.length - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {/* PREVIEW */}
        <div className="flex justify-center">

          <div
            id="preview-page"
            className="bg-white shadow-lg p-4"
            style={{
              width: "794px",
              height: "1123px",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col gap-4">

              {pages[currentPage]?.map((item, i) => (
                <div key={i} className="flex border border-dashed">

                  {/* STICKER */}
                  <StickerPreview
                    design={design}
                    qrCode={item.qr}
                  />

                  {/* PIN */}
                  <div className="w-[120px] flex flex-col items-center justify-center border-l">
                    {item.pin && (
                      <>
                        <p className="text-xs text-gray-500">
                          PIN
                        </p>
                        <p className="text-lg font-bold">
                          {item.pin}
                        </p>
                        <p className="text-xs">
                          {item.qr}
                        </p>
                      </>
                    )}
                  </div>

                </div>
              ))}

            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
}