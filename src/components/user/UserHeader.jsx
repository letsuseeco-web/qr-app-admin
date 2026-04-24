import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function UserHeader({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold">{user.name}</h1>

        <div className="mt-2 text-sm text-gray-600 space-y-1">
          <p>
            Mobile: <span className="font-medium">{user.phone}</span>
          </p>

          <p>
            Code: <span className="font-medium">{user.user_code}</span>
          </p>

          <p>
            Gender: <span className="font-medium">{user.gender || "-"}</span>
          </p>

          <p>
            DOB:{" "}
            <span className="font-medium">
              {user.date_of_birth
                ? new Date(user.date_of_birth).toLocaleDateString("en-GB")
                : "-"}
            </span>
          </p>

          <p>
            Joined:{" "}
            <span className="font-medium">
              {new Date(user.created_at).toLocaleDateString("en-GB")}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            user.status === "blocked"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {user.status === "blocked" ? "Blocked" : "Active"}
        </span>

        <Button size="sm" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </div>
  );
}
