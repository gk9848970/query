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
*/

const Component = () => {
  const repos = useQuery({
    queryKey: ["repos"],
    queryFn: fetchRepos,
  });

  const members = useQuery({
    queryKey: ["issues"],
    queryFn: fetchMembers,
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
