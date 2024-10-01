import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchMembers, fetchRepos } from "./helpers";

const queryClient = new QueryClient();

/*
Parallel queries

1. Having each query seperately

Fixed in number of queries
If I need a collective data on all queries, We need to manually do it query by query

2. Having all queries in one as Promise.all

Can have dynamic number of queries

Here we have a single query which is a promise of all the queries
It makes it all or none call, Resolves only when all the queries are resolved
Fetching and caching cannot be done independently
*/

const Component = () => {
  const promises = [fetchRepos(), fetchMembers()];
  const reposAndMembers = useQuery({
    queryKey: ["repos"],
    queryFn: () => Promise.all(promises),
  });

  if (reposAndMembers.status !== "success") {
    return <p>Loading...</p>;
  }

  const [repos, members] = reposAndMembers.data;

  return (
    <>
      <h1>TanStack Dashboard</h1>
      <h2>Repos</h2>

      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>

      <hr />

      <h2>Members</h2>

      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.login}</li>
        ))}
      </ul>
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* The rest of your application */}
      <ReactQueryDevtools initialIsOpen={true} />
      <Component />
    </QueryClientProvider>
  );
}

export default App;
