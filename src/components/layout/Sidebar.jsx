import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, Boxes, QrCode, FileText, Users, Printer, Palette, CreditCard, Wallet } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-blue-600">
          QR Admin
        </h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {/* BATCHES (NEW) */}
        <NavLink
          to="/plans"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <CreditCard size={18} />
          Plans
        </NavLink>

        <NavLink
          to="/payments"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Wallet size={18} />
          Payments
        </NavLink>

        <NavLink
          to="/batches"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Boxes size={18} />
          Batches
        </NavLink>

        {/* QR Codes */}
        <NavLink
          to="/qrs"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <QrCode size={18} />
          QR Codes
        </NavLink>

        {/* Users */}
        <NavLink
          to="/users"
          className={({ isActive }) =>
             `flex items-center gap-3 p-3 rounded-lg transition ${
                isActive
                   ? "bg-blue-100 text-blue-600 font-medium"
                   : "text-gray-600 hover:bg-gray-100"
               }`
             }
        >
             <Users size={18} />
           Users
        </NavLink>
        
        {/* QR Printing */}
        <NavLink
          to="/printing"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded ${
              isActive 
                 ? "bg-blue-100 text-blue-600 font-medium"  
                 : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
           <Printer size={18} />
          Printing
        </NavLink>


        {/* QR Design */}
        <NavLink
         to="/qr-design"
         className={({ isActive }) =>
           `flex items-center gap-3 p-3 rounded-lg transition ${
             isActive
               ? "bg-blue-100 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-100"
           }`
         }
        >
         <Palette size={18} />
        QR Design
        </NavLink>

        {/* Logs */}
        <NavLink
          to="/logs"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
               isActive
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
           }
        >
           <FileText size={18} />
          Logs
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition ${
              isActive
                ? "bg-blue-100 text-blue-600 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          <Settings size={18} />
          Settings
        </NavLink>

      </nav>
    </aside>
  );
}
