import "./App.css";
import RoutesPages from "./routes/routes";
import { useHydrateAuth } from "./hooks/useHydrateAuth";
import { useAutoLogout } from "./hooks/useAutoLogout";

function App() {
  useHydrateAuth();
  useAutoLogout();  

  return <RoutesPages />;
}

export default App;
