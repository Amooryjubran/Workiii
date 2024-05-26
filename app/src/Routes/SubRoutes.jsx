// SubRoutes.jsx
import { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Services from "@/pages/Services";
import SignUp from "@/pages/SignUp";
import useLanguageSelector from "@/store/useLanguageSelector";
import Login from "@/pages/Login";
import ListAService from "@/pages/ListAService";
import Dashboard from "@/pages/Dashboard";
import ServicePage from "@/pages/ServicePage";
import MyProfile from "@/pages/MyProfile";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";

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
      <Route path="login" element={<Login />} />
      <Route path="list-a-service" element={<ListAService />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="service/:id" element={<ServicePage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* ... other sub-routes */}
    </Routes>
  );
};

export default SubRoutes;
