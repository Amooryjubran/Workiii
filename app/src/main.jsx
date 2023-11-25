import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import loadGoogleMapsAPI from "@/api/loadGoogleMapsAPI";
import useLanguageSelector from "@/store/useLanguageSelector";
import { getLanguageFromURL } from "@/config/i18n";
import { BrowserRouter } from "react-router-dom";
import "@/assets/styles/Global.css";
import "@/assets/styles/variables.css";

loadGoogleMapsAPI();
export function Main() {
  const { setLanguage } = useLanguageSelector();

  useEffect(() => {
    const detectedLang = getLanguageFromURL() || "en";
    setLanguage(detectedLang);
  }, [setLanguage]);
  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
