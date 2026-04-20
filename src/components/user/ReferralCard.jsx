import Card from "../ui/Card";

export default function ReferralCard({ user }) {
  return (
    <Card>
      <h2 className="font-semibold mb-3">Referral</h2>

      {/* Referral Code */}
      <p className="text-sm">
        Refferal Code:{" "}
        <span className="font-medium">
          {user.referral_code || "-"}
        </span>
      </p>

      {/* Referred By */}
      <p className="text-sm">
        Referred By:{" "}
        {user.referred_by_name ? (
          <span className="font-medium">
            {user.referred_by_name}
            <span className="text-gray-500 text-xs ml-2">
              ({user.referred_by})
            </span>
          </span>
        ) : (
          <span className="font-medium">
            {user.referred_by || "-"}
          </span>
        )}
      </p>
    </Card>
  );
}