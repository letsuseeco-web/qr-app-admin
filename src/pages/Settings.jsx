import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  fetchSettingsData,
  saveSettingsData,
} from "../logic/settings.api";

export default function Settings() {
  const [settings, setSettings] = useState({});
  const [originalSettings, setOriginalSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState("general");

  useEffect(() => {
    const load = async () => {
      const data = await fetchSettingsData();
      setSettings(data);
      setOriginalSettings(data);
      setLoading(false);
    };
    load();
  }, []);

  const update = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const toggle = (id) => setOpen(open === id ? "" : id);

  const isChanged =
    JSON.stringify(settings) !== JSON.stringify(originalSettings);

  const save = async () => {
    const confirmSave = window.confirm("Are you sure you want to save changes?");
    if (!confirmSave) return;

    setSaving(true);
    try {
      await saveSettingsData(settings);
      setOriginalSettings(settings);
      alert("Settings updated successfully ✅");
    } catch {
      alert("Error saving settings ❌");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* ================= GENERAL ================= */}
      <Section title="🏢 Company" id="general" open={open} toggle={toggle}>
        <Input label="Tagline" value={settings.general?.tagline} onChange={(v)=>update("general","tagline",v)} />
        <Input label="Company Name" value={settings.general?.company_name} onChange={(v)=>update("general","company_name",v)} />
        <Input label="Brand Name" value={settings.general?.brand_name} onChange={(v)=>update("general","brand_name",v)} />
        <Input label="Website" value={settings.general?.website} onChange={(v)=>update("general","website",v)} />
        <Input label="Support Email" value={settings.general?.support_email} onChange={(v)=>update("general","support_email",v)} />
        <Input label="Phone" value={settings.general?.support_phone} onChange={(v)=>update("general","support_phone",v)} />
        <Input label="WhatsApp" value={settings.general?.support_whatsapp} onChange={(v)=>update("general","support_whatsapp",v)} />
      </Section>

      {/* ================= SOCIAL ================= */}
      <Section title="🌐 Social" id="social" open={open} toggle={toggle}>
        <Input label="Facebook" value={settings.social?.facebook} onChange={(v)=>update("social","facebook",v)} />
        <Input label="Instagram" value={settings.social?.instagram} onChange={(v)=>update("social","instagram",v)} />
        <Input label="Twitter" value={settings.social?.twitter} onChange={(v)=>update("social","twitter",v)} />
        <Input label="LinkedIn" value={settings.social?.linkedin} onChange={(v)=>update("social","linkedin",v)} />
        <Input label="YouTube" value={settings.social?.youtube} onChange={(v)=>update("social","youtube",v)} />
      </Section>

      {/* ================= QR ================= */}
      <Section title="📦 QR" id="qr" open={open} toggle={toggle}>
        <Input type="number" label="PIN Length" value={settings.qr?.pin_length} onChange={(v)=>update("qr","pin_length",v)} />
        <Input type="number" label="QR ID Length" value={settings.qr?.qr_id_length} onChange={(v)=>update("qr","qr_id_length",v)} />
        <Input type="number" label="Activation Lock (min)" value={settings.qr?.activation_lock_minutes} onChange={(v)=>update("qr","activation_lock_minutes",v)} />
        <Input type="number" label="Activation Attempts" value={settings.qr?.activation_attempt_limit} onChange={(v)=>update("qr","activation_attempt_limit",v)} />
      </Section>

      {/* ================= AUTH ================= */}
      <Section title="🔐 Auth" id="auth" open={open} toggle={toggle}>
        <Input type="number" label="Max Login Attempts" value={settings.auth?.max_login_attempts} onChange={(v)=>update("auth","max_login_attempts",v)} />
        <Input type="number" label="OTP Expiry (min)" value={settings.auth?.otp_expiry_minutes} onChange={(v)=>update("auth","otp_expiry_minutes",v)} />
        <Input type="number" label="QR Lock Duration" value={settings.auth?.qr_lock_duration_minutes} onChange={(v)=>update("auth","qr_lock_duration_minutes",v)} />
        <Input type="number" label="QR Activation Limit" value={settings.auth?.qr_activation_attempt_limit} onChange={(v)=>update("auth","qr_activation_attempt_limit",v)} />
      </Section>

      {/* ================= LIMITS ================= */}
      <Section title="📊 Limits" id="limits" open={open} toggle={toggle}>
        <Input type="number" label="Max QR per User" value={settings.limits?.max_qr_per_user} onChange={(v)=>update("limits","max_qr_per_user",v)} />
        <Input type="number" label="Max Contacts per User" value={settings.limits?.max_contacts_per_user} onChange={(v)=>update("limits","max_contacts_per_user",v)} />
      </Section>

      {/* ================= REWARDS ================= */}
      <Section title="🎁 Rewards" id="rewards" open={open} toggle={toggle}>
        <Input type="number" label="Signup Bonus" value={settings.rewards?.signup_bonus} onChange={(v)=>update("rewards","signup_bonus",v)} />
        <Input type="number" label="New User Reward" value={settings.rewards?.new_user_reward} onChange={(v)=>update("rewards","new_user_reward",v)} />
        <Input type="number" label="Referrer Reward" value={settings.rewards?.referrer_reward} onChange={(v)=>update("rewards","referrer_reward",v)} />
        <Toggle label="Referral Enabled" checked={settings.rewards?.referral_enabled} onChange={(v)=>update("rewards","referral_enabled",v)} />
      </Section>

      {/* ================= REWARD LIMIT ================= */}
      <Section title="💰 Reward Limits" id="reward_limits" open={open} toggle={toggle}>
        <Input type="number" label="Min Reward" value={settings.reward_limits?.min_reward_amount} onChange={(v)=>update("reward_limits","min_reward_amount",v)} />
        <Input type="number" label="Max Reward" value={settings.reward_limits?.max_reward_amount} onChange={(v)=>update("reward_limits","max_reward_amount",v)} />
      </Section>

      {/* ================= WALLET ================= */}
      <Section title="💳 Wallet" id="wallet" open={open} toggle={toggle}>
        <Input label="Currency" value={settings.wallet?.currency} onChange={(v)=>update("wallet","currency",v)} />
        <Input label="Symbol" value={settings.wallet?.currency_symbol} onChange={(v)=>update("wallet","currency_symbol",v)} />
        <Toggle label="Allow Negative Balance" checked={settings.wallet?.allow_negative_balance} onChange={(v)=>update("wallet","allow_negative_balance",v)} />
      </Section>

      {/* ================= NOTIFICATIONS ================= */}
      <Section title="🔔 Notifications" id="notifications" open={open} toggle={toggle}>
        <Toggle label="SMS Enabled" checked={settings.notifications?.sms_enabled} onChange={(v)=>update("notifications","sms_enabled",v)} />
        <Toggle label="Push Enabled" checked={settings.notifications?.push_enabled} onChange={(v)=>update("notifications","push_enabled",v)} />
        <Toggle label="Scan Notification" checked={settings.notifications?.scan_notification} onChange={(v)=>update("notifications","scan_notification",v)} />
      </Section>

      {/* ================= SMS ================= */}
      <Section title="📩 SMS Config" id="sms" open={open} toggle={toggle}>
        <Input label="Provider" value={settings.sms?.provider} onChange={(v)=>update("sms","provider",v)} />
        <Input label="MSG91 API Key" value={settings.sms?.msg91?.api_key} onChange={(v)=>update("sms","msg91",{...settings.sms.msg91, api_key:v})} />
        <Input label="Sender ID" value={settings.sms?.msg91?.sender_id} onChange={(v)=>update("sms","msg91",{...settings.sms.msg91, sender_id:v})} />
      </Section>

      {/* SAVE BUTTON */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={save}
          disabled={!isChanged || saving}
          className={`px-6 py-2 rounded-lg text-white ${
            !isChanged
              ? "bg-gray-300"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

    </Layout>
  );
}

/* COMPONENTS */

const Section = ({ title, children, open, toggle, id }) => (
  <div className="bg-white rounded-xl shadow mb-4 overflow-hidden">
    <div
      onClick={() => toggle(id)}
      className="p-4 font-semibold cursor-pointer flex justify-between"
    >
      {title}
      <span>{open === id ? "−" : "+"}</span>
    </div>
    {open === id && (
      <div className="p-4 grid grid-cols-2 gap-4 bg-gray-50">
        {children}
      </div>
    )}
  </div>
);

const Input = ({ label, value = "", onChange, type = "text" }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border p-2 rounded mt-1"
    />
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm">{label}</span>
    <input
      type="checkbox"
      checked={checked || false}
      onChange={(e) => onChange(e.target.checked)}
    />
  </div>
);