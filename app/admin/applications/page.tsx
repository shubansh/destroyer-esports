import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import { ApplicationStatusButton } from '@/components/admin/ApplicationStatusButton'

export const revalidate = 0

export default async function ApplicationsAdminPage() {
    const supabase = await createClient()
    const { data: applications } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Applications</h1>
            </div>

            <div className="grid gap-4">
                {applications?.map((app) => (
                    <GlassCard key={app.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold">{app.full_name}</h3>
                                <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${app.status === 'accepted' ? 'bg-green-500/20 text-green-500' :
                                        app.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                            'bg-yellow-500/20 text-yellow-500'
                                    }`}>
                                    {app.status}
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                {app.email} • {app.position}
                            </div>
                            <div className="text-gray-500 text-xs font-mono mt-1">
                                Discord: {app.discord_id}
                            </div>
                            {app.portfolio_url && (
                                <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline mt-1 block">
                                    View Portfolio
                                </a>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <ApplicationStatusButton id={app.id} currentStatus={app.status} />
                        </div>
                    </GlassCard>
                ))}

                {(!applications || applications.length === 0) && (
                    <div className="text-center text-gray-500 py-8">
                        No applications received yet.
                    </div>
                )}
            </div>
        </div>
    )
}
