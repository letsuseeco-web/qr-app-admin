import { useEffect, useState } from "react";
import { getUserQRLogs } from "../../services/api";

export default function UserQRLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const res = await getUserQRLogs();
      setLogs(res?.data || res || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search filter
  const filteredLogs = logs.filter((l) =>
    `${l.user_id} ${l.qr_code} ${l.action}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="font-semibold mb-4">User QR Logs</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search user / QR / action..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-72"
      />

      {/* 📊 TABLE */}
      <table className="w-full text-sm border rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">User ID</th>
            <th className="p-2">QR Code</th>
            <th className="p-2">Action</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>

        <tbody>
          {filteredLogs.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center p-4">
                No logs found
              </td>
            </tr>
          ) : (
            filteredLogs.map((l, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">

                <td className="p-2">{l.user_id}</td>

                <td className="p-2 font-medium">{l.qr_code}</td>

                {/* 🔥 Action Highlight */}
                <td className="p-2">
                  {l.action === "ACTIVATED" && (
                    <span className="text-green-600">Activated</span>
                  )}
                  {l.action === "ASSIGNED" && (
                    <span className="text-blue-600">Assigned</span>
                  )}
                  {l.action === "REMOVED" && (
                    <span className="text-red-600">Removed</span>
                  )}
                  {!["ACTIVATED","ASSIGNED","REMOVED"].includes(l.action) &&
                    l.action}
                </td>

                <td className="p-2">
                  {l.created_at
                    ? new Date(l.created_at).toLocaleString()
                    : "-"}
                </td>

              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}