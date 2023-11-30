import useUserStore from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { useDashboardTabs } from "./dashboardTabs";
import DynamicTabs from "@/components/DynamicTabs";

export default function Dashboard() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const tabs = useDashboardTabs();
  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <DynamicTabs tabs={tabs} />
    </div>
  );
}
