import "./App.css";
import RoutesPages from "./routes/routes";
// import { useHydrateAuth } from "./hooks/useHydrateAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAutoLogout } from "./hooks/useAutoLogout";
import { NotificationProvider } from "./contexts/NotificationContext";
import TopLoadingBar from "./components/Common/TopLoadingBar";

function App() {
  // useHydrateAuth();
  // useAutoLogout();

  return (
    <NotificationProvider>
      <TopLoadingBar />
      <RoutesPages />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </NotificationProvider>
  )
}

export default App;