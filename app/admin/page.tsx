import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { checkAuth } from "@/lib/auth"

export default async function AdminPage() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard />
    </div>
  )
}
