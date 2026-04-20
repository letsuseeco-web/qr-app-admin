// components/ui/EmptyState.jsx
export default function EmptyState({ message }) {
  return (
    <div className="text-center text-gray-400 py-10">
      {message || "No data found"}
    </div>
  );
}