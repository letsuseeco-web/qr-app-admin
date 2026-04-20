import Card from "../ui/Card";

export default function MedicalCard({ user }) {
  const isEmpty =
    !user.blood_group && !user.conditions && !user.allergies;

  return (
    <Card>
      <h2 className="font-semibold mb-3">Medical</h2>

      {isEmpty ? (
        <p className="text-gray-500 text-sm">
          No medical info added
        </p>
      ) : (
        <div className="space-y-1 text-sm">
          <p>Blood Group: {user.blood_group || "-"}</p>
          <p>Conditions: {user.conditions || "-"}</p>
          <p>Allergies: {user.allergies || "-"}</p>
        </div>
      )}
    </Card>
  );
}