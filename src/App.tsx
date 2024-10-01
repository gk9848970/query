import {
  QueryClient,
  QueryClientProvider,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchIssues, fetchRepos } from "./helpers";
import { useRef } from "react";

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
Like we have done for total issues
*/

const ORGANIZATION = "TanStack";

const useRepos = () => {
  return useQuery({
    queryKey: ["repos"],
    queryFn: () => fetchRepos(ORGANIZATION),
  });
};

function useIssues(repos: any[]) {
  return useQueries({
    queries:
      repos?.map((repo) => ({
        queryKey: ["repos", repo.name, "issues"],
        queryFn: async () => {
          const issues = await fetchIssues(ORGANIZATION, repo.name);
          return { repo: repo.name, issues };
        },
      })) ?? [],
  });
}

const Component = () => {
  const repos = useRepos();
  const issues = useIssues(repos.data);

  const totalIssues = issues
    .map(({ data }) => data?.issues.length ?? 0)
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <h1>TanStack Dashboard</h1>
      <h2>Repos</h2>
      <h3>Total issues {totalIssues}</h3>
      {repos.isPending ? <p>Loading repos...</p> : null}
      {repos.isError ? <p>Error loading repos: {repos.error.message}</p> : null}
      {repos.isSuccess ? (
        <ul>
          {repos.data.map((repo) => {
            const repoIssues = issues.find(
              (query) => query.data?.repo === repo.name
            );

            const length = repoIssues?.data.issues.length;

            return (
              <li key={repo.id}>
                {repo.name}
                {repoIssues
                  ? ` (${length === 30 ? "30+" : length} issues)`
                  : null}
              </li>
            );
          })}
        </ul>
      ) : null}

      <hr />
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
