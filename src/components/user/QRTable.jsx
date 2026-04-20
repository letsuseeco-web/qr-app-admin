import Card from "../ui/Card";
import { useNavigate } from "react-router-dom";

export default function QRTable({ user }) {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="font-semibold mb-3">QR Codes</h2>

      {user.qrs.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No QR codes assigned yet
        </p>
      ) : (
        <table className="w-full text-sm">

          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left py-2">QR</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {user.qrs.map((q) => (
              <tr key={q.qr_code} className="border-b">

                <td
                  className="py-2 text-blue-600 cursor-pointer hover:underline"
                  onClick={() => navigate(`/qrs/${q.qr_code}`)}
                >
                  {q.qr_code}
                </td>

                <td>
                  <span className={`px-2 py-1 text-xs rounded ${
                    q.operational_status === "active"
                      ? "bg-green-100 text-green-600"
                      : q.operational_status === "lost"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {q.operational_status}
                  </span>
                </td>

                <td>
                  {q.activated_at
                    ? new Date(q.activated_at).toLocaleDateString("en-GB")
                    : "-"}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}
    </Card>
  );
}