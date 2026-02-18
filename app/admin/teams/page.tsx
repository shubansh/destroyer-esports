import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2 } from 'lucide-react'
import { deleteTeam } from '@/actions/teams'

export const revalidate = 0

export default async function TeamsAdminPage() {
    const supabase = await createClient()
    const { data: teams } = await supabase.from('teams').select('*').order('name')

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Teams</h1>
                <Link href="/admin/teams/create">
                    <Button variant="neon" size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Team
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {teams?.map((team) => (
                    <GlassCard key={team.id} className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {team.logo_url && (
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={team.logo_url} alt={team.name} className="object-cover w-full h-full" />
                                </div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold">{team.name}</h3>
                                <p className="text-gray-400 text-sm">{team.game}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <form action={deleteTeam.bind(null, team.id)}>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </GlassCard>
                ))}
                {(!teams || teams.length === 0) && (
                    <div className="text-center text-gray-500">No teams found.</div>
                )}
            </div>
        </div>
    )
}
