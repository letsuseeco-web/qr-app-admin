// src/services/api.js

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ===============================
// 🔥 COMMON REQUEST FUNCTION
// ===============================
const request = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("admin_token");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(options.headers || {})
      }
    });

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Invalid JSON response (check API URL)");
    }

    // 🔐 AUTO LOGOUT
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/";
      return;
    }

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;

  } catch (err) {
    console.error("API ERROR:", err.message);
    throw err;
  }
};



// ===============================
// 🔐 AUTH APIs
// ===============================
export const adminLogin = (payload) =>
  request("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });



// ===============================
// 📊 DASHBOARD APIs
// ===============================
export const getDashboardStats = () =>
  request("/admin/dashboard");



// ===============================
// 👤 USER APIs
// ===============================
export const getAllUsers = () =>
  request("/admin/users");

export const getUserDetails = (userId) =>
  request(`/admin/users/${userId}`);

export const blockUser = (userId) =>
  request(`/admin/users/${userId}/block`, { method: "POST" });

export const unblockUser = (userId) =>
  request(`/admin/users/${userId}/unblock`, { method: "POST" });



// ===============================
// 💰 WALLET APIs
// ===============================
export const getUserTransactions = (userId) =>
  request(`/admin/users/${userId}/transactions`);

export const adjustWallet = (userId, payload) =>
  request(`/admin/users/${userId}/wallet`, {
    method: "POST",
    body: JSON.stringify(payload)
  });

  // ===============================
// 🔳 QR APIs
// ===============================

export const getAllQRs = () =>
  request("/admin/qr");

export const getQRDetails = (qrId) =>
  request(`/admin/qr/${qrId}`);

export const resetQR = (qrId) =>
  request(`/admin/qr/${qrId}/reset`, {
    method: "POST"
  });

// 🔥 ✅ TOGGLE (Enable + Disable SAME API)
export const toggleQR = (qrId) =>
  request(`/admin/qr/${qrId}/toggle`, {
    method: "POST"
  });

// ===============================
// 🚨 LOST MODE (DIFFERENT ROUTE)
// ===============================

// 🔥 enable lost mode
export const enableLostMode = (qrId, reward) =>
  request(`/qr/lost/enable`, {
    method: "POST",
    body: JSON.stringify({
      qr_code: qrId,
      reward
    })
  });

// 🔥 remove lost mode
export const removeLostMode = (qrId) =>
  request(`/qr/lost/disable`, {
    method: "POST",
    body: JSON.stringify({
      qr_code: qrId
    })
  });

// ===============================
// 📦 BATCH APIs (🔥 FIXED)
// ===============================
export const generateQRBatch = (count, tag) =>
  request("/admin/qr/generate-batch", {
    method: "POST",
    body: JSON.stringify({ count, tag })
  });

export const getAllBatches = () =>
  request("/admin/qr/batches");

export const getBatchDetails = (batchId) =>
  request(`/admin/qr/batch/${batchId}`);

// ===============================
// 📜 LOG APIs
// ===============================

export const getScanLogs = () =>
  request("/admin/logs/scans");

export const getActivationLogs = () =>
  request("/admin/logs/activations");

export const getLostLogs = () =>
  request("/admin/logs/lost");

export const getAdminLogs = () =>
  request("/admin/logs/admin");

export const getUserQRLogs = () =>
  request("/admin/logs/user-qr");

// ===============================
// 💳 PLAN APIs
// ===============================
export const getAdminPlans = () =>
  request("/admin/plans");

export const updateAdminPlan = (planId, payload) =>
  request(`/admin/plans/${planId}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });

// ===============================
// 💸 PAYMENTS APIs
// ===============================
export const getAdminPayments = () =>
  request("/admin/payments");

// ===============================
// 💳 PAYMENT SETTINGS APIs
// ===============================
export const getPaymentSettings = () =>
  request("/admin/payment-settings");

export const updatePaymentSettings = (payload) =>
  request("/admin/payment-settings", {
    method: "PUT",
    body: JSON.stringify(payload)
  });

// ===============================
// ⚙️ SETTINGS APIs
// ===============================
export const getSettings = () =>
  request("/settings");

export const updateSettings = (key, data) =>
  request(`/settings/${key}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });



// ===============================
// 🔍 SEARCH / FILTER (optional)
// ===============================
export const searchUsers = (query) =>
  request(`/admin/users?search=${query}`);

export const searchQRs = (query) =>
  request(`/admin/qr?search=${query}`);

// ===============================
export { request };

// ===============================
// BLOCK USER
// ===============================
export const toggleBlockUser = async (userId) => {
  const res = await fetch(`/api/admin/users/${userId}/toggle-block`, {
    method: "PATCH",
  });

  if (!res.ok) {
    throw new Error("Failed to toggle user status");
  }

  return res.json();
};
