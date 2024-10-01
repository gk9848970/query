import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getBook, getReviewById } from "./helpers";

const useBookQuery = (bookId: string | undefined) => {
  return useQuery({
    queryKey: ["book", bookId],
    queryFn: () => getBook(bookId!),
    enabled: bookId !== undefined,
  });
};

const useReviewQuery = (reviewId: string) => {
  return useQuery({
    queryKey: ["review", reviewId],
    queryFn: () => getReviewById(reviewId),
  });
};

function ReviewDetail() {
  const reviewQuery = useReviewQuery("2");
  const bookQuery = useBookQuery(reviewQuery.data?.bookId);

  if (reviewQuery.status === "success") {
    return (
      <main className="book-detail">
        <div>
          <span className="book-cover">
            <img
              src={bookQuery?.data?.thumbnail}
              alt={bookQuery?.data?.title}
            />
          </span>
        </div>
        <div className="reviews">
          <h2>Review</h2>
          <ul>
            <li key={reviewQuery.data.reviewId}>
              <h3>{reviewQuery.data.title}</h3>
              <small>by Anonymous</small>
              <span className="book-rating">{reviewQuery.data.rating}</span>
              <p>{reviewQuery.data.text}</p>
            </li>
          </ul>
        </div>
      </main>
    );
  }

  return <Loading />;
}

function Loading() {
  return <main>Loading...</main>;
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReviewDetail />
    </QueryClientProvider>
  );
}

export default App;
