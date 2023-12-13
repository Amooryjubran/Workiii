import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useServicesStore from "@/store/Dashboard/useServices";
import ServiceInformationTab from "./ServiceInformationTab";
import TableComponent from "../Categories/Table";
import { Columns } from "./Columns";
import styles from "./style.module.css";

export default function Services() {
  const { t } = useTranslation();
  const { services, fetchServices, serviceTab } = useServicesStore();

  useEffect(() => {
    fetchServices();
  }, []);
  const columns = Columns(styles, t);
  return (
    <div>
      {!serviceTab ? (
        <TableComponent columns={columns} data={services} />
      ) : (
        <ServiceInformationTab />
      )}
    </div>
  );
}
