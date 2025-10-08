import "./App.css";
import RoutesPages from "./routes/routes";
import { useHydrateAuth } from "./hooks/useHydrateAuth";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  // Run hydration on mount (refresh → re-login using cookie)
  useHydrateAuth();

  const isHydrated = useAuthStore((state) => state.isHydrated);

  if (!isHydrated) {
    // Optional loading UI while hydration is happening
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-primary">
        <p className="text-lg font-semibold">Restoring your session...</p>
      </div>
    );
  }

  return <RoutesPages />;
}

export default App;
