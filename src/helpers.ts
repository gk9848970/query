export async function fetchRepos() {
  const response = await fetch(`https://api.github.com/orgs/TanStack/repos`);

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}

export async function fetchIssues() {
  const response = await fetch(
    `https://api.github.com/repos/TanStack/query/issues`
  );

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}

export async function fetchMembers() {
  const response = await fetch(`https://api.github.com/orgs/TanStack/members`);

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}
