// components/ui/Input.jsx
export default function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}