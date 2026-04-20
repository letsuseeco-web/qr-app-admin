import { getSettings, updateSettings } from "../services/api";

// 🔹 GET QR DESIGN (type-based)
export const getQRDesign = async (type = "sticker") => {
  try {
    const res = await getSettings();

    // res already object hai
    return res?.[type] || {};
  } catch (err) {
    console.error("QR Design load error:", err.message);
    return {};
  }
};

// 🔹 SAVE QR DESIGN
export const saveQRDesign = async (type, data) => {
  try {
    await updateSettings(type, {
      value: data,
    });

    return true;
  } catch (err) {
    console.error("QR Design save error:", err.message);
    throw err;
  }
};