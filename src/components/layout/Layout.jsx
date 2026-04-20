import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}