export async function fetchRepos(org: string) {
  const response = await fetch(`https://api.github.com/orgs/${org}/repos`);

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}

export async function fetchIssues(org: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${org}/${repo}/issues`
  );

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}

export async function fetchMembers(org: string) {
  const response = await fetch(`https://api.github.com/orgs/${org}/members`);

  if (!response.ok) {
    throw new Error("fetch failed");
  }

  return response.json();
}
