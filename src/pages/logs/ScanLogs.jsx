import { useEffect, useState } from "react";
import { getScanLogs } from "../../services/api";

export default function ScanLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 5; // 🔥 rows per page

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const res = await getScanLogs();
    setLogs(res?.data || res || []);
  };

  // 🔍 SEARCH FILTER
  const filteredLogs = logs.filter((l) =>
    l.qr_code.toLowerCase().includes(search.toLowerCase())
  );

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredLogs.length / limit);

  const paginatedLogs = filteredLogs.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <div>
      <h2 className="font-semibold mb-4">Scan Logs</h2>

      {/* 🔍 SEARCH */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by QR Code..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page
          }}
          className="border p-2 rounded w-64"
        />
      </div>

      {/* 📊 TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">QR Code</th>
              <th className="p-2">IP</th>
              <th className="p-2">Device</th>
              <th className="p-2">Location</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>

          <tbody>
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No logs found
                </td>
              </tr>
            ) : (
              paginatedLogs.map((l, i) => (
                <tr key={i} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-medium">{l.qr_code}</td>
                  <td className="p-2">{l.ip_address || "-"}</td>
                  <td className="p-2">{l.device_info || "-"}</td>
                  <td className="p-2">{l.location || "Unknown"}</td>
                  <td className="p-2">
                    {l.scanned_at
                      ? new Date(l.scanned_at).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 📄 PAGINATION CONTROLS */}
      <div className="flex justify-between items-center mt-4">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>
    </div>
  );
}