// SubRoutes.jsx
import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Services from "@/pages/Services";
import SignUp from "@/pages/SignUp";
import useLanguageSelector from "@/store/useLanguageSelector";

const SubRoutes = () => {
  const { lang } = useParams();
  const setLanguage = useLanguageSelector((state) => state.setLanguage);

  useEffect(() => {
    setLanguage(lang);
  }, [lang, setLanguage]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="sign-up" element={<SignUp />} />
      {/* ... other sub-routes */}
    </Routes>
  );
};

export default SubRoutes;
