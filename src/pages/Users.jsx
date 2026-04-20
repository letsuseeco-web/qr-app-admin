import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { getAllUsers } from "../services/api";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      const data = Array.isArray(res) ? res : res?.data;
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.phone} ${user.user_code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedUsers = filteredUsers.slice(start, start + perPage);

  const renderPlanBadge = (plan) => {
    const normalizedPlan = plan || "FREE";

    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
          normalizedPlan === "PREMIUM"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {normalizedPlan === "PREMIUM" ? "★" : "•"} {normalizedPlan}
      </span>
    );
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 pr-10">
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-sm text-gray-500">
              Manage all registered users
            </p>
          </div>

          <div className="w-80">
            <Input
              placeholder="Search..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              className="text-sm"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}

        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading users...
            </div>
          ) : paginatedUsers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No users found
            </div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 border-b">
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Plan</th>
                    <th className="p-3 text-left">Wallet</th>
                    <th className="p-3 text-left">Joined</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3 text-gray-500">
                        {start + index + 1}
                      </td>

                      <td className="p-3 font-medium">
                        {user.name}
                      </td>

                      <td className="p-3 text-gray-600">
                        {user.phone || "-"}
                      </td>

                      <td className="p-3">
                        {renderPlanBadge(user.plan)}
                      </td>

                      <td className="p-3 font-medium text-green-600">
                        Rs {user.balance || 0}
                      </td>

                      <td className="p-3 text-gray-500">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString("en-GB")
                          : "-"}
                      </td>

                      <td className="p-3">
                        {user.status === "blocked" ? (
                          <span className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                            Blocked
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                            Active
                          </span>
                        )}
                      </td>

                      <td className="p-3">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/users/${user.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {totalPages > 1 ? (
                <div className="flex justify-center items-center gap-4 p-4">
                  <Button
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                  >
                    Prev
                  </Button>

                  <span className="font-semibold text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <div className="text-center text-sm text-gray-400 p-4">
                  Showing all users
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
}
