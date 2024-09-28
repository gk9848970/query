import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const useLuckyNumber = () => {
  return useQuery({
    queryKey: ["luckyNumber"],
    queryFn: () => Promise.resolve(Math.random()),
  });
};

function LuckyNumber() {
  const { data } = useLuckyNumber();
  return <h1>{data}</h1>;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello world!</h1>

      {/* 
        Deduplication
        First resolves query places data in cache, 
        And for others return from the cache only 
      */}

      <LuckyNumber />
      <LuckyNumber />
      <LuckyNumber />
    </QueryClientProvider>
  );
}

export default App;
