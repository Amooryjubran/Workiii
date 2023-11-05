import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import { frFR, arSA, enUS } from "@clerk/localizations";
import useLanguageSelector from "@/store/useLanguageSelector";
import { getLanguageFromURL } from "@/config/i18n";
import { BrowserRouter } from "react-router-dom";
import "@/assets/styles/Global.css";
import "@/assets/styles/variables.css";

function Main() {
  const { selectedLanguage, setLanguage } = useLanguageSelector();

  useEffect(() => {
    const detectedLang = getLanguageFromURL() || "en";
    setLanguage(detectedLang);
  }, [setLanguage]);

  let localization;
  switch (selectedLanguage) {
    case "fr":
      localization = frFR;
      break;
    case "ar":
      localization = arSA;
      break;
    case "en":
    default:
      localization = enUS;
      break;
  }

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
