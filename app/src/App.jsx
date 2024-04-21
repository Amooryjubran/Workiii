import useDetectLanguageChange from "@/hooks/useDetectLanguageChange";
import Navbar from "@/components/layout/Navbar/Navbar";
import MainRoutes from "./Routes/index";
import Chat from "./components/Chat";
import useUserStore from "./store/useUserStore";

function App() {
  const { user } = useUserStore();
  useDetectLanguageChange();
  return (
    <>
      <Navbar />
      <MainRoutes />
      {user && <Chat />}
    </>
  );
}

export default App;
