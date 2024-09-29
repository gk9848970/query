import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

// Normal fetch
const fetchRepos = async () => {
  try {
    const response = await fetch("https://api.github.com/orgs/TanStack/repos");
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data as string;
  } catch (error) {
    console.error("Network error", error);
  }
};

// Fetch inside a query

const useReposQuery = () => {
  return useQuery({
    queryKey: ["repo"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/orgs/TanStack/repos"
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      return (await response.json()) as string;
    },
  });
};

/*
Thing to notice, Try and catch is gone
Only for typescript: https://x.com/t3dotgg/status/1556539631323078657
*/

function App() {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
