import { useState } from "react";
import { adminLogin } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);

    try {
      const res = await adminLogin({ username, password });

      console.log("LOGIN RESPONSE:", res);

      if (!res.success) {
        setError(res.message || "Invalid credentials");
        return;
      }

      login(res.token);
      navigate("/dashboard");

    } catch (err) {
      setError("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white w-96 p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-blue-600 text-center">
          QR Admin
        </h1>

        <p className="text-gray-400 text-sm text-center mb-6">
          Sign in to your account
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

      </div>
    </div>
  );
}