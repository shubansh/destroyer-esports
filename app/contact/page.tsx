'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        }

        const { error } = await supabase
            .from('contact_messages')
            .insert({ ...data, status: 'new' })

        if (!error) {
            setSuccess(true)
        } else {
            console.error(error)
            alert('Failed to send message.')
        }
        setLoading(false)
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-display font-bold text-center mb-12">Contact <span className="text-primary neon-text">HQ</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Get in Touch</h3>
                        <p className="text-gray-400">Have a partnership inquiry or just want to say hello? Drop us a message.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="font-medium">contact@destroyeresports.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Phone</p>
                                <p className="font-medium">+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-3 rounded-full text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Headquarters</p>
                                <p className="font-medium">Mumbai, India</p>
                            </div>
                        </div>
                    </div>
                </div>

                <GlassCard className="p-8">
                    {success ? (
                        <div className="text-center space-y-4 py-12">
                            <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
                            <p>We&apos;ll get back to you as soon as possible.</p>

                            <Button onClick={() => setSuccess(false)} variant="outline">Send Another</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input name="name" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input name="email" type="email" required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Subject</label>
                                <select name="subject" className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors">
                                    <option value="Partnership">Partnership</option>
                                    <option value="Support">Support</option>
                                    <option value="General">General Inquiry</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea name="message" rows={4} required className="w-full bg-black/50 border border-white/10 rounded-md p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors" />
                            </div>
                            <Button type="submit" variant="neon" className="w-full" disabled={loading}>
                                {loading ? 'sending...' : 'Send Message'}
                            </Button>
                        </form>
                    )}
                </GlassCard>
            </div>
        </div>
    )
}
