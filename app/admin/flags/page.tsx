import { createClient } from '@/utils/supabase/server'
import { GlassCard } from '@/components/ui/GlassCard'
import { FlagToggle } from '@/components/admin/FlagToggle'

export const revalidate = 0

export default async function FeatureFlagsPage() {
    const supabase = await createClient()
    const { data: flags } = await supabase.from('feature_flags').select('*').order('key')

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Feature Flags</h1>
            <p className="text-gray-400">Control system-wide features. <span className="text-red-400">Restricted to Super Admin.</span></p>

            <div className="grid gap-4">
                {flags?.map((flag) => (
                    <GlassCard key={flag.id} className="p-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold font-mono">{flag.key}</h3>
                            <p className="text-gray-400 text-sm">{flag.description}</p>
                        </div>

                        <div className="flex gap-2">
                            <FlagToggle id={flag.id} isEnabled={flag.is_enabled} />
                        </div>
                    </GlassCard>
                ))}
                {(!flags || flags.length === 0) && (
                    <div className="text-center text-gray-500">No flags defined.</div>
                )}
            </div>
        </div>
    )
}
