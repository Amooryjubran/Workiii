import useDetectLanguageChange from "@/hooks/useDetectLanguageChange";
import MainRoutes from "./Routes/index";
import useUserStore from "./store/useUserStore";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";
import Chat from "@/components/Chat";

function App() {
  const { user } = useUserStore();
  useDetectLanguageChange();
  return (
    <>
      <Navbar />
      <MainRoutes />
      {user && <Chat />}
      <Footer />
    </>
  );
}

export default App;
