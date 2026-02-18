import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import { ContactStatusButton } from '@/components/admin/ContactStatusButton'

export const revalidate = 0

export default async function ContactAdminPage() {
    const supabase = await createClient()
    const { data: messages } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Inquiries</h1>
            <div className="grid gap-4">
                {messages?.map((msg) => (
                    <GlassCard key={msg.id} className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-bold">{msg.subject}</h3>
                                <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${msg.status === 'new' ? 'bg-blue-500/20 text-blue-500' :
                                        msg.status === 'replied' ? 'bg-green-500/20 text-green-500' :
                                            'bg-gray-500/20 text-gray-500'
                                    }`}>{msg.status}</span>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{msg.message}</p>
                            <p className="text-gray-500 text-xs font-mono">From: {msg.name} ({msg.email})</p>
                        </div>

                        <div className="flex gap-2">
                            <ContactStatusButton id={msg.id} currentStatus={msg.status} />
                        </div>
                    </GlassCard>
                ))}
                {(!messages || messages.length === 0) && (
                    <div className="text-center text-gray-500">No messages found.</div>
                )}
            </div>
        </div>
    )
}
