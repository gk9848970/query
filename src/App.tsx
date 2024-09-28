import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

function Book() {
  const { data } = useQuery({
    queryKey: ["book"],
    queryFn: () => Promise.resolve("Batman"),
  });
  return <h1>{data}</h1>;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello world!</h1>
      <Book />
    </QueryClientProvider>
  );
}

export default App;
