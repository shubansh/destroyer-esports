import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import { Users, Gamepad2, FileText, Mail } from 'lucide-react'

export const revalidate = 0

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Fetch stats in parallel
    const [
        { count: teamsCount },
        { count: playersCount },
        { count: appsCount },
        { count: msgsCount }
    ] = await Promise.all([
        supabase.from('teams').select('*', { count: 'exact', head: true }),
        supabase.from('players').select('*', { count: 'exact', head: true }),
        supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new')
    ])

    const stats = [
        { name: 'Total Teams', value: teamsCount || 0, icon: Gamepad2, color: 'text-blue-400' },
        { name: 'Active Players', value: playersCount || 0, icon: Users, color: 'text-green-400' },
        { name: 'Pending Apps', value: appsCount || 0, icon: FileText, color: 'text-yellow-400' },
        { name: 'New Inquiries', value: msgsCount || 0, icon: Mail, color: 'text-pink-400' },
    ]

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <GlassCard key={stat.name} className="flex items-center space-x-4 p-6">
                        <div className={`p-3 rounded-full bg-white/5 ${stat.color}`}>
                            <stat.icon className="h-8 w-8" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400">{stat.name}</p>
                            <p className="text-3xl font-bold">{stat.value}</p>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <GlassCard className="p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <div className="text-gray-500 text-sm text-center py-8">
                        Activity logs coming soon.
                    </div>
                </GlassCard>
                <GlassCard className="p-6">
                    <h2 className="text-xl font-bold mb-4">System Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Database</span>
                            <span className="text-green-400 font-mono">ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Storage</span>
                            <span className="text-green-400 font-mono">ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Auth</span>
                            <span className="text-green-400 font-mono">ONLINE</span>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}
