import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

/*
GC - Garbage collection
A query that has been inactive for gcTime, Will be gargabe collected
*/

/*
Thing to notice, Try and catch is gone
Only for typescript: https://x.com/t3dotgg/status/1556539631323078657
*/

function App() {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
