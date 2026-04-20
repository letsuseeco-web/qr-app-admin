import Card from "../ui/Card";

export default function ContactsCard({ user }) {
  const contacts = user.contacts || [];

  return (
    <Card>
      <h2 className="font-semibold mb-3">Emergency Contacts</h2>

      {contacts.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No emergency contacts added yet
        </p>
      ) : (
        contacts.map((c, i) => (
          <div key={i} className="border-b py-2 text-sm">

            <span className="font-medium">
              {c.name || "Unnamed"}
            </span>

            {c.relation && (
              <span className="text-gray-500 ml-1">
                ({c.relation})
              </span>
            )}

            <span className="ml-2">-</span>

            <span className="ml-2">
              {c.phone || "-"}
            </span>

          </div>
        ))
      )}
    </Card>
  );
}