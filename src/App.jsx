import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Batches from "./pages/Batches";
import QRCodes from "./pages/QRCodes";
import QRDesign from "./pages/QRdesign";
import QRDetails from "./pages/QRDetails";
import Logs from "./pages/Logs";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import Printing from "./pages/Printing";
import PrintBatch from "./pages/PrintBatch";
import Plans from "./pages/Plans";
import Payments from "./pages/Payments";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <Plans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/batches"
          element={
            <ProtectedRoute>
              <Batches />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/qrs"
          element={
            <ProtectedRoute>
              <QRCodes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qr-design"
          element={
             <ProtectedRoute>
               <QRDesign />
             </ProtectedRoute>
          }
        />

        <Route
          path="/qrs/:qrId"
          element={
             <ProtectedRoute>
               <QRDetails />
             </ProtectedRoute>
           }
        />

        <Route
          path="/logs"
          element={
            <ProtectedRoute>
              <Logs />
            </ProtectedRoute>
          }
       />


        <Route
          path="/users"
          element={
             <ProtectedRoute>
              <Users />
             </ProtectedRoute>
          }
       />

       <Route
         path="/users/:userId"
         element={
           <ProtectedRoute>
            <UserDetails />
           </ProtectedRoute>
          }
       />

       <Route
         path="/printing"
         element={
           <ProtectedRoute>
             <Printing />
           </ProtectedRoute>
           }
        />

        
       <Route
         path="/printing/:batchId"
         element={
           <ProtectedRoute>
             <PrintBatch />
           </ProtectedRoute>
           }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
