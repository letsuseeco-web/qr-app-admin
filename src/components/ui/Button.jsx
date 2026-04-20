export default function Button({ children, onClick, type = "primary", loading }) {
  const base = "px-4 py-2 rounded-lg text-sm transition font-medium";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    secondary: "bg-gray-200 hover:bg-gray-300"
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${base} ${styles[type]} ${loading && "opacity-50 cursor-not-allowed"}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}