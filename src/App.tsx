import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
