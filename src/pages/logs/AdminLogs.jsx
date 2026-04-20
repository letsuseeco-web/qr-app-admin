import { useEffect, useState } from "react";
import { getAdminLogs } from "../../services/api";

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const res = await getAdminLogs();
      setLogs(res?.data || res || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search filter (QR / action)
  const filteredLogs = logs.filter((l) =>
    `${l.target} ${l.action}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="font-semibold mb-4">Admin Logs</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by QR / Action..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-64"
      />

      {/* 📊 TABLE */}
      <table className="w-full text-sm border rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Admin ID</th>
            <th className="p-2">Action</th>
            <th className="p-2">Target</th>
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

                <td className="p-2">{l.admin_id}</td>

                {/* 🔥 Action Highlight */}
                <td className="p-2 font-medium">
                  {l.action === "RESET_QR" && (
                    <span className="text-orange-600">Reset QR</span>
                  )}
                  {l.action === "TOGGLE_QR" && (
                    <span className="text-blue-600">Toggle QR</span>
                  )}
                  {l.action === "VIEW_PIN" && (
                    <span className="text-purple-600">Viewed PIN</span>
                  )}
                  {!["RESET_QR","TOGGLE_QR","VIEW_PIN"].includes(l.action) &&
                    l.action}
                </td>

                <td className="p-2">{l.target}</td>

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