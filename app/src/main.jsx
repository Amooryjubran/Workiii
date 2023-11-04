import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "@/App.jsx";
import { frFR, arSA, enUS } from "@clerk/localizations";
import useLanguageSelector from "@/store/useLanguageSelector";
import { getLanguageFromURL } from "@/config/i18n";
import { BrowserRouter } from "react-router-dom";
import "@/assets/styles/Global.css";
import "@/assets/styles/variables.css";
import { ClerkProvider } from "@clerk/clerk-react";

console.log(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function Main() {
  const { selectedLanguage, setLanguage } = useLanguageSelector();

  useEffect(() => {
    const detectedLang = getLanguageFromURL() || "en";
    setLanguage(detectedLang);
  }, [setLanguage]);

  console.log(selectedLanguage);

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
      <ClerkProvider
        publishableKey={publishableKey}
        localization={localization}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
