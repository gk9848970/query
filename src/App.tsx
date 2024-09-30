import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

/*
Only fetch the query if there is any search term
A query can only be in three states:
1. Pending
But it does not tell if the query is currently fetching or not
There is another thing, query exposes called fetchStatus

status === "pending" && fetchStatus === "fetching" -> Query is fetching
Which is equivalent to, isLoading === true

2. Success
3. Error

status === "success" -> There is data in cache

Two approches are, 
Use enable and then handle various cases, IsLoading, status === "success"
Or use conditional rendering without enabled flag like

search && <IssuesList /> -> Now issue list will not have to deal with loading or
not loading but pending state
*/
const useIssues = (search: string) => {
  return useQuery({
    queryKey: ["issues"],
    queryFn: async () =>
      fetch("https://api.github.com/repos/uidotdev/query/issues"),
    enabled: search !== "",
  });
};

const IssuesList = () => {
  const { data, status } = useIssues("query");

  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  return (
    <ul>
      {data.map((issue) => (
        <li key={issue.id}>
          <a href={issue.html_url}>{issue.title}</a>
        </li>
      ))}
    </ul>
  );
};

/*
Thing to notice, Try and catch is gone
Only for typescript: https://x.com/t3dotgg/status/1556539631323078657
*/

function App() {
  return <QueryClientProvider client={queryClient}></QueryClientProvider>;
}

export default App;
