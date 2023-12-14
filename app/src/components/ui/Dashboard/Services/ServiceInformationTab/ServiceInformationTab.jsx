import useServicesStore from "@/store/Dashboard/useServices";
import { useEffect } from "react";
import Header from "./Header";
import ServiceInformation from "@/components/ServiceInformation";

export default function ServiceInformationTab() {
  const { fetchService, selectedService, selectedServiceId } =
    useServicesStore();

  useEffect(() => {
    if (selectedServiceId) {
      fetchService(selectedServiceId);
    }
  }, [selectedServiceId, fetchService]);

  if (!selectedService) {
    return <div>...</div>;
  }
  return (
    <div>
      <Header />
      <ServiceInformation selectedService={selectedService} />
    </div>
  );
}
