import { createClient } from '@/utils/supabase/server'

export async function checkFeature(flagKey: string): Promise<boolean> {
    const supabase = await createClient()
    try {
        const { data } = await supabase
            .from('feature_flags')
            .select('is_enabled')
            .eq('key', flagKey)
            .single()
        return data?.is_enabled ?? false
    } catch (error) {
        console.error(`Error checking feature flag ${flagKey}:`, error)
        return false
    }
}
