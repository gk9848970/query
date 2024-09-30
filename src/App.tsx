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
    staleTime: 5 * 1000,
  });
};

function Book({ bookId }: { bookId: string }) {
  const { data, isError, isPending, isStale, refetch, isFetching } =
    useBookQuery(bookId);

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
      <div className="checkout-wrapper">
        <button className="primary">Check Out</button>
        <CheckoutMessage
          isFetching={isFetching}
          isStale={isStale}
          refetch={refetch}
        />
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

function CheckoutMessage({
  isFetching,
  isStale,
  refetch,
}: {
  isFetching: boolean;
  isStale: boolean;
  refetch: () => void;
}) {
  if (isFetching) {
    return <BackgroundUpdateInProgress />;
  }

  if (isStale) {
    return <StaleMessage refetch={refetch} />;
  }

  return <UpToDate />;
}

function StaleMessage({ refetch }: { refetch: () => void }) {
  return (
    <main>
      Data is stale, click to refetch
      <button onClick={refetch}>Refresh</button>
    </main>
  );
}

function BackgroundUpdateInProgress() {
  return <main>Update is in progress</main>;
}

function UpToDate() {
  return <main>Updated Data</main>;
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
