import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { QRCodeCanvas } from "qrcode.react";
import { getQRDesign, saveQRDesign } from "../logic/qrdesign.api";

export default function QRDesign() {
  const [type, setType] = useState("sticker");

  const [form, setForm] = useState({
    title: "",
    line1: "",
    line2: "",
    website: "",
    footer: "",
    left_brand: "",
    right_brand: "",
  });

  const [saving, setSaving] = useState(false);

  // 🔄 LOAD SETTINGS
  useEffect(() => {
    getQRDesign(type).then((data) => {
      if (data) {
        setForm((prev) => ({
          ...prev,
          ...data,
        }));
      }
    });
  }, [type]);

  // 🔄 INPUT CHANGE
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 💾 SAVE
  const handleSave = async () => {
    setSaving(true);
    await saveQRDesign(type, form);
    setSaving(false);
    alert("Saved successfully");
  };

  return (
    <Layout>
      <div className="p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">QR Design</h1>
          <p className="text-gray-500">
            Manage QR templates and layouts
          </p>
        </div>

        {/* TYPE SELECT */}
        <div className="mb-6">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="sticker">Sticker</option>
          </select>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-2 gap-6">

          {/* 🔹 FORM */}
          <Card className="p-4 space-y-4">
            <h2 className="font-semibold text-lg">
              Template Settings
            </h2>

            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />

            <Input
              placeholder="Line 1"
              value={form.line1}
              onChange={(e) => handleChange("line1", e.target.value)}
            />

            <Input
              placeholder="Line 2"
              value={form.line2}
              onChange={(e) => handleChange("line2", e.target.value)}
            />

            <Input
              placeholder="Website"
              value={form.website}
              onChange={(e) => handleChange("website", e.target.value)}
            />

            <Input
              placeholder="Footer"
              value={form.footer}
              onChange={(e) => handleChange("footer", e.target.value)}
            />

            <Input
              placeholder="Left Brand"
              value={form.left_brand}
              onChange={(e) =>
                handleChange("left_brand", e.target.value)
              }
            />

            <Input
              placeholder="Right Brand"
              value={form.right_brand}
              onChange={(e) =>
                handleChange("right_brand", e.target.value)
              }
            />

            <Button className="w-full" onClick={handleSave}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </Card>

          {/* 🔥 PREVIEW */}
          <Card className="p-4 flex items-center justify-center">

            <div className="w-[420px] h-[160px] bg-white border rounded-xl flex overflow-hidden shadow">

              {/* LEFT BRAND */}
              <div className="w-10 bg-gray-100 flex items-center justify-center">
                <span className="rotate-[-90deg] text-xs font-semibold tracking-wide">
                  {form.left_brand || "BRAND"}
                </span>
              </div>

              {/* MAIN */}
              <div className="flex-1 flex">

                {/* LEFT TEXT */}
                <div className="w-2/3 bg-yellow-400 px-4 py-5 flex flex-col justify-between">

                  <div>
                    <h2 className="font-extrabold text-xl leading-tight">
                      {form.title || "Scan Me"}
                    </h2>

                    <p className="text-sm mt-2 font-medium">
                      {form.line1}
                    </p>

                    <p className="text-sm font-medium">
                      {form.line2}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {form.website}
                    </p>

                    <p className="text-xs text-gray-800">
                      {form.footer}
                    </p>
                  </div>

                </div>

                {/* QR SIDE */}
                <div className="w-1/3 bg-white flex flex-col items-center justify-center py-3">

                  <QRCodeCanvas value="AB123456" size={80} />

                  <div className="text-xs font-bold mt-2">
                    ID: AB123456
                  </div>

                </div>

              </div>

              {/* RIGHT BRAND */}
              <div className="w-10 bg-yellow-400 flex items-center justify-center">
                <span className="rotate-90 text-xs font-semibold tracking-wide">
                  {form.right_brand || "LOGO"}
                </span>
              </div>

            </div>

          </Card>

        </div>
      </div>
    </Layout>
  );
}