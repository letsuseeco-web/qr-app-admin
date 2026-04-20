import Button from "../ui/Button";

export default function TransactionsModal({
  open,
  onClose,
  transactions,
}) {
  if (!open) return null;

  const txns = transactions || [];

  // ✅ Ensure latest first
  const sortedTxns = [...txns].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // ✅ Correct balance (latest transaction)
  const latestBalance =
    sortedTxns.length > 0
      ? Number(sortedTxns[0].balance_after)
      : 0;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[700px] max-h-[80vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Transactions</h2>
          <Button onClick={onClose}>Close</Button>
        </div>

        {/* ✅ CORRECT BALANCE */}
        <div className="mb-4 text-green-600 font-semibold text-lg">
          Balance: ₹{latestBalance}
        </div>

        {/* EMPTY STATE */}
        {sortedTxns.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-2">

            {sortedTxns.map((t, i) => (
              <div
                key={i}
                className="border rounded-md p-3 flex justify-between items-center text-sm"
              >

                {/* LEFT */}
                <div>
                  <p className="font-medium capitalize">
                    {t.source || t.type}
                  </p>

                  <p className="text-xs text-gray-500">
                    {new Date(t.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p
                    className={
                      t.type === "credit"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {t.type === "credit" ? "+" : "-"}₹{Number(t.amount)}
                  </p>

                  {/* ✅ FIXED running balance */}
                  {t.balance_after && (
                    <p className="text-xs text-gray-500">
                      Bal: ₹{Number(t.balance_after)}
                    </p>
                  )}
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}