import Button from "../ui/Button";

export default function ReferralsModal({ open, onClose, referrals }) {
  if (!open) return null;

  const list = referrals || [];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[600px] max-h-[80vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">
            Referrals ({list.length})
          </h2>

          <Button size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        {/* EMPTY STATE */}
        {list.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No referrals yet
          </p>
        ) : (
          <div className="space-y-2">

            {list.map((r, i) => (
              <div
                key={i}
                className="border rounded-md p-3 flex justify-between items-center text-sm"
              >

                {/* LEFT */}
                <div>
                  <p className="font-medium">
                    {r.name || "Unnamed"}
                  </p>

                  <p className="text-xs text-gray-500">
                    Joined:{" "}
                    {r.created_at
                      ? new Date(r.created_at).toLocaleDateString("en-GB")
                      : "-"}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="font-medium">
                    {r.phone || "-"}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}