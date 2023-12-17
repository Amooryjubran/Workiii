import useServicesStore from "@/store/Services/useServicesStore";
import { useEffect } from "react";

export default function Services() {
  const { services, fetchServices } = useServicesStore();
  useEffect(() => {
    fetchServices();
  }, []);
  console.log(services);
  return <div>index</div>;
}
