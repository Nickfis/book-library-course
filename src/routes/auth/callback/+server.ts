import { redirect, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const sessionData = await supabase.auth.getSession();

  if (sessionData.data.session) {
    console.log(sessionData.data.session.user);
    throw redirect(303, "/private/dashboard");
  }

  return new Response("Session data not found", { status: 400 });
};
