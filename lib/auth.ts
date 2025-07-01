import { cookies } from "next/headers"

export async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get("admin-session")
  return session?.value === "authenticated"
}
