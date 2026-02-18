'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export default function JoinPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            full_name: formData.get('full_name') as string,
            email: formData.get('email') as string,
            discord_id: formData.get('discord_id') as string,
            position: formData.get('position') as string,
            portfolio_url: formData.get('portfolio_url') as string,
        }

        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('applications')
            .insert({
                ...data,
                user_id: user?.id,
                status: 'pending'
            })

        if (!error) {
            setSuccess(true)
        } else {
            alert('Error submitting application: ' + error.message)
        }
        setLoading(false)
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <GlassCard className="max-w-md w-full text-center p-8 space-y-4">
                    <h2 className="text-3xl font-bold text-primary">Application Received</h2>
                    <p>Thank you for your interest in Destroyer Esports. Our team will review your application.</p>
                    <Button onClick={() => setSuccess(false)} variant="outline">Submit Another</Button>
                </GlassCard>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <h1 className="text-4xl font-display font-bold text-center mb-8">Join the <span className="text-primary neon-text">Legion</span></h1>
            <GlassCard className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Full Name</label>
                        <input name="full_name" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Email</label>
                            <input name="email" type="email" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Discord ID</label>
                            <input name="discord_id" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Position / Role</label>
                        <select name="position" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors">
                            <option value="player">Player</option>
                            <option value="content_creator">Content Creator</option>
                            <option value="manager">Manager</option>
                            <option value="designer">Designer</option>
                            <option value="developer">Developer</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Portfolio / Highlights URL</label>
                        <input name="portfolio_url" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                    </div>

                    <Button type="submit" variant="neon" className="w-full py-6 text-lg" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </form>
            </GlassCard>
        </div>
    )
}
