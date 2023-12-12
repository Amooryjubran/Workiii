import Services from "@/components/ui/Dashboard/Services";
import Users from "@/components/ui/Dashboard/Users";
import Categories from "@/components/ui/Dashboard/Categories";
import { useTranslation } from "react-i18next";
import SettingsImg from "images/Dashboard/settings.svg";
import UsersImg from "images/Dashboard/users.svg";
import CategoriesImg from "images/Dashboard/categories.svg";
import useUserStore from "@/store/useUserStore";

export const useDashboardTabs = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();

  const allTabs = [
    {
      label: t("dashboard.Services"),
      component: <Services />,
      image: SettingsImg,
    },
    {
      label: t("dashboard.Users"),
      component: <Users />,
      image: UsersImg,
      action: "resetUserTab",
      roles: ["admin"],
    },
    {
      label: t("dashboard.Categories"),
      component: <Categories />,
      image: CategoriesImg,
      roles: ["admin"],
    },
    // ... other tabs
  ];

  // Adjusted filter logic
  const filteredTabs = allTabs.filter(
    (tab) => !tab.roles || (user?.userType && tab.roles.includes(user.userType))
  );

  return filteredTabs;
};
