import useDetectLanguageChange from "@/hooks/useDetectLanguageChange";
import Navbar from "@/components/layout/Navbar/Navbar";
import MainRoutes from "./Routes/index";

function App() {
  useDetectLanguageChange();
  return (
    <>
      <Navbar />
      <MainRoutes />
    </>
  );
}

export default App;
