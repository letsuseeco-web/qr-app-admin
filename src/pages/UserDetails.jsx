import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";

import UserHeader from "../components/user/UserHeader";
import ReferralCard from "../components/user/ReferralCard";
import MedicalCard from "../components/user/MedicalCard";
import QRTable from "../components/user/QRTable";
import ContactsCard from "../components/user/ContactsCard";
import WalletCard from "../components/user/WalletCard";
import ReferralsCard from "../components/user/ReferralsCard";
import StatsCard from "../components/user/StatsCard";
import PlanCard from "../components/user/PlanCard";

import WalletModal from "../components/user/WalletModal";
import TransactionsModal from "../components/user/TransactionsModal";
import ReferralsModal from "../components/user/ReferralsModal";

import {
  getUserDetails,
  adjustWallet,
  toggleBlockUser
} from "../services/api";

export default function UserDetail() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);

  const [showWallet, setShowWallet] = useState(false);
  const [showTxns, setShowTxns] = useState(false);
  const [showReferrals, setShowReferrals] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const res = await getUserDetails(userId);

    setUser({
      ...res.user,
      referral_code:
        res.user.referral_code || res.user.referralCode || "-",
      referred_by_name:
        res.user.referred_by_name ||
        res.user.referredByName ||
        res.user.referred_by ||
        "-",
      plan: res.user.plan || "FREE",
      plan_end_date: res.user.plan_end_date || null,
      balance: res.wallet?.balance || 0,
      qrs: res.qr_codes || [],
      contacts: res.contacts || [],
      transactions: res.transactions || [],
      referrals: res.referrals || []
    });
  };

  if (!user) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <UserHeader user={user} />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <ReferralCard user={user} />
            <MedicalCard user={user} />
            <QRTable user={user} />
            <ContactsCard user={user} />
            <WalletCard user={user} onView={() => setShowTxns(true)} />
            <ReferralsCard user={user} onView={() => setShowReferrals(true)} />
          </div>

          <div className="space-y-6">
            <PlanCard user={user} />
            <StatsCard user={user} />
          </div>
        </div>

        <WalletModal
          open={showWallet}
          onClose={() => setShowWallet(false)}
          onSubmit={async (data) => {
            await adjustWallet(user.id, data);
            setShowWallet(false);
            loadUser();
          }}
        />

        <TransactionsModal
          open={showTxns}
          onClose={() => setShowTxns(false)}
          transactions={user.transactions}
          balance={user.balance}
        />

        <ReferralsModal
          open={showReferrals}
          onClose={() => setShowReferrals(false)}
          referrals={user.referrals}
        />
      </div>
    </Layout>
  );
}
