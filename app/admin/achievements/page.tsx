import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Trash2, Trophy } from 'lucide-react'
import { deleteAchievement } from '@/actions/achievements'

export const revalidate = 0

export default async function AchievementsAdminPage() {
    const supabase = await createClient()
    const { data: achievements } = await supabase.from('achievements').select('*').order('date', { ascending: false })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Achievements</h1>
                <Link href="/admin/achievements/create">
                    <Button variant="neon" size="sm" className="flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add Achievement
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4">
                {achievements?.map((ach) => (
                    <GlassCard key={ach.id} className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full text-primary">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{ach.placement} - {ach.title}</h3>
                                <p className="text-gray-400 text-sm">{ach.event_name} • {new Date(ach.date).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <form action={deleteAchievement.bind(null, ach.id)}>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </GlassCard>
                ))}
                {(!achievements || achievements.length === 0) && (
                    <div className="text-center text-gray-500">No achievements found.</div>
                )}
            </div>
        </div>
    )
}
