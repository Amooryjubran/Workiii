import { useEffect } from "react";
import { MapPin, Check } from "react-feather";
import styles from "./style.module.css";
import useServicesStore from "@/store/Services/useServicesStore";
import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton";

export default function Locations() {
  const {
    fetchLocations,
    locations,
    locaitonsLoading,
    handleLocationChange,
    filters,
  } = useServicesStore();

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
        {locations?.map((location, index) => {
          const isActive = filters.locations.some(
            (loc) =>
              loc.location.latLng.lat === location.location.latLng.lat &&
              loc.location.latLng.lng === location.location.latLng.lng
          );

          return (
            <Button
              key={index}
              className={styles.locationBtn}
              onClick={() => handleLocationChange(location)}
            >
              <MapPin size={12} color="black" />
              <div>
                <h1>{location?.location?.city}</h1>
                <span>
                  {location?.location?.state}, {location?.location?.country}
                </span>
              </div>
              {isActive && <Check size={12} color="green" />}
            </Button>
          );
        })}
      </div>
      <span>*We are expanding soon</span>
    </div>
  );
}
