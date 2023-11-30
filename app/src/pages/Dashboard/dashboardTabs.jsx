import Services from "@/components/ui/Dashboard/Services";
import Users from "@/components/ui/Dashboard/Users";
import { useTranslation } from "react-i18next";

export const useDashboardTabs = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      label: t("dashboard.Services"),
      component: <Services />,
    },
    {
      label: t("dashboard.Users"),
      component: <Users />,
    },
    // ... other tabs would be added here
  ];

  return tabs;
};
