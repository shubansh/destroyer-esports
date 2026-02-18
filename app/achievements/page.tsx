import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import { Trophy, Calendar } from 'lucide-react'

export const revalidate = 60

export default async function AchievementsPage() {
    const supabase = await createClient()
    const { data: achievements } = await supabase
        .from('achievements')
        .select('*, teams(name, game)')
        .order('date', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-display font-bold text-center mb-12">
                Hall of <span className="text-primary neon-text">Fame</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {achievements?.map((achievement) => (
                    <GlassCard key={achievement.id} hoverEffect className="space-y-4 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Trophy className="w-32 h-32" />
                        </div>

                        <div className="flex items-center space-x-3 text-primary">
                            <Trophy className="w-6 h-6" />
                            <span className="font-bold text-xl">{achievement.placement}</span>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold">{achievement.title}</h3>
                            <p className="text-gray-400">{achievement.event_name}</p>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(achievement.date).toLocaleDateString()}</span>
                            </div>
                            {achievement.prize_pool && (
                                <div className="font-mono text-primary">
                                    {achievement.prize_pool}
                                </div>
                            )}
                        </div>
                        <div className="absolute bottom-2 right-4 text-xs font-mono text-gray-600 uppercase tracking-widest">
                            {achievement.teams?.game}
                        </div>
                    </GlassCard>
                ))}
            </div>
            {(!achievements || achievements.length === 0) && (
                <div className="col-span-full text-center py-20 text-gray-500">
                    Tracking our first victory...
                </div>
            )}
        </div>
    )
}
