import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import { getAdminPayments } from "../services/api";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await getAdminPayments();

        if (!isMounted) {
          return;
        }

        setPayments(Array.isArray(response) ? response : []);
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load payments");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-sm text-gray-500">
            Track wallet recharge payment attempts and results
          </p>
        </div>

        {error ? (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-6 text-sm text-gray-500">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">No payments found</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-gray-500">
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Payment ID</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={`${payment.order_id}-${index}`}
                    className="border-b last:border-b-0"
                  >
                    <td className="p-3">
                      <div className="font-medium">
                        {payment.user_name || payment.user_code || "Unknown User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {payment.user_phone || payment.user_id}
                      </div>
                    </td>

                    <td className="p-3 font-medium">₹{Number(payment.amount || 0)}</td>

                    <td className="p-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        payment.status === "success"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "failed"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {payment.status}
                      </span>
                    </td>

                    <td className="p-3 text-gray-600">{payment.payment_id || "-"}</td>

                    <td className="p-3 text-gray-500">
                      {payment.created_at
                        ? new Date(payment.created_at).toLocaleString("en-GB")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    </Layout>
  );
}
