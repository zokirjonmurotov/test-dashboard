import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./App.css";
import Routers from "./configs/routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routers />
      </QueryClientProvider>
    </>
  );
}

export default App;
