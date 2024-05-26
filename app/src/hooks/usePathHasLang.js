import { useLocation } from "react-router-dom";

const SUPPORTED_LANGUAGES = ["en", "fr", "ar"];
const regex = new RegExp(`^/(${SUPPORTED_LANGUAGES.join("|")})($|/)`);

export default function usePathHasLang() {
  const { pathname } = useLocation();
  return regex.test(pathname);
}
