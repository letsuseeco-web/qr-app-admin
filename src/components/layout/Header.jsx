import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

      {/* Left */}
      <div>
        <h1 className="text-xl font-bold text-blue-600">
          QR Admin Panel
        </h1>
        <p className="text-sm text-gray-400">
          Manage your system
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* User */}
        <div className="text-right">
          <p className="text-sm font-medium">Admin</p>
          <p className="text-xs text-gray-400">Super Admin</p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          A
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Logout
        </button>

      </div>
    </header>
  );
}