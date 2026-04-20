import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  getAdminPlans,
  getPaymentSettings,
  updateAdminPlan,
  updatePaymentSettings
} from "../services/api";

const DEFAULT_PAYMENT_SETTINGS = {
  payment_gateway: "razorpay",
  razorpay_key_id: "",
  razorpay_secret: ""
};

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [paymentSettings, setPaymentSettings] = useState(DEFAULT_PAYMENT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [savingPaymentSettings, setSavingPaymentSettings] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const [plansResponse, paymentSettingsResponse] = await Promise.all([
          getAdminPlans(),
          getPaymentSettings()
        ]);

        if (!isMounted) {
          return;
        }

        setPlans(Array.isArray(plansResponse) ? plansResponse : []);
        setPaymentSettings({
          payment_gateway:
            paymentSettingsResponse?.payment_gateway || "razorpay",
          razorpay_key_id:
            paymentSettingsResponse?.razorpay_key_id || "",
          razorpay_secret:
            paymentSettingsResponse?.razorpay_secret || ""
        });
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load plans");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleFieldChange = (planId, field, value) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              [field]: value
            }
          : plan
      )
    );
  };

  const handlePaymentSettingsChange = (field, value) => {
    setPaymentSettings((currentSettings) => ({
      ...currentSettings,
      [field]: value
    }));
  };

  const handleSave = async (plan) => {
    try {
      setSavingId(plan.id);
      setError("");
      setMessage("");

      const response = await updateAdminPlan(plan.id, {
        price: Number(plan.price || 0),
        duration_days: Number(plan.duration_days || 0)
      });

      const updatedPlan = response?.plan || plan;

      setPlans((currentPlans) =>
        currentPlans.map((item) =>
          item.id === updatedPlan.id ? updatedPlan : item
        )
      );
      setMessage(`${updatedPlan.name} plan updated successfully`);
    } catch (err) {
      setError(err.message || "Failed to update plan");
    } finally {
      setSavingId(null);
    }
  };

  const handlePaymentSettingsSave = async () => {
    try {
      setSavingPaymentSettings(true);
      setError("");
      setMessage("");

      const response = await updatePaymentSettings(paymentSettings);
      const updatedSettings = response?.payment_settings || paymentSettings;

      setPaymentSettings({
        payment_gateway: updatedSettings.payment_gateway || "razorpay",
        razorpay_key_id: updatedSettings.razorpay_key_id || "",
        razorpay_secret: updatedSettings.razorpay_secret || ""
      });
      setMessage("Payment gateway settings updated successfully");
    } catch (err) {
      setError(err.message || "Failed to update payment settings");
    } finally {
      setSavingPaymentSettings(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Plans</h1>
          <p className="text-sm text-gray-500">
            Manage wallet-based subscription plans
          </p>
        </div>

        {error ? (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {message ? (
          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        ) : null}

        {loading ? (
          <Card>Loading plans...</Card>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4">
              {plans.map((plan) => (
                <Card key={plan.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{plan.name}</h2>
                      <p className="text-sm text-gray-500">
                        Status: {plan.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>

                    <Button
                      onClick={() => handleSave(plan)}
                      loading={savingId === plan.id}
                    >
                      Save
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm text-gray-500">
                        Price
                      </label>
                      <Input
                        type="number"
                        value={plan.price}
                        onChange={(event) =>
                          handleFieldChange(plan.id, "price", event.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-gray-500">
                        Duration (days)
                      </label>
                      <Input
                        type="number"
                        value={plan.duration_days}
                        onChange={(event) =>
                          handleFieldChange(
                            plan.id,
                            "duration_days",
                            event.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">Payment Gateway Settings</h2>
                  <p className="text-sm text-gray-500">
                    Manage gateway configuration using the settings table
                  </p>
                </div>

                <Button
                  onClick={handlePaymentSettingsSave}
                  loading={savingPaymentSettings}
                >
                  Save
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Payment Gateway
                  </label>
                  <select
                    value={paymentSettings.payment_gateway}
                    onChange={(event) =>
                      handlePaymentSettingsChange(
                        "payment_gateway",
                        event.target.value
                      )
                    }
                    className="w-full rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="razorpay">razorpay</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Razorpay Key ID
                  </label>
                  <Input
                    value={paymentSettings.razorpay_key_id}
                    onChange={(event) =>
                      handlePaymentSettingsChange(
                        "razorpay_key_id",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-gray-500">
                    Razorpay Secret
                  </label>
                  <Input
                    value={paymentSettings.razorpay_secret}
                    onChange={(event) =>
                      handlePaymentSettingsChange(
                        "razorpay_secret",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
}
