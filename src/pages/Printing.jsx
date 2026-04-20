import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getAllBatches } from "../services/api";

export default function Printing() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const res = await getAllBatches();

      // same handling as batches page
      const data = Array.isArray(res) ? res : res?.data;
      setBatches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load batches:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6">

        {/* HEADER */}
        <div className="mb-5">
          <h1 className="text-xl font-semibold">Printing</h1>
          <p className="text-sm text-gray-500 mt-1">
            Select a batch to print QR stickers
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-sm text-gray-500">Loading batches...</p>
        ) : batches.length === 0 ? (
          <div className="bg-white p-4 rounded-xl shadow-sm text-sm text-gray-500">
            No batches available
          </div>
        ) : (
          <div className="space-y-3">

            {batches.map((b) => (
              <div
                key={b.id}
                className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <p className="font-medium">{b.id}</p>

                  <p className="text-xs text-gray-500">
                    Total: {b.total} • Unused: {b.unused}
                  </p>
                </div>

                {/* RIGHT */}
                <button
                  className="text-blue-600 text-sm font-medium hover:underline"
                  onClick={() => navigate(`/printing/${b.id}`)}
                >
                  Print
                </button>
              </div>
            ))}

          </div>
        )}

      </div>
    </Layout>
  );
}