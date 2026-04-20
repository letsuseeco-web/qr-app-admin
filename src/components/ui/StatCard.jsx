// components/ui/StatCard.jsx
export default function StatCard({ title, value, change, icon }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">{title}</p>

        {icon && (
          <div className="bg-blue-100 p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold mt-2">{value}</h2>

      {change && (
        <p className="text-green-600 text-sm mt-1">{change}</p>
      )}

    </div>
  );
}