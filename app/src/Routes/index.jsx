import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";
import SubRoutes from "./SubRoutes";
import usePathHasLang from "@/hooks/usePathHasLang";

const MainRoutes = () => {
  const location = useLocation();
  const pathHasLang = usePathHasLang();
  const defaultLanguage = "en";

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={`/${defaultLanguage}`} replace />}
      />
      {pathHasLang ? (
        <Route path="/:lang/*" element={<SubRoutes />} />
      ) : (
        <Route
          path="*"
          element={
            <Navigate to={`/${defaultLanguage}${location.pathname}`} replace />
          }
        />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRoutes;
