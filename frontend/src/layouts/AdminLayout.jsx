import Sidebar from '../components/Sidebar.jsx';

export default function AdminLayout({children}){
    return(
        <div className="min-h-screen bg-[#0F0F0F] text-white flex">
            <Sidebar/>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}