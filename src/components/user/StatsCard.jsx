import Card from "../ui/Card";

export default function StatsCard({ user }) {
  const qrs = user.qrs || [];
  const transactions = user.transactions || [];

  const total = qrs.length;

  const active = qrs.filter(
    (q) => q.operational_status === "active"
  ).length;

  const lost = qrs.filter(
    (q) => q.operational_status === "lost"
  ).length;

  // ✅ FIXED HERE
  const totalEarned = transactions
    .filter((t) => t.type === "credit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return (
    <Card>
      <h2 className="font-semibold mb-3">Stats</h2>

      <div className="space-y-1 text-sm">
        <p>Total QRs: {total}</p>
        <p>Active QRs: {active}</p>
        <p>Lost QRs: {lost}</p>

        <div className="mt-2 font-medium text-green-600">
          Total Earned: ₹{totalEarned}
        </div>
      </div>
    </Card>
  );
}