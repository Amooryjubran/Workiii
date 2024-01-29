import useDetectLanguageChange from "@/hooks/useDetectLanguageChange";
import Navbar from "@/components/layout/Navbar/Navbar";
import MainRoutes from "./Routes/index";
import Chat from "./components/Chat";

function App() {
  useDetectLanguageChange();
  return (
    <>
      <Navbar />
      <MainRoutes />
      <Chat />
    </>
  );
}

export default App;
