import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/*
Refetch Interval: Can also be a function that returns boolean, Indicating if we should
stop refetching. 
*/

function useUuid() {
  return useQuery({
    queryKey: ["uuid"],
    queryFn: async () => {
      const response = await fetch(`https://uuid.rocks/json`);

      if (!response.ok) {
        throw new Error("fetch failed");
      }

      return response.json();
    },
    refetchInterval: 3000, // 3 seconds
  });
}

const queryClient = new QueryClient();

const UUIDComponent = () => {
  const { data, status, fetchStatus, refetch } = useUuid();

  if (status === "pending") {
    return <div>...</div>;
  }

  if (status === "error") {
    return <div>Error fetching UUID</div>;
  }

  return (
    <p>
      <div>{data.uuid}</div>
      <button onClick={() => refetch()}>Refetch</button>
      <span>{fetchStatus === "fetching" ? "updating..." : null}</span>
    </p>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={true} />
      <UUIDComponent />
    </QueryClientProvider>
  );
}

export default App;
