const BASE_URL = "https://library-api.uidotdev.workers.dev";

type Book = {
  title: string;
  authors: string[];
  thumbnail: string;
};

export async function getData() {
  const url = `${BASE_URL}/books/pD6arNyKyi8C`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data as Book;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
