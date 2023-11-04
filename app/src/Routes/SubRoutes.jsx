// SubRoutes.jsx
import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import SignUp from "@/pages/SignUp";
import useLanguageSelector from "@/store/useLanguageSelector";
import Success from "@/pages/SuccessSignUp/SuccessSignUp";

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
      <Route path="omar" element={<Success />} />
      {/* ... other sub-routes */}
    </Routes>
  );
};

export default SubRoutes;
