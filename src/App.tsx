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

async function fetchMovie(title: string) {
  const response = await fetch(
    `https://ui.dev/api/courses/react-query/movies/${title}`
  );

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}

async function fetchDirector(id: string) {
  const response = await fetch(
    `https://ui.dev/api/courses/react-query/director/${id}`
  );

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}

/*
One way of dealing with dependant queries, is to combine both queries into one.
But here deduplication is not possible, since we need to refetch both queries.

[movie1, director1]
[movie1, director2]

Director data will be fetched twice, since we are not deduplicating the query.
*/
const useMovieAndDirector = (title: string) => {
  return useQuery({
    queryKey: ["movie", title],
    queryFn: async () => {
      const movie = await fetchMovie(title);
      const director = await fetchDirector(movie.director);
      return { movie, director };
    },
  });
};

const Component = ({ title }: { title: string }) => {
  const { data, status } = useMovieAndDirector(title);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: </div>;
  }

  return (
    <div>
      <h1>{data.movie.title}</h1>
      <h2>{data.director.name}</h2>
    </div>
  );
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={true} />
      <Component title={"The Godfather"} />
      <Component title={"The Godfather III"} />
    </QueryClientProvider>
  );
}

export default App;
