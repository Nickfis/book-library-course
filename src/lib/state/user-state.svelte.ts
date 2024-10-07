import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
}

export interface Book {
  author: string | null;
  cover_image: string | null;
  created_at: string;
  description: string | null;
  finished_reading_on: string | null;
  genre: string | null;
  id: number;
  rating: number | null;
  started_reading_on: string | null;
  title: string;
  user_id: string;
}

type UpdatableBookFields = Omit<Book, "id" | "user_id" | "created_at">;

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient<Database> | null>(null);
  user = $state<User | null>(null);
  allBooks = $state<Book[]>([]);
  userName = $state<string | null>(null);

  constructor(data: UserStateProps) {
    this.updateState(data);
  }

  updateState(data: UserStateProps) {
    this.session = data.session;
    this.supabase = data.supabase;
    this.user = data.user;
    this.fetchUserData();
  }

  async fetchUserData() {
    if (!this.user || !this.supabase) {
      return;
    }

    const userId = this.user.id;

    const [booksResponse, userNamesResponse] = await Promise.all([
      this.supabase.from("books").select("*").eq("user_id", userId),
      this.supabase
        .from("user_names")
        .select("name")
        .eq("user_id", userId)
        .single(),
    ]);

    if (
      booksResponse.error ||
      !booksResponse.data ||
      userNamesResponse.error ||
      !userNamesResponse.data
    ) {
      console.log("Error fetching data for user");
      console.log({
        booksError: booksResponse.error,
        userNamesError: userNamesResponse.error,
      });
      return;
    }

    this.allBooks = booksResponse.data;
    this.userName = userNamesResponse.data.name;
  }

  getHighestRatedBooks() {
    return this.allBooks
      .filter((book) => book.rating)
      .toSorted((a, z) => z.rating! - a.rating!)
      .slice(0, 9);
  }

  getUnreadBooks() {
    return this.allBooks
      .filter((book) => !book.started_reading_on)
      .toSorted(
        (a, z) =>
          new Date(z.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 9);
  }

  getFavoriteGenre() {
    if (this.allBooks.length === 0) {
      return "";
    }
    const genreCounts: { [key: string]: number } = {};

    this.allBooks.forEach((book) => {
      const genres = book.genre ? book.genre.split(",") : [];
      genres.forEach((genre) => {
        const trimmedGenre = genre.trim();
        if (trimmedGenre) {
          if (!genreCounts[trimmedGenre]) {
            genreCounts[trimmedGenre] = 1;
          } else {
            genreCounts[trimmedGenre]++;
          }
        }
      });
    });

    const mostCommonGenre = Object.keys(genreCounts).reduce((a, b) =>
      genreCounts[a] > genreCounts[b] ? a : b
    );

    return mostCommonGenre || "";
  }

  getBooksFromFavoriteGenre() {
    const mostCommonGenre = this.getFavoriteGenre();

    return this.allBooks
      .filter((book) => book.genre?.includes(mostCommonGenre))
      .toSorted((a, z) => {
        const ratingA = a.rating || 0;
        const ratingZ = z.rating || 0;
        return ratingZ - ratingA;
      });
  }

  getBookById(bookId: number) {
    return this.allBooks.find((book) => book.id === bookId);
  }

  async updateBook(bookId: number, updateObject: Partial<UpdatableBookFields>) {
    if (!this.supabase) {
      return;
    }

    const { status, error } = await this.supabase
      .from("books")
      .update(updateObject)
      .eq("id", bookId);

    if (status === 204 && !error) {
      this.allBooks = this.allBooks.map((book) => {
        if (book.id === bookId) {
          return {
            ...book,
            ...updateObject,
          };
        } else {
          return book;
        }
      });
    }
  }

  async uploadBookCover(file: File, bookId: number) {
    if (!this.user || !this.supabase) {
      return;
    }

    const filePath = `${this.user.id}/${new Date().getTime()}_${file.name}`;
    const { error: uploadError } = await this.supabase.storage
      .from("book-covers")
      .upload(filePath, file);

    if (uploadError) {
      return console.log(uploadError);
    }

    const {
      data: { publicUrl },
    } = this.supabase.storage.from("book-covers").getPublicUrl(filePath);

    await this.updateBook(bookId, { cover_image: publicUrl });
  }

  async logout() {
    await this.supabase?.auth.signOut();
    goto("/login");
  }
}

const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStateProps) {
  return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
  return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}
