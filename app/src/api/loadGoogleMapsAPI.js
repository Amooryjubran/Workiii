function loadGoogleMapsAPI() {
  if (!window.google) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${
      import.meta.env.VITE_GOOGLE_MAPS_KEY
    }&libraries=places&callback=initMap`;
    document.body.appendChild(script);
  }
}

function initMap() {}

// Make initMap globally accessible
window.initMap = initMap;

export default loadGoogleMapsAPI;
