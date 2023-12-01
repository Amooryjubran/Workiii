import Services from "@/components/ui/Dashboard/Services";
import Users from "@/components/ui/Dashboard/Users";
import { useTranslation } from "react-i18next";
import SettingsImg from "images/Dashboard/settings.svg";
import UsersImg from "images/Dashboard/users.svg";
export const useDashboardTabs = () => {
  const { t } = useTranslation();

  const tabs = [
    {
      label: t("dashboard.Services"),
      component: <Services />,
      image: SettingsImg,
    },
    {
      label: t("dashboard.Users"),
      component: <Users />,
      image: UsersImg,
    },
    // ... other tabs would be added here
  ];

  return tabs;
};
