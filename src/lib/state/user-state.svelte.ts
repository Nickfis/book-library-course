import { goto } from "$app/navigation";
import type { Database } from "$lib/types/database.types";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStateProps {
  session: Session | null;
  supabase: SupabaseClient | null;
  user: User | null;
}

interface Book {
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

export class UserState {
  session = $state<Session | null>(null);
  supabase = $state<SupabaseClient<Database> | null>(null);
  user = $state<User | null>(null);
  allBooks = $state<Book[]>([]);

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

    const { data, error } = await this.supabase
      .from("books")
      .select("*")
      .eq("user_id", this.user.id);

    if (error) {
      console.log("Error fetching all books for user");
      console.log(error);
      return;
    }

    this.allBooks = data;
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
