import Card from "../ui/Card";

export default function PlanCard({ user }) {
  const planName = user.plan || "FREE";
  const expiryDate = user.plan_end_date || user.end_date;

  return (
    <Card>
      <h2 className="font-semibold mb-3">Plan</h2>

      <div className="space-y-2 text-sm">
        <p>
          Plan Name:{" "}
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              planName === "PREMIUM"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {planName}
          </span>
        </p>

        <p>
          Expiry Date:{" "}
          <span className="font-medium">
            {expiryDate
              ? new Date(expiryDate).toLocaleDateString("en-GB")
              : "-"}
          </span>
        </p>
      </div>
    </Card>
  );
}
