import Card from "../ui/Card";
import Button from "../ui/Button";

export default function WalletCard({ user, onView }) {
  const transactions = user.transactions || [];

  return (
    <Card>
      <h2 className="font-semibold mb-3">Wallet</h2>

      {/* BALANCE */}
      <p className="text-green-600 font-semibold text-lg mb-4">
        ₹{user.balance || 0}
      </p>

      {/* TRANSACTIONS HEADING */}
      <h3 className="text-sm font-medium mb-2 text-gray-600">
        Recent Transactions
      </h3>

      {/* EMPTY STATE */}
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-sm mb-3">
          No transactions yet
        </p>
      ) : (
        <div className="space-y-2 mb-3">

          {transactions.slice(0, 3).map((t, i) => (
            <div
              key={i}
              className="flex justify-between text-sm border-b pb-1"
            >
              {/* LEFT */}
              <span className="capitalize text-gray-700">
                {t.source || t.type}
              </span>

              {/* RIGHT */}
              <span
                className={
                  t.type === "credit"
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {t.type === "credit" ? "+" : "-"}₹{Number(t.amount)}
              </span>
            </div>
          ))}

        </div>
      )}

      {/* BUTTON */}
      <Button size="sm" onClick={onView}>
        View Transactions
      </Button>
    </Card>
  );
}