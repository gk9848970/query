import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function MediaDevices() {
  const { data, isError, isPending } = useQuery({
    queryKey: ["mediaDevices"],
    queryFn: async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {isError}</p>;
  }

  return (
    <h1>
      {data.map((device, i) => (
        <p key={i}>{device.label || i} Device</p>
      ))}
    </h1>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaDevices />
    </QueryClientProvider>
  );
}

export default App;
