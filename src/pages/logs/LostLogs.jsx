import { useEffect, useState } from "react";
import { getLostLogs } from "../../services/api";

export default function LostLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const res = await getLostLogs();
      setLogs(res?.data || res || []);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Search filter
  const filteredLogs = logs.filter((l) =>
    l.qr_code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="font-semibold mb-4">Lost Logs</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by QR Code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-64"
      />

      {/* 📊 TABLE */}
      <table className="w-full text-sm border rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">QR Code</th>
            <th className="p-2">Status</th>
            <th className="p-2">Reward</th>
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

                <td className="p-2 font-medium">{l.qr_code}</td>

                {/* 🔥 Status Badge */}
                <td className="p-2">
                  {l.status === "ENABLED" ? (
                    <span className="text-red-600 font-medium">Lost</span>
                  ) : (
                    <span className="text-green-600 font-medium">Found</span>
                  )}
                </td>

                <td className="p-2">₹{l.reward}</td>

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