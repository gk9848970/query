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

const useMovie = (title: string) => {
  return useQuery({
    queryKey: ["movie", title],
    queryFn: async () => {
      const movie = await fetchMovie(title);
      return movie;
    },
  });
};

const useDirector = (id: string) => {
  return useQuery({
    queryKey: ["director", id],
    queryFn: async () => {
      const director = await fetchDirector(id);
      return director;
    },
    enabled: id !== undefined,
  });
};

/*
The other way could be to use enabled option to have a director query
dependant on movie query.

This way, deduplication is possible.

The only drawback is now we need to handle the loading state of director query seperately.
Here we are handling only the query state of movie query.
*/

const useMovieAndDirector = (title: string) => {
  const movie = useMovie(title);
  const director = useDirector(movie.data?.director);

  return { movie, director };
};

const Component = ({ title }: { title: string }) => {
  const { movie, director } = useMovieAndDirector(title);

  if (movie.status === "pending") {
    return <div>Loading...</div>;
  }

  if (movie.status === "error") {
    return <div>Error: </div>;
  }

  return (
    <div>
      <h1>{movie.data.title}</h1>
      <h2>{director.data?.name}</h2>
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
      <Component title={"The Godfather"} />
    </QueryClientProvider>
  );
}

export default App;
