import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ReferralsCard({ user, onView }) {
  const referrals = user.referrals || [];

  return (
    <Card>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">
          Referrals ({referrals.length})
        </h2>
      </div>

      {/* EMPTY */}
      {referrals.length === 0 ? (
        <p className="text-gray-500 text-sm mb-3">
          No referrals yet
        </p>
      ) : (
        <div className="space-y-2 mb-3">
          {referrals.slice(0, 3).map((r, i) => (
            <div key={i} className="text-sm border-b pb-1">
              {r.name} - {r.phone}
            </div>
          ))}
        </div>
      )}

      {/* ✅ ALWAYS SHOW BUTTON */}
      <Button size="sm" onClick={onView}>
        View Referrals
      </Button>
    </Card>
  );
}