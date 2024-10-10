import Sidebar from "@/components/sidebar/Sidebar"

export default function DashboardLayout({children}) {
  return (
    <section className="bg-slate-50 h-screen md:flex">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
        <div className="flex-grow overflow-auto">
          {children}
        </div>
    </section>
  )
}