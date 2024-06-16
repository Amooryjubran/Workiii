import { useEffect } from "react";
import { MapPin } from "react-feather";
import styles from "./style.module.css";
import useServicesStore from "@/store/Services/useServicesStore";
import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton";

export default function Locations() {
  const { fetchLocations, locations, locaitonsLoading } = useServicesStore();

  useEffect(() => {
    fetchLocations();
  }, []);

  if (locaitonsLoading) {
    return (
      <div className={styles.locationLoader}>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <div key={i}>
              <Skeleton width="10px" height="10px" borderRadius="2px" />
              <Skeleton width="80%" height="15px" borderRadius="5px" />
            </div>
          ))}
      </div>
    );
  }
  return (
    <div className={styles.locationContainer}>
      <div className={styles.locationWrapper}>
        {locations?.map((location, index) => (
          <Button key={index} className={styles.locationBtn}>
            <MapPin size={12} />
            <div>
              <h1>{location?.location?.city}</h1>
              <span>
                {location?.location?.state}, {location?.location?.country}
              </span>
            </div>
          </Button>
        ))}
      </div>
      <span>*We are expanding soon</span>
    </div>
  );
}
