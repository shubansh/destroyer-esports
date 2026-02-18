import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import Image from 'next/image'

export const revalidate = 60 // Revalidate every minute

export default async function TeamsPage() {
    const supabase = await createClient()
    const { data: teams } = await supabase
        .from('teams')
        .select('*')
        .eq('is_active', true)
        .order('name')

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-5xl font-display font-bold text-center mb-12">
                Our <span className="text-primary neon-text">Rosters</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {teams?.map((team) => (
                    <GlassCard key={team.id} hoverEffect className="flex flex-col items-center text-center space-y-4">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/50 shadow-[0_0_15px_rgba(0,191,255,0.3)]">
                            {team.logo_url ? (
                                <Image src={team.logo_url} alt={team.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-2xl font-bold">
                                    {team.name[0]}
                                </div>
                            )}
                        </div>
                        <h2 className="text-3xl font-bold">{team.name}</h2>
                        <p className="text-primary font-mono text-sm uppercase tracking-widest">{team.game}</p>
                        <p className="text-gray-400 max-w-sm">{team.description}</p>

                        {/* Achievements teaser */}
                        {/* We could fetch achievements here or show a count */}
                    </GlassCard>
                ))}
                {(!teams || teams.length === 0) && (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        No active teams found. Check back soon.
                    </div>
                )}
            </div>
        </div>
    )
}
