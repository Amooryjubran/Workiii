import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./style.module.css";
import useServicePageStore from "@/store/ServiceDetail/useServicePageStore";
import ServiceInformation from "@/components/ServiceInformation";
import Loader from "./Loader";

export default function ServicePage() {
  const { id } = useParams();
  const { service, status, error, fetchServiceDetail } = useServicePageStore();

  useEffect(() => {
    fetchServiceDetail(id);
  }, [id, fetchServiceDetail]);

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    return <div>Error: {error}</div>;
  }

  if (!service) {
    return null;
  }
  let selectedService = service?.data;
  return (
    <div className={styles.servicePage}>
      <div className={styles.wrapper}>
        <ServiceInformation selectedService={selectedService} />
      </div>
    </div>
  );
}
