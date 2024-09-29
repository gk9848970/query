import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getData } from "./helpers";
import { useState } from "react";

const useBookQuery = (bookId: string) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getData(bookId),
  });
};

function Book({ bookId }: { bookId: string }) {
  const { data, isError, isPending } = useBookQuery(bookId);

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
  const [selectedBookId, setSelectedBookId] = useState("pD6arNyKyi8C");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="select">
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
        >
          <option value="pD6arNyKyi8C">The Hobbit</option>
          <option value="aWZzLPhY4o0C">The Fellowship Of The Ring</option>
          <option value="12e8PJ2T7sQC">The Two Towers</option>
          <option value="WZ0f_yUgc0UC">The Return Of The King</option>
        </select>
      </div>
      <Book bookId={selectedBookId} />
    </QueryClientProvider>
  );
}

export default App;
