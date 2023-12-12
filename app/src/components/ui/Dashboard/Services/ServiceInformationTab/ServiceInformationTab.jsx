import useServicesStore from "@/store/Dashboard/useServices";
import { useEffect } from "react";

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
  console.log(selectedService);
  return <div>ServiceInformationTab</div>;
}
