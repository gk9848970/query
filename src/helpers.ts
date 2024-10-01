const BASE_URL = "https://library-api.uidotdev.workers.dev";

type Book = {
  title: string;
  authors: string[];
  thumbnail: string;
};

type Review = {
  reviewId: number;
  userId: string;
  bookId: string;
  rating: number;
  title: string;
  text: string;
  reviewDate: string;
};

export async function getBook(bookId: string) {
  const url = `${BASE_URL}/books/${bookId}`;

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

export async function getReviewById(reviewId: string) {
  const url = `${BASE_URL}/review/${reviewId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return data as Review;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
}
