'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import {
    Users,
    Trophy,
    FileText,
    Mail,
    Settings,
    LogOut,
    LayoutDashboard,
    Gamepad2,
    Flag,
    PenTool
} from 'lucide-react'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const navigation = [
        { name: 'Overview', href: '/admin', icon: LayoutDashboard },
        { name: 'Teams', href: '/admin/teams', icon: Gamepad2 },
        { name: 'Players', href: '/admin/players', icon: Users },
        { name: 'Achievements', href: '/admin/achievements', icon: Trophy },
        { name: 'Blog / News', href: '/admin/blog', icon: PenTool },
        { name: 'Applications', href: '/admin/applications', icon: FileText },
        { name: 'Inquiries', href: '/admin/contact', icon: Mail },
        { name: 'Feature Flags', href: '/admin/flags', icon: Flag },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ]

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar */}
            <div className="w-64 flex flex-col border-r border-white/10 bg-secondary/50 backdrop-blur-md">
                <div className="h-16 flex items-center justify-center border-b border-white/10">
                    <Link href="/" className="text-2xl font-display font-bold text-primary neon-text">DSTR ADMIN</Link>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-2 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? 'bg-primary/20 text-primary'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'}`} />
                                    {item.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>
                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto bg-background p-8">
                {children}
            </div>
        </div>
    )
}
