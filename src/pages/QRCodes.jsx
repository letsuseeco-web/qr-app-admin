import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";


import { getAllQRs } from "../services/api";

export default function QRCodes() {
  const navigate = useNavigate();

  const [qrs, setQrs] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [batchFilter, setBatchFilter] = useState("all");

  const [page, setPage] = useState(1);
  const limit = 10;

  // 🔥 FETCH
  const fetchQRs = async () => {
    try {
      setLoading(true);
      const res = await getAllQRs();
      const data = res?.data || res || [];
      setQrs(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRs();
  }, []);

  // 🔥 STATUS LOGIC
  const getStatus = (qr) => {
    if (qr.operational_status !== "active") return "disabled";
    if (qr.ownership_status === "unused") return "unused";
    return "active";
  };

  // 🔥 UNIQUE BATCHES
  const batches = [
    ...new Set(qrs.map((q) => q.batch_id).filter(Boolean)),
  ];

  // 🔥 FILTER + SEARCH
  useEffect(() => {
    let data = [...qrs];

    if (filter !== "all") {
      data = data.filter((qr) => getStatus(qr) === filter);
    }

    if (batchFilter !== "all") {
      data = data.filter((qr) => qr.batch_id === batchFilter);
    }

    if (search.trim()) {
      data = data.filter((qr) =>
        qr.qr_code.toLowerCase().includes(search.toLowerCase()) ||
        qr.user_name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(data);
    setPage(1);
  }, [search, filter, batchFilter, qrs]);

  // 🔥 PAGINATION
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit));
  const start = (page - 1) * limit;
  const currentData = filtered.slice(start, start + limit);

  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">QR Codes</h1>
        <p className="text-sm text-gray-500">
          Manage and track all QR codes
        </p>
      </div>

      {/* 🔥 FILTERS (FULL WIDTH) */}
      <div className="mb-6">
        <div className="bg-white shadow rounded-xl p-4 flex gap-4 w-full">

          {/* Search */}
          <Input
            className="flex-[2]"
            placeholder="Search QR or User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status */}
          <select
            className="flex-1 border rounded px-3 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unused">Unused</option>
            <option value="disabled">Disabled</option>
          </select>

          {/* Batch */}
          <select
            className="flex-1 border rounded px-3 py-2"
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
          >
            <option value="all">All Batches</option>
            {batches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Reset */}
          <Button
            onClick={() => {
              setSearch("");
              setFilter("all");
              setBatchFilter("all");
            }}
          >
            Reset
          </Button>

        </div>
      </div>

      {/* TABLE */}
      <Card className="rounded-2xl shadow-sm border">
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading QR codes...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No QR codes found
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="pl-0 pr-3 py-3">S.No</th>
                  <th>QR ID</th>
                  <th>Batch</th>
                  <th>Status</th>
                  <th>User</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentData.map((qr, i) => (
                  <tr key={qr.qr_code} className="border-b hover:bg-gray-50">

                    <td className="p-3">
                      {start + i + 1}
                    </td>

                    <td className="font-semibold text-blue-600">
                      {qr.qr_code}
                    </td>

                    <td>{qr.batch_id || "-"}</td>

                    <td>
                      {getStatus(qr) === "active" && (
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                          Active
                        </span>
                      )}
                      {getStatus(qr) === "unused" && (
                        <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          Unused
                        </span>
                      )}
                      {getStatus(qr) === "disabled" && (
                        <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                          Disabled
                        </span>
                      )}
                    </td>

                    <td>
                      {qr.user_name ? (
                        <>
                          <div className="font-medium">
                            {qr.user_name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {qr.user_phone}
                          </div>
                        </>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <Button
                        size="sm"
                        onClick={() =>
                          navigate(`/qrs/${qr.qr_code}`)
                        }
                      >
                        View
                      </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-center items-center gap-4 mt-6">

              <Button
                size="sm"
                disabled={page <= 1}
                onClick={() =>
                  setPage((p) => Math.max(1, p - 1))
                }
              >
                Prev
              </Button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <Button
                size="sm"
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </Button>

            </div>
          </>
        )}
      </Card>
    </Layout>
  );
}