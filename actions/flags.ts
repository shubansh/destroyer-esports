'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

async function checkSuperAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error("Unauthorized")

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'super_admin') {
        throw new Error("Forbidden: Super Admin only")
    }
}

export async function toggleFlag(id: string, is_enabled: boolean) {
    await checkSuperAdmin()
    const supabase = await createClient()
    const { error } = await supabase.from('feature_flags').update({ is_enabled }).eq('id', id)
    if (error) throw error
    revalidatePath('/admin/flags')
}
