// components/ui/Badge.jsx
export default function Badge({ status }) {
  const styles = {
    active: "bg-green-100 text-green-600",
    lost: "bg-red-100 text-red-600",
    disabled: "bg-gray-200 text-gray-600"
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
      {status}
    </span>
  );
}