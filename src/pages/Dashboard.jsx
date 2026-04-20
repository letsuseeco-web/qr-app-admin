import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import StatCard from "../components/ui/StatCard";

export default function Dashboard() {
  const [data, setData] = useState({
    total_users: 0,
    total_qrs: 0,
    active_qrs: 0,
    lost_qrs: 0,
    total_scans: 0
  });

  useEffect(() => {
    // 🔥 No API call → no error
    setData({
      total_users: 0,
      total_qrs: 0,
      active_qrs: 0,
      lost_qrs: 0,
      total_scans: 0
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={data.total_users} />
        <StatCard title="Total QRs" value={data.total_qrs} />
        <StatCard title="Active QRs" value={data.active_qrs} />
        <StatCard title="Lost QRs" value={data.lost_qrs} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Total Scans" value={data.total_scans} />

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <p className="text-gray-500">Coming Soon</p>
          <h2 className="text-xl font-bold">Analytics Graph</h2>
        </div>
      </div>
    </Layout>
  );
}