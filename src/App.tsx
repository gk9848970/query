import {
  QueryClient,
  QueryClientProvider,
  useQueries,
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
No collective info mechanism, Which failed Which resolved independently

3. useQueries
This combines the best of both worlds
Dynamic number of queries can be supported as well
Cache and fetching can be done independently and in parallel
Collective info can be done by array methods on returned array
*/

const Component = () => {
  const [repos, members] = useQueries({
    queries: [
      {
        queryKey: ["repos"],
        queryFn: fetchRepos,
      },
      {
        queryKey: ["members"],
        queryFn: fetchMembers,
      },
    ],
  });

  return (
    <>
      <h1>TanStack Dashboard</h1>
      <h2>Repos</h2>
      {repos.isPending ? <p>Loading repos...</p> : null}
      {repos.isError ? <p>Error loading repos: {repos.error.message}</p> : null}
      {repos.isSuccess ? (
        <ul>
          {repos.data.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      ) : null}

      <hr />

      <h2>Members</h2>
      {members.isPending ? <p>Loading members...</p> : null}
      {members.isError ? (
        <p>Error loading members: {members.error.message}</p>
      ) : null}
      {members.isSuccess ? (
        <ul>
          {members.data.map((member) => (
            <li key={member.id}>{member.login}</li>
          ))}
        </ul>
      ) : null}
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
