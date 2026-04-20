import { getSettings, updateSettings } from "../services/api";

// 🔄 Transform backend → UI
export const transformSettings = (data) => {
  const result = {};

  data.forEach((item) => {
    try {
      result[item.key] =
        typeof item.value === "string"
          ? JSON.parse(item.value)
          : item.value;
    } catch {
      result[item.key] = {};
    }
  });

  return result;
};

// 📥 Fetch
export const fetchSettingsData = async () => {
  try {
    const res = await getSettings();

    console.log("🔥 BACKEND RESPONSE:", res);

    // 🔥 CASE 1: already object (your case)
    if (res && typeof res === "object" && !Array.isArray(res)) {
      return res; // ✅ direct return
    }

    // 🔥 CASE 2: array format (future safe)
    const data = res?.data || res;

    if (Array.isArray(data)) {
      return transformSettings(data);
    }

    return {};
  } catch (err) {
    console.error("Fetch error:", err.message);
    return {};
  }
};

// 💾 Save (key-wise)
export const saveSettingsData = async (settings) => {
  try {
    const keys = Object.keys(settings);

    for (const key of keys) {
      await updateSettings(key, {
        value: settings[key],
      });
    }

    return true;
  } catch (err) {
    console.error("Save error:", err.message);
    throw err;
  }
};