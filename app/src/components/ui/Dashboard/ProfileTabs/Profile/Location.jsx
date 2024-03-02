import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";
import { getDefaultMapCenter, geocodeAddress } from "@/helpers/locationHelper";
import useListAServiceStore from "@/store/useListAServiceStore";
import GoogleMapReact from "google-map-react";
import styles from "./style.module.css";
import { useTranslation } from "react-i18next";
import Input from "@/components/Input";
import useProfileStore from "@/store/Profile/useProfileStore";
const Marker = () => <div className={styles.marker} />;

export default function Location({ onAddressSelect }) {
  const { t } = useTranslation();
  const { userAddress } = useProfileStore();
  const [address, setAddress] = useState("");
  const setLocation = useListAServiceStore((state) => state.setLocation);
  const location = useListAServiceStore((state) => state.location);
  const defaultMapCenter = getDefaultMapCenter();
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  useEffect(() => {
    if (location.latLng) {
      setMapCenter(location.latLng);
    }
  }, [location.latLng]);

  useEffect(() => {
    // If there's an address in the store, use it as the initial value
    if (userAddress) {
      setAddress(userAddress);
    }
  }, [userAddress]);

  const handleSelect = async (value) => {
    setAddress(value);
    try {
      const locationData = await geocodeAddress(value);
      setLocation(locationData);
      onAddressSelect(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mapWrapper}>
      <div className={styles.mapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_KEY }}
          defaultCenter={defaultMapCenter}
          center={mapCenter}
          defaultZoom={10}
        >
          <Marker lat={mapCenter.lat} lng={mapCenter.lng} />
        </GoogleMapReact>
      </div>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.placesAutoComplete}>
            <Input
              className={styles.locationInput}
              {...getInputProps({
                placeholder: t("listAServiceServicesTab.typeAdress"),
              })}
              name="location"
            />

            <div
              className={
                suggestions.length
                  ? styles.suggestionWrapper
                  : styles.suggestionWrapperEmpty
              }
            >
              {loading && <div>...</div>}

              {suggestions.map((suggestion, index) => {
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      ...getSuggestionItemProps(suggestion, {
                        className: suggestion.active
                          ? styles.suggestionActive
                          : styles.suggestion,
                      }),
                    })}
                    key={index}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <div className={styles.locationInformation}>
        <div>
          <span>{t("listAServiceServicesTab.street")}: </span>
          <p>{location.street}</p>
        </div>
        <div>
          <span>{t("listAServiceServicesTab.city")}: </span>
          <p>{location.city}</p>
        </div>
        <div>
          <span>{t("listAServiceServicesTab.state")}: </span>
          <p>{location.state}</p>
        </div>
        <div>
          <span>{t("listAServiceServicesTab.country")}: </span>
          <p>{location.country}</p>
        </div>
        <div>
          <span>{t("listAServiceServicesTab.postal")}: </span>
          <p>{location.postalCode}</p>
        </div>
      </div>
    </div>
  );
}
Location.propTypes = {
  onAddressSelect: PropTypes.func.isRequired,
};
