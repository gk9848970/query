import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getData } from "./helpers";

const useBookQuery = () => {
  return useQuery({
    queryKey: ["book"],
    queryFn: getData,
  });
};

function Book() {
  const { data, isError, isPending } = useBookQuery();

  if (isError) {
    return <Error />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <main className="book-detail">
      <div>
        <span className="book-cover">
          <img src={data.thumbnail} alt={data.title} />
        </span>
      </div>
      <div>
        <h2 className="book-title">{data.title}</h2>
        <small className="book-author">{data.authors?.join(", ")}</small>
      </div>
    </main>
  );
}

function Loading() {
  return <main>Loading...</main>;
}

function Error() {
  return <main>Woops there was an error...</main>;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Book />
    </QueryClientProvider>
  );
}

export default App;
