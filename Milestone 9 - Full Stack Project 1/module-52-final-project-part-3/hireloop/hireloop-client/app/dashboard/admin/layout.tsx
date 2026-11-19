import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect("/sign-in")
  }

  const role = (session.user.role || "seeker").toLowerCase()
  if (role !== "admin") {
    if (role === "recruiter" || role === "recuiter") {
      redirect("/dashboard/recruiter")
    }
    redirect("/dashboard/seeker")
  }

  return <>{children}</>
}
