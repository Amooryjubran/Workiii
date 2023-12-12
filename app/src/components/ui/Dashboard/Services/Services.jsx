import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useServicesStore from "@/store/Dashboard/useServices";
import ServiceInformationTab from "./ServiceInformationTab";

export default function Services() {
  const { t } = useTranslation();
  const { services, fetchServices, serviceTab } = useServicesStore();

  useEffect(() => {
    fetchServices();
  }, []);
  console.log(services);
  // To Do , make sure there is a tab called details, and it should update the service id, and then render the serviceInformationTab
  return <div>{t("dashboard.Services")}</div>;
}
