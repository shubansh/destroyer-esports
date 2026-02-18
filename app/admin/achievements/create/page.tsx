'use client'

import { createAchievement } from '@/actions/achievements'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export default function CreateAchievementPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Add Achievement</h1>
            <GlassCard className="p-8">
                <form action={createAchievement} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tournament Title</label>
                        <input name="title" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. BGIS 2024" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Event Name</label>
                        <input name="event_name" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. Official Krafton Event" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Placement</label>
                            <input name="placement" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. 1st Place" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Prize Pool</label>
                            <input name="prize_pool" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="e.g. ₹10,00,000" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <input type="date" name="date" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>

                    <Button type="submit" variant="neon" className="w-full">
                        Add to Trophy Case
                    </Button>
                </form>
            </GlassCard>
        </div>
    )
}
