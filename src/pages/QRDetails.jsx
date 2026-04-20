import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import StickerPreview from "../components/StickerPreview";
import { getQRDetails } from "../services/api";
import { getQRDesign } from "../logic/qrdesign.api";
import {
  toggleQR,
  enableLostMode,
  removeLostMode
} from "../services/api";

// 🔐 PIN TOGGLE
function PINField({ pin }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <p><b>PIN:</b> {show ? pin : "******"}</p>
      <button
        onClick={() => setShow(!show)}
        className="text-blue-600 text-xs underline col-span-2"
      >
        {show ? "Hide PIN" : "Show PIN"}
      </button>
    </>
  );
}

export default function QRDetails() {
  const { qrId } = useParams();

  const [data, setData] = useState(null);
  const [design, setDesign] = useState({});

  useEffect(() => {
    loadData();
    getQRDesign("sticker").then(setDesign);
  }, [qrId]);

  const loadData = () => {
    getQRDetails(qrId).then((res) => {
      const q = res.qr || {};

      const formattedQR = {
        ...q,
        batchNo: q.batch_id || null,
        createdDate: q.created_at || null,
        activationDate: q.activated_at || null,
      };

      setData({
        ...res,
        qr: formattedQR,
      });
    });
  };

  if (!data) return <div className="p-6">Loading...</div>;

  const { qr = {}, user = {}, contacts = [], lostLogs = [], logs = [] } = data;

  const isLost = qr.operational_status === "lost";
  const isDisabled = qr.operational_status === "disabled_by_admin";

  // 🔥 ACTION HANDLERS
 const handleToggle = async () => {
  const isDisabled = qr.operational_status === "disabled_by_admin";

  if (!confirm(isDisabled ? "Enable this QR?" : "Disable this QR?")) return;

  try {
    await toggleQR(qr.qr_code);
    loadData();
  } catch (err) {
    console.error(err);
    alert("Error updating QR");
  }
 };

  const handleLostEnable = async () => {
  const reward = prompt("Enter reward amount:");

  if (!reward) return;

  if (!confirm(`Enable Lost Mode with ₹${reward}?`)) return;

  await enableLostMode(qr.qr_code, Number(reward));
  loadData();
};

  const handleLostRemove = async () => {
    if (!confirm("Remove Lost Mode?")) return;
    await removeLostMode(qr.qr_code);
    loadData();
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">

        {/* 🔹 QR INFORMATION */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4">QR Information</h2>

          <div className="grid grid-cols-2 gap-y-3 text-sm">

            <p><b>QR Code:</b> {qr.qr_code}</p>

            <p>
              <b>Ownership:</b>{" "}
              {qr.ownership_status === "assigned" ? "Assigned" : "Unused"}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span className={`px-2 py-1 rounded text-xs ${
                qr.operational_status === "active"
                  ? "bg-green-100 text-green-700"
                  : qr.operational_status === "sleep"
                  ? "bg-gray-200 text-gray-700"
                  : qr.operational_status === "lost"
                  ? "bg-red-100 text-red-700"
                  : "bg-black text-white"
              }`}>
                {qr.operational_status || "-"}
              </span>
            </p>

            <p><b>Batch:</b> {qr.batchNo || "-"}</p>

            <p>
              <b>Created:</b>{" "}
              {qr.createdDate
                ? new Date(qr.createdDate).toLocaleDateString("en-GB")
                : "-"}
            </p>

            <p>
              <b>Activated:</b>{" "}
              {qr.activationDate
                ? new Date(qr.activationDate).toLocaleDateString("en-GB")
                : "-"}
            </p>

            <PINField pin={qr.pin} />

          </div>
        </Card>

        {/* 🔥 STICKER PREVIEW */}
        <Card className="p-4 flex justify-center">
          <StickerPreview
            design={design}
            qrCode={qr.qr_code}
          />
        </Card>

        {/* 👤 USER INFO */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3">User Information</h2>

          <div className="text-sm space-y-1">
            <p><b>User Code:</b> {user?.id || "-"}</p>
            <p><b>Name:</b> {user?.name || "-"}</p>
            <p><b>Phone:</b> {user?.phone || "-"}</p>
            <p><b>Status:</b> {user?.id ? "Assigned" : "Unused"}</p>
            <p><b>Tag:</b> {qr.user_tag || "-"}</p>
          </div>
        </Card>

        {/* 🏥 MEDICAL + CONTACTS */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Medical & Emergency</h2>

          <div className="mb-4 text-sm space-y-1">
            <p><b>Blood Group:</b> {user?.blood_group || "-"}</p>
            <p><b>Conditions:</b> {user?.conditions || "-"}</p>
            <p><b>Allergies:</b> {user?.allergies || "-"}</p>
          </div>

          <h3 className="font-medium text-sm mb-2">Emergency Contacts</h3>

          {contacts.length === 0 ? (
            <p className="text-sm text-gray-500">No contacts</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Relation</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c, i) => (
                  <tr key={i}>
                    <td>{c.name}</td>
                    <td>{c.relation}</td>
                    <td>{c.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {/* 🚨 LOST MODE */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Lost Mode</h2>

          {!isLost ? (
            <p className="text-gray-500 text-sm">
              Not in Lost Mode
            </p>
          ) : (
            <div className="text-sm space-y-1 mb-4">
              <p className="text-red-600 font-medium">
                Currently in Lost Mode
              </p>
              <p><b>Reward:</b> ₹{qr.reward || 0}</p>
              <p>
                <b>Lost Date:</b>{" "}
                {qr.activationDate
                  ? new Date(qr.activationDate).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>
          )}

          <h3 className="font-medium text-sm mb-2">Lost History</h3>

          {lostLogs.length === 0 ? (
            <p>No lost history</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th>Sr</th>
                  <th>Status</th>
                  <th>Reward</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {lostLogs.map((l, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{l.status}</td>
                    <td>₹{l.reward}</td>
                    <td>{l.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>

        {/* 📊 ACTIVITY + SECURITY */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Activity & Security</h2>

          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <p><b>Total Scans:</b> {logs.length}</p>

            <p>
              <b>Last Scan:</b>{" "}
              {logs[0]?.date
                ? new Date(logs[0].date).toLocaleDateString("en-GB")
                : "-"}
            </p>

            <p><b>Failed Attempts:</b> {qr.failed_attempts || 0}</p>

            <p>
              <b>Locked Until:</b>{" "}
              {qr.locked_until
                ? new Date(qr.locked_until).toLocaleString("en-GB")
                : "-"}
            </p>
          </div>

          {qr.locked_until && new Date(qr.locked_until) > new Date() && (
            <p className="text-red-600 text-sm mt-3 font-medium">
              ⚠️ QR is temporarily locked
            </p>
          )}
        </Card>

        {/* ⚙️ ACTIONS */}
        <Card className="p-4">
          <h2 className="font-semibold mb-4">Admin Actions</h2>

          <div className="flex gap-3 flex-wrap">

            <Button
            onClick={handleToggle}
              className={`${
              qr.operational_status === "disabled_by_admin"
               ? "bg-green-600"
               : "bg-red-600"
               } text-white`}
               >
               {qr.operational_status === "disabled_by_admin"
               ? "Enable QR"
               : "Disable QR"}
            </Button>

            {qr.operational_status !== "lost" && (
              <Button onClick={handleLostEnable} className="bg-orange-500 text-white">
                Enable Lost Mode
              </Button>
            )}

            {qr.operational_status === "lost" && (
              <Button onClick={handleLostRemove} className="bg-gray-700 text-white">
                Remove Lost Mode
              </Button>
            )}

          </div>
        </Card>

      </div>
    </Layout>
  );
}