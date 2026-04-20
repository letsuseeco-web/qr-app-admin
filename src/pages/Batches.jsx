import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { createBatch } from "../logic/batches.api";
import { getAllBatches } from "../services/api";

export default function Batches() {
  const navigate = useNavigate();

  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(10);
  const [tag, setTag] = useState("");
  const [batchPreview, setBatchPreview] = useState("BATCH_0001");

  // 🔥 fetch batches
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await getAllBatches();
      const data = Array.isArray(res) ? res : res?.data;
      setBatches(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load batches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // 🔥 preview next batch
  useEffect(() => {
    if (batches.length > 0) {
      const last = batches[0].id;
      const num = parseInt(last.split("_")[1]) + 1;
      setBatchPreview(`BATCH_${String(num).padStart(4, "0")}`);
    } else {
      setBatchPreview("BATCH_0001");
    }
  }, [batches]);

  // 🔥 generate
  const handleGenerate = async () => {
    if (count <= 0 || count > 500) {
      alert("Enter valid count (1–500)");
      return;
    }

    try {
      setLoading(true);
      await createBatch(count, tag);
      setIsOpen(false);
      setTag("");
      await fetchBatches();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Batches</h1>
          <p className="text-sm text-gray-500">
            Manage and track all QR batches
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)}>
          + Generate Batch
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}

      {/* Table */}
      <Card>
        {loading ? (
          <div className="p-6 text-center text-gray-500">
            Loading batches...
          </div>
        ) : batches.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No batches found. Generate your first batch 🚀
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="p-3">Batch</th>
                <th>Tag</th>
                <th>Total</th>
                <th>Unused</th>
                <th>Active</th>
                <th>Disabled</th>
                <th>Lost</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {batches.map((b) => (
                <tr key={b.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{b.id}</td>

                  <td className="text-gray-600">
                    {b.tag || "-"}
                  </td>

                  <td className="font-medium">{b.total}</td>

                  <td className="text-gray-500">{b.unused}</td>

                  <td className="text-green-600 font-medium">
                    {b.active}
                  </td>

                  <td className="text-yellow-600 font-medium">
                    {b.disabled || 0}
                  </td>

                  <td className="text-red-600 font-medium">
                    {b.lost}
                  </td>

                  <td>
                    <Button
                      size="sm"
                      onClick={() => navigate(`/batches/${b.id}`)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* 🔥 MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

            <h2 className="font-semibold mb-4 text-lg">
              Generate Batch
            </h2>

            {/* Batch No */}
            <div className="mb-3">
              <label className="text-sm text-gray-500">Batch No</label>
              <Input value={batchPreview} disabled />
            </div>

            {/* Count */}
            <div className="mb-3">
              <label className="text-sm text-gray-500">
                No. of QR (Max 500)
              </label>
              <Input
                type="number"
                value={count}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= 500) setCount(val);
                }}
              />
              <p className="text-xs text-gray-400 mt-1">
                Maximum allowed: 500
              </p>
            </div>

            {/* Tag */}
            <div className="mb-4">
              <label className="text-sm text-gray-500">
                Custom Tag
              </label>
              <Input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="e.g. April Campaign"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleGenerate} loading={loading}>
                Generate
              </Button>
            </div>

          </div>
        </div>
      )}
    </Layout>
  );
}