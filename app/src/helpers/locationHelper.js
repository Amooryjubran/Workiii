import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const defaultLat = import.meta.env.VITE_APP_DEFAULT_LAT;
const defaultLng = import.meta.env.VITE_APP_DEFAULT_LNG;

export const getDefaultMapCenter = () => ({
  lat: parseFloat(defaultLat),
  lng: parseFloat(defaultLng),
});

export const parseAddressComponents = (addressComponents) => {
  const componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name",
  };

  let locationData = {
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  };

  addressComponents.forEach((component) => {
    const addressType = component.types[0];
    if (componentForm[addressType]) {
      const val = component[componentForm[addressType]];
      console.log(addressType);
      switch (addressType) {
        case "street_number":
          locationData.street = `${val} ${locationData.street}`;
          break;
        case "route":
          locationData.street += val;
          break;
        case "locality":
          locationData.city = val;
          break;
        case "administrative_area_level_1":
          locationData.state = val;
          break;
        case "postal_code":
          locationData.postalCode = val;
          break;
        case "country":
          locationData.country = val;
          break;
      }
    }
  });

  return locationData;
};

export const geocodeAddress = async (value) => {
  try {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    const addressComponents = parseAddressComponents(
      results[0].address_components
    );
    // Construct GeoJSON for the location
    const locationGeoJSON = {
      type: "Point",
      coordinates: [latLng.lng, latLng.lat], // Ensure longitude is first
    };
    console.log(locationGeoJSON);
    return { ...addressComponents, location: locationGeoJSON };
  } catch (error) {
    console.error("Error during geocoding:", error);
    throw error;
  }
};
