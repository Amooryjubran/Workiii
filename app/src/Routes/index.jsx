import { Route, Routes, Navigate } from "react-router-dom";
import SubRoutes from "./SubRoutes";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/en" replace />} />
    <Route path="/:lang/*" element={<SubRoutes />} />
  </Routes>
);

export default MainRoutes;
