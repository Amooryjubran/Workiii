import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import i18n from "@/config/i18n";
import useLanguageSelector from "@/store/useLanguageSelector";

function useDetectLanguageChange() {
  const location = useLocation();
  const { setLanguage } = useLanguageSelector();

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedLanguage = currentPath.match(/\/(en|fr|ar)/);
    const lang = matchedLanguage && matchedLanguage[1];

    if (lang) {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    }
  }, [location, setLanguage]);
}

export default useDetectLanguageChange;
