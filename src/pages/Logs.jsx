import { useState } from "react";
import Layout from "../components/layout/Layout";

import ScanLogs from "./logs/ScanLogs";
import ActivationLogs from "./logs/ActivationLogs";
import LostLogs from "./logs/LostLogs";
import AdminLogs from "./logs/AdminLogs";
import UserQRLogs from "./logs/UserQRLogs";

export default function Logs() {
  const [activeTab, setActiveTab] = useState("scan");

  const tabs = [
    { key: "scan", label: "Scan Logs" },
    { key: "activation", label: "Activation Logs" },
    { key: "lost", label: "Lost Logs" },
    { key: "admin", label: "Admin Logs" },
    { key: "user", label: "User QR Logs" },
  ];

  return (
    <Layout>
      <div className="p-6">

        {/* 🔥 TOP TABS */}
        <div className="flex gap-2 mb-6 border-b pb-2 overflow-x-auto">

          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
                activeTab === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}

        </div>

        {/* 🔥 CONTENT */}
        <div className="bg-white p-4 rounded shadow">

          {activeTab === "scan" && <ScanLogs />}
          {activeTab === "activation" && <ActivationLogs />}
          {activeTab === "lost" && <LostLogs />}
          {activeTab === "admin" && <AdminLogs />}
          {activeTab === "user" && <UserQRLogs />}

        </div>

      </div>
    </Layout>
  );
}