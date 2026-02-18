'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
        } else {
            router.push('/dashboard')
            router.refresh()
        }
        setLoading(false)
    }

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: email.split('@')[0] // Default name
                }
            }
        })
        if (error) {
            setError(error.message)
        } else {
            setError('Check your email for confirmation link.')
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <GlassCard className="max-w-sm w-full p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-display font-bold text-primary neon-text">Access Terminal</h1>
                    <p className="text-gray-400 text-sm">Enter your credentials to continue.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                    </div>

                    <Button type="submit" variant="neon" className="w-full" isLoading={loading}>
                        Login
                    </Button>
                    <div className="text-center text-sm text-gray-400">
                        Don&apos;t have an account? <button type="button" onClick={handleSignUp} className="text-primary hover:underline">Sign Up</button>
                    </div>

                </form>
            </GlassCard>
        </div>
    )
}
