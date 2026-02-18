'use client'

import { createTeam } from '@/actions/teams'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export default function CreateTeamPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Create New Team</h1>
            <GlassCard className="p-8">
                <form action={createTeam} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Team Name</label>
                        <input name="name" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Slug (URL)</label>
                        <input name="slug" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />

                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Game</label>
                        <select name="game" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors">
                            <option value="BGMI">BGMI</option>
                            <option value="Valorant">Valorant</option>
                            <option value="Pokemon Unite">Pokemon Unite</option>
                            <option value="CS2">CS2</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea name="description" rows={3} className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Logo URL</label>
                        <input name="logo_url" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" placeholder="https://..." />
                    </div>

                    <Button type="submit" variant="neon" className="w-full">
                        Create Team
                    </Button>

                </form>
            </GlassCard>
        </div>
    )
}
